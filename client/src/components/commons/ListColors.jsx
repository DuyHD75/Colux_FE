import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import backgroundConfigs from "../../config/background.config";
import textConfigs from "../../config/text.config";

const ListColors = () => {
  const { colorFamilies } = useSelector((state) => state.colorFamilies);
  const { colorFamily } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const colorsPerPage = 18;

  const matchedColorFamily = colorFamilies.find(
    (color) => color.name === colorFamily
  );

  const initialColorFamily = matchedColorFamily
    ? matchedColorFamily.collections[0].id
    : "";

  const [selectedColorFamily, setSelectedColorFamily] =
    useState(initialColorFamily);

  useEffect(() => {
    if (matchedColorFamily) {
      setSelectedColorFamily(matchedColorFamily.collections[0].id);
    }
  }, [colorFamily, matchedColorFamily]);

  const handleChange = (event) => {
    setSelectedColorFamily(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredColors = colorFamilies
  .filter((color) => color.name === colorFamily)
  .flatMap((color) => {
    if (selectedColorFamily === "") {
      return color.collections.flatMap((collection) => collection.colors);
    } else {
      return color.collections
        .filter((collection) => collection.id === selectedColorFamily)
        .flatMap((collection) => collection.colors);
    }
  });

  const paginatedColors = filteredColors.slice(
    (currentPage - 1) * colorsPerPage,
    currentPage * colorsPerPage
  );

  return (
    <Container maxWidth="lg" className="my-10">
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h3"
            sx={{ fontFamily: "Nunito", ...textConfigs.style.headerText }}
          >
            List colors {colorFamily}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
        >
          <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
            <InputLabel
              sx={{
                color: selectedColorFamily ? "#1c2759" : "",
                "&.Mui-focused": {
                  color: "#1c2759",
                },
              }}
            >
              Collections
            </InputLabel>
            <Select
              sx={{
                ...textConfigs.style.headerText,
                borderColor: selectedColorFamily ? "#1c2759" : "",
                "&.MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: selectedColorFamily ? "#1c2759" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1c2759",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1c2759",
                  },
                },
              }}
              value={selectedColorFamily}
              onChange={handleChange}
              label="Collections"
            >
              {colorFamilies
                .filter((color) => color.name === colorFamily)
                .flatMap((color) =>
                  color.collections.map((collection, index) => {
                    return (
                      <MenuItem key={index} value={collection.id}>
                        {collection.name}
                      </MenuItem>
                    );
                  })
                )}
              <MenuItem value="">All Colors</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {paginatedColors.map((color, index) => (
          <Grid item xs={6} md={2} key={index}>
            <Box
              sx={{
                height: 200,
                backgroundColor: color.code,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ccc",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color:
                    colorFamilies.find((color) => color.name === colorFamily)
                      ?.code === "#ffffff"
                      ? "#1c2759"
                      : "#ffffff",
                }}
              >
                {color.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
        <Pagination
          count={Math.ceil(filteredColors.length / colorsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
    </Container>
  );
};

export default ListColors;
