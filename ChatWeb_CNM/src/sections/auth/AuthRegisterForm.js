import {
  Alert,
  Button,
  IconButton,
  Input,
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
import { Link as RouterLink } from "react-router-dom";
import { VerifyEmail } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import RHFCodes from "../../components/hook-form/RHFCodes";

const AuthRegisterForm = () => {
  // const [showPassword, setShowPassword] = useState(false);
  // const AuthRegisterSchema = Yup.object().shape({
  //   //   newPassword: Yup.string()
  //   //     .min(6, "Mật khẩu ít nhất là 6 ký tự")
  //   //     .required("Yêu cầu nhập mật khẩu"),
  //   //   confirmPassword: Yup.string()
  //   //     .required("Yêu cầu nhập mật khẩu")
  //   //     .oneOf(
  //   //       [Yup.ref("newPassword"), null],
  //   //       "Mật khẩu phải trùng với mật khẩu vừa nhập"
  //   //     ),
  //   otp: Yup.string()
  //     .required("Yêu cầu nhập mã xác thực")
  //     .test("mã xác thực", "Mã xác thực không hợp lệ", (value) => {
  //       const otpRegex = /^[0-9]{6}$/;
  //       return otpRegex.test(value);
  //     }),
  // });

  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required("Code is required"),
    code2: Yup.string().required("Code is required"),
    code3: Yup.string().required("Code is required"),
    code4: Yup.string().required("Code is required"),
    code5: Yup.string().required("Code is required"),
    code6: Yup.string().required("Code is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data) => {
    try {

      console.log("sdfdssdfsdffsđsfdfs");
      dispatch(
        VerifyEmail({
          email,
          otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        sx={{
          border: "1px solid #E1E1E1",
          borderRadius: 1,
          padding: "20px",
          width: "60%",
          backgroundColor: "white",
          margin: "auto",
        }}
      >
        <Typography
          variant="body1"
          fontFamily="Segoe UI"
          color="text.secondary"
          textAlign={"center"}
        >
          {"Bạn sẽ nhận được mã kích hoạt thông qua email của bạn "}
        </Typography>
        <Stack
          sx={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: 1,
            padding: "20px",
            width: "90%",
            backgroundColor: "#FFF7FB",
            margin: "auto",
            my: 4,
            mt: 1,
          }}
        >
          <Stack spacing={0.5} alignItems="center" justifyItems={"center"}>
            <Typography
              variant="body1"
              fontFamily="Segoe UI"
              color="black"
              textAlign={"center"}
            >
              Nhập mã xác thực
            </Typography>

            <RHFCodes
              keyName="code"
              inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
            />
          </Stack>
        </Stack>

        <Stack alignItems={"center"} sx={{ mt: 3 }}>
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
            // to="/auth/login"
          >
            Xác nhận
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
            to="/auth/register"
            color={"inherit"}
            variant="subtitle2"
            sx={{
              mt: 2,
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
export default AuthRegisterForm;
