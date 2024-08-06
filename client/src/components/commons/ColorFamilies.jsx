import React from "react";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ColorFamilies = () => {
    const { colorFamilies } = useSelector((state) => state.colorFamilies);
    const { colorFamily } = useParams();

  return (
    <Container maxWidth="lg" className="my-10">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {colorFamilies.map((color, index) => (
          <Link
            key={index}
            to={`/colors/${color.name}`}
            style={{ textDecoration: "none" }}
          >
            <Box
              className="border-2 border-solid border-black"
              sx={{
                marginY: 1,
                width: color.name === colorFamily ? 120 : 100,
                height: color.name === colorFamily ? 120 : 100,
                ":hover": {
                    width: 120,
                    height: 120
                },
                backgroundColor: `${color.code}`,
              }}
            />
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default ColorFamilies;
