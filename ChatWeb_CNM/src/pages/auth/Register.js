import { Stack, Typography } from "@mui/material";
import React from "react";
import RegisterForm from "../../sections/auth/RegisterForm";

const Register = () => {
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
          <Stack
            direction="column"
            alignItems="center"
            sx={{ paddingBottom: "5%" }}
          >
            <Typography
              variant="body1"
              fontFamily="Segoe UI"
              color="#000000"
              fontSize={21}
            >
            Đăng ký tài khoản ThinLine
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
          <RegisterForm />
        </Stack>
      </Stack>
    </>
  );
};

export default Register;
