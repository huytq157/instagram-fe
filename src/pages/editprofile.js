import React, { useContext, useEffect, useState } from "react";

import {
  Avatar,
  Tabs,
  Tab,
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  InputLabel,
  TextareaAutosize,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editProfile } from "../services/users";
import uploadFile from "../utils/upload";
import checkFile from "../utils/checkFile";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}



export default function EditProfile() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { user, setUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [previewFile, setPreviewFile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      previewFile && URL.revokeObjectURL(previewFile);
    };
  }, [previewFile]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      username: user?.username,
      fullname: user?.fullname,
      bio: user?.bio,
      website: user?.website,
      phone: user?.phone,
    },
  });

  const { mutateAsync } = useMutation(editProfile);

  const submitForm = async (values) => {
    if (!user) return;
    let toastId = toast.loading("Loading....");
    setLoading(true);

    try {
      let newAvatarUrl = "";

      if (file) {
        newAvatarUrl = await uploadFile(file);
      }

      await mutateAsync({ ...values, avatar: newAvatarUrl || user.avatar });

      setUser((prev) => ({
        ...prev,
        ...values,
        avatar: newAvatarUrl || user.avatar,
      }));

      navigate(`/profile/${user._id}`);

      toast.success("Edit profile success", { id: toastId });
    } catch (error) {
      toast.error("Edit profile failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!checkFile("image", 5, file)) {
      return toast.error("Only accepts image file and file cannot exceed 5MB");
    }

    const previewFile = URL.createObjectURL(file);
    setPreviewFile(previewFile);
    setFile(file);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: "35%" }}
      >
        <Tab
          label="Chỉnh sửa trang cá nhân"
          {...a11yProps(0)}
          sx={{ alignItems: "start", fontWeight: "400" }}
        />
        <Tab
          label="Tùy chọn ngôn ngữ"
          {...a11yProps(1)}
          sx={{ alignItems: "start", fontWeight: "400" }}
        />
        <Tab
          label="Ứng dụng và trang web"
          {...a11yProps(2)}
          sx={{ alignItems: "start", fontWeight: "400" }}
        />
        <Tab
          label="Ai có thể xem nội dung của bạn "
          {...a11yProps(3)}
          sx={{ alignItems: "start", fontWeight: "400" }}
        />
        <Tab
          label="Nội dung bạn nhìn thấy"
          {...a11yProps(4)}
          sx={{ alignItems: "start", fontWeight: "400" }}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Box sx={{ mx: 10 }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Avatar
                sx={{ width: "100px", height: "100px" }}
                src={previewFile || user?.avatar}
              />

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Trần Quang Huy
                </Typography>

                <Box>
                  <TextField type="file" onChange={handleFileChange} />
                </Box>
              </Box>
            </Stack>

            <Stack spacing={1} sx={{ mb: 2 }}>
              <InputLabel htmlFor="email-login" sx={{ fontSize: "13px" }}>
                UserName
              </InputLabel>
              <Box>
                <TextField
                  {...register("username", {
                    required: { value: true, message: "Username is required!" },
                  })}
                  id="standard-multiline-flexible"
                  multiline
                  fullWidth
                  size="small"
                  maxRows={4}
                  sx={{ mb: 1 }}
                  type="text"
                />
                {errors?.username?.message && (
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    color="error"
                  >
                    {errors?.username?.message}
                  </Typography>
                )}
              </Box>
            </Stack>

            <Stack spacing={1} sx={{ mb: 2 }}>
              <InputLabel htmlFor="email-login" sx={{ fontSize: "13px" }}>
                FullName
              </InputLabel>
              <Box>
                <TextField
                  {...register("fullname", {
                    required: { value: true, message: "FullName is required!" },
                  })}
                  id="standard-multiline-flexible"
                  multiline
                  fullWidth
                  size="small"
                  maxRows={4}
                  sx={{ mb: 1 }}
                  type="text"
                />
                {errors?.fullname?.message && (
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    color="error"
                  >
                    {errors?.fullname?.message}
                  </Typography>
                )}
              </Box>
            </Stack>

            <Stack spacing={1} sx={{ mb: 2 }}>
              <InputLabel htmlFor="email-login" sx={{ fontSize: "13px" }}>
                Website
              </InputLabel>
              <Box>
                <TextField
                  {...register("website", {
                    required: { value: true, message: "Website is required!" },
                  })}
                  id="standard-multiline-flexible"
                  multiline
                  fullWidth
                  size="small"
                  maxRows={4}
                  sx={{ mb: 1 }}
                  type="text"
                />
                {errors?.website?.message && (
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    color="error"
                  >
                    {errors?.website?.message}
                  </Typography>
                )}
              </Box>
            </Stack>

            <Stack spacing={1} sx={{ mb: 2 }}>
              <InputLabel htmlFor="email-login" sx={{ fontSize: "13px" }}>
                Phone
              </InputLabel>
              <Box>
                <TextField
                  {...register("phone", {
                    required: { value: true, message: "Phone is required!" },
                  })}
                  id="standard-multiline-flexible"
                  multiline
                  fullWidth
                  size="small"
                  maxRows={4}
                  type="text"
                />
                {errors?.phone?.message && (
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    color="error"
                  >
                    {errors?.phone?.message}
                  </Typography>
                )}
              </Box>
            </Stack>

            <Stack spacing={1}>
              <InputLabel htmlFor="email-login" sx={{ fontSize: "13px" }}>
                Bio
              </InputLabel>
              <Box>
                <TextareaAutosize
                  {...register("bio", {
                    required: { value: true, message: "Bio is required!" },
                    maxLength: {
                      value: 100,
                      message: "Bio should not exceed 100 characters",
                    },
                  })}
                  placeholder="Bio"
                  style={{
                    resize: "none",
                    padding: "5px",
                    width: "100%",
                    outline: "none",
                    borderRadius: "5px",
                  }}
                  minRows={5}
                  maxRows={6}
                />

                {errors?.bio?.message && (
                  <Typography variant="caption" display="block" gutterBottom>
                    {errors?.bio?.message}
                  </Typography>
                )}
              </Box>
            </Stack>
            <Button variant="contained" type="submit"  disabled={loading}>Lưu</Button>
            
          </Box>
        </form>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Đang cập nhật ...
      </TabPanel>
      <TabPanel value={value} index={2}>
        Đang cập nhật ...
      </TabPanel>
      <TabPanel value={value} index={3}>
        Đang cập nhật ...
      </TabPanel>
      <TabPanel value={value} index={4}>
        Đang cập nhật ...
      </TabPanel>
    </Box>
  );
}
