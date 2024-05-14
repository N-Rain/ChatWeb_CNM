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
// import phone from "yup-phone";
import { Eye, EyeClosed } from "phosphor-react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { dispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { NewPassword } from "../../redux/slices/auth";
import { useSearchParams } from "react-router-dom";
const NewPasswordForm = () => {
  const queryParameters=useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    state: locationState
  } = location || {};
  const {
    phone
  } = locationState || {};

  const [showPassword, setShowPassword] = useState(false);
  const NewPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, "Mật khẩu ít nhất là 6 ký tự")
      .required("Yêu cầu nhập mật khẩu"),
    confirmPassword: Yup.string()
      .required("Yêu cầu nhập mật khẩu")
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Mật khẩu phải trùng với mật khẩu vừa nhập"
      ),
    otp: Yup.string()
      .required("Yêu cầu nhập mã xác thực")
      .test("mã xác thực", "Mã xác thực không hợp lệ", (value) => {
        const otpRegex = /^[0-9]{6}$/;
        return otpRegex.test(value);
      }),
  });

  const defaultValues = {
    newPassword: "",
    confirmPassword: "",
  };
  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
    mode: "onChange",
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSucessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
    //   Send API Request
    dispatch(NewPassword({...data, token: queryParameters.get('token')}));
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
          width: "30%",
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
          Bạn sẽ nhận được tin nhắn có chứa mã kích hoạt{" "}
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
            <Typography variant="body1" fontFamily="Segoe UI" color="black">
              Nhập mã xác thực
            </Typography>
            <Typography
              variant="body2"
              fontFamily="Segoe UI"
              color="#FF0D86"
              fontSize={18}
            >{phone}</Typography>
            <RHFTextField
              name="otp" // Liên kết với tên của trường trong schema
              render={({ field }) => (
                <Input
                  {...field} // Chuyển tất cả các thuộc tính từ field vào Input
                />
              )}
            />
          </Stack>
        </Stack>
        <Stack spacing={3} alignItems={"center"} justifyContent={"center"}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <RHFTextField
            name="newPassword"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment>
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
          <RHFTextField
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment>
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
            variant="contained"
            style={{
              backgroundColor: "#FF51A8",
              color: "white",
              width: "90%",
            }}
            component={RouterLink}
            to="/auth/login"
          >
            Xác nhận
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};
export default NewPasswordForm;
