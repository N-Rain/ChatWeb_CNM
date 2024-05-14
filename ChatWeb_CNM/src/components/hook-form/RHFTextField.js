import { PropTypes } from "prop-types";
import { useFormContext, Controller } from "react-hook-form";

import { Stack,InputAdornment,  Input, TextField } from "@mui/material";
// import { Eye, EyeClosed, Phone,  Lock } from "phosphor-react"; // Assuming Phone and Block are your icons
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/PhoneIphone';
import AlternateEmail from "@mui/icons-material/AlternateEmail";

RHFTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFTextField({
  name,
  helperText,
  isPassword,
  ...other
}) {
  const { control } = useFormContext();

  const getPlaceholder = (name) => {
    if (name === "email") {
      return "Nhập email";
    } else if (name === "password" || name === "newPassword") {
      return "Nhập mật khẩu";
    } else if (name === "confirmPassword") {
      return "Nhập lại mật khẩu";
    } else if (name === "otp") {
      return "Nhập mã kích hoạt";
    } else if (name === "firstName") {
      return "Nhập Họ";
    } else if (name === "lastName") {
      return "Nhập Tên";
    } else if (name === "title") {
      return "Nhập Tên Nhóm";
    } 

    return "";
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isBlurred } }) => (
        <Stack
          direction="row"
          alignItems="flex-start"
          // borderBottom="1px solid #ccc"
          width="90%"
        >
          {name === "password" ||
          name === "newPassword" ||
          name === "confirmPassword" ? (
            <InputAdornment position="start" sx={{ pr: "10px", pt:2.2 }}>
              <LockIcon sx={{ color: "black" }} />
            </InputAdornment>
          ) : name === "email" ? (
            <InputAdornment position="start" sx={{ pr: "10px", pt:2.2 }}>
              <AlternateEmail sx={{ color: "black" }} />
            </InputAdornment>
          ) : (
            <InputAdornment position="start" sx={{ visibility: "hidden", pr:'15px'}}>
              {/* <PhoneIcon sx={{ color: "black" }} /> */}
            </InputAdornment>
          )}
          <TextField
            {...field}
            // {...other}
            placeholder={getPlaceholder(name)}
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            error={!!error}
            helperText={error ? error.message : helperText}
            variant="standard"
            sx={{ width: "90%"}}
          />
        </Stack>
      )}
    />
  );
}
