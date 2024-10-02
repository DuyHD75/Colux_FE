import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import textConfigs from "../../config/text.config";
import colorsApi from "../../api/modules/colors.api";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";

const CollectionBox = ({ onCollectionSelect, selectedCollection }) => {
  // const { collections } = useSelector((state) => state.collections);
  const dispatch = useDispatch();
  const [ collections, setCollection ] = useState([]);
  useEffect(() => {
    const getCollections = async () => {
      dispatch(setGlobalLoading(true)); 
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
        dispatch(setGlobalLoading(false)); 
      }
    }
    getCollections();
  }, [dispatch])

  return (
    <Box sx={{ padding: "0px !important" }}>
      <Grid container spacing={2}>
        {collections.map((collection) => (
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
                to={`/colors/collections/${collection.name}`}
                onClick={() => onCollectionSelect(collection)}
                style={{
                  width: "100%",
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    // gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 0,
                    width: "100%",
                    height: "80px",
                    backgroundColor: collection.hex,
                  }}
                >
                  {/* {collection.colors.slice(0, 5).map((color, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: color.hex,
                      }}
                    />
                  ))} */}
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
    </Box>
  );
};

export default CollectionBox;
