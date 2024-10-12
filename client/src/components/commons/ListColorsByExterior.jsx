import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,

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

const isColorSimilarToWhite = (hex) => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r + g + b) / 3;
  return brightness > 200;
};

const ListColorsByExterior = () => {
  const { section, collection } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredColor, setHoveredColor] = useState(null);
  const colorsPerPage = 20;
  const [totalPages, setTotalPages] = useState(0);
  const [interior, setInterior] = useState(false);
  const [exterior, setExterior] = useState(false);

  const [colors, setColors] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (collection === "Exterior") {
      setExterior(true);
      setInterior(false);
    } else if (collection === "Interior") {
      setInterior(true);
      setExterior(false); 
    } else if (collection === "Exterior&Interior") {
      setExterior(true);
      setInterior(true);
    } else {
      setExterior(false);
      setInterior(false);
    }
  }, [collection]); 

  useEffect(() => {
    const getListColors = async () => {
      if (interior === true || exterior === true) {
        dispatch(setGlobalLoading(true));
        try {
          const { response } =
            await colorsApi.getColorByExteriorAndInterior(
              interior,
              exterior,
              currentPage - 1,
              colorsPerPage
            );

          if (response && response.code === 200) {
            setColors(response.data.colors.content);
            setTotalPages(response.data.colors.totalPages);
          } else {
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
  }, [dispatch, interior, exterior, currentPage]);



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
        <Grid item xs={12} md={12}>
          <Typography variant="h3" sx={{ ...textConfigs.style.headerText }}>
            {collection} Paint Colors
          </Typography>
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

export default ListColorsByExterior;
