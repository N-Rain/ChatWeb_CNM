<<<<<<< HEAD
import React, { useEffect, useRef, useState } from 'react';
import { Box, Stack, Typography, IconButton, Avatar, Button, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ToggleSidebar, UpdateSidebarType } from '../redux/slices/app';
import { X } from '@mui/icons-material';
import { faker } from '@faker-js/faker';
import { CaretRight, Prohibit, Trash } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../config';
import { io } from "socket.io-client";
=======
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ToggleSidebar, UpdateSidebarType } from "../redux/slices/app";
import { X } from "@mui/icons-material";
import { faker } from "@faker-js/faker";
import { CaretRight, Prohibit, Trash } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config";
import { io } from "socket.io-client";
import axios from "axios";
>>>>>>> 65daf82 (finish)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: {
          backgroundColor: "white",
        },
      }}
    >
      <DialogTitle>Báo xấu</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Bạn có muốn báo xấu tin nhắn này
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            backgroundColor: "#ffb4d8",
            "&:hover": {
              backgroundColor: "#ff69b4",
            },
          }}
          onClick={handleClose}
        >
          Hủy
        </Button>
        <Button
          sx={{
            backgroundColor: "#ffb4d8",
            "&:hover": {
              backgroundColor: "#ff69b4",
            },
          }}
          onClick={handleClose}
        >
          Báo xấu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialog = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: {
          backgroundColor: "white",
        },
      }}
    >
      <DialogTitle>Xóa</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Bạn có muốn xóa tin nhắn này
        </DialogContentText>
      </DialogContent>
      <DialogActions>
<<<<<<< HEAD
        <Button onClick={handleClose} sx={{
          backgroundColor: "#ffb4d8",
          '&:hover': {
            backgroundColor: '#ff69b4',
          }
        }}>Hủy</Button>
        <Button onClick={handleDelete} sx={{
          backgroundColor: "#ffb4d8",
          '&:hover': {
            backgroundColor: '#ff69b4',
          }
        }}>Đồng ý</Button>
=======
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "#ffb4d8",
            "&:hover": {
              backgroundColor: "#ff69b4",
            },
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleDelete}
          sx={{
            backgroundColor: "#ffb4d8",
            "&:hover": {
              backgroundColor: "#ff69b4",
            },
          }}
        >
          Đồng ý
        </Button>
>>>>>>> 65daf82 (finish)
      </DialogActions>
    </Dialog>
  );
};

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
<<<<<<< HEAD
  const [openBlock, setOpenBlock] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const { current_conversation } = useSelector((state) => state.conversation.direct_chat);
  const socketRef = useRef();

  useEffect(() => {
=======
  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const socketRef = useRef();
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    const idUser = localStorage.getItem("user_id-chat");
    const fetchUser = async () => {
      const { data } = await axios.get(
        "http://localhost:3001/get-id-user/" + idUser
      );
      setDataUser(data);
      console.log(data);
    };
    fetchUser();
  }, []);
  useEffect(() => {
>>>>>>> 65daf82 (finish)
    // Kết nối với socket server
    socketRef.current = io(BASE_URL);
    return () => {
      // Đóng kết nối socket khi component unmount
      socketRef.current.disconnect();
    };
  }, []);

  const handleCloseBlock = () => {
    setOpenBlock(false);
<<<<<<< HEAD
  }

  const handleCloseDelete = () => {
    setOpenDelete(false);
  }

  const handleDelete = () => {
    // Gửi yêu cầu xóa tin nhắn thông qua socket
    socketRef.current.emit("DELETE_MSG", { messageId: current_conversation._id });
    // Đóng dialog xác nhận xóa tin nhắn
    setOpenDelete(false);
  }
=======
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    // Gửi yêu cầu xóa tin nhắn thông qua socket
    socketRef.current.emit("DELETE_MSG", {
      messageId: current_conversation._id,
    });
    // Đóng dialog xác nhận xóa tin nhắn
    setOpenDelete(false);
  };
>>>>>>> 65daf82 (finish)

  return (
    <Box sx={{ width: 300, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgbe(0,0,0,0.25)",
            width: "100%",
            backgroundColor: "#fff",
          }}
        >
          <Stack
            sx={{
              height: "100%",
              p: 2,
            }}
            direction="row"
            alighItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
          >
            <Typography variant="subtitle2" fontWeight={700} p={2}>
              Thông tin cá nhân
            </Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar());
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            backgroundColor: "#fff",
          }}
          spacing={3}
          p={3}
        >
          <Stack sx={{ direction: "column", alignItems: "center" }} spacing={2}>
            <Avatar
              src={dataUser?.avatar}
              alt={current_conversation?.name}
              sx={{ height: 70, width: 70 }}
            />
            <Typography variant="article" fontWeight={600}>
              {" "}
              {current_conversation?.name}
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {"+84 23456789"}
            </Typography>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            alighItems={"center"}
            justifyContent="space-between"
          >
            <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
              Ảnh, Links, File
            </Typography>
            <Button
              onClick={() => {
                dispatch(UpdateSidebarType("SHARED"));
              }}
              endIcon={<CaretRight />}
              sx={{
                color: "#000",
              }}
            >
              401
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} alighItems="center">
            {[1, 2, 3].map((el) => (
              <Box>
                <img src={faker.image.food()} alt={faker.name.fullName()} />
              </Box>
            ))}
          </Stack>
          <Divider />
          <Stack direction="column" spacing={2}>
            <Button
              onClick={() => {
                setOpenBlock(true);
              }}
              startIcon={<Prohibit />}
              fullWidth
              sx={{ color: "red" }}
            >
              Báo xấu{" "}
            </Button>
            <Button
              onClick={() => {
                const idConve = localStorage.getItem("conversation_id");
                // setOpenDelete(true)
                if (window.confirm("delete conversation")) {
                  axios
                    .get("http://localhost:3001/message/clearAll/" + idConve)
                    .then((response) => {
                      console.log("ok");
                    });
                }
              }}
              startIcon={<Trash />}
              fullWidth
              sx={{ color: "#000" }}
            >
              Xóa lịch sử trò chuyện{" "}
            </Button>
          </Stack>
        </Stack>
<<<<<<< HEAD
      </Stack >
      {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock} />}
      {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />}
    </Box >
  )
}
=======
      </Stack>
      {openBlock && (
        <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
      )}
      {openDelete && (
        <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />
      )}
    </Box>
  );
};
>>>>>>> 65daf82 (finish)

export default Contact;
