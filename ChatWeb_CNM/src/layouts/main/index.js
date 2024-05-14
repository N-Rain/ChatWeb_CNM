import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Stack, Snackbar } from "@mui/material";
import backgroundImage from "../../assets/Images/background.png";  // Đường dẫn đến hình nền
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);


  if (isLoggedIn) {
    // Nếu người dùng đã đăng nhập, chuyển hướng đến trang app và hiển thị thông báo
    return (
      <>
        <Navigate to="/app" />
        
      </>
    );
  }

  return (
    <>
      <Stack
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',  // Đảm bảo hình ảnh đủ lớn để che phủ toàn bộ background
          position: 'fixed',  // Giữ hình ảnh ở vị trí cố định khi cuộn
          top: 0,
          left: 0,
          zIndex: -1,  // Đặt z-index để đặt hình ảnh nền ở phía sau nội dung
        }}
      />
      <Outlet />
    </>
  );
};

export default MainLayout;
