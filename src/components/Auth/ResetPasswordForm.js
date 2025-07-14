// react
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// @mui
import {
  TextField,
  Typography,
  Container,
  CssBaseline,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPassword } from "../../services/auth";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const resetPasswordMutation = useMutation(
    () => ResetPassword(token, password, confirmPassword),
    {
      onSuccess: () => {
        toast.success("Cập nhật mật khẩu thành công");
        navigate(`/signin`, { replace: true });
      },
      onError: (error) => {
        toast.error("Cập nhật mật khẩu thất bại");
      },
    }
  );

  const handleSubmits = (e) => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp");
      setIsLoading(false);
      return;
    }
    resetPasswordMutation.mutate();
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Mật khẩu là bắt buộc"),
    confirmPassword: Yup.string().required("Mật khẩu là bắt buộc"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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
          Đặt lại mật khẩu
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(handleSubmits)}
        >
          <TextField
            margin="normal"
            required
            name="password"
            fullWidth
            label="Mật khẩu"
            value={password}
            {...register("password")}
            helperText={errors.password?.message}
            error={errors.password ? true : false}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />

          <TextField
            margin="normal"
            required
            name="confirmPassword"
            fullWidth
            label="Nhập lại mật khẩu"
            value={confirmPassword}
            {...register("confirmPassword")}
            helperText={errors.confirmPassword?.message}
            error={errors.confirmPassword ? true : false}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="off"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Tiếp tục"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPasswordForm;
