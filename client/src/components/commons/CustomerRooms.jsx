import React from "react";
import { Box, Container, Typography, Grid, Link } from "@mui/material";
import { useSelector } from "react-redux";
import textConfigs from "../../config/text.config";

const CustomerRooms = ({ customerRoom, colors }) => {
  const { colorFamilies } = useSelector((state) => state.colorFamilies);
  const selectedColorId = colors[0]?.colorFamily;

  const selectedColorFamily = colorFamilies.find((family) =>
    family.collections.some((collection) =>
      collection.colors.some((color) => color.id === selectedColorId)
    )
  );

  return (
    <Box sx={{ backgroundColor: "#fafaf9", padding: "40px 0",}}>
      <Container maxWidth="lg" >
        <Typography variant="h6" gutterBottom align="center" sx={{...textConfigs.style.basicFont}}>
          Shared From Real Homes
        </Typography>

        <Typography variant="h4" fontWeight="bold" gutterBottom align="center" sx={{...textConfigs.style.basicFont}}>
          More {selectedColorFamily?.name} Color Inspiration
        </Typography>

        <Typography variant="subtitle1" gutterBottom align="center" sx={{...textConfigs.style.basicFont}}>
          Upload your own or share it with us on social media by using 3D of us.
        </Typography>

        <Grid container spacing={4} sx={{ marginTop: "20px" }}>
          {customerRoom.map((room) => {
            const roomColor = colors.find((color) => color.id === room.colorId);

            return (
              <Grid item xs={12} sm={6} md={3} key={room.id}>
                <Box>
                  <Box
                    component="img"
                    src={room.img}
                    alt={room.name}
                    sx={{ width: "100%" }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "36px",
                        height: "36px",
                        border: ".6px solid #000",
                        backgroundColor: roomColor?.hex,
                        marginRight: "10px",
                        borderRadius: "4px",
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginRight: "10px",
                      }}
                    >
                      <Typography variant="body1" fontWeight="bold" sx={{...textConfigs.style.basicFont}}>
                        {roomColor?.name}
                      </Typography>
                      <Typography variant="body2" sx={{...textConfigs.style.basicFont}}>{roomColor?.code}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ marginTop: "10px" }}>
                    <Typography variant="body2" sx={{...textConfigs.style.basicFont}}>
                      Created By {room.userId}
                    </Typography>
                    <Typography variant="body2" sx={{...textConfigs.style.basicFont}}>
                      Room Name: {room.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Link href="/all-customer-rooms" variant="body2" color="primary">
            See All Customer Rooms
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomerRooms;
