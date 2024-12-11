import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import textConfigs from "../../config/text.config";
import colorsApi from "../../api/modules/colors.api";
import { toast } from "react-toastify";

const CollectionBox = ({ onCollectionSelect, selectedCollection }) => {
  const dispatch = useDispatch();
  const [ collections, setCollection ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getCollections = async () => {
      setIsLoading(true);
      try {
        const { response, err } = await colorsApi.getCollections();
        if(response) {
          setCollection([...response.data.collections])
        } else if (err) {
          toast.error(err)
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching collections.")
      } finally {
        setIsLoading(false);
      }
    }
    getCollections();
  }, [dispatch])

  return (
    <Box sx={{ padding: "0px !important" }}>
      <Grid container spacing={2}>
        {isLoading === false && collections.map((collection) => (
          <Grid item xs={6} md={2} key={collection.id}>
            <Box
              sx={{
                overflow: "hidden",
                "&:hover .collection-name": {
                  backgroundColor: "#ebebeb",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            >
              <Link
                to={`/colors/collections/${collection.name}/${collection.id}`}
                onClick={() => onCollectionSelect(collection)}
                style={{
                  width: "100%",
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 0,
                    width: "100%",
                    height: "80px",
                    // backgroundColor: collection.hex,
                  }}
                >
                  {collection.colors.slice(0, 5).map((color, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: color.hex,
                      }}
                    />
                  ))}
                </Box>
                <Typography
                  className="collection-name"
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    color: "#000",
                    padding: "4px",
                    transition: "background-color 0.3s ease-in-out",
                    display: "block",
                    backgroundColor:
                      selectedCollection?.id === collection.id
                        ? "#ebebeb"
                        : "transparent",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  {collection.name}
                </Typography>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
      {isLoading === true && (
        <Grid
          container
          spacing={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="20%"
          >
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
        </Grid>
      )}
    </Box>
  );
};

export default CollectionBox;
