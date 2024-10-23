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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import textConfigs from "../../config/text.config";
import { BsFillHexagonFill } from "react-icons/bs";
import data from "../../data/data";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import colorsApi from "../../api/modules/colors.api";
import { toast } from "react-toastify";

const isColorSimilarToWhite = (hex) => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r + g + b) / 3;
  return brightness > 200;
};

const ListColorsByRoom = () => {
  // const rooms = data.rooms;
  const { section, collection, collectionId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredColor, setHoveredColor] = useState(null);
  const colorsPerPage = 5;
  const [totalPages, setTotalPages] = useState(0);

  const [rooms, setRooms] = useState([]);
  const [colors, setColors] = useState([]);

  const dispatch = useDispatch();

  const matchedRoom = rooms.find((room) => room.id === collection);

  const initialRoomCollection = matchedRoom
    ? matchedRoom.collections[0].id
    : "";

  const [selectedRoomCollection, setSelectedRoomCollection] = useState(
    initialRoomCollection
  );

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
        const { response } = await colorsApi.getRooms();
        if (response && response.code === 200) {
          setRooms([...response.data.rooms]);
         
          const matchedColorFamily = response.data.rooms.find(
            (colorFamily) => colorFamily.id === collectionId
          );

          if (matchedColorFamily) {
            setSelectedRoomCollection(matchedColorFamily.collections[0].id);
          }
        } else {
          toast.error(response.exception);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching rooms.");
      }
    };

    fetchData();
  }, [dispatch, collectionId]); 
  
  useEffect(() => {
    const getListColors = async () => {
      if (selectedRoomCollection) {
        dispatch(setGlobalLoading(true));
        try {
          const { response } = collection === "All Colors" ? 
          await colorsApi.getAllColors(
              currentPage - 1,
              colorsPerPage
            )
          :  await colorsApi.getColorByRoomAndCollection(
            collectionId,
            selectedRoomCollection,
            currentPage - 1,
            colorsPerPage
          );
          if (response && response.code === 200) {
            console.log(response);
            
            setColors(response.data.colors.content);
            setTotalPages(response.data.colors.totalPages);
          }
           else {
            toast.error(response.exception);
          }
        } catch (error) {
          console.log("Error", error);
          toast.error("An error occurred while fetching colors.");
        } finally {
          dispatch(setGlobalLoading(false));
        }
      }
    };

    getListColors();
  }, [dispatch, collectionId, selectedRoomCollection, currentPage]);

  useEffect(() => {
    if (matchedRoom) {
      setSelectedRoomCollection(matchedRoom.collections[0].id);
    }
  }, [collection, matchedRoom]);

  const handleChange = (event) => {
    const value = event.target.value;

    if (value === `All Colors ${collection}`) {
      setSelectedRoomCollection("");
    } else {
      setSelectedRoomCollection(value);
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
                color: selectedRoomCollection ? "#1c2759" : "",
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
                borderColor: selectedRoomCollection ? "#1c2759" : "",
                "&.MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: selectedRoomCollection ? "#1c2759" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1c2759",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1c2759",
                  },
                },
              }}
              value={selectedRoomCollection || `All Colors ${collection}`}
              onChange={handleChange}
              label="Collections"
            >
              {rooms
                .filter((room) => room.name === collection)
                .flatMap((room) =>
                  room.collections.map((collection, index) => (
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
              to={`/colors/${section}/${collection}/${color.name}/${color.id}`}
              className={`mx-4 my-2 relative flex flex-col items-center justify-center transition-opacity duration-300 ${
                hoveredColor && hoveredColor !== color.hex
                  ? "opacity-50"
                  : "opacity-100"
              }`}
              onMouseEnter={() => setHoveredColor(color.hex)}
              onMouseLeave={() => setHoveredColor(null)}
              style={{
                width:
                  window.innerWidth < 600 ? "calc(33.33% - 0.5rem)" : "auto",
                transform:
                  hoveredColor === color.hex ? "scale(1.1)" : "scale(1)",
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
          )
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

export default ListColorsByRoom;
