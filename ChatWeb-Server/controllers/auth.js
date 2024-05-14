const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const mailService = require('../services/mailer');
const bcrypt = require('bcrypt');
//
const User = require("../models/user");
const filterObj = require("../utils/filterObj");
const { promisify } = require("util");
const otp = require("../Templates/Mail/otp");
const catchAsync = require("../utils/catchAsync");

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

//sigup => register-sendOTP-verifyOTP

//https://api.thinline.com/auth/register

//register
exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password} = req.body;

  const filteredBody = filterObj(req.body, "firstName", "lastName", "email", "password");

  //ktr email ton tai hay chua
  const existing_user = await User.findOne({ email: email });

  if (existing_user && existing_user.verified) {
    res.status(400).json({
      status: "error",
      message: "Email da ton tai, hay dang nhap",
    });
  } else if (existing_user) {
    await User.findOneAndUpdate({ email: email }, filteredBody, {
      new: true,
      validateModifiedOnly: true,
    });

    //generate OTP and send email to user
    req.userId = existing_user._id;
    next();
  } else {

    const new_user = await User.create(filteredBody);

    //generate OTP and send email to user
    req.userId = new_user._id;
    next();
  }
});

exports.sendOTP = catchAsync(async (req, res, next) => {
  const { userId } = req;
  const new_otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const otp_expiry_time = Date.now() + 10 * 60 * 1000; //10p sau khi otp gui

  const user = await User.findOneAndUpdate(userId, {
    // otp: new_otp,
    otp_expiry_time: otp_expiry_time,
  });

  user.otp = new_otp.toString();
  await user.save({new: true, validateModifiedOnly: true});

  //TODO send mail
  mailService.sendEmail({
    from: "ngocngoc140702@gmail.com",
    to: user.email,
    subject: "Ma xac thuc OTP cho ThinLine",
    // text: `Ma OTP la ${new_otp}. Co hieu luc tron vong 10p`,
    html: otp(user.firstName, new_otp),
    attachment: [],

  });

  res.status(200).json({
    status: "success",
    message: "OTP gui thanh cong",
  });
});
exports.verifyOTP = catchAsync(async (req, res, next) => {
  // verify otp and update user accordingly
  const { email, otp } = req.body;
  const user = await User.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Email is invalid or OTP expired",
    });
  }

  if (user.verified) {
    return res.status(400).json({
      status: "error",
      message: "Email is already verified",
    });
  }

  if (!(await user.correctOTP(otp, user.otp))) {
    res.status(400).json({
      status: "error",
      message: "OTP is incorrect",
    });

    return;
  }

  // OTP is correct

  user.verified = true;
  user.otp = undefined;
  await user.save({ new: false, validateModifiedOnly: true });

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "OTP verified Successfully!",
    token,
    user_id: user._id,
  });
});
// exports.verifyOTP = catchAsync(async (req, res, next) => {
//   // verify otp and update user accordingly
//   const { email, otp } = req.body;
//   const user = await User.findOne({
//     email,
//     otp_expiry_time: { $gt: Date.now() },
//   });

//   if (!user) {
//     return res.status(400).json({
//       status: "error",
//       message: "Email is invalid or OTP expired",
//     });
//   }

//   if (user.verified) {
//     return res.status(400).json({
//       status: "error",
//       message: "Email is already verified",
//     });
//   }

//   if (!(await user.correctOTP(otp, user.otp))) {
//     res.status(400).json({
//       status: "error",
//       message: "OTP is incorrect",
//     });

//     return;
//   }

//   // OTP is correct

//   user.verified = true;
//   user.otp = undefined;
//   await user.save({ new: true, validateModifiedOnly: true });

//   const token = signToken(user._id);

//   res.status(200).json({
//     status: "success",
//     message: "OTP verified Successfully!",
//     token,
//     user_id: user._id,
//   });
// });

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Both email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(400).json({
        status: "error",
        message: "Email or password is incorrect",
      });
    }

    const token = signToken(user._id);

    // Trả về token và thông tin user cần thiết
    res.status(200).json({
      status: "success",
      message: "Logged in successfully!",
      token,
      // user: {
      //   _id: user._id,
      //   email: user.email,
      //   // Các thông tin khác bạn muốn trả về
      // },
      user_id: user._id,
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};


exports.protect = catchAsync(async (req, res, next) => {
  //
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];



  }
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  else {
    res.status(400).json({
        status: "error",
        message: "Ban chua dang nhap, vui long dang nhap de co quyen truy cap",
        
    });
    return;
  }

  //2. verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
  //3. ktr user ton tai
  const this_user = await User.findById(decoded.userId);

  if (!this_user) {
    res.status(401).json({
        // status: "error",
        message: "User khong ton tai",
        
    });
  }

  //4. check if user changed their password after token was issued
  // if (!this_user.changedPasswordAfter(decoded.iat)) {
  //   res.status(401).json({
  //       status: "error",
  //       message: "User hien tai da cap nhat password! Vui long login lai",
        
  //   });
  // }

  //gant access to protectd route
  req.user = this_user;
  next();

});

//Cac routes->Protected (chi user da login moi protect) & unprotect

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. getuser email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({
      status: "error",
      message: "Khong co email nguoi dung",
    });

    return;
  }
  //2. Random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({validateBeforeSave: false});

  // 3) Send it to user's email
  try {
    const resetURL = `http://localhost:3000/auth/new-password?token=${resetToken}`;
    // TODO => Send Email with this Reset URL to user's email address

    console.log(resetURL);

    mailService.sendEmail({
      from: "ngocngoc140702@gmail.com",
      to: user.email,
      subject: "Reset Password",
      html: resetPassword(user.firstName, resetURL),
      attachments: [],
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      message: "Loi gui email, vui long thu lai sau",
    });
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1. get user based on token

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2. neu ma het han hoac qua trinh gui qua thoi gian (10p)
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Ma khong hop le hoac het han",
    });
    return;
  }

  //3. Cap nhat user password va set resetToken expiry undefined
  user.password = req.body.password; //239902QWERT
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  //4. login user va gui JWT moi
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password reset thanh cong",
    token,
  });
});

