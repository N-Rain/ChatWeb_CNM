import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Stack,
  InputBase,
  Button,
  Typography,
  Badge,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { UserPlus, Users } from "phosphor-react";
import { styled, alpha } from "@mui/material/styles";
import { MagnifyingGlass } from "phosphor-react";
// import { ChatList } from "../../data";
import CreateGroup from "../../sections/Dashboard/CreateGroup";
import Friends from "../../sections/Dashboard/Friends";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../../redux/slices/app";
import { socket } from "../../socket";
import { FetchDirectConversations, FetchGroupConversations } from "../../redux/slices/conversation";
import GroupElement from "./GroupElement";

const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 5,
  backgroundColor: alpha(theme.palette.background.paperLight, 1),
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: 208,
  height: 32,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 1),
  height: 32,
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#7F90A7",
  fontSize: 14,
  fontFamily: "Segoe UI",
  "& .MuiInputBase-input": {
    height: 32,
    padding: theme.spacing(0, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));
const Add = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 5,
  backgroundColor: alpha(theme.palette.background.paperLight, 1),
  marginRight: theme.spacing(1),
  width: 32,
  height: 32,
}));
const AddIconWrapper = styled("div")(({ theme }) => ({
  paddingRight: theme.spacing(4),
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
const ChatElement = ({ img, name, msg, time, unread, online, id }) => {
  const dispatch = useDispatch();
  const { room_id } = useSelector((state) => state.app);
  const selectedChatId = room_id?.toString();

  let isSelected = +selectedChatId === id;

  if (!selectedChatId) {
    isSelected = false;
  }

  const theme = useTheme();

  return (
    <StyledChatBox
      onClick={() => {
        console.log("Chat box clicked:", id);
        dispatch(SelectConversation({ room_id: id }));
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
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{truncateText(msg, 20)}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {time}
          </Typography>
          <Badge
            className="unread-count"
            color="primary"
            badgeContent={unread}
          />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};
const user_id = window.localStorage.getItem("user_id");
const Chats = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { conversationsGroup } = useSelector(
    (state) => state.conversation.group_chat
  );

  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      console.log(data); // this data is the list of conversations
      // dispatch action

      dispatch(FetchDirectConversations({ conversations: data }));
    });
    socket.emit("get_direct_conversations_group", { user_id }, (data) => {
      console.log(data); // this data is the list of conversations
      // dispatch action

      dispatch(FetchGroupConversations({ conversationsGroup: data }));
    });
    // 
  }, []);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const handleCloseCreateGroup = () => {
    setOpenCreateGroup(false);
  };

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  //grmsg
  const [groupChats, setGroupChats] = useState([]);
  // Xử lý sự kiện nhận danh sách cuộc trò chuyện nhóm từ server
  useEffect(() => {
    socket.on("text_message_group", (data) => {
      setGroupChats(data);
    });

    return () => {
      socket.off("text_message_group");
    };
  }, []);
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "312px",
          height: "100vh",
          backgroundColor: "#fffff",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack paddingTop={3} sx={{ height: "100vh" }}>
          {/* header */}
          <Stack
            direction="row"
            alightItem={"center"}
            justifyContent="space-evenly"
          >
            {/* search */}
            <Stack direction="row" alightItem={"center"} spacing={1}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass size={24} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>
            <Add>
              <Button
                onClick={() => {
                  handleOpenDialog();
                }}
              >
                {/* Kết bạn  */}
                <AddIconWrapper>
                  <UserPlus size={20} color="#000" />
                </AddIconWrapper>
              </Button>
            </Add>
            <Add>
              {/* Tạo nhóm  */}
              <Button
                onClick={() => {
                  setOpenCreateGroup(true);
                }}
              >
                <AddIconWrapper>
                  <Users size={20} color="#000" />
                </AddIconWrapper>
              </Button>
            </Add>
          </Stack>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              value="one"
              label={
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: 14,
                    fontWeight: 700,
                    color:
                      value === "one" ? theme.palette.primary.pink : "#000",
                  }}
                >
                  Bạn bè
                </Typography>
              }
            />
            <Tab
              value="two"
              label={
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: 14,
                    fontWeight: 700,
                    color:
                      value === "two" ? theme.palette.primary.pink : "#000",
                  }}
                >
                  Chưa đọc
                </Typography>
              }
            />
            <Tab
              value="three"
              label={
                <Typography
                  sx={{
                    fontFamily: "Manrope",
                    fontSize: 14,
                    fontWeight: 700,
                    color:
                      value === "three" ? theme.palette.primary.pink : "#000",
                  }}
                >
                  Nhóm
                </Typography>
              }
            />
          </Tabs>

          <Stack
            direction="column"
            sx={{
              flexGrow: 1,
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "6px",
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
            spacing={3}
          >
            {" "}
            {/* Sử dụng khoảng cách mặc định 3 */}
            {(() => {
              switch (value) {
                case "one":
                  return (
                    <Stack spacing={2.4} sx={{ height: "100%" }}>
                      {conversations.map((el) => {
                        return <ChatElement {...el} />;
                      })}
                    </Stack>
                  );
                case "two":
                  return (
                    <Stack spacing={2.4} sx={{ height: "100%" }}>
                      {conversations
                        .filter((el) => el.unread !== 0)
                        .map((el) => {
                          return <ChatElement {...el} />;
                        })}
                    </Stack>
                  );
                case "three":
                  //grchat
                  return (
                    <Stack spacing={2.4} sx={{ height: "100%" }}>
                      {conversationsGroup.map((chat) => (
                        <GroupElement
                        />
                      ))}
                    </Stack>
                  );

                  break;
                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
        {openCreateGroup && (
          <CreateGroup
            open={openCreateGroup}
            handleClose={handleCloseCreateGroup}
          />
        )}

        {openDialog && (
          <Friends open={openDialog} handleClose={handleCloseDialog} />
        )}
      </Box>
    </>
  );
};
export default Chats;
