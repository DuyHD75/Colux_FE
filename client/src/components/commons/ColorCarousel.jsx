import React from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Stack
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import backgroundConfigs from "../../config/background.config";
import textConfigs from "../../config/text.config";

const ColorCarousel = () => {
  const { colorFamilies } = useSelector((state) => state.colorFamilies);

  return (
    <Container maxWidth="lg" className="my-10">
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h3"
            sx={{ fontFamily: "Nunito", ...textConfigs.style.headerText }}
          >
            View our most popular colors
          </Typography>
        </Grid>
        <Grid
          item
          md={4}
          sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "end" }}
        >
          <Button
            className="button-prev"
            sx={{
              ...backgroundConfigs.style.backgroundContext,
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              borderRadius: "50px",
              ...textConfigs.style.headerText,
              alignItems: "center",
              marginX: "8px",
            }}
          >
            <KeyboardArrowLeft />
          </Button>
          <Button
            className="button-next"
            sx={{
              ...backgroundConfigs.style.backgroundContext,
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              borderRadius: "50px",
              ...textConfigs.style.headerText,
              alignItems: "center",
              marginX: "8px",
            }}
          >
            <KeyboardArrowRight />
          </Button>
        </Grid>
      </Grid>

      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 6,
          },
        }}
        
        spaceBetween={30}
        freeMode={true}
        loop={true}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        navigation={{
          nextEl: '.button-next',
          prevEl: '.button-prev',
        }}
        modules={[FreeMode, Pagination, Navigation]}
        className="swiperColors mt-5"
      >
        {colorFamilies.map((color, index) => (
          <SwiperSlide key={index}>
            <Link
              
              to={`/colors/${color.name}`}
              style={{ textDecoration: "none" }}
            >
              <Box className='border-2 border-solid border-black'
                sx={{
                  width: 150,
                  height: 200,
                  backgroundColor: `${color.code}`,
                }}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <Stack direction="row" spacing={1} justifyContent="center" className="custom-pagination mt-5" />
    </Container>
  );
};

export default ColorCarousel;
