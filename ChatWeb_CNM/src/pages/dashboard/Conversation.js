import { Stack, Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
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

const Conversation = ({ isMobile, menu }) => {
  const dispatch = useDispatch();

  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id } = useSelector((state) => state.app);

  useEffect(() => {
    const current = conversations.find((el) => el?.id === room_id);

    socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
      // data => list of messages
      console.log(data, "List of messages");
      dispatch(FetchCurrentMessages({ messages: data }));
    });

    dispatch(SetCurrentConversation(current));
  }, []);
  return (
    <Box p={3}>
      <Stack spacing={3} >
        {current_messages.map((el, idx) => {
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
        })}
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
      
       < Box width={"100%"}  ref={messageListRef}
        sx={{
        flexGrow: 1, backgroundColor: "#F4E6ED", height: "100%", overflowY: "scroll",
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
        }
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