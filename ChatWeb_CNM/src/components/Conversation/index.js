import React from "react";
import { Stack, Box, } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
const Conversation = () => {
  return (
    <Stack height={"100%"} width={"auto"} maxHeight={"100vh"} overflow={"hidden"}>
      {/* Chat Header */}
      <Header />
      {/* Msg */}
      < Box width={"100%"} sx={{
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
        <Message />
      </ Box>
      {/* Chat Footer */}
      <Footer />
    </Stack >
  );
};

export default Conversation;
export {default as ChatHeader} from "./Header";
export {default as ChatFooter} from "./Footer";