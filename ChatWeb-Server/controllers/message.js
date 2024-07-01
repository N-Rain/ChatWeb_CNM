const Conversation = require("../models/conversations");
const Message = require("../models/message");
const io  = require("../server");

const createMessage = async (req, res) => {
  try {
    console.log(req.body);
    const { senderId, receiverId, content, image, file } = req.body;
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        type: "public",
        members: [senderId, receiverId],
      });
    }
    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      receiverId,
      content,
      image,
      file,
    });
  
    io.emit("messageSend", { user: senderId });
    return res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const getIdConversation = async (req, res) => {
  try {
    console.log("User:", req.params.id);
    const userId = req.params.id;
    const conversations = await Conversation.find({ members: userId }).populate(
      "members"
    );
    const newData = [];
    for (const result of conversations) {
      const nextResult = result.members.filter((items) => items.id !== userId);
      for (const item of result.members) {
        if (item._id != userId) {
          newData.push({
            account: item.account,
            _id: item._id,
            username: item.username,
            avatar: item.avatar,
          });
        }
      }
    }
    return res.json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const detailsConversations = async (req, res) => {
  try {
    const id = req.params.id;
    const messages = await Message.find({ conversationId: id }).populate(
      "senderId receiverId"
    );
    return res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserChatMessage = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      return res.status(200).json({ message: "no message" });
    } else {
      return res.status(200).json(conversation);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const removeMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    return res.status(200).json({ message: "deleted", data: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const clearAllChat = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.deleteMany({ conversationId: id });
    await Conversation.findByIdAndUpdate(id);
    return res.status(200).json({ message: "deleted", data: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getUserChatMessage,
  detailsConversations,
  getIdConversation,
  createMessage,
  removeMessage,
  clearAllChat,
};
