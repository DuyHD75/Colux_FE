import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import textConfigs from "../../config/text.config";
import colorsApi from "../../api/modules/colors.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const RoomBox = ({ onRoomSelect, selectedRoom }) => {
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getRooms = async () => {
      setIsLoading(true);
      try {
        const { response, err } = await colorsApi.getRooms();
        if (response) {
          setRooms([...response.data.rooms]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching rooms.");
      } finally {
        setIsLoading(false);
      }
    };
    getRooms();
  }, [dispatch]);

  const handleRoomSelect = (room) => {
    onRoomSelect(room);
  };

  return (
    <Box sx={{ padding: "0px !important" }}>
      <Grid container spacing={2}>
        {isLoading === false &&
          rooms.map((room) => (
            <Grid item xs={6} md={2} key={room.id}>
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
                  "&:hover .room-name": {
                    backgroundColor: "#ebebeb",
                  },
                }}
              >
                <Link
                  to={`/colors/rooms/${room.roomType}/${room.id}`}
                  onClick={() => handleRoomSelect(room)}
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
                      src={room.image}
                      alt={room.roomType}
                      style={{
                        width: "100%",
                        height: "auto",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    />
                    <Typography
                      className="room-name"
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        color: "#000",
                        padding: "8px",
                        transition: "background-color 0.3s ease-in-out",
                        backgroundColor:
                          selectedRoom?.id === room.id
                            ? "#ebebeb"
                            : "transparent",
                        ...textConfigs.style.basicFont,
                      }}
                    >
                      {room.roomType}
                    </Typography>
                  </Box>
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

export default RoomBox;
