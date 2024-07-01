import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import { useForm } from "react-hook-form";
import RHFAutocomplete from "../../components/hook-form/RHFAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriendRequests,
  FetchFriends,
  FetchUsers,
  FetchAllUsers,
} from "../../redux/slices/app";
import { socket } from "../../socket";

const MEMBERS = ["Name 1", "Name 2", "Name 3"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({ handleClose }) => {
  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Tên nhóm"),
    // members: Yup.string(),
  });
  const defaultValues = {
    title: "",
    members: [],
  };
  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    setError,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessfull, isValid },
  } = methods;

  const { friends } = useSelector((state) => state.app);
  const members = watch("members");
  // console.log("friends", friends);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriends());

    socket.on("request_accepted", function () {
      setTimeout(() => {
        dispatch(FetchFriends());
      }, 500);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("DATA", data);
      // Gửi yêu cầu tạo nhóm chat đến server
      // socket.emit("start_conversation_group", data);
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="title" label="Tên nhóm" />
        {/* <RHFAutocomplete
          name="members"
          label="Members"
          multiple
          freeSolo
          getOptionLabel={(option) => {
            const { firstName, lastName } = option;
            const name = `${firstName} ${lastName}`;
            return name;
          }}
          // onChange={(e, value) => {

          //   setValue("members", value);
          // }}
          // value={members}
          options={friends}
          ChipProps={{ size: "medium", style: { backgroundColor: "#ffb4d8" } }}
        /> */}
        <Stack
          spacing={2}
          direction="row"
          alignItems={"center"}
          justifyContent="end"
        >
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "#ffb4d8", color: "#000" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#ffb4d8", color: "#000" }}
            disabled={isSubmitting}
          >
            {/* Create */}
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
      PaperProps={{
        style: {
          backgroundColor: "white",
        },
      }}
    >
      {/* title */}
      <DialogTitle sx={{ mb: 3 }}>Tạo nhóm</DialogTitle>
      {/* Content */}
      <DialogContent>
        {/* form */}
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};
export default CreateGroup;
