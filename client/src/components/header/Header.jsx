import React, { useEffect, useRef, useState } from "react";
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
  TextField,
  Badge,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import menuConfigs from "../../config/menu.config";
import { Link, useNavigate } from "react-router-dom";
import SubHeader from "./SubHeader";
import NavItemsHeader from "./NavItemsHeader";
import BackgroundColor from "../../config/background.config";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/reducer/userSlice";
import colorsApi from "../../api/modules/colors.api";
import productApi from "../../api/modules/products.api";
import { toast } from "react-toastify";
import "../../i18n";
import { useTranslation } from "react-i18next";
import productsApi from "../../api/modules/products.api";
import textConfigs from "../../config/text.config";
import { BsFillHexagonFill } from "react-icons/bs";
import cartApi from "../../api/modules/cart.api";
import backgroundConfigs from "../../config/background.config";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const { t, i18n } = useTranslation();
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [colorFamlily, setColorFamily] = useState([]);
  const [collections, setCollection] = useState([]);

  const [anchorElNav, setAnchorElNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(false);
  const [anchorElColors, setAnchorElColors] = useState(false);
  const [anchorElCategories, setAnchorElCategories] = useState(false);
  const [anchorElAbout, setAnchorElAbout] = useState(false);
  const [hoveredColor, setHoveredColor] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [searchResultsMobile, setSearchResultsMobile] = useState(null);
  const searchInputRef = useRef(null);
  const searchInputMobileRef = useRef(null);
  const [searchKey, setSearchKey] = useState(null);
  const [searchKeyMobile, setSearchKeyMobile] = useState(null);

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const debounce = (handler, delay) => {
    let timeout = null;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handler(...args);
      }, delay);
    };
  };

  useEffect(() => {
    if (globalLoading === true) {
      setUser(JSON.parse(localStorage.getItem("user")));
      dispatch(setGlobalLoading(false));
    }
  }, [globalLoading]);

  const HandleSearch = async (e) => {
    if (e.target.value.trim() === "") {
      setSearchResults(null);
      return;
    }

    try {
      const { response, err } = await productApi.search(
        e.target.value.replace(/#/g, "").trim()
      );
      if (response) {
        setSearchResults(response.data.Results);
      } else if (err) {
        toast.error(err);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const HandleSearchMobile = async (e) => {
    if (e.target.value.trim() === "") {
      setSearchResultsMobile(null);
      return;
    }

    try {
      const { response, err } = await productApi.search(
        e.target.value.replace(/#/g, "").trim()
      );
      if (response) {
        setSearchResultsMobile(response.data.Results);
      } else if (err) {
        toast.error(err);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const hideResearchResult = () => {
    setSearchResults(null);
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  const hideResearchResultMobile = () => {
    setSearchResultsMobile(null);
    if (searchInputMobileRef.current) {
      searchInputMobileRef.current.value = "";
    }
  };

  // console.log(searchResults);

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
        if (response) {
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
          <Box
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Nunito",
              fontWeight: 700,
              letterSpacing: "0",
              color: "#000",
              textDecoration: "none",
              fontSize: "1.8rem",
              overflow: "inherit",
              alignItems: "end", // Căn giữa logo và text theo chiều dọc
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Flogo-icon.svg?alt=media&token=039706dc-1908-40c7-b42f-755ed24a70f5"
              alt="Colux Logo"
              style={{
                width: "45px",
                height: "45px",
                marginRight: "0px",
              }}
            />
            LUX.
          </Box>
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
                width: "100%", // Full width for mobile
                px: 1,
              }}
            >
              {/* Search Field */}
              <Box sx={{ p: 1 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder={t("search")}
                  fullWidth
                  // value={searchKeyMobile}
                  inputRef={searchInputMobileRef}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#1c2759" },
                      "&:hover fieldset": { borderColor: "#1c2759" },
                      "&.Mui-focused fieldset": { borderColor: "#1c2759" },
                    },
                    ...textConfigs.style.basicFont,
                    mt: 1,
                  }}
                  onChange={debounce(HandleSearchMobile, 1500)}
                />
              </Box>

              {/* Search Results */}
              {searchResultsMobile && (
                <Box
                  sx={{
                    p: 1,
                    maxHeight: "300px",
                    overflowY: "auto",
                    background: "#fff", // Ensure results are visible
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                >
                  {/* Colors Section */}
                  {searchResultsMobile.colors.length > 0 && (
                    <>
                      <Typography
                        variant="h6"
                        sx={{ color: "#1c2759", fontWeight: 600, mb: 1 }}
                      >
                        {t("Colors")}
                      </Typography>
                      <Grid container spacing={1}>
                        {searchResultsMobile.colors.map((color, index) => (
                          <Grid item xs={4} key={index}>
                            <Link
                              to={`/colors/color-family/${
                                color.colorFamily[0].name
                                  ? color.colorFamily[0].name
                                  : "colorfamilyname"
                              }/${
                                color.colorFamily[0].id
                                  ? color.colorFamily[0].id
                                  : "colorfamilyid"
                              }/${color.name}/${color.id}`}
                              className="relative flex flex-col items-center justify-center"
                              style={{
                                textDecoration: "none",
                                marginTop: 2,
                              }}
                              onClick={hideResearchResultMobile}
                            >
                              <BsFillHexagonFill
                                size={60}
                                style={{
                                  color: color.hex,
                                  filter: "drop-shadow(0px 0px 4px #ccc)",
                                }}
                              />
                              <span
                                style={{
                                  color: "#3b3730",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                  marginTop: "0.5rem",
                                  ...textConfigs.style.basicFont,
                                  fontSize: "12px",
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  WebkitLineClamp: 1, // Hiển thị tối đa 2 dòng
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {color.name}
                              </span>
                              <span
                                style={{
                                  color: "#3b3730",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                  marginTop: "0.25rem",
                                  ...textConfigs.style.basicFont,
                                  fontSize: "12px",
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  WebkitLineClamp: 1, // Hiển thị tối đa 2 dòng
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {color.hex}
                              </span>
                            </Link>
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}

                  {/* Products Section */}
                  {searchResultsMobile.products.length > 0 && (
                    <>
                      <Typography
                        variant="h6"
                        sx={{ color: "#1c2759", fontWeight: 600, mt: 2, mb: 1 }}
                      >
                        {t("Products")}
                      </Typography>
                      <Grid container spacing={1}>
                        {searchResultsMobile.products.map((product, index) => (
                          <Grid item xs={4} key={index}>
                            <Link
                              to={`/products/${
                                product.category.name
                                  ? product.category.name
                                  : "category-name"
                              }/${
                                product.category.categoryId
                                  ? product.category.categoryId
                                  : "category-id"
                              }/${product.productName}/${product.productId}`}
                              className="relative flex flex-col items-center justify-center"
                              style={{
                                textDecoration: "none",
                                textAlign: "center",
                              }}
                              onClick={hideResearchResultMobile}
                            >
                              <img
                                src={product.images?.[0]?.url || ""}
                                alt={product.productName}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                              />
                              <span
                                style={{
                                  color: "#3b3730",
                                  fontWeight: "bold",
                                  marginTop: "0.5rem",
                                  fontSize: "12px",
                                  ...textConfigs.style.basicFont,
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  WebkitLineClamp: 2, // Hiển thị tối đa 2 dòng
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {capitalizeWords(product.productName)}
                              </span>
                            </Link>
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </Box>
              )}

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
          <Box
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
              letterSpacing: ".6rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "1.4rem",
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fgooglecolab-svgrepo-com.svg?alt=media&token=8c73424a-2f2d-47dd-a4c5-960063e52e40"
              alt="Colux Logo"
              style={{
                width: "40px", // Kích thước logo
                height: "40px",
                marginRight: "8px", // Khoảng cách giữa logo và chữ
              }}
            />
            LUX
          </Box>
          {/* End logo mobile */}

          <NavItemsHeader
            setAnchorElNav={setAnchorElNav}
            setAnchorElCategories={setAnchorElCategories}
            setAnchorElColors={setAnchorElColors}
            setAnchorElAbout={setAnchorElAbout}
            sx={{ flex: "1 1 100%" }}
          />

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
                      {t(item.display)}
                    </Link>
                  </MenuItem>
                ))}
              </Grid>
            </Grid>
          </Menu>
          {/* End menu About */}
          <Box sx={{ display: { xs: "flex", md: "flex" }, gap: 0 }}>
            <Button
              onClick={() => handleChangeLanguage("vi")}
              sx={{ minWidth: 50, padding: 1 }}
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fviet-nam-flat.png?alt=media&token=ee236707-6f4c-47c4-998f-4ccc2416caf3"
                alt="Vietnamese"
                style={{
                  width: "30px",
                  opacity: i18n.language === "vi" ? 1 : 0.5,
                }}
              />
            </Button>

            <Button
              onClick={() => handleChangeLanguage("en")}
              sx={{ minWidth: 50, padding: 1 }}
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fenglish-flat.webp?alt=media&token=b0c4d065-3f2b-4605-9be3-670dac602b82"
                alt="English"
                style={{
                  width: "30px",
                  opacity: i18n.language === "en" ? 1 : 0.5,
                }}
              />
            </Button>
          </Box>
          {/* Start User Setting */}
          <Box className="grow-0">
            <Box className="flex justify-between">
              {user ? (
                <Typography className="flex">
                  {/* <IconButton
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
                  </IconButton> */}
                  <IconButton
                    type="button"
                    component={Link}
                    to="/cart"
                    aria-label="ShoppingCart"
                    sx={{
                      color: { xs: "#fff", md: "#1c2759" },
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
                        <Avatar alt={user.firstName} src={user.imageUrl} />
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
      <Box
        className="w-full"
        sx={{ ...backgroundConfigs.style.backgroundSecondary }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
            marginX: "auto",
            ...textConfigs.style.basicFont,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              display: { xs: "none", md: "flex" },
            }}
          >
            {/* Search Field */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                px: 2,
                justifyContent: "center",
                width: "100%",
                mb: 1,
              }}
            >
              <Box sx={{ width: "60%" }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder={t("search")}
                  fullWidth
                  inputRef={searchInputRef}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ffffff",
                        borderRadius: "50px",
                      },
                      "&:hover fieldset": { borderColor: "#ffffff" },
                      "&.Mui-focused fieldset": { borderColor: "#ffffff" },
                    },
                    "& .MuiInputBase-input": {
                      color: "#ffffff", // Màu chữ khi nhập
                      caretColor: "#ffffff", // Màu con trỏ chuột
                      "&::placeholder": {
                        color: "#ffffff", // Màu của placeholder
                        opacity: 1, // Đảm bảo placeholder không bị mờ
                      },
                    },
                    ...textConfigs.style.basicFont,
                    mt: 1,
                  }}
                  onChange={debounce(HandleSearch, 1500)}
                  InputProps={{
                    endAdornment: (
                      <Box
                        onClick={() => {
                          console.log("Search icon clicked");
                        }}
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff",
                        }}
                      >
                        <SearchIcon />
                      </Box>
                    ),
                  }}
                />
              </Box>
            </Box>

            {/* Search Results */}
            {searchResults && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%", // Điều chỉnh vị trí dọc của Box
                  left: 0,
                  right: 0,
                  minHeight: "400px", // Đặt chiều cao tối thiểu cho Box ngoài
                  maxHeight: "800px", // Chiều cao tối đa
                  background: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  display: "flex", // Sử dụng flexbox để quản lý layout
                  flexDirection: "column", // Đảm bảo các phần nằm theo chiều dọc
                  gap: 2,
                  px: 2,
                  overflow: "hidden",
                }}
              >
                {/* Colors Section */}
                {searchResults.colors && searchResults.colors.length > 0 && (
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      maxHeight: "100%",
                      overflowY: "auto",
                      pr: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "left",
                        color: "#1c2759",
                        borderBottom: "2px dashed rgba(28, 39, 89, 0.5)",
                        pb: 1,
                        mb: 2,
                        mt: 1,
                        ...textConfigs.style.basicFont,
                      }}
                    >
                      Colors
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        overflowY: "auto",
                        minHeight: "200px", // Đặt chiều cao tối thiểu cho Box ngoài
                        maxHeight: "400px", // Chiều cao tối đa
                      }}
                    >
                      <style>
                        {`
                        ::-webkit-scrollbar {
                          display: none;
                        }
                      `}
                      </style>
                      <Grid container spacing={2} sx={{ marginTop: 1 }}>
                        {searchResults.colors.map((color, index) => (
                          <Grid
                            item
                            xs={6}
                            md={2}
                            key={index}
                            sx={{ padding: "0 !important" }}
                          >
                            <Link
                              to={`/colors/color-family/${
                                color.colorFamily[0].name
                                  ? color.colorFamily[0].name
                                  : "colorfamilyname"
                              }/${
                                color.colorFamily[0].id
                                  ? color.colorFamily[0].id
                                  : "colorfamilyid"
                              }/${color.name}/${color.id}`}
                              className="relative flex flex-col items-center justify-center"
                              style={{
                                textDecoration: "none",
                                transform:
                                  hoveredColor === color.hex
                                    ? "scale(1.1)"
                                    : "scale(1)",
                                transition: "transform 0.3s ease",
                                marginTop: 2,
                              }}
                              onMouseEnter={() => setHoveredColor(color.hex)}
                              onMouseLeave={() => setHoveredColor(null)}
                              onClick={hideResearchResult}
                            >
                              <BsFillHexagonFill
                                size={60}
                                style={{
                                  color: color.hex,
                                  filter: "drop-shadow(0px 0px 4px #ccc)",
                                }}
                              />
                              <span
                                style={{
                                  color: "#3b3730",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                  marginTop: "0.5rem",
                                  ...textConfigs.style.basicFont,
                                  fontSize: "14px",
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  WebkitLineClamp: 1, // Hiển thị tối đa 2 dòng
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {color.name}
                              </span>
                              <span
                                style={{
                                  color: "#3b3730",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                  marginTop: "0.25rem",
                                  ...textConfigs.style.basicFont,
                                  fontSize: "14px",
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  WebkitLineClamp: 1, // Hiển thị tối đa 2 dòng
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {color.hex}
                              </span>
                            </Link>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                )}

                {/* Products Section */}
                {searchResults.products.length > 0 && (
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      maxHeight: "100%",
                      overflowY: "auto",
                      pr: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "left",
                        color: "#1c2759",
                        borderBottom: "2px dashed rgba(28, 39, 89, 0.5)",
                        pb: 1,
                        mb: 2,
                        ...textConfigs.style.basicFont,
                      }}
                    >
                      Products
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        overflowY: "auto",
                        minHeight: "200px", // Đặt chiều cao tối thiểu cho Box ngoài
                        maxHeight: "400px", // Chiều cao tối đa
                        mb: 2,
                      }}
                    >
                      <style>
                        {`
                        ::-webkit-scrollbar {
                          display: none;
                        }
                      `}
                      </style>
                      <Grid container spacing={2}>
                        {searchResults.products.map((product, index) => (
                          <Grid item xs={6} md={3} key={index}>
                            <Link
                              to={`/products/${
                                product.category.name
                                  ? product.category.name
                                  : "category-name"
                              }/${
                                product.category.categoryId
                                  ? product.category.categoryId
                                  : "category-id"
                              }/${product.productName}/${product.productId}`}
                              className="relative flex flex-col items-center justify-center"
                              style={{
                                textDecoration: "none",
                                textAlign: "center",
                              }}
                              onClick={hideResearchResult}
                            >
                              <img
                                src={product.images?.[0]?.url || ""}
                                alt={product.productName}
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                              />
                              <span
                                style={{
                                  color: "#3b3730",
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                  marginTop: "0.5rem",
                                  ...textConfigs.style.basicFont,
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  WebkitLineClamp: 2, // Hiển thị tối đa 2 dòng
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {capitalizeWords(product.productName)}
                              </span>
                            </Link>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                )}

                {searchResults.colors.length === 0 &&
                  searchResults.products.length === 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        minHeight: "50vh",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2F404.png?alt=media&token=a8a59775-5287-4cba-9e45-bb0355e39fa0"
                        alt="No result found"
                        style={{
                          maxWidth: "30%",
                          height: "auto",
                        }}
                      />
                      <Typography
                        color="textSecondary"
                        sx={{
                          ...textConfigs.style.basicFont,
                          my: "1rem",
                          fontSize: "1.2rem",
                        }}
                      >
                        No results match your search criteria.
                      </Typography>
                    </Box>
                  )}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Header;
