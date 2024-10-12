import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import textConfigs from "../../config/text.config";
import colorsApi from "../../api/modules/colors.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";

const RoomBox = ({ onRoomSelect, selectedRoom }) => {
  const [ rooms, setRooms ] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getRooms = async () => {
      dispatch(setGlobalLoading(true)); 
      try {
        const { response, err } = await colorsApi.getRooms();
        if(response) {
          setRooms([...response.data.rooms])
        } else if (err) {
          toast.error(err)
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching rooms.")
      } finally {
        dispatch(setGlobalLoading(false)); 
      }
    }
    getRooms();
  }, [])

  const handleRoomSelect = (room) => {
    onRoomSelect(room);
  };

  return (
    <Box sx={{ padding: "0px !important" }}>
      <Grid container spacing={2}>
        {rooms.map((room) => (
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
                to={`/colors/rooms/${room.roomType}${room.id}`}
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
    </Box>
  );
};

export default RoomBox;
