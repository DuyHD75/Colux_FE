import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import textConfigs from "../../config/text.config";
import backgroundConfigs from "../../config/background.config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useTranslation } from "react-i18next";


const ProjectConstructed = () => {
  const { t } = useTranslation();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

  const { constructed } = useSelector((state) => state.constructed);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box
      sx={{
        ...backgroundConfigs.style.backgroundContext,
        paddingTop: "40px",
        paddingBottom: "80px",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontFamily: "Nunito", ...textConfigs.style.headerText }}
        >
          {t('home.project.title')}
        </Typography>
        <Box mt={3}>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            className="constructedSwiperImg"
            onSlideChange={(swiper) =>
              setSelectedSlideIndex(swiper.activeIndex)
            }
          >
            {constructed.map((project, index) => (
              <SwiperSlide key={index}>
                <img
                  src={project.image}
                  alt={project.name}
                  style={{
                    width: "100%",
                    maxHeight: windowWidth < 576 ? "180px" : "480px",
                    objectFit: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 3,
              },
            }}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="constructedSwiper mt-5"
          >
            {constructed.map((project, index) => (
              <SwiperSlide
                key={index}
                className={classNames("font-bold", {
                  "border-b-2 border-solid border-[#1c2759]":
                    index === selectedSlideIndex,
                })}
                style={{ ...textConfigs.style.headerText, cursor: "pointer" }}
                onClick={() => setSelectedSlideIndex(index)}
              >
                {project.name}
              </SwiperSlide>
            ))}
          </Swiper>

          {constructed.map(
            (project, index) =>
              index === selectedSlideIndex && (
                <Box key={index} style={{ ...textConfigs.style.subText }}>
                  <Typography>Address: {project.address}</Typography>
                  <Typography>{project.content}</Typography>
                </Box>
              )
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectConstructed;
