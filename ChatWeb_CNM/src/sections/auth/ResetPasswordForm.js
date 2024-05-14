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
import { CaretLeft, Eye, EyeClosed } from "phosphor-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ForgotPassword } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Yêu cầu nhập email")
      .test("Email", "Email không hợp lệ", (value) => {
        const emailRegex = /^[^\s@]+@gmail\.com$/; 
        return emailRegex.test(value);
      }),
  });

  const defaultValues = {
    phone: "",
  };
  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
    mode: "onChange",
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(ForgotPassword(data));
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", { ...error, message: error.message });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
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
          <Stack spacing={0.5} alignItems="center">
            <Typography variant="body1" fontFamily="Segoe UI" color="black">
              Nhập email của bạn
            </Typography>
          </Stack>
          <RHFTextField name="email" />
        </Stack>
        <Stack alignItems={"center"} sx={{ mt: 5 }}>
          <Button
            size="large"
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#FF51A8",
              color: "white",
              width: "90%",
            }}
            // component={RouterLink}
            // to="/auth/new-password"
          >
            Tiếp tục
          </Button>
        </Stack>

        <Stack
          sx={{
            my: 2,
            flexDirection: "row",
            justifyContent: "flex-start", 
          }}
        >
          <Link
            component={RouterLink}
            to="/auth/login"
            color={"inherit"}
            variant="subtitle2"
            sx={{
              mt: 3,
              mx: 0, // Đặt margin x thành 0 để giảm khoảng cách giữa nút và biểu tượng "Quay lại"
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <CaretLeft />
            Quay lại
          </Link>
        </Stack>
      </Stack>
    </FormProvider>
  );
};
export default ResetPasswordForm;
