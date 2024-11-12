import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
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
import { toast } from "react-toastify";
import colorsApi from "../../api/modules/colors.api";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import { useTranslation } from "react-i18next";


const exteriors = data.exteriors;

const ColorSwitcher = () => {
  
  const { t } = useTranslation(); 
  const sections = [t("color.family"), t("room"), t("collections"), `${t("exterior")} & ${t("interior")}`];
  
  const navigate = useNavigate();
  const location = useLocation();
  const { collection, collectionId  } = useParams();
  const dispatch = useDispatch();

  const [ colorFamlily, setColorFamily ] = useState([]);
  const [ rooms, setRooms ] = useState([]);
  const [ collections, setCollection ] = useState([]);

  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [selectedRoom, setSelectedRoom] = useState(rooms[0] || {});
  const [selectedExterior, setSelectedExterior] = useState(exteriors[0] || {});
  const [selectedCollection, setSelectedCollection] = useState(
    collections[0] || {}
  );
  const extendedColorFamilies = useMemo(() => {
    return [
      ...colorFamlily,
      {
        id: "0",
        name: "All Colors",
        image: "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fall-color.jpg?alt=media&token=da5ab063-332e-4808-8905-1747d131c180",
        title: "Explore Paint Colors",
        description:
          "Ready to find the perfect hue? Explore our interior and exterior paint colors by color family or curated color palettes to get inspired. We also offer easy-to-use tools and color samples to help you see which hues look best in your space. Whether you're painting your front door or adding an accent wall to your home office, we have all the color solutions to bring your vision to life.",
        hex: "#c1cbd2",
        collections: [],
      },
    ];
  }, [colorFamlily]);

  const [selectedColor, setSelectedColor] = useState(
    extendedColorFamilies[0] || {}
  );

  useEffect(() => {
    if (rooms.length > 0) {
      setSelectedRoom(rooms[0]);
    }
    if (collections.length > 0) {
      setSelectedCollection(collections[0]);
    }
    if (extendedColorFamilies.length > 1) {
      setSelectedColor(extendedColorFamilies[0]);
    }
  }, [rooms, collections, extendedColorFamilies]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setGlobalLoading(true));
  
      try {
        await Promise.all([
          getListColorFamily(),
          getRooms(),
          getCollections(),
        ]);
      } catch (error) {
        console.log("Error occurred during data fetching", error);
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };
    const getListColorFamily = async () => {
      try {
        const { response, err } = await colorsApi.getColorFamily();

        if(response) {
          setColorFamily([...response.data.colorFalimies])
        } else if (err) {
          toast.error(err)
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching color family.")
      }
    }

    const getRooms = async () => {
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
      }
    }

    const getCollections = async () => {
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
      }
    }
    fetchData();
  }, [dispatch])

  useEffect(() => {
    if (selectedSection === t("room") && collection) {
      const foundRoom = rooms.find((room) => room.roomType === collection);
      if (foundRoom) {
        setSelectedRoom(foundRoom);
      }
    } else if (selectedSection === t("collections") && collection) {
      const foundCollection = collections.find(
        (col) => col.name === collection
      );
      if (foundCollection) {
        setSelectedCollection(foundCollection);
      }
    } else if (selectedSection === `${t("exterior")} & ${t("interior")}` && collection) {
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
      setSelectedSection(t("color.family"));
    } else if (path.includes(`/colors/rooms`)) {
      setSelectedSection(t("room"));
    } else if (path.includes(`/colors/collections`)) {
      setSelectedSection(t("collections"));
    } else if (path.includes(`/colors/exteriors&interiors`)) {
      setSelectedSection(`${t("exterior")} & ${t("interior")}`);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (selectedSection === t("color.family") && collectionId) {
      const foundColor = extendedColorFamilies.find(
        (colorFamily) => colorFamily.id === collectionId
      );
      if (foundColor) {
        setSelectedColor(foundColor);
      }
    }
  }, [collectionId, selectedSection, extendedColorFamilies]);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    switch (section) {
      case t("color.family"):
        navigate(`/colors/color-family/${selectedColor?.name}/${selectedColor?.id}`);
        break;
      case t("room"):
        navigate(`/colors/rooms/${selectedRoom?.roomType}/${selectedRoom?.id}`);
        break;
      case t("collections"):
        navigate(`/colors/collections/${selectedCollection?.name}/${selectedCollection?.id}`);
        break;
      case `${t("exterior")} & ${t("interior")}`:
        navigate(`/colors/exteriors&interiors/${selectedExterior?.name}/${selectedExterior?.id}`);
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (selectedSection) {
      case t("color.family"):
        return (
          <ColorFamilies
            onColorSelect={setSelectedColor}
            selectedColor={selectedColor}
          />
        );
      case t("room"):
        return (
          <RoomBox onRoomSelect={setSelectedRoom} selectedRoom={selectedRoom} />
        );
      case t("collections"):
        return (
          <CollectionBox
            onCollectionSelect={setSelectedCollection}
            selectedCollection={selectedCollection}
          />
        );
      case `${t("exterior")} & ${t("interior")}`:
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
    let description = "";
    let hex = "";

    switch (selectedSection) {
      case t("color.family"):
        img = selectedColor.image;
        section = t("color.family");
        title = selectedColor.title;
        description = selectedColor.description;
        hex = selectedColor.hex;
        break;
      case t("room"):
        img = selectedRoom.image;
        section = t("room");
        title = selectedRoom.title;
        description = selectedRoom.description;
        hex = selectedRoom.hex;
        break;
      case t("collections"):
        img = selectedCollection.image;
        section = t("collections");
        title = selectedCollection.title;
        description = selectedCollection.description;
        hex = selectedCollection.hex;
        break;
      case `${t("exterior")} & ${t("interior")}`:
        img = selectedExterior.img;
        section = `${t("exterior")} & ${t("interior")}`;
        title = selectedExterior.title;
        description = selectedExterior.description;
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
        description={description}
        hex={hex}
      />
    );
  };

  const renderListColors = () => {
    switch (selectedSection) {
      case t("color.family"):
        return <ListColorsByColorFamily/>;
      case t("room"):
        return <ListColorsByRoom />;
      case t("collections"):
        return <ListColorsByCollection />;
      case `${t("exterior")} & ${t("interior")}`:
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
              {t("browse.by")}
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
                      textTransform: "capitalize"
                    }}
                    onClick={() => handleSectionChange(section)}
                  >
                    {section}
                  </Button>

                  {index < sections.length - 1 && (
                    <Box
                      sx={{
                        borderLeft: "2px solid #e5e7eb",
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
