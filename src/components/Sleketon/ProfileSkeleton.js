import { Skeleton } from "@mui/material";

const ProfileSkeleton = () => {
  return (
    <>
      <Skeleton variant="circular" width={150} height={150} sx={{ margin: "0 auto" }} />

      <Skeleton variant="text" width={200} height={40} sx={{ margin: "20px auto", borderRadius: "8px" }} />

      <Skeleton variant="text" width={100} height={20} sx={{ margin: "10px 0" }} />

      <Skeleton variant="text" width={150} height={20} sx={{ margin: "10px 0" }} />

      <Skeleton variant="text" width={150} height={20} sx={{ margin: "10px 0" }} />

      <Skeleton variant="rectangular" width="100%" height={1} sx={{ margin: "20px 0" }} />

      <Skeleton variant="rectangular" width="100%" height={200} sx={{ margin: "20px 0" }} />

      <Skeleton variant="rectangular" width="100%" height={200} sx={{ margin: "20px 0" }} />
    </>
  );
};

export default ProfileSkeleton;
