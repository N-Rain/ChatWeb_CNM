const mongoose = require("mongoose");

const groupMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Group name is required"],
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: {
        type: String,
        enum: ["Text", "Media", "Document", "Link"],
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      text: String,
      file: String,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);

module.exports = GroupMessage;
