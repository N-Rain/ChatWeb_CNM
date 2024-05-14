import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import {
  Box,
  Stack,
  InputBase,
  Button,
  Typography,
  Badge,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  User,
  UsersThree,
  UserCirclePlus,
  Users,
  UserPlus,
  WarningCircle,
} from "phosphor-react";
import { styled, alpha } from "@mui/material/styles";
import { MagnifyingGlass } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import DeleteIcon from "@mui/icons-material/Delete";

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
// danh sách bạn bè
const ContactElement = ({ id, name, img }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        backgroundColor: "white",
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            // variant="dot"
          >
            <Avatar src={faker.image.avatar()} sx={{ width: 45, height: 45 }} />
          </StyledBadge>
          <Stack>
            <Typography variant="subtitle2" fontSize={18}>
              {name}
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon sx={{ color: "#FF0D86" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

const Contact = () => {
  const theme = useTheme();

  const UsersList = () => {
    return <>{}</>;
  };

  const tabs = [
    {
      key: 0,
      icon: <User size={24} />,
      title: "Danh sách bạn bè",
      onclick: () => handleListItemClick(0),
    },
    {
      key: 1,
      icon: <UsersThree size={24} />,
      title: "Danh sách nhóm",
      onclick: () => handleListItemClick(1),
    },
    {
      key: 2,
      icon: <UserCirclePlus size={24} />,
      title: "Lời mời kết bạn",
      onclick: () => handleListItemClick(2),
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#FFFFFF"
                : theme.palette.background,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack paddingTop={3} sx={{ height: "100vh" }}>
            {/* header */}
            <Stack
              direction="row"
              alightItem={"center"}
              justifyContent="space-evenly"
              borderBottom={1}
              borderColor={"#DCDCDC"}
              paddingBottom={2}
            >
              {/* search */}
              <Stack
                direction="row"
                alightItem={"center"}
                spacing={1}
                paddingRight={1}
              >
                <Search>
                  <SearchIconWrapper>
                    <MagnifyingGlass size={24} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                {/* AddFriend */}
                <Add>
                  <Button>
                    <AddIconWrapper>
                      <UserPlus size={20} color="#000" />
                    </AddIconWrapper>
                  </Button>
                </Add>
                <Add>
                  <Button>
                    <AddIconWrapper>
                      <Users size={20} color="#000" />
                    </AddIconWrapper>
                  </Button>
                </Add>
              </Stack>
            </Stack>
            {/* menu */}
            <Stack>
              {tabs.map(({ key, icon, title, onclick }, index) => (
                <Stack
                  key={key}
                  spacing={2}
                  width="100%"
                  height="65px"
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedIndex === index ? "#FFDCED" : "light",
                    fontWeight: selectedIndex === index ? 700 : "normal",
                  }}
                  // alignItems={'center'}
                  justifyContent={"center"}
                  onClick={onclick}
                >
                  <Stack
                    direction={"row"}
                    paddingLeft={2}
                    spacing={2}
                    alignItems={"center"}
                  >
                    {icon}
                    <Typography
                      variant=""
                      sx={{ fontSize: 18, fontFamily: "Segoe UI" }}
                    >
                      {title}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
        {/* right */}
        <Box
          sx={{
            height: "100vh",
            backgroundColor: "#FFF5FA",
            width: "100%",
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* header */}
          <Box
            sx={{
              // height: '80px',
              backgroundColor: "white",
              width: "100%",
              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Stack
              alignItems={"center"}
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ width: "100%", height: "70px" }}
            >
              <Stack
                direction={"row"}
                paddingLeft={2}
                spacing={2}
                alignItems={"center"}
              >
                {/* {icon} */}
                <User size={24} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: 18, fontFamily: "Segoe UI" }}
                >
                  Danh sách bạn bè
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Stack direction={"row"} my={1.5} mx={2} spacing={1}>
            <Typography
              variant="body2"
              sx={{ fontSize: 18, fontFamily: "Segoe UI" }}
            >
              Bạn bè
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: 18, fontFamily: "Segoe UI" }}
            >
              (8)
            </Typography>
          </Stack>
          {/* content */}
          <Box
            sx={{
              height: "100%",
              backgroundColor: "white",
              // width: "auto",
              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
              overflow: "auto",
              maxHeight: "calc(100vh - 72px)",
              mx: 2,
            }}
          >
            {/* list friends */}
            {selectedIndex === 0 && (
              <>
                {ChatList.map((el, index) => (
                  <Stack
                    key={index}
                    sx={{
                      paddingBottom: 2,
                      borderBottom: 1,
                      borderColor: "#D4D4D4",
                      mx: 2,
                    }}
                  >
                    <ContactElement {...el} />
                  </Stack>
                ))}
              </>
            )}
            {/* list groups */}
            {selectedIndex === 1 && (
              <>
                {ChatList.map((el, index) => (
                  <Stack
                    key={index}
                    sx={{
                      paddingBottom: 2,
                      borderBottom: 1,
                      borderColor: "#D4D4D4",
                      mx: 2,
                    }}
                  >
                    <ContactElement {...el} />
                  </Stack>
                ))}
              </>
            )}
            {/* list friend requests */}
            {selectedIndex === 2 && (
              <>
                {ChatList.map((el, index) => (
                  <Stack
                    key={index}
                    sx={{
                      paddingBottom: 2,
                      borderBottom: 1,
                      borderColor: "#D4D4D4",
                      mx: 2,
                    }}
                  >
                    <ContactElement {...el} />
                  </Stack>
                ))}
              </>
            )}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Contact;
