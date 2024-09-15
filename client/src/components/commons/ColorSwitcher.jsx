import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Box, Typography, Stack, Button, Container } from "@mui/material";
import textConfigs from "../../config/text.config";
import ColorFamilies from "./ColorFamilies";
import ListColorsByColorFamily from "./ListColorsByColorFamily";
import ListColorsByRoom from "./ListColorsByRoom";
import ListColorsByExterior from "./ListColorsByExterior";
import ListColorsByCollection from "./ListColorsByCollection";
import RoomBox from "./RoomBox";
import ExteriorBox from "./ExteriorBox";
import CollectionBox from "./CollectionBox";
import ColorBanner from "./ColorBanner";
import data from "../../data/data";

const sections = ["Color Family", "Room", "Collection", "Exterior"];
const rooms = data.rooms;
const exteriors = data.exteriors;

const ColorSwitcher = () => {
  const { collections } = useSelector((state) => state.collections);
  const { colorFamilies } = useSelector((state) => state.colorFamilies);
  const { collection } = useParams();
  const extendedColorFamilies = [
    ...colorFamilies,
    {
      id: 0,
      name: "All Colors",
      img: "https://stppgpaints1prd01.blob.core.windows.net/masterbrand/libraries/masterbrand/assets/swatches/choosing-color-for-your-job_2.jpg?ext=.jpg",
      title: "Explore Paint Colors",
      content:
        "Ready to find the perfect hue? Explore our interior and exterior paint colors by color family or curated color palettes to get inspired. We also offer easy-to-use tools and color samples to help you see which hues look best in your space. Whether you're painting your front door or adding an accent wall to your home office, we have all the color solutions to bring your vision to life.",
      hex: "#c1cbd2",
      collections: [],
    },
  ];

  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [selectedRoom, setSelectedRoom] = useState(rooms[0] || {});
  const [selectedExterior, setSelectedExterior] = useState(exteriors[0] || {});
  const [selectedCollection, setSelectedCollection] = useState(
    collections[0] || {}
  );
  const [selectedColor, setSelectedColor] = useState(
    extendedColorFamilies[0] || {}
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (selectedSection === "Room" && collection) {
      const foundRoom = rooms.find((room) => room.name === collection);
      if (foundRoom) {
        setSelectedRoom(foundRoom);
      }
    } else if (selectedSection === "Collection" && collection) {
      const foundCollection = collections.find(
        (col) => col.name === collection
      );
      if (foundCollection) {
        setSelectedCollection(foundCollection);
      }
    } else if (selectedSection === "Exterior" && collection) {
      const foundExterior = exteriors.find(
        (exterior) => exterior.name === collection
      );
      if (foundExterior) {
        setSelectedExterior(foundExterior);
      }
    }
  }, [collection, selectedSection, rooms, collections, exteriors]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes(`/colors/color-family`)) {
      setSelectedSection("Color Family");
    } else if (path.includes(`/colors/rooms`)) {
      setSelectedSection("Room");
    } else if (path.includes(`/colors/collections`)) {
      setSelectedSection("Collection");
    } else if (path.includes(`/colors/exteriors`)) {
      setSelectedSection("Exterior");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (selectedSection === "Color Family" && collection) {
      const foundColor = extendedColorFamilies.find(
        (colorFamily) => colorFamily.name === collection
      );
      if (foundColor) {
        setSelectedColor(foundColor);
      }
    }
  }, [collection, selectedSection, extendedColorFamilies]);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    switch (section) {
      case "Color Family":
        navigate(`/colors/color-family/${selectedColor?.name}`);
        break;
      case "Room":
        navigate(`/colors/rooms/${selectedRoom?.name}`);
        break;
      case "Collection":
        navigate(`/colors/collections/${selectedCollection?.name}`);
        break;
      case "Exterior":
        navigate(`/colors/exteriors/${selectedExterior?.name}`);
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "Color Family":
        return (
          <ColorFamilies
            onColorSelect={setSelectedColor}
            selectedColor={selectedColor}
          />
        );
      case "Room":
        return (
          <RoomBox onRoomSelect={setSelectedRoom} selectedRoom={selectedRoom} />
        );
      case "Collection":
        return (
          <CollectionBox
            onCollectionSelect={setSelectedCollection}
            selectedCollection={selectedCollection}
          />
        );
      case "Exterior":
        return (
          <ExteriorBox
            onExteriorSelect={setSelectedExterior}
            selectedExterior={selectedExterior}
          />
        );
      default:
        return null;
    }
  };

  const renderBanner = () => {
    let img = "";
    let section = "";
    let title = "";
    let content = "";
    let hex = "";

    switch (selectedSection) {
      case "Color Family":
        img = selectedColor.img;
        section = "COLOR FAMILY";
        title = selectedColor.title;
        content = selectedColor.content;
        hex = selectedColor.hex;
        break;
      case "Room":
        img = selectedRoom.img;
        section = "ROOM";
        title = selectedRoom.title;
        content = selectedRoom.content;
        hex = selectedRoom.hex;
        break;
      case "Collection":
        img = selectedCollection.img;
        section = "COLLECTION";
        title = selectedCollection.title;
        content = selectedCollection.content;
        hex = selectedCollection.hex;
        break;
      case "Exterior":
        img = selectedExterior.img;
        section = "EXTERIOR";
        title = selectedExterior.title;
        content = selectedExterior.content;
        hex = selectedExterior.hex;
        break;
      default:
        return null;
    }

    return (
      <ColorBanner
        img={img}
        section={section}
        title={title}
        content={content}
        hex={hex}
      />
    );
  };

  const renderListColors = () => {
    switch (selectedSection) {
      case "Color Family":
        return <ListColorsByColorFamily />;
      case "Room":
        return <ListColorsByRoom />;
      case "Collection":
        return <ListColorsByCollection />;
      case "Exterior":
        return <ListColorsByExterior />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box>{renderBanner()}</Box>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: { xs: "0px", md: "-48px" },
          background: "#ffffff",
          padding: "0px !important",
        }}
      >
        <Box p={3} sx={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
          <Stack
            direction="row"
            justifyContent={{ xs: "center", md: "space-between" }}
            alignItems="center"
            sx={{ flexWrap: { xs: "wrap", md: "nowrap" }, overflowX: "auto" }}
          >
            <Typography variant="h5" sx={{ ...textConfigs.style.basicFont }}>
              Browse By
            </Typography>
            <Stack
              direction="row"
              justifyContent={{ xs: "center", md: "space-between" }}
              spacing={1}
              sx={{ flexWrap: { xs: "wrap", md: "nowrap" }, overflowX: "auto" }}
            >
              {sections.map((section, index) => (
                <React.Fragment key={section}>
                  <Button
                    variant="text"
                    sx={{
                      ...textConfigs.style.headerText,
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      borderRadius: 0,
                      paddingBottom: "4px",
                      textDecoration:
                        selectedSection === section ? "underline" : "none",
                      textUnderlineOffset: "4px",
                      "&:hover": {
                        backgroundColor: "#ebebeb",
                      },
                      marginLeft: "0px !important",
                    }}
                    onClick={() => handleSectionChange(section)}
                  >
                    {section}
                  </Button>

                  {index < sections.length - 1 && (
                    <Box
                      sx={{
                        borderLeft: "1px solid #e5e7eb",
                        height: "24px",
                        alignSelf: "center",
                        marginLeft: "0px !important",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </Stack>
          <Box mt={4}>{renderContent()}</Box>
        </Box>
        <Box>{renderListColors()}</Box>
      </Container>
    </Box>
  );
};

export default ColorSwitcher;
