import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Pagination,
  Box,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { BsFillHexagonFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import textConfigs from "../../config/text.config";
import colorsApi from "../../api/modules/colors.api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ListColorsByCollection = () => {
  const { t, i18n } = useTranslation();

  const { section, collection, collectionId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredColor, setHoveredColor] = useState(null);
  const colorsPerPage = 20;
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [colors, setColors] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getListColors = async () => {
      setIsLoading(true);
      try {
        const { response } = await colorsApi.getColorByCollectionId(
          collectionId,
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
        setIsLoading(false);
      }
    };

    getListColors();
  }, [dispatch, collectionId, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedColors = colors.slice(0 * colorsPerPage, 1 * colorsPerPage);

  return (
    <Container maxWidth="lg" className="my-10">
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} md={12}>
          <Typography
            variant="h3"
            sx={{
              ...textConfigs.style.basicFont,
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            {i18n.language === "en"
              ? `${collection} ${t("paint.colors")}`
              : `${t("paint.colors")} ${collection}`}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} display="flex" justifyContent="center" alignItems="center">
        {isLoading === false && paginatedColors.map((color, index) => (
          <Grid item xs={6} md={2.4} key={index}>
            <Link
              key={index}
              to={`/colors/${section}/${collection}/${collectionId}/${color.name}/${color.id}`}
              className={`mx-4 my-2 relative flex flex-col items-center justify-center transition-opacity duration-300 ${
                hoveredColor && hoveredColor !== color.hex
                  ? "opacity-50"
                  : "opacity-100"
              }`}
              onMouseEnter={() => setHoveredColor(color.hex)}
              onMouseLeave={() => setHoveredColor(null)}
              style={{
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
              <span
                className="text-xs md:text-lg text-center mt-1"
                style={{ color: "#3b3730" }}
              >
                {color.code}
              </span>
            </Link>
          </Grid>
        ))}
        {isLoading === true && (
          <Box display="flex" justifyContent="center" alignItems="center" width="20%">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
              fill="#1C2759"
              stroke="#1C2759"
              stroke-width="15"
              r="15"
              cx="40"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#1C2759"
              stroke="#1C2759"
              stroke-width="15"
              r="15"
              cx="100"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#1C2759"
              stroke="#1C2759"
              stroke-width="15"
              r="15"
              cx="160"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
          </Box>
        )}
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

export default ListColorsByCollection;
