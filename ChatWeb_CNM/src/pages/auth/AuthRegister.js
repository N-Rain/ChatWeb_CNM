import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import {Link as RouterLink} from 'react-router-dom';
import AuthRegisterForm from "../../sections/auth/AuthRegisterForm";

const AuthRegister = () => {
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
            Khôi phục mật khẩu ThinLine
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

       <AuthRegisterForm/>

      </Stack>
    </Stack>
  </>
  );
};

export default AuthRegister;
