import { Stack, Box, TextField, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";

import { ChatHeader, ChatFooter } from "../../components/Conversation/index";
import useResponsive from "../../hooks/useResponsive";
// import { Chat_History } from "../../data";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "../../sections/Dashboard/Conversation";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "../../redux/slices/conversation";
import { socket } from "../../socket";
import io from "socket.io-client";

import axios from "axios";
import { dispatchFetchMessageFalse } from "../../redux/slices/app";

const Conversation = ({ isMobile, menu }) => {
  const dispatch = useDispatch();
  const [dataChat, setDataChat] = useState([]);

  const socket = io("http://localhost:3001", {
    transports: ["websocket", "pulling", "flashsocket"],
  });
  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id } = useSelector((state) => state.app);
  const { user_id } = useSelector((state) => state.auth);
  const { isCheckFetch } = useSelector((state) => state.app);
  const { chatMessage } = useSelector((state) => state.app);

  console.log(chatMessage, "chatMessage");
  const [searchTerm, setSearchTerm] = useState("");
  const messageRefs = useRef([]);
  useEffect(() => {
    const current = conversations.find((el) => el?.id === room_id);

    socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
      // data => list of messages
      console.log(data, "List of messages");
      dispatch(FetchCurrentMessages({ messages: data }));
    });

    dispatch(SetCurrentConversation(current));
  }, []);

  const userChat = localStorage.getItem("user_id-chat");
  const handelGetMessageUser = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    const { data } = await axios.get(
      "http://localhost:3001/message/get-user-chat-message?senderId=" +
        user_id +
        "&receiverId=" +
        userChat,
      config
    );
    localStorage.setItem("conversation_id", data._id);
    console.log(data, "data");
    if (data.message == "no message") {
    } else {
      const resultGet = await axios.get(
        "http://localhost:3001/message/conversations-details/" + data._id
      );
      console.log(resultGet.data, "resultGet");
      setDataChat(resultGet.data);
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchMessage = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const foundIndex = dataChat.findIndex((message) =>
      message.content.toLowerCase().includes(searchTermLower)
    );

    if (foundIndex !== -1) {
      messageRefs.current[foundIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setTimeout(() => {
        setSearchTerm("");
      }, 400);
    } else {
      alert("Không tìm thấy tin nhắn nào!");
    }
  };
  useEffect(() => {
    if (userChat) {
      handelGetMessageUser();
    }
  }, [userChat, user_id]);
  console.log(isCheckFetch == true, "isCheckFetch2");
  useEffect(() => {
    if (isCheckFetch == true) {
      handelGetMessageUser();
      dispatch(dispatchFetchMessageFalse());
    }
  }, [isCheckFetch]);
  useEffect(() => {
    socket.connect();
    socket.on("messageSend", (data) => {
      handelGetMessageUser();
    });
    return () => {
      socket.off("messageSend");
      socket.disconnect();
    };
  }, []);
  return (
    <Box p={3}>
      <Stack spacing={3}>
        <form
          className="mb-5 mt-1 flex gap-3 absolute top-5 right-52"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField
            fullWidth
            label="Nhập nội dung tìm kiếm!"
            id="searchField"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button
            className="!bg-green-500 !text-white !min-w-[100px]"
            onClick={handleSearchMessage}
          >
            Tìm kiếm
          </Button>
        </form>
        {dataChat?.map((message, index) => {
          return (
            <div
              key={index}
              ref={(el) => (messageRefs.current[index] = el)}
              className={`py-2 flex flex-row w-full ${
                message.senderId._id == user_id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`${
                  message.senderId._id == user_id ? "order-2" : "order-1"
                }`}
              >
                {/* avata */}
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                  {message.senderId._id == user_id ? <></> : <></>}
                  {/* {message.receiverId._id == dataUserChat._id && (
                  <>
                    <img
                      src={dataUserChat.avatar}
                      className="w-12 object-cover h-12 text-gray-400"
                      alt="bot"
                    />
                  </>
                )} */}
                </div>
              </div>
              <div
                className={`px-2 w-fit py-3 flex flex-col bg-[#D3B673] items-start rounded-lg text-white ${
                  message.senderId._id == user_id
                    ? "order-1 mr-2"
                    : "order-2 ml-2"
                }`}
              >
                <span className="text-xs text-gray-200">
                  {new Date(message.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="text-md">{message.content}</span>
                <div>
                  {message.image && (
                    <img
                      className="!w-[100px] !h-[100px]"
                      src={message.image}
                      alt=""
                    />
                  )}
                </div>
                <div>{message.file ? message.file : ""}</div>
              </div>
            </div>
          );
        })}
        {/* {current_messages.map((el, idx) => {
          switch (el.type) {
            case "divider":
              return (
                // Timeline
                <Timeline el={el} />
              );
            case "msg":
              switch (el.subtype) {
                case "img":
                  return (
                    // Media Message
                    <MediaMsg el={el} menu={menu} />
                  );
                case "doc":
                  return (
                    // Doc Message
                    <DocMsg el={el} menu={menu} />
                  );
                case "Link":
                  return (
                    //  Link Message
                    <LinkMsg el={el} menu={menu} />
                  );
                case "reply":
                  return (
                    //  ReplyMessage
                    <ReplyMsg el={el} menu={menu} />
                  );

                default:
                  return (
                    // Text Message
                    <TextMsg el={el} menu={menu} />
                  );
              }

            default:
              return <></>;
          }
        })} */}
      </Stack>
    </Box>
  );
};

const ChatComponent = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();

  const messageListRef = useRef(null);

  const { current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [current_messages]);

  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      width={isMobile ? "100vw" : "auto"}
    >
      {/*  */}
      <ChatHeader />

      <Box
        width={"100%"}
        ref={messageListRef}
        sx={{
          flexGrow: 1,
          backgroundColor: "#F4E6ED",
          height: "100%",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "3px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "15px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Conversation menu={true} isMobile={isMobile} />
      </Box>

      {/*  */}
      <ChatFooter />
    </Stack>
  );
};

export default ChatComponent;

export { Conversation };
