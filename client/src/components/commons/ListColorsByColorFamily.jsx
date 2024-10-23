import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import textConfigs from "../../config/text.config";
import { BsFillHexagonFill } from "react-icons/bs";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import colorsApi from "../../api/modules/colors.api";
import { toast } from "react-toastify";

const ListColorsByColorFamily = () => {
  const { section, collection, collectionId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredColor, setHoveredColor] = useState(null);
  const colorsPerPage = 20;
  const [totalPages, setTotalPages] = useState(0);

  const [colorFamily, setColorFamily] = useState([]);
  const [colors, setColors] = useState([]);

  const dispatch = useDispatch();

  const matchedColorFamily = colorFamily.find(
    (colorFamily) => colorFamily.id === collectionId
  );

  const initialColorFamily = matchedColorFamily
    ? matchedColorFamily.collections[0].id
    : "";

  const [selectedCollection, setSelectedCollection] =
    useState(initialColorFamily);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setGlobalLoading(true));

      try {
        await getListColorFamily();
      } catch (error) {
        console.log("Error occurred during data fetching", error);
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };

    const getListColorFamily = async () => {
      try {
        const { response, err } = await colorsApi.getColorFamily();
        if (response && response.code === 200) {
          setColorFamily([...response.data.colorFalimies]);
         
          const matchedColorFamily = response.data.colorFalimies.find(
            (colorFamily) => colorFamily.id === collectionId
          );

          if (matchedColorFamily) {
            setSelectedCollection(matchedColorFamily.collections[0].id);
          }
        } else {
          toast.error(err.exception);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching color family.");
      }
    };

    fetchData();
  }, [dispatch, collectionId]); 
  
  useEffect(() => {
    const getListColors = async () => {
      if (selectedCollection) {
        dispatch(setGlobalLoading(true));
        try {
          const { response } = collection === "All Colors" ? 
          await colorsApi.getAllColors(
              currentPage - 1,
              colorsPerPage
            )
          :  await colorsApi.getColorByColorFamilyAndCollection(
            collectionId,
            selectedCollection,
            currentPage - 1,
            colorsPerPage
          );
          if (response && response.code === 200) {
            console.log(response);
            
            setColors(response.data.colors.content);
            setTotalPages(response.data.colors.totalPages);
          }
          //  else {
          //   toast.error(response.exception);
          // }
        } catch (error) {
          console.log("Error", error);
          toast.error("An error occurred while fetching colors.");
        } finally {
          dispatch(setGlobalLoading(false));
        }
      }
    };

    getListColors();
  }, [dispatch, collectionId, selectedCollection, currentPage]);

  useEffect(() => {
    if (matchedColorFamily) {
      setSelectedCollection(matchedColorFamily.collections[0].id);
    }
  }, [collection, matchedColorFamily, collectionId]);

  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value);

    if (value === `All Colors ${collection}`) {
      setSelectedCollection(value);
    } else {
      setSelectedCollection(value);
    }
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedColors = colors.slice(
    0 * colorsPerPage,
    1 * colorsPerPage
  );

  return (
    <Container maxWidth="lg" className="my-10">
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" sx={{ ...textConfigs.style.headerText }}>
            {collection} Paint Colors
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
                color: selectedCollection ? "#1c2759" : "",
                "&.Mui-focused": {
                  color: "#1c2759",
                },
                ...textConfigs.style.basicFont,
              }}
            >
              Collections
            </InputLabel>
            <Select
              sx={{
                ...textConfigs.style.headerText,
                borderColor: selectedCollection ? "#1c2759" : "",
                "&.MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: selectedCollection ? "#1c2759" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1c2759",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1c2759",
                  },
                },
              }}
              value={selectedCollection || `All Colors ${collection}`}
              onChange={handleChange}
              label="Collections"
            >
              {colorFamily
                .filter((color) => color.name === collection)
                .flatMap((color) =>
                  color.collections.map((collection, index) => (
                    <MenuItem key={index} value={collection.id}>
                      {collection.name}
                    </MenuItem>
                  ))
                )}
              <MenuItem value={`All Colors ${collection}`}>
                All Colors {collection}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {paginatedColors.map((color, index) => {
          return (
            <Grid item xs={6} md={2.4} key={index}>
              <Link
                key={index}
                to={`/colors/${section}/${collection}/${collectionId}/${color.name}/${color.id}`}
                className={`mx-4 my-2 relative flex flex-col items-center justify-center transition-opacity duration-300 ${
                  hoveredColor && hoveredColor !== color.id
                    ? "opacity-50"
                    : "opacity-100"
                }`}
                onMouseEnter={() => {
                  setHoveredColor(color.id);
                }}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  width:
                    window.innerWidth < 600 ? "calc(33.33% - 0.5rem)" : "auto",
                  transform:
                    hoveredColor === color.id ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.3s ease",
                }}
              >
                <BsFillHexagonFill
                  size={window.innerWidth < 600 ? 100 : 180}
                  style={{
                    color: color.hex,
                    filter: "drop-shadow(0px 0px 4px #ccc)",
                  }}
                />
                <span
                  className="text-xs md:text-lg font-bold text-center mt-1"
                  style={{ color: "#3b3730" }}
                >
                  {color.name}
                </span>
              </Link>
            </Grid>
          );
        })}
      </Grid>

      <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
    </Container>
  );
};

export default ListColorsByColorFamily;
