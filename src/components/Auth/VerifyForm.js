import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Verify } from "../../services/auth";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Địa chỉ email không hợp lệ")
    .required("Email là bắt buộc"),
  otp: yup.string().required("Otp là bắt buộc"),
});

export default function VerifyForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerify = async (data) => {
    try {
      setIsLoading(true);
      const response = await Verify(data);
      const token = response.data.token;
      navigate(`/reset/${token}`, { replace: true });
      toast.success("Xác nhận thành công");
    } catch (error) {
      toast.error("Xác nhận thất bại");
    } finally {
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
          onSubmit={handleSubmit(handleVerify)}
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
          <Controller
            name="otp"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="standard-multiline-flexible"
                label="OTP"
                multiline
                fullWidth
                maxRows={4}
                variant="outlined"
                sx={{ mb: 2 }}
                type="text"
                error={!!errors.otp}
                helperText={errors.otp?.message}
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
              "Xác thực"
            )}
          </Button>

          <Grid container>
            <Grid item>
              <Link
                to="/forgot-password"
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
