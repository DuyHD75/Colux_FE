import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import {
  FaHome,
  FaWarehouse,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import textConfigs from "../../config/text.config";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import { toast } from "react-toastify";
import colorsApi from "../../api/modules/colors.api";

const isNearBlack = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 50;
};

const ColorDetailInfo = ({ color }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { section, collection } = useParams();
  const [selectedColor, setSelectedColor] = useState();
  const dispatch = useDispatch();
  const [relatedColors, setRelatedColors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (color.colorFamily && color.colorFamily.length > 0) {
      setRelatedColors(color.colorFamily[0].collections);
    }
  }, [color]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleColorClick = (color) => {
    navigate(`/colors/${section}/${collection}/${color.name}/${color.id}`);
    setSelectedColor(color.name);
  };

  return (
    <Box bgcolor={color.hex} position="relative" sx={{ minHeight: { xs: "800px", md: "600px" } }}>
      <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
          <Box
            mb={{ xs: 0, md: 0 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            position={{ xs: "relative", md: "absolute" }}
            top={{ xs: "auto", md: "0px" }}
            left={{ xs: "auto", md: "100px" }}
            transform={{ xs: "none", md: "translateX(-50%)" }}
            maxWidth="400px"
            minHeight={{ xs: "auto", md: "648px" }}
            width="100%"
            sx={{
              backgroundImage: `url(${color.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: "16/9",
              height: { xs: "200px", md: "648px" },
            }}
          ></Box>

          <Box
            sx={{
              position: "relative",
              top: "0",
              left: { xs: "0px", md: "340px" },
              overflowX: "auto",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              width: { xs: "100%", md: "76%" },
              scrollbarWidth: "none",
              cursor: "grab",
              paddingLeft: { xs: 0, md: 0 },
            }}
          >
            <Box display="inline-flex" minWidth="max-content">
              {relatedColors.map((collection) =>
                collection.colors.map((item) => (
                  <Box
                    key={item.id}
                    display="inline-block"
                    sx={{ padding: "0px !important", minWidth: "100px" }}
                    onClick={() => handleColorClick(item)}
                  >
                    <div
                      style={{
                        backgroundColor: item.hex,
                        color: isNearBlack(item.hex) ? "#ffffff" : "#000000",
                        padding: "10px",
                        width: "150px",
                        textAlign: "center",
                        position: "relative",
                      }}
                    >
                      {item.code}
                      {selectedColor === item.name && (
                        <span
                          style={{
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "2px",
                            backgroundColor: item.hex === color.hex
                              ? isNearBlack(item.hex) ? "#ffffff" : "#000000"
                              : "none",
                          }}
                        />
                      )}
                    </div>
                  </Box>
                ))
              )}
            </Box>
          </Box>

          <Box
            flex={2}
            display="flex"
            flexDirection="column"
            sx={{
              padding: "0px 24px",
            }}
            position={{ xs: "relative", md: "absolute" }}
            top={{ xs: "auto", md: "70px" }}
            left={{ xs: "auto", md: "528px" }}
            width={{ xs: "100%", md: "60%" }}
          >
            <Box my={2}>
              <Typography
                variant="body2"
                sx={{ ...textConfigs.style.basicFont }}
              >
                Code: {color.code}
              </Typography>
              <Typography variant="h4" sx={{ ...textConfigs.style.basicFont }}>
                {color.name}
              </Typography>
              <Box display="flex" alignItems="center" onClick={handleToggle}>
                <Typography
                  style={{
                    cursor: "pointer",
                    paddingRight: 4,
                    ...textConfigs.style.basicFont,
                  }}
                >
                  Full Detail
                </Typography>
                {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
              </Box>
            </Box>

            {isExpanded && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body2"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    LRV: {color.LRV}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    Available in: {color.interior && "Interior"}{" "}
                    {color.exterior && "Exterior"}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body2"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    Color Collections: {color.collections.map((item) => (
                      item.name + ", "
                    ))}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    Color Family: {color.colorFamily[0].name}
                  </Typography>
                </Grid>
              </Grid>
            )}

            <Typography mt={2} sx={{ ...textConfigs.style.basicFont }}>
              {color.desc}
            </Typography>

            <Box mt={2}>
              <Typography variant="h6" sx={{ ...textConfigs.style.basicFont }}>
                Get this color in a:
              </Typography>
              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap={2}
                mt={2}
              >
                {color.interior && (
                  <Link
                    to="/interior"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "transparent",
                        display: "flex",
                        flexDirection: { xs: "row", md: "column" },
                        padding: { xs: "1rem", md: "1rem" },
                        alignItems: "center",
                        justifyContent: { xs: "start", md: "center" },
                      }}
                    >
                      <FaHome style={{ fontSize: "2rem" }} />
                      <Typography
                        variant="caption"
                        sx={{
                          ...textConfigs.style.basicFont,
                          paddingLeft: { xs: "1rem" },
                        }}
                      >
                        Interior
                      </Typography>
                    </Box>
                  </Link>
                )}
                {color.exterior && (
                  <Link
                    to="/exterior"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "transparent",
                        display: "flex",
                        flexDirection: { xs: "row", md: "column" },
                        padding: { xs: "1rem", md: "1rem" },
                        alignItems: "center",
                        justifyContent: { xs: "start", md: "center" },
                      }}
                    >
                      <FaWarehouse style={{ fontSize: "2rem" }} />
                      <Typography
                        variant="caption"
                        sx={{
                          ...textConfigs.style.basicFont,
                          paddingLeft: { xs: "1rem" },
                        }}
                      >
                        Exterior
                      </Typography>
                    </Box>
                  </Link>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ColorDetailInfo;
