import { Skeleton } from "@mui/material";

const PostItemSkeleton = () => {
  return (
    <>
      <Skeleton variant="rectangular" width="80%" height={56} />

      <Skeleton variant="rectangular" width="100%" height={300} />

      <Skeleton variant="text" width="60%" />

      <Skeleton variant="text" width="40%" />

      <Skeleton variant="text" width="80%" />

      <Skeleton variant="text" width="60%" />

      <Skeleton variant="text" width="80%" />

      <Skeleton variant="text" width="50%" />

      <Skeleton variant="rectangular" width="100%" height={20} />

      <Skeleton variant="rectangular" width="100%" height={20} />

      <Skeleton variant="rectangular" width="100%" height={20} />
    </>
  );
};

export default PostItemSkeleton;
