import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";

import {
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
  InputLabel,
  Stack,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import useSignIn from "../../hook/useSignIn";
import useSignInSocial from "../../hook/useSignInSocial";
import { socialLogin } from "../../services/auth";
import { googleProvider, facebookProvider, githubProvider } from "../../config/firebase";
import AuthWrapper from "./AuthWrapper";
import {useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";


const schema = yup.object().shape({
  email: yup
    .string()
    .email("Địa chỉ email không hợp lệ")
    .required("Email là bắt buộc"),
  password: yup.string().required("Mật khẩu là bắt buộc"),
});

export default function SignInForm() {
 
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { errorMessage, isLoading, handleSignIn } = useSignIn();

  const {
    handleSignIn: signInSocial,
    signInSocialErrorMess,
    signInSocialLoading,
  } = useSignInSocial(socialLogin);

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
            <Typography variant="h3">Login</Typography>
            <Typography
              component={Link}
              to="/signup"
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
            <Typography sx={{ color: "red", textAlign: "center", pb: 1 }}>
              {errorMessage}
            </Typography>
          )}

          {signInSocialErrorMess && (
            <Typography sx={{ color: "red" }}>
              {signInSocialErrorMess}
            </Typography>
          )}
          <form onSubmit={handleSubmit(handleSignIn)}>
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

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Link variant="h6" component={Link} to="/forgot-password" color="text.primary">
                    Forgot Password?
                  </Link>
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
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  spacing={matchDownSM ? 1 : 2}
                  justifyContent={
                    matchDownSM ? "space-around" : "space-between"
                  }
                  sx={{
                    "& .MuiButton-startIcon": {
                      mr: matchDownSM ? 0 : 1,
                      ml: matchDownSM ? 0 : -0.5,
                    },
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{ color: "#808080" }}
                    fullWidth={!matchDownSM}
                    startIcon={<GoogleIcon sx={{ color: "red" }} />}
                    disabled={isLoading || signInSocialLoading}
                    onClick={() => signInSocial(googleProvider)}
                  >
                    {!matchDownSM && "Google"}
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "#808080" }}
                    fullWidth={!matchDownSM}
                    startIcon={<FacebookIcon color="primary" />}
                    onClick={() => signInSocial(facebookProvider)}
                  >
                    {!matchDownSM && "Facebook"}
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "#808080" }}
                    fullWidth={!matchDownSM}
                    startIcon={<GitHubIcon sx={{ color: "#333" }} />}
                    
                    onClick={() => signInSocial(githubProvider)}
                  >
                    {!matchDownSM && "GitHub"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
