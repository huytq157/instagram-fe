import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import AuthBackground from "./AuthBackground";

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: "100vh" }}>
    <AuthBackground />
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: { xs: "calc(100vh - 134px)", md: "calc(100vh - 112px)" },
          }}
        >
          <Grid item>
            <Box
              sx={{
                boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                maxWidth: { xs: 450, lg: 475 },
                margin: { xs: 2.5, md: 3 },
                padding: "20px",
                "& > *": {
                  flexGrow: 1,
                  flexBasis: "50%",
                },
              }}
            >
              {children}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthWrapper;
