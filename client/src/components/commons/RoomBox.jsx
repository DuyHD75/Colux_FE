import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import data from "../../data/data";
import { Link } from "react-router-dom";
import textConfigs from "../../config/text.config";
import colorsApi from "../../api/modules/colors.api";
import { toast } from "react-toastify";

const rooms = data.rooms;

const RoomBox = ({ onRoomSelect, selectedRoom }) => {
  const [ rooms1, setRooms ] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const { responseRooms, err } = await colorsApi.getRooms();
        if(responseRooms) {
          setRooms([...responseRooms.data.rooms])
        } else if (err) {
          toast.error(err)
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching rooms.")
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
          <Grid item xs={6} md={2} key={room.name}>
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
                to={`/colors/rooms/${room.name}`}
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
                    src={room.img}
                    alt={room.name}
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
                        selectedRoom?.name === room.name
                          ? "#ebebeb"
                          : "transparent",
                      ...textConfigs.style.basicFont,
                    }}
                  >
                    {room.name}
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
