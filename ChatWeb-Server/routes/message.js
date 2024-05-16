const express = require('express');
const router = express.Router();
const oneToOneMessageController = require('../controllers/messageController');

// Yêu cầu DELETE để xóa một tin nhắn
router.delete('/messages/:messageId', oneToOneMessageController.deleteMessage);

module.exports = router;
