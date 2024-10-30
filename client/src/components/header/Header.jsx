import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Grid,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import menuConfigs from "../../config/menu.config";
import { Link, useNavigate } from "react-router-dom";
import SubHeader from "./SubHeader";
import NavItemsHeader from "./NavItemsHeader";
import BackgroundColor from "../../config/background.config";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/reducer/userSlice";
import colorsApi from "../../api/modules/colors.api";
import { toast } from "react-toastify";
import "../../i18n";
import { useTranslation } from "react-i18next";
import productsApi from "../../api/modules/products.api";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();

  const [colorFamlily, setColorFamily] = useState([]);
  const [collections, setCollection] = useState([]);

  const [anchorElNav, setAnchorElNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(false);
  const [anchorElColors, setAnchorElColors] = useState(false);
  const [anchorElCategories, setAnchorElCategories] = useState(false);
  const [anchorElAbout, setAnchorElAbout] = useState(false);

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const getListColofamily = async () => {
      try {
        const { response, err } = await colorsApi.getColorFamily();
        if (response) {
          setColorFamily([...response.data.colorFalimies]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching color family.");
      }
    };
    const getCollections = async () => {
      try {
        const { response, err } = await colorsApi.getCollections();
        if (response) {
          setCollection([...response.data.collections]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching collections.");
      }
    };

    getCollections();
    getListColofamily();
  }, []);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { response, err } = await productsApi.getAllCategory();
        if (response && response.code === 200) {
          setCategories([...response.data.categories]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching products.");
      }
    };
    getAllCategory();
  }, []);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    setAnchorElUser(null);
    const { response, err } = await userApi.logout();
    if (response) {
      dispatch(setUser(null));
      localStorage.clear();
      navigate("/");
      toast.success("Logout Success.");
    }
    if (err) {
      toast.error(err);
    }
  };

  const handleCloseColorsMenu = () => {
    setAnchorElColors(null);
  };

  const handleCloseCategoriesMenu = () => {
    setAnchorElCategories(null);
    // setIsCategoriesMenuOpen(false);
  };

  const handleCloseAboutMenu = () => {
    setAnchorElAbout(null);
  };

  return (
    <AppBar
      className="top-0 left-0 right-0 z-10 font-['Nunito']"
      sx={{
        background: { xs: "#1c2759", md: "#ffffff" },
        position: "absolute",
      }}
    >
      <SubHeader />
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Start logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Nunito",
              fontWeight: 700,
              letterSpacing: ".6rem",
              color: "#000",
              textDecoration: "none",
              fontSize: "2rem",
              overflow: "inherit",
            }}
          >
            KOLUX
          </Typography>
          {/* End logo */}

          {/* Start menu mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setAnchorElNav(event.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                mt: "4px",
              }}
            >
              <Grid container spacing={1}>
                {menuConfigs.navItems.map((item, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      key={index}
                      sx={{ width: "100vw", overflowY: "auto" }}
                    >
                      <MenuItem
                        key={index}
                        onClick={(event) => {
                          handleCloseNavMenu(event);
                        }}
                      >
                        <Button
                          component={Link}
                          to={item.path}
                          key={index}
                          sx={{
                            color: "#214252",
                            textTransform: "capitalize",
                            justifyContent: "left",
                            fontSize: "1rem",
                          }}
                        >
                          {t(item.display)}
                        </Button>
                      </MenuItem>
                    </Grid>
                  );
                })}
              </Grid>
            </Menu>
          </Box>
          {/* End menu mobile */}

          {/* Start logo mobile */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              ml: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Nunito",
              fontWeight: 700,
              letterSpacing: ".8rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "1.4rem",
            }}
          >
            KOLUX
          </Typography>
          {/* End logo mobile */}

          {/* Start nav items */}
          <NavItemsHeader
            setAnchorElNav={setAnchorElNav}
            setAnchorElCategories={setAnchorElCategories}
            setAnchorElColors={setAnchorElColors}
            setAnchorElAbout={setAnchorElAbout}
          />
          {/* End nav items */}

          {/* Start menu colors */}
          <Menu
            sx={{
              mt: "45px",
              "& .MuiMenu-list": {
                paddingY: 0,
              },
            }}
            id="menu-colors"
            anchorEl={anchorElColors}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElColors)}
            onClose={handleCloseColorsMenu}
          >
            <Grid
              container
              sx={{
                width: "30vw",
                padding: 0,
                ...BackgroundColor.style.backgroundContext,
              }}
            >
              <Grid item xs={6} key="Color">
                <h2 className="px-[16px] py-[6px] text-[#1c2759] font-bold">
                  {t("colors")}
                </h2>
                {colorFamlily.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={handleCloseColorsMenu}
                    className="min-w-[120px] py-0"
                  >
                    <Link
                      to={`/colors/color-family/${item.name}/${item.id}`}
                      key={index}
                      className="text-[#1c2759] capitalize justify-start text-base font-['Nunito']"
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem
                  key="allColors"
                  onClick={handleCloseColorsMenu}
                  className="min-w-[120px] py-0"
                >
                  <Link
                    to={`/colors/color-family/All Colors/0`}
                    key="allColors"
                    className="text-[#1c2759] capitalize justify-start text-base font-['Nunito']"
                  >
                    {t("all.colors")}
                  </Link>
                </MenuItem>
              </Grid>
              <Grid item xs={6} key="Collections">
                <h2 className="px-[16px] py-[6px] text-[#1c2759] font-bold">
                  {t("collections")}
                </h2>
                {collections.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={handleCloseColorsMenu}
                    className="min-w-[120px] py-0"
                  >
                    <Link
                      to={`/colors/collections/${item.name}/${item.id}`}
                      key={index}
                      className="text-[#1c2759] capitalize justify-start text-base font-['Nunito']"
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
              </Grid>
            </Grid>
          </Menu>
          {/* End menu colors */}

          {/* Start menu Products */}
          <Menu
            sx={{
              mt: "45px",
              "& .MuiMenu-list": {
                paddingY: 0,
              },
            }}
            id="menu-categories"
            anchorEl={anchorElCategories}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElCategories)}
            onClose={handleCloseCategoriesMenu}
          >
            <Grid
              container
              sx={{
                width: "15vw",
                padding: 0,
                ...BackgroundColor.style.backgroundContext,
              }}
            >
              <Grid item xs={12} key="Color">
                <h2 className="px-[16px] py-[6px] text-[#1c2759] font-bold">
                  {t("products")}
                </h2>
                {categories.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={handleCloseCategoriesMenu}
                    className="min-w-[120px] py-0"
                  >
                    <Link
                      to={`/products/${item.name}/${item.categoryId}`}
                      key={index}
                      className="text-[#1c2759] capitalize justify-start text-base font-['Nunito']"
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem
                  key="allProducts"
                  onClick={handleCloseCategoriesMenu}
                  className="min-w-[120px] py-0"
                >
                  <Link
                    to={`/products/`}
                    key="allProducts"
                    className="text-[#1c2759] capitalize justify-start text-base font-['Nunito']"
                  >
                    {t("all.product")}
                  </Link>
                </MenuItem>
              </Grid>
            </Grid>
          </Menu>
          {/* End menu Products */}

          {/* Start menu About */}
          <Menu
            sx={{
              mt: "45px",
              "& .MuiMenu-list": {
                paddingY: 0,
              },
            }}
            id="menu-about"
            anchorEl={anchorElAbout}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElAbout)}
            onClose={handleCloseAboutMenu}
          >
            <Grid
              container
              sx={{
                width: "15vw",
                padding: 0,
                ...BackgroundColor.style.backgroundContext,
              }}
            >
              <Grid item xs={12} key="Color">
                <h2 className="px-[16px] py-[6px] text-[#1c2759] font-bold">
                  {t("about")}
                </h2>
                {menuConfigs.aboutMenu.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={handleCloseAboutMenu}
                    className="min-w-[120px] py-0"
                  >
                    <Link
                      to={`${item.path}`}
                      key={index}
                      className="text-[#1c2759] capitalize justify-start text-base font-['Nunito']"
                    >
                      {item.display}
                    </Link>
                  </MenuItem>
                ))}
              </Grid>
            </Grid>
          </Menu>
          {/* End menu About */}
          <Box sx={{ display: "flex", gap: 0 }}>
            <Button
              onClick={() => handleChangeLanguage("vi")}
              sx={{ minWidth: 50, padding: 1 }}
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fviet-nam-flat.png?alt=media&token=ee236707-6f4c-47c4-998f-4ccc2416caf3"
                alt="Vietnamese"
                style={{ width: "30px", opacity: i18n.language === "vi" ? 1 : 0.5, }}
              />
            </Button>

            <Button
              onClick={() => handleChangeLanguage("en")}
              sx={{ minWidth: 50, padding: 1 }}
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fenglish-flat.webp?alt=media&token=b0c4d065-3f2b-4605-9be3-670dac602b82"
                alt="English"
                style={{ width: "30px", opacity: i18n.language === "en" ? 1 : 0.5, }}
              />
            </Button>
          </Box>
          {/* Start User Setting */}
          <Box className="grow-0">
            <Box className="flex justify-between">
              {user ? (
                <Typography className="flex">
                  <IconButton
                    type="button"
                    component={Link}
                    to="/favorites"
                    aria-label="Favorite"
                    sx={{
                      color: "#1c2759",
                      "&:hover": {
                        color: "#1D4Ed8",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    type="button"
                    component={Link}
                    to="/cart"
                    aria-label="ShoppingCart"
                    sx={{
                      color: "#1c2759",
                      "&:hover": {
                        color: "#1D4Ed8",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                  <Tooltip title={`${user.firstName} ${user.lastName}`}>
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <IconButton
                      sx={{
                        p: "10px",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <Avatar
                        alt={user.firstName}
                        src={user.imageUrl}
                      />
                    </IconButton>
                    </Link>
                  </Tooltip>
                </Typography>
              ) : (
                <Typography className="flex">
                  <MenuItem
                    className="p-0"
                    sx={{
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <Link
                      component={Link}
                      to="/login"
                      className="md:text-[#1c2759] capitalize text-center text-base hover:text-[#1D4Ed8] "
                    >
                      {t("login")}
                    </Link>
                  </MenuItem>
                </Typography>
              )}
            </Box>

            <Menu
              sx={{ mt: "44px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {menuConfigs.settings.map((item, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Link
                    to={item.path}
                    key={index}
                    sx={{
                      color: "#1c2759",
                      textTransform: "capitalize",
                      justifyContent: "left",
                      fontSize: ".8rem",
                      padding: 0,
                    }}
                  >
                    {item.display}
                  </Link>
                </MenuItem>
              ))}
              <MenuItem key="logout" onClick={handleLogout}>
                <Link
                  to="/logout/"
                  key="logout"
                  sx={{
                    color: "#1c2759",
                    textTransform: "capitalize",
                    justifyContent: "left",
                    fontSize: ".8rem",
                    padding: 0,
                  }}
                >
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          {/* End User Setting */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
