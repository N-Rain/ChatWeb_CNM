import { Stack, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../../sections/auth/LoginForm";

const Login = () => {
  return (
    <>
      <Stack overflow={"hidden"}>
        <Stack
          spacing={1}
          sx={{
            mb: 5,
            mt: 1,
            position: "relative",
          }}
        >
          <Stack spacing={0.5} alignItems="center">
            <Typography variant="h1" fontFamily="Segoe UI" color="#FF0080">
              ThinLine  
            </Typography>
          </Stack>
          <Stack direction="column" alignItems="center" sx={{paddingBottom:'5%'}}>
            <Typography
              variant="body1"
              fontFamily="Segoe UI"
              color="#000000"
              fontSize={21}
            >
              Đăng nhập tài khoản ThinLine
            </Typography>
            <Typography
              variant="body1"
              fontFamily="Segoe UI"
              color="#000000"
              fontSize={21}
            >
              để kết nối với ứng dụng ThinLine Web
            </Typography>
          </Stack>

          {/* Login form */}
          {/* <Stack spacing={3}> */}
            <LoginForm />
          {/* </Stack> */}
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
