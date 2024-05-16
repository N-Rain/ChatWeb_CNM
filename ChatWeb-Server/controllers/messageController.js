// const OneToOneMessage = require('../models/OneToOneMessage');

// Hàm điều khiển để xóa một tin nhắn
exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const message = await OneToOneMessage.findOneAndUpdate(
      { 'messages._id': messageId },
      { $pull: { messages: { _id: messageId } } },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tin nhắn' });
    }

    res.status(200).json({ success: true, message: 'Đã xóa tin nhắn thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa tin nhắn:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};
