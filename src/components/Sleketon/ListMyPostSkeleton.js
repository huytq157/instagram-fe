import { Skeleton } from "@mui/material";

const ListMyPostSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((index) => (
        <Skeleton key={index} variant="rectangular" width="100%" height={200} sx={{ margin: "20px 0" }} />
      ))}

      <Skeleton variant="rectangular" width="100%" height={1} sx={{ margin: "20px 0" }} />

      <Skeleton variant="rectangular" width="100%" height={40} sx={{ margin: "20px 0" }} />
    </>
  );
};

export default ListMyPostSkeleton;
