import React from "react";
import { Box, Stack, Typography, IconButton, Tabs, Tab, Grid } from "@mui/material";
import { UpdateSidebarType } from '../redux/slices/app';
import { useTheme } from "@mui/material/styles";
import { X } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { faker } from "@faker-js/faker";
import { SHARED_FILES, SHARED_LINKS } from "../data";
import { DocMsg, LinkMsg } from "./Conversation/MsgTypes";
const SharedMessage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: 300, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box sx={{
          boxShadow: "0px 0px 2px rgbe(0,0,0,0.25)",
          width: "100%",
          backgroundColor: "#fff",
        }}>
          <Stack sx={{
            height: "100%", p: 2
          }}
            direction="row"
            alighItems={"center"}
            spacing={3}>

            <IconButton onClick={() => {
              dispatch(UpdateSidebarType("CONTACT"));
            }}>
              <X />
            </IconButton>
            <Typography variant="subtitle2" fontWeight={700} p={2}>Ảnh, Links</Typography>
          </Stack>
        </Box>
        <Tabs sx={{ px: 1, pt: 1 }} value={value} onChange={handleChange} centered>
          <Tab label="Ảnh" />
          <Tab label="Links" />
          <Tab label="File" />
        </Tabs>
        {/* Body */}
        <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, backgroundColor: "#fff", overflowY: "scroll", overflowX: "hidden" }}
          p={3}
          spacing={value === 1 ? 1 : 3} >
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {
                      [0, 1, 2, 3, 4, 5, 6].map((el) => {
                        return <Grid item xs={4}>
                          <img
                            src={faker.image.avatar()}
                            alt={faker.name.fullName()}
                          />
                        </Grid>
                      })
                    }
                  </Grid>
                );
              case 1:
                return SHARED_LINKS.map((el) => <LinkMsg el={el} />)
              case 2:
                return SHARED_FILES.map((el) => <DocMsg el={el} />)
              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  )
}
export default SharedMessage