import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFTextField } from "../../components/hook-form";
import * as Yup from "yup";
import axios from "axios";
import phone from "yup-phone";
import { useDispatch } from "react-redux";
import { Eye, EyeClosed, EyeSlash } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import { LoginUser } from "../../redux/slices/auth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Yêu cầu nhập email")
      .test("Email", "Email không hợp lệ", (value) => {
        const emailRegex = /^[^\s@]+@gmail\.com$/;
        return emailRegex.test(value);
      }),
    password: Yup.string()
      .required("Yêu cầu nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  });

  const defaultValues = {
    email: "ngocnhuhoang2002@gmail.com",
    password: "1112222",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(LoginUser(data));
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", { message: error.message });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        sx={{
          border: "1px solid #E1E1E1",
          borderRadius: 1,
          padding: "20px",
          width: "30%",
          backgroundColor: "white",
          margin: "auto",
        }}
      >
        <Stack spacing={3} alignItems={"center"} justifyContent={"center"}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <Stack spacing={3}>
            {!!errors.afterSubmit && (
              <Alert severity="error">{errors.afterSubmit.message}</Alert>
            )}
            <RHFTextField name="email" label="Email address" />
            <RHFTextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <Eye /> : <EyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>
        <Stack alignItems={"center"} sx={{ mt: 5 }}>
          <Button
            onClick={onSubmit}
            size="large"
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#FF51A8",
              color: "white",
              width: "90%",
            }}

          >
            Đăng nhập
          </Button>
        </Stack>

        <Stack alignItems={"center"} sx={{ my: 2 }}>
          <Link
            component={RouterLink}
            to="/auth/reset-password"
            variant="body2"
            color="black"
            underline="none"
          >
            Quên mật khẩu ?
          </Link>
        </Stack>
      </Stack>
      <Stack
        alignItems={"center"}
        flexDirection={"row"}
        justifyContent={"space-around"}
        sx={{ my: 5, mx: "38%" }}
      >
        <Typography variant="body2" fontFamily="Segoe UI" color="#000000">
          Bạn chưa có tài khoản ThinLine?
        </Typography>
        <Link
          component={RouterLink}
          to="/auth/register"
          variant="body2"
          color="blue"
          underline="none"
        >
          Đăng ký
        </Link>
      </Stack>
    </FormProvider>
  );
};
export default LoginForm;
