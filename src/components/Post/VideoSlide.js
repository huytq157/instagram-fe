import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Avatar from "@mui/material/Avatar";

const VideoSlide = ({ media }) => {
    return (
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {media?.map((item) => (
          <SwiperSlide key={item}>
            {item && item.startsWith("video/") ? (
              <video
                width="100%"
                height="100%"
                controls
                src={item}
                style={{
                  borderRadius: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <Avatar
                alt="Remy Sharp"
                src={item}
                sx={{
                  borderRadius: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };
  
  export default VideoSlide;
  
