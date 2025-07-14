import { Grid, Box } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostExplore from "./PostExplore";
import { InView } from "react-intersection-observer";
import { CircularProgress } from "react-cssfx-loading";
import NoPost from "./NoPost";
import { getSavePost } from "../../services/posts";
import Fail from "../Sleketon/Fail";
import ListMyPostSkeleton from "../Sleketon/ListMyPostSkeleton";

const SaveListPost = ({ _id }) => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["savePosts", _id], (page) => getSavePost(_id, page), {
    getNextPageParam: (lastPage) => lastPage?.nextSkip,
  });

  if (isError) {
    return <Fail/>;
  }

  if (isLoading || !data) {
    return (
      <ListMyPostSkeleton/>
    );
  }

  if (data?.pages?.length === 0 || data?.pages[0]?.posts?.length === 0) {
    return <NoPost />;
  }

  return (
    <>
      <Grid container spacing={2}>
        {data?.pages
          ?.reduce((curr, page) => {
            curr.push(...page.posts);
            return curr;
          }, [])
          ?.map((post) => (
            <PostExplore key={post._id} post={post} />
          ))}
      </Grid>

      <InView
        fallbackInView
        onChange={(InVidew) => {
          if (InVidew && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      >
        {({ ref }) => (
          <Box ref={ref}>
            {isFetchingNextPage && (
              <Box>
                <CircularProgress color="#fff" />
              </Box>
            )}
          </Box>
        )}
      </InView>
    </>
  );
};

export default SaveListPost;
