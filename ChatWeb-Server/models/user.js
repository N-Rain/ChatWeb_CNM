const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  about: {
    type: String,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      message: (props) => `Email (${props.value}) is invalid!`,
    },
  },
  password: {
    // unselect
    type: String,
  },
  passwordChangedAt: {
    // unselect
    type: Date,
  },
  passwordResetToken: {
    // unselect
    type: String,
  },
  passwordResetExpires: {
    // unselect
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    // unselect
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otp_expiry_time: {
    type: Date,
  },
  friends: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  socket_id: {
    type: String
  },
  status: {
    type: String,
    enum: ["Online", "Offline"]
  }
});

userSchema.pre("save", async function (next) {
  // Log để kiểm tra xem hook được gọi khi nào và dữ liệu trước khi mã hóa
  console.log("Pre-save hook for OTP");

  // Chỉ chạy hook nếu otp đã được sửa đổi và tồn tại
  if (this.isModified("otp") && this.otp) {
    // Hash OTP với cost là 12
    this.otp = await bcrypt.hash(this.otp.toString(), 12);
    
    // Log giá trị đã được hash
    console.log("Hashed OTP:", this.otp);
  }

  // Chuyển tiếp sang hook tiếp theo
  next();
});

userSchema.pre("save", async function (next) {
  // Log để kiểm tra xem hook được gọi khi nào và dữ liệu trước khi mã hóa
  console.log("Pre-save hook for password");

  // Chỉ chạy hook nếu password đã được sửa đổi và tồn tại
  if (this.isModified("password") && this.password) {
    // Hash password với cost là 12
    this.password = await bcrypt.hash(this.password, 12);
    
    // Log giá trị đã được hash
    console.log("Hashed password:", this.password);
  }

  // Chuyển tiếp sang hook tiếp theo
  next();
});


userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew || !this.password)
    return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.correctOTP = async function (candidateOTP, userOTP) {
  return await bcrypt.compare(candidateOTP, userOTP);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }

  // FALSE MEANS NOT CHANGED
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
