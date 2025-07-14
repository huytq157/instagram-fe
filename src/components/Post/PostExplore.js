

// import React from "react";
// import { Grid, Box, Avatar, Stack } from "@mui/material";
// import Notification from "../../icons/Notification";
// import Comment from "../../icons/Comment";
// import { Link } from "react-router-dom";

// const PostExplore = ({ post }) => {

//   console.log("post:", post);
//   return (
//     <Grid item xs={4}>
//       <Link to={`/post/${post._id}`}>
//         <Box
//           sx={{
//             position: "relative",
//             cursor: "pointer",
//             "&:hover .overlay": {
//               opacity: 1,
//             },
//             background:"#ccc",
//             height:"100%"
//           }}
//         >
//           <Avatar
//             alt="Remy Sharp"
//             src={post.media[0]}
//             sx={{
//               borderRadius: "0",
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//           />
//           <Box
//             className="overlay" 
//             sx={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               opacity: 0, 
//               transition: "opacity 0.3s",
//               background: "rgba(0, 0, 0, 0.7)", 
//               borderRadius: "8px", 
//               padding: "8px", 
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#fff",
//             }}
//           >
//             <Stack direction="row" spacing={3}>
//               <Notification color="#fff" /> {post?.like_count}
//               <Comment color="#fff" /> {post?.comment_count}
//             </Stack>
//           </Box>
//         </Box>
//       </Link>
//     </Grid>
//   );
// };

// export default PostExplore;


import React from "react";
import { Grid, Box, Avatar, Stack } from "@mui/material";
import Notification from "../../icons/Notification";
import Comment from "../../icons/Comment";
import { Link } from "react-router-dom";

const PostExplore = ({ post }) => {
  const isVideo = post.media[0].startsWith("http") && post.media[0].endsWith(".mp4");

  return (
    <Grid item xs={4}>
      <Link to={`/post/${post._id}`}>
        <Box
          sx={{
            position: "relative",
            cursor: "pointer",
            "&:hover .overlay": {
              opacity: 1,
            },
            background: "#ccc",
            height: "100%"
          }}
        >
          {isVideo ? (
          
              <video
                src={post.media[0]}
                alt="Video"
                sx={{
                  borderRadius: "0",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                controls={false}  
              />
          
          ) : (
            <Avatar
              alt="Remy Sharp"
              src={post.media[0]}
              sx={{
                borderRadius: "0",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              transition: "opacity 0.3s",
              background: "rgba(0, 0, 0, 0.7)",
              borderRadius: "8px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <Stack direction="row" spacing={3}>
              <Notification color="#fff" /> {post?.like_count}
              <Comment color="#fff" /> {post?.comment_count}
            </Stack>
          </Box>
        </Box>
      </Link>
    </Grid>
  );
};

export default PostExplore;
