import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  CssBaseline,
  CircularProgress
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { sentOtp } from "../../services/auth";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Địa chỉ email không hợp lệ")
    .required("Email là bắt buộc"),
});

export default function ForgotPassWordForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const mutation = useMutation(sentOtp);

  const handleResetPassword = async (data) => {
    try {
      setIsLoading(true);
      await mutation.mutateAsync(data);
      toast.success("Gửi yêu cầu đặt lại mật khẩu thành công");
      navigate("/verify", { replace: true });
    } catch (err) {
      toast.error("Gửi yêu cầu đặt lại mật khẩu thất bại");
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Quên mật khẩu
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="standard-multiline-flexible"
                label="Email"
                multiline
                fullWidth
                maxRows={4}
                variant="outlined"
                sx={{ mb: 2 }}
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sent OTP"
            )}
          </Button>

          <Grid container>
            <Grid item>
              <Link
                to="/signin"
                variant="body2"
                style={{ textDecoration: "none", color: "#1765dd" }}
              >
                {"Quay lại"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
