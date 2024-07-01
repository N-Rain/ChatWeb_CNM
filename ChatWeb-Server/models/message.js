const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
    {
      conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: String,
      image: String,
      file: String,
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );
const Message = mongoose.model('Message2', messageSchema);
module.exports = Message;
