const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");
const FriendRequest = require("../models/friendRequest");


exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "about",
    "avatar"
  );

  const userDoc = await User.findByIdAndUpdate(req.user._id, filteredBody);

  res.status(200).json({
    status: "success",
    data: userDoc,
    message: "User Updated successfully",
  });
});


exports.getUsers = catchAsync(async (req, res, next) => {
  const all_users = await User.find({
    verified: true,
  }).select("firstName lastName _id");

  const this_user = req.user;

  const remaining_users = all_users.filter(
    (user) =>
      !this_user.friends.includes(user._id) &&
      user._id.toString() !== req.user._id.toString()
  );
  console.log("Remaining users:", remaining_users);
  res.status(200).json({
    status: "success",
    data: remaining_users,
    message: "Users found successfully!",
  });
});
exports.getRequests = catchAsync(async (req, res, next) => {
  const requests = await FriendRequest.find({ recipient: req.user._id })
    .populate("sender")
    .select("_id firstName lastName");
  console.log("Requests:", requests);
  res.status(200).json({
    status: "success",
    data: requests,
    message: "Requests found successfully!",
  });
});
exports.getFriends = catchAsync(async (req, res, next) => {
  console.log("Request to get friends received");

  const this_user = await User.findById(req.user._id).populate(
    "friends",
    "_id firstName lastName"
  );

  console.log("Found user:", this_user);

  res.status(200).json({
    status: "success",
    data: this_user.friends,
    message: "Friends found successfully!",
  });
});

exports.generateZegoToken = catchAsync(async (req, res, next) => {
  try {
    const { userId, room_id } = req.body;

    console.log(userId, room_id, "from generate zego token");

    const effectiveTimeInSeconds = 3600; //type: number; unit: s; token expiration time, unit: second
    const payloadObject = {
      room_id, // Please modify to the user's roomID
      // The token generated allows loginRoom (login room) action
      // The token generated in this example allows publishStream (push stream) action
      privilege: {
        1: 1, // loginRoom: 1 pass , 0 not pass
        2: 1, // publishStream: 1 pass , 0 not pass
      },
      stream_id_list: null,
    }; //
    const payload = JSON.stringify(payloadObject);
    // Build token
    const token = generateToken04(
      appID * 1, // APP ID NEEDS TO BE A NUMBER
      userId,
      serverSecret,
      effectiveTimeInSeconds,
      payload
    );
    res.status(200).json({
      status: "success",
      message: "Token generated successfully",
      token,
    });
  } catch (err) {
    console.log(err);
  }
});
