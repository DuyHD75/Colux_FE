import React, { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Stack, Box, Typography, Container, Link } from "@mui/material";
import textConfigs from "../../config/text.config";

// Hàm kiểm tra màu có gần giống màu đen
const isNearBlack = (hex) => {
  // Chuyển đổi màu HEX thành RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Tính độ sáng để xác định nếu màu gần giống màu đen
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 50; // Màu gần đen nếu độ sáng nhỏ hơn 50
};

const RoomSelector = ({ rooms, colors }) => {
  const { section, collection, colorName } = useParams();
  const selectedColor = colors.find((c) => c.name === colorName);
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);

  const selectedRoomIndex = rooms.findIndex(
    (room) => room.id === selectedRoom.id
  );

  const textColor = isNearBlack(selectedColor?.hex) ? "#ffffff" : "#000000";

  return (
    <Container
      maxWidth="lg"
      sx={{ padding: { xs: "32px 16px", md: "64px 0" } }}
    >
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: { xs: "1.5rem", md: "2.5rem" },
            textAlign: "center",
            ...textConfigs.style.basicFont,
            marginBottom: { xs: "12px", md: "24px" },
          }}
        >
          See Beetroot work in any room
        </Typography>
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <img
            src={selectedRoom.img}
            alt={selectedRoom.name}
            style={{ width: "100%", height: "auto" }}
          />
          <Link
            component={RouterLink}
            to={`/3d-view/${selectedRoom.id}`}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              padding: "10px 20px",
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
              ...textConfigs.style.basicFont,
            }}
          >
            View 3D
          </Link>
        </Box>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            maxWidth: "1200px",
            flexWrap: { xs: "nowrap", md: "nowrap" },
            overflowX: "auto",
            "&::-webkit-scrollbar": {
                display: "none",
              },
            scrollbarWidth: "none",
          }}
        >
          {rooms.map((room, index) => (
            <Box
              key={room.id}
              sx={{
                height: "100%",
                margin: "0 !important",
                cursor: "pointer",
                flex: 1,
                padding: "20px 5px",
                color: selectedRoom.id === room.id ? textColor : "#000",
                backgroundColor:
                  selectedRoom.id === room.id
                    ? selectedColor?.hex
                    : "transparent",
                "&:hover": {
                  backgroundColor:
                    selectedRoom.id === room.id
                      ? selectedColor?.hex
                      : "#ebebeb",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                "&:not(:last-child)::after": {
                  content: '""',
                  position: "absolute",
                  right: "0px",
                  height: "24px",
                  width: ".5px",
                  backgroundColor:
                    index === selectedRoomIndex ||
                    index === selectedRoomIndex - 1
                      ? "transparent"
                      : "#000",
                },
                "&:not(:first-child)::before": {
                  content: '""',
                  position: "absolute",
                  left: "0px",
                  height: "24px",
                  width: ".5px",
                  backgroundColor:
                    index === selectedRoomIndex ||
                    index === selectedRoomIndex + 1
                      ? "transparent"
                      : "#000",
                },
              }}
              onClick={() => setSelectedRoom(room)}
            >
              <Typography
                sx={{ ...textConfigs.style.basicFont, whiteSpace: "nowrap" }}
              >
                {room.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default RoomSelector;
