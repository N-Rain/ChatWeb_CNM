const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
dotenv.config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const path = require("path");
process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});
const Conversation = require("./models/conversations");

const User = require("./models/user");
const FriendRequest = require("./models/friendRequest");

const http = require("http");
const OneToOneMessage = require("./models/oneToOneMessage");
//gr msg
const GroupMessage = require("./models/GroupMessage");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.post("/message/messages-create", async (req, res) => {
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
});
app.get("/message/clearAll/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Message.deleteMany({ conversationId: id });
    await Conversation.findByIdAndUpdate(id);
    io.emit("messageSend", { user: id });
    return res.status(200).json({ message: "deleted", data: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.get("/get-groupchat-idUser/:id", async (req, res) => {
  try {
    const data = await Conversation.find({
      members: { $all: [req.params.id] }, // Sử dụng $all với mảng chứa id
      type: { $ne: "public" }, // Sử dụng $ne để lọc các nhóm có type khác "public"
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.post("/create-group/:id", async (req, res) => {
  try {
    const data = await Conversation.create({
      members: [req.params.id],
      type: req.body.type,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
const DB = process.env.DBURI.replace("<PASSWORD>", process.env.DBPASSWORD);
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
// const dotenv = require("dotenv");

// dotenv.config({ path: "./.env" });

// Cấu hình AWS
const s3 = new aws.S3({
<<<<<<< HEAD
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
=======
  accessKeyId: "AKIAU6GD3PPUNMDIKWOS",
  secretAccessKey: "hZ8ZXTaogJp6HzcqzSIN8i2Rgd",
  region: "ap-south-1",
>>>>>>> 65daf82 (finish)
});

// Cấu hình multer để tải file lên S3
const upload = multer({
  storage: multerS3({
    s3: s3,
<<<<<<< HEAD
    bucket: process.env.S3_BUCKET_NAME,
=======
    bucket: "chatwebcnm",
>>>>>>> 65daf82 (finish)
    acl: "public-read", // Đảm bảo rằng file có thể được đọc từ công khai
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()); // Khóa của file trên S3 (thay đổi tên file nếu cần)
<<<<<<< HEAD
    }
  })
});

// Áp dụng middleware upload vào các yêu cầu PATCH /user/update-me

=======
    },
  }),
});
app.post("/upload/image-s3", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json({ imageUrl: req.file.location });
});
// Áp dụng middleware upload vào các yêu cầu PATCH /user/update-me
>>>>>>> 65daf82 (finish)

mongoose
  .connect(DB)
  .then(() => {
    console.log("Kết nối DB thành công");
  })
  .catch((err) => {
    console.log(err);
  });
const port = process.env.PORT || 8000;

server.listen(port, () => {
  io.on("connect", () => console.log("connecting to io"));
  io.on("connection", (socket) => {
    console.log(" user connected");
    const userAgent = socket.handshake.headers["user-agent"];
    console.log("ip: " + socket.request.connection.remoteAddress);
    console.log("User Agent:", userAgent);
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
  console.log(`Web đang chạy trên cổng ${port}`);
});
// Import định tuyến cho tin nhắn
const messageRoute = require("./routes/message");
<<<<<<< HEAD
=======
const Message = require("./models/message");
>>>>>>> 65daf82 (finish)

// Middleware
// app.use(express.json());

// Sử dụng định tuyến cho tin nhắn
app.use("/message", messageRoute);

<<<<<<< HEAD

=======
>>>>>>> 65daf82 (finish)
io.on("connection", async (socket) => {
  console.log(`User connected ${socket.id}`);
  console.log(JSON.stringify(socket.handshake.query));
  const user_id = socket.handshake.query["user_id"];

  const title = socket.handshake.query["title"];
  console.log(`User connected ${socket.id}`);

  if (user_id != null && Boolean(user_id)) {
    try {
      await User.findByIdAndUpdate(user_id, {
        socket_id: socket.id,
        status: "Online",
      });
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  }
  socket.on("friend_request", async (data) => {
    console.log("Received friend request:", data);
    const to = await User.findById(data.to).select("socket_id");
    const from = await User.findById(data.from).select("socket_id");

    // create a friend request
    await FriendRequest.create({
      sender: data.from,
      recipient: data.to,
    });
    // emit event request received to recipient
    io.to(to?.socket_id).emit("new_friend_request", {
      message: "New friend request received",
    });
    io.to(from?.socket_id).emit("request_sent", {
      message: "Request Sent successfully!",
    });
  });
  socket.on("accept_request", async (data) => {
    // accept friend request => add ref of each other in friends array
    console.log(data);
    const request_doc = await FriendRequest.findById(data.request_id);

    console.log(request_doc);

    const sender = await User.findById(request_doc.sender);
    const receiver = await User.findById(request_doc.recipient);

    sender.friends.push(request_doc.recipient);
    receiver.friends.push(request_doc.sender);

    await receiver.save({ new: true, validateModifiedOnly: true });
    await sender.save({ new: true, validateModifiedOnly: true });

    await FriendRequest.findByIdAndDelete(data.request_id);

    // delete this request doc
    // emit event to both of them

    // emit event request accepted to both
    io.to(sender?.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
    io.to(receiver?.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
  });
  socket.on("end", async (data) => {
    if (data.user_id) {
      await User.findByIdAndUpdate(data.user_id, { status: "Offline" });
    }
    console.log("Closing connection");
    socket.disconnect(0);
  });
  socket.on("text_message", async (data) => {
    console.log("Received message:", data);

    // data: {to, from, text}

    const { message, conversation_id, from, to, type } = data;

    const to_user = await User.findById(to);
    const from_user = await User.findById(from);

    // message => {to, from, type, created_at, text, file}

    const new_message = {
      to: to,
      from: from,
      type: type,
      created_at: Date.now(),
      text: message,
    };

    // fetch OneToOneMessage Doc & push a new message to existing conversation
    const chat = await OneToOneMessage.findById(conversation_id);
    chat.messages.push(new_message);

    // save to db`
    await chat.save({ new: true, validateModifiedOnly: true });

    //gr
    // await grChat.save({new: true, validateModifiedOnly: true});
    // // emit incoming_message -> to user

    io.to(to_user?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });

    // emit outgoing_message -> from user
    io.to(from_user?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });
  });

  // //gr
  // socket.on("text_message_group", async (data) => {
  //   const { message, groupId, senderId } = data;

  //   try {
  //     // Tìm nhóm chat và kiểm tra xem người gửi có là thành viên của nhóm không
  //     const group = await GroupMessage.findById(groupId);
  //     if (!group || !group.members.includes(senderId)) {
  //       console.error("Sender is not a member of this group");
  //       return;
  //     }

  //     // Lưu tin nhắn vào nhóm chat
  //     group.messages.push({
  //       type: "Text",
  //       created_at: Date.now(),
  //       text: message,
  //       sender: senderId,
  //     });

  //     await group.save();

  //     // Gửi tin nhắn đến tất cả các thành viên trong nhóm
  //     group.members.forEach((memberId) => {
  //       io.to(memberId).emit("new_group_message", {
  //         groupId,
  //         message: {
  //           type: "Text",
  //           created_at: Date.now(),
  //           text: message,
  //           sender: senderId,
  //         },
  //       });
  //     });
  //   } catch (error) {
  //     console.error("Error sending group message:", error);
  //   }
  // });
  //

  socket.on("file_message", (data) => {
    console.log("Received message:", data);

    // data: {to, from, text, file}

    // Get the file extension
    const fileExtension = path.extname(data.file.name);

    // Generate a unique filename
    const filename = `${Date.now()}_${Math.floor(
      Math.random() * 10000
    )}${fileExtension}`;
  });

  socket.on("get_direct_conversations", async ({ user_id }, callback) => {
    const existing_conversations = await OneToOneMessage.find({
      participants: { $all: [user_id] },
    }).populate("participants", "firstName lastName avatar _id email status");

    // db.books.find({ authors: { $elemMatch: { name: "John Smith" } } })

    console.log(existing_conversations);

    callback(existing_conversations);
  });

<<<<<<< HEAD

  socket.on("DELETE_MSG", (msg) => {
    socket.to(msg.receiver.socketId).emit("DELETED_MSG", msg)
  })
=======
  socket.on("DELETE_MSG", (msg) => {
    socket.to(msg.receiver.socketId).emit("DELETED_MSG", msg);
  });
>>>>>>> 65daf82 (finish)
  socket.on("start_conversation", async (data) => {
    // data: {to: from:}

    const { to, from } = data;

    // check if there is any existing conversation

    const existing_conversations = await OneToOneMessage.find({
      participants: { $size: 2, $all: [to, from] },
    }).populate("participants", "firstName lastName _id email status");

    console.log(existing_conversations[0], "Existing Conversation");

    // if no => create a new OneToOneMessage doc & emit event "start_chat" & send conversation details as payload
    if (existing_conversations.length === 0) {
      let new_chat = await OneToOneMessage.create({
        participants: [to, from],
      });

      new_chat = await OneToOneMessage.findById(new_chat).populate(
        "participants",
        "firstName lastName _id email status"
      );

      console.log(new_chat);

      socket.emit("start_chat", new_chat);
    }
    // if yes => just emit event "start_chat" & send conversation details as payload
    else {
      socket.emit("start_chat", existing_conversations[0]);
    }
  });

  //gr
  // socket.on("start_conversation_group", async (data) => {
  //   // data: {to: from:}

  //   const { to, from } = data;

  //   // check if there is any existing conversation

  //   const existing_conversations = await GroupMessage.find({
  //     members: { $size: 2, $all: [to, from] },
  //   }).populate("members", "firstName lastName _id email status");

  //   console.log(existing_conversations[0], "Existing Conversation");

  //   // if no => create a new GroupMessage doc & emit event "start_chat" & send conversation details as payload
  //   if (existing_conversations.length === 0) {
  //     let new_chat = await GroupMessage.create({
  //       members: [to, from],
  //     });

  //     new_chat = await GroupMessage.findById(new_chat).populate(
  //       "members",
  //       "firstName lastName _id email status"
  //     );

  //     console.log(new_chat);

  //     socket.emit("start_chat_group", new_chat);
  //   }
  //   // if yes => just emit event "start_chat" & send conversation details as payload
  //   else {
  //     socket.emit("start_chat_group", existing_conversations[0]);
  //   }
  // });

  // socket.on("get_messages", async (data, callback) => {
  //   try {
  //     const { messages } = await OneToOneMessage.findById(
  //       data.conversation_id
  //     ).select("messages");
  //     callback(messages);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // //gr
  // socket.on("get_messages_group", async (data, callback) => {
  //   try {
  //     const { messages } = await GroupMessage.findById(data.groupId).select("messages");
  //     callback(messages);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  // Tạo nhóm chat mới
  socket.on("create_group", async (data) => {
    try {
      const { name, members } = data;
      const newGroup = await GroupMessage.create({
        name,
        members,
      });

      members.forEach((memberId) => {
        io.to(memberId).emit("group_created", newGroup);
      });
    } catch (error) {
      console.error("Error creating group:", error);
    }
  });
  // Tham gia vào nhóm chat đã tồn tại
  //   socket.on("join_group", async (data) => {
  //     try {
  //       const { groupId, userId } = data;
  //       const group = await GroupMessage.findById(groupId);

  //       if (group && !group.members.includes(userId)) {
  //         group.members.push(userId);
  //         await group.save();
  //         io.to(userId).emit("joined_group", group);
  //       }
  //     } catch (error) {
  //       console.error("Error joining group:", error);
  //     }
  //   });
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
