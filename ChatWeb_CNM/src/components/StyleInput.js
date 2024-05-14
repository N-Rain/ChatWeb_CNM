import { styled, TextField } from "@mui/material";
const StyleInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "10px",
    
  }
}));
export default StyleInput;