import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputLabel,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import useSignUp from "../../hook/useSignUp";
import AuthWrapper from "./AuthWrapper";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Địa chỉ email không hợp lệ")
    .required("Email là bắt buộc"),
  password: yup.string().required("Mật khẩu là bắt buộc"),
  username: yup.string().required("usename là bắt buộc"),
  fullname: yup.string().required("fullname là bắt buộc"),
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { errorMessage, handleSignUp, isLoading, successMessage } = useSignUp();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">SignUp</Typography>
            <Typography
              component={Link}
              to="/signin"
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {errorMessage && (
            <Typography sx={{ color: "red", textAlign: "center", pb: 2 }}>
              {errorMessage}
            </Typography>
          )}

          {successMessage && (
            <Typography sx={{ color: "green" , textAlign:"center", pb: 2}}>{successMessage}</Typography>
          )}
          <form onSubmit={handleSubmit(handleSignUp)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="standard-multiline-flexible"
                        multiline
                        fullWidth
                        maxRows={4}
                        sx={{ mb: 3 }}
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1} direction="row" sx={{ width: "100%" }}>
                  <Box sx={{ width: "100%" }}>
                    <InputLabel htmlFor="email-login">UserName</InputLabel>
                    <Controller
                      name="username"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="standard-multiline-flexible"
                          multiline
                          fullWidth
                          maxRows={4}
                          type="text"
                          error={!!errors.username}
                          helperText={errors.username?.message}
                        />
                      )}
                    />
                  </Box>

                  <Box sx={{ width: "100%" }}>
                    <InputLabel htmlFor="email-login">FullName</InputLabel>
                    <Controller
                      name="fullname"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="standard-multiline-flexible"
                          multiline
                          fullWidth
                          maxRows={4}
                        
                          type="text"
                          error={!!errors.fullname}
                          helperText={errors.fullname?.message}
                        />
                      )}
                    />
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>

                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        margin="normal"
                        name="password"
                        fullWidth
                        {...register("password")}
                        helperText={errors.password?.message}
                        error={errors.password ? true : false}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  SignUp
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

