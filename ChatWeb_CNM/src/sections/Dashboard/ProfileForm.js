import React, { useCallback, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField, RHFUploadAvatar } from "../../components/hook-form";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserProfile } from "../../redux/slices/app";
import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../config";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user } = useSelector((state) => state.app);
<<<<<<< HEAD

=======
  console.log(user, "ok user");
  const [avatar, setAvatar] = useState();
>>>>>>> 65daf82 (finish)
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatar: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = {
    firstName: user?.firstName,
    about: user?.about,
    avatar: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      //   Send API request
      console.log("DATA", data);
      dispatch(
        UpdateUserProfile({
          firstName: data?.firstName,
          about: data?.about,
<<<<<<< HEAD
          avatar: file,
=======
          avatar: avatar,
>>>>>>> 65daf82 (finish)
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

<<<<<<< HEAD
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      setFile(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
=======
  const handleDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);

    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    if (file) {
      const formData = new FormData();
      formData.append("img", file);
      try {
        const response = await fetch("http://localhost:4000/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAvatar(data.location);
        console.log("Image uploaded successfully:", data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  }, []);
>>>>>>> 65daf82 (finish)

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
<<<<<<< HEAD
=======
        <img src={user.avatar} className="!w-[100px] !rounded-[100%]" />
>>>>>>> 65daf82 (finish)
        <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} />

        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="firstName"
          label="First Name"
        />
        <RHFTextField multiline rows={4} name="about" label="About" />

        <Stack direction={"row"} justifyContent="end">
          <LoadingButton
<<<<<<< HEAD
            sx={{ backgroundColor: '#000000', color: 'pink' }}
=======
            sx={{ backgroundColor: "#000000", color: "pink" }}
>>>>>>> 65daf82 (finish)
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitSuccessful || isSubmitting}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

<<<<<<< HEAD
export default ProfileForm;
=======
export default ProfileForm;
>>>>>>> 65daf82 (finish)
