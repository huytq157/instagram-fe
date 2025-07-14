import { Box, Grid } from "@mui/material";

import SuggestAccount from "../components/Account/SuggestAccount";
import PostItem from "../components/Post/PostItem";
import { getPosts } from "../services/posts";
import { postKey } from "../utils/react-query-key";
import { useInfiniteQuery } from "@tanstack/react-query";
import NoPost from "../components/Post/NoPost";
import { InView } from "react-intersection-observer";
import PostItemSkeleton from "../components/Sleketon/PostItemSkeleton ";
import Fail from "../components/Sleketon/Fail";

const Home = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    [postKey.GET_HOME_FEED],
    (page) => getPosts(5, page, "feed"),
    {
      getNextPageParam: (lastPage) => lastPage?.nextSkip,
    }
  );

  if (isError) {
    return <Fail/>;
  }

  return (
    <>
      <Grid container spacing={8} sx={{ px: 5, pt: 3 }}>
        <Grid item xs={8}>
          <Box>
            {isLoading && <PostItemSkeleton/>}

            {data?.pages?.length === 0 ||
              (data?.pages[0]?.posts?.length === 0 && <NoPost />)}

            {data?.pages
              ?.reduce((curr, page) => {
                // @ts-ignore
                curr.push(...page.posts);
                return curr;
              }, [])
              .map((post, index) => (
                <PostItem
                  limit={5}
                  index={index}
                  key={post._id}
                  post={post}
                  isFetching={isFetching}
                />
              ))}

            <InView
              fallbackInView
              onChange={(InVidew) => {
                if (InVidew && hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
            >
              {({ ref }) => (
                <Box ref={ref}>{isFetchingNextPage && <>Loading...</>}</Box>
              )}
            </InView>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <SuggestAccount />
        </Grid>
      </Grid>

    
    </>
  );
};

export default Home;
