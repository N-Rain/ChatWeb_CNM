import React from "react";
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Badge, Avatar, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../../redux/slices/app";
const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};
const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const GroupElement = ({ chat }) => {
  console.log(chat, "chay");
  const dispatch = useDispatch();
  const { room_id } = useSelector((state) => state.app);
  const selectedChatId = room_id?.toString();
  const online = true;
  let isSelected = +selectedChatId === chat._id;

  if (!selectedChatId) {
    isSelected = false;
  }

  const theme = useTheme();

  return (
    <StyledChatBox
      onClick={() => {
        console.log("Chat box clicked:", chat._id);
        dispatch(SelectConversation({ room_id: chat._id }));
      }}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: isSelected
          ? theme.palette.primary.pink // Change the background color to pink when isSelected is true
          : theme.palette.mode === "light"
          ? "#fff"
          : theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={""} src={"img"} />
            </StyledBadge>
          ) : (
            <Avatar alt={""} src={"img"} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{chat?.type}</Typography>
            <Typography variant="caption">
              {truncateText(chat?.type, 20)}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {"time"}
          </Typography>
          <Badge
            className="unread-count"
            color="primary"
            badgeContent={"unread"}
          />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};
export default GroupElement;
