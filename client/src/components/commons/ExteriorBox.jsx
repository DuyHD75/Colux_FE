import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import data from "../../data/data";
import { Link } from "react-router-dom";
import textConfigs from "../../config/text.config";

const exteriors = data.exteriors;

const ExteriorBox = ({ onExteriorSelect, selectedExterior }) => {
  const handleExteriorSelect = (exterior) => {
    onExteriorSelect(exterior);
  };

  return (
    <Box sx={{ padding: "0px !important" }}>
    <Grid container spacing={2}>
      {exteriors.map((exterior) => (
        <Grid item xs={6} md={2} key={exterior.name}>
          <Box
            sx={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
              cursor: "pointer",
              "&:hover img": {
                transform: "scale(1.1)",
              },
              "&:hover .exterior-name": {
                backgroundColor: "#ebebeb",
              },
            }}
          >
            <Link
              to={`/colors/exteriors&interiors/${exterior.name}/${exterior.id}`}
              onClick={() => handleExteriorSelect(exterior)}
              style={{
                width: "100%",
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={exterior.img}
                  alt={exterior.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
                <Typography
                  className="exterior-name"
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    color: "#000",
                    padding: "8px",
                    transition: "background-color 0.3s ease-in-out",
                    backgroundColor:
                      selectedExterior?.name === exterior.name
                        ? "#ebebeb"
                        : "transparent",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  {exterior.name}
                </Typography>
              </Box>
            </Link>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
  );
};

export default ExteriorBox;
