import { Box, Avatar, Stack, Typography } from "@mui/material";

const AccountItemSkeleton = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ my: 2 }}>
      <Avatar alt="Skeleton" sx={{ width: 40, height: 40 }} />
      <Box sx={{ flex: 1, ml: 2 }}>
        <Typography variant="button" gutterBottom>
          {/* Skeleton text for username */}
          <div style={{ backgroundColor: "#e0e0e0", width: "100%", height: 15 }} />
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {/* Skeleton text for fullname */}
          <div style={{ backgroundColor: "#e0e0e0", width: "70%", height: 12 }} />
        </Typography>
      </Box>
      <Typography variant="button" gutterBottom sx={{ cursor: "pointer", fontSize: "14px" }}>
        {/* Skeleton text for follow button */}
        <div style={{ backgroundColor: "#e0e0e0", width: 80, height: 20 }} />
      </Typography>
    </Stack>
  );
};

export default AccountItemSkeleton;
