import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../services/posts";
import { postKey } from "../utils/react-query-key";
import { CircularProgress } from "react-cssfx-loading";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import PostExplore from "../components/Post/PostExplore";
import { InView } from "react-intersection-observer";
import NoPost from "../components/Post/NoPost";

const Explore = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [postKey.GET_EXPLORE],
    (page) => getPosts(6, page, "explore"),
    {
      getNextPageParam: (lastPage) => lastPage?.nextSkip,
    }
  );

  if (isError) {
    return (
      <Typography variant="body2" gutterBottom>
        Failed to load data...
      </Typography>
    );
  }

  if (data?.pages?.length === 0 || data?.pages[0]?.posts?.length === 0) {
    return <NoPost />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      {isLoading && <Box>Loading....</Box>}
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
    </Box>
  );
};

export default Explore;
