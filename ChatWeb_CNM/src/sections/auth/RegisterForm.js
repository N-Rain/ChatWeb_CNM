import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFTextField } from "../../components/hook-form";
import * as Yup from "yup";

import phone from "yup-phone";
import { Eye, EyeClosed } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import { RegisterUser } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";
const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("Yêu cầu nhập Họ"),
    lastName: Yup.string().required("Yêu cầu nhập Tên"),
    
    email: Yup.string()
      .required("Yêu cầu nhập email")
      .test("Email", "Email không hợp lệ", (value) => {
        const emailRegex = /^[^\s@]+@gmail\.com$/; // Regex cho địa chỉ email kết thúc bằng @gmail.com
        return emailRegex.test(value);
      }),
    password: Yup.string()
      .required("Yêu cầu nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
    mode: "onChange",
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  console.log(errors);
  
  const onSubmit = async (data) => {
    try {
      dispatch(RegisterUser(data))
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", { ...error, message: error.message });
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
        
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ width: "90%" }}
            spacing={2}
          >
            <RHFTextField name="firstName" />
            <RHFTextField name="lastName" />
          </Stack>
          <RHFTextField name="email" />
          <RHFTextField
            name="password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <Eye color="black" />
                    ) : (
                      <Eye color="black" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack alignItems={"center"} sx={{ mt: 5 }}>
          <Button
            size="large"
            type="submit"
            onClick={onSubmit}
            variant="contained"
            style={{
              backgroundColor: "#FF51A8",
              color: "white",
              width: "90%",
            }}
           
            
          >
            Đăng ký
          </Button>
        </Stack>
        <Typography
          component={"div"}
          sx={{
            color: "text.secondary",
            typography: "caption",
            textAlign: "center",
            mt: 3,
            fontSize: 14,
          }}
        >
          {"Đăng ký bằng cách, tôi đồng ý với "}
          <Link
            // component={RouterLink}
            // to="/auth/login"
            fontFamily="Segoe UI"
            color="text.primary"
            underline="always"
          >
            các điều khoản sử dụng
          </Link>
        </Typography>
      </Stack>
      <Stack
        alignItems={"center"}
        flexDirection={"row"}
        justifyContent={"space-around"}
        sx={{ my: 5, mx: "38%" }}
      >
        <Typography variant="body2" fontFamily="Segoe UI" color="#000000">
          Bạn đã có tài khoản ThinLine?
        </Typography>
        <Link
          component={RouterLink}
          to="/auth/login"
          variant="body2"
          color="blue"
          underline="none"
        >
          Đăng nhập
        </Link>
      </Stack>
    </FormProvider>
  );
};

export default RegisterForm;
