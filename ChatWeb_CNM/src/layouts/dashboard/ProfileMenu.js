import { Box, Button, Stack, Menu, MenuItem, Avatar, Typography, Fade } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { SignOut } from "phosphor-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Profile_Menu, Nav_Buttons } from "../../data";
import { faker } from "@faker-js/faker";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../redux/slices/auth";
import {
  User,
  Gear,
} from "phosphor-react";
import ProfileMenu from "./ProfileMenu";
import useSettings from "../../hooks/useSettings";
import { socket } from "../../socket";
const SideBar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { onToggleMode } = useSettings();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openMenu = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const user_id = window.localStorage.getItem("user_id");
  const handleAvatarClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  return (
    <Box
      paddingTop={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100vh",
        width: "65px",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100%", width: "100%" }}
      >
       <Stack direction="column" alignItems="center" spacing={4}>
       <Avatar
            src={faker.image.avatar()}
            alt={"Avatar"}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            // defaultChecked={theme.palette.mode === "dark"}
            // onChange={onToggleMode}
          />
       <Menu
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        TransitionComponent={Fade}
        id="profile-positioned-menu"
        aria-labelledby="profile-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={1}>
        <Stack spacing={1} px={1}>
            {Profile_Menu.map((el, idx) => (
              <MenuItem onClick={handleClose}>
                <Stack
                  onClick={() => {
                    if(idx === 0) {
                      navigate("/profile");
                    }
                    else if(idx === 1) {
                      navigate("/settings");
                    }
                    else {
                      dispatch(LogoutUser());
                      socket.emit("end", {user_id});
                    }
                  }}
                  sx={{ width: 100 }}
                  direction="row"
                  alignItems={"center"}
                  justifyContent="space-between"
                >
                  <span>{el.title}</span>
                  {el.icon}
                </Stack>{" "}
              </MenuItem>
            ))}
          </Stack>
        </Box>
      </Menu>
        </Stack>
        {/* <Stack direction="column" alignItems="center" spacing={4}> */}
          {/* <Avatar
            src={faker.image.avatar()}
            alt={"Avatar"}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            // defaultChecked={theme.palette.mode === "dark"}
            // onChange={onToggleMode}
          /> */}
          {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              style: {
                backgroundColor: "white",
              },
            }}
           
          > */}
            {/* <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, idx) => (
                <MenuItem
                  key={idx}
                  onClick={() => {
                    handleClick();
                    dispatch(LogoutUser());
                    window.localStorage.clear();
                  }}
                >
                  <Stack
                    onClick={() => {
                      handleClick();
                      dispatch(LogoutUser());
                      window.localStorage.clear();
                    }}
                    component={RouterLink}
                    to="/auth/login"
                    sx={{ width: 100 }}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{el.title}</span>
                    {el.icon}
                  </Stack>{" "}
                </MenuItem> */}
              {/* ))} */}

            {/* </Stack> */}
            <Stack spacing={4}>
          {/* <AntSwitch
           
          /> */}
          {/* Profile Menu */}
          {/* <ProfileMenu /> */}
        {/* </Stack> */}
          {/* </Menu> */}
          
    <Stack spacing={0}>
            {Nav_Buttons.map((el) =>
              el.index === selected ? (
                <Box
                  key={el.index}
                  sx={{ backgroundColor: theme.palette.primary.main1 }}
                >
                  <Button
                    sx={{ width: 65, height: 65, color: "#fff" }}
                    key={el.index}
                  >
                    {el.icon}
                  </Button>
                </Box>
              ) : (
                <Button
                  key={el.index}
                  onClick={() => {
                    setSelected(el.index);
                  }}
                  sx={{ width: 65, height: 65, color: "#000" }}
                >
                  {el.icon}
                </Button>
              )
            )}
          </Stack>
        </Stack>
        <Box spacing={0}>
          {selected === 3 ? (
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main1,
                width: "100%",
              }}
            >
              <Button
                
                sx={{ width: 65, height: 65, color: "#fff" }}
              >
                <SignOut size={28} color="#ffffff" weight="bold" />
              </Button>
            </Box>
          ) : (
            <Button
              onClick={() => {
                setSelected(3);
                dispatch(LogoutUser()).then(() => {
                  window.localStorage.clear();
                  navigate("/auth/login"); // Redirect sau khi logout
                });
              }}
             
              sx={{ width: 65, height: 65, color: "#fff" }}
              component={RouterLink}
              to="/auth/login"
            >
              <SignOut size={28} color="#ffffff" weight="bold" />
            </Button>
          )}
        </Box> 
      </Stack>
    </Box>
  );
};

export default SideBar;