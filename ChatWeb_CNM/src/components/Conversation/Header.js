import React , { useState } from "react";
import { Stack, Box, Avatar, Typography, IconButton, useTheme } from "@mui/material";
import { ChatList } from "../../data";
import { MagnifyingGlass, SidebarSimple } from "phosphor-react";
import StyledBadge from "../StyledBadge";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSidebar } from "../../redux/slices/app";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const {current_conversation} = useSelector((state) => state.conversation.direct_chat);

  const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
    React.useState(null);
  const openConversationMenu = Boolean(conversationMenuAnchorEl);
  const handleClickConversationMenu = (event) => {
    setConversationMenuAnchorEl(event.currentTarget);
  };
  const handleCloseConversationMenu = () => {
    setConversationMenuAnchorEl(null);
  };const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
  };
  return (
    <Box
      p={2}
      sx={{ height: 100, backgroundColor: "#fff", borderBottom: "1px solid #ccc" }}>
      <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} sx={{ width: "100%", height: "100%" }}>
        <Stack direction={"row"} spacing={2} alignItems="center">
          <Box>
            <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar
                  alt={current_conversation?.name}
                  src={current_conversation?.img}
                />
            </StyledBadge>
          </Box>
          <Stack spacing={0.2}>
            <Typography variant="subtitle2">  {current_conversation?.name}</Typography>
            <Typography variant="caption">Online</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems={"center"} spacing={3}>
          <IconButton
            onClick={() => handleButtonClick("search")}
            sx={{
              backgroundColor: "#FFF1F8",
              "&:active": {
                backgroundColor: 'pink',
              }
            }}
          >
            <MagnifyingGlass color="#000" />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(ToggleSidebar());
            }}
            sx={{
              backgroundColor: "#FFF1F8",
              "&:active": {
                backgroundColor: 'pink',
              }
            }}
          >
            <SidebarSimple color="#000" />
          </IconButton>
        </Stack>
      </Stack>
    </Box >
  )
};
export default Header;