import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { Link } from "react-router-dom";
import SubHeader from "./SubHeader";
import NavItemsHeader from "./NavItemsHeader";
import BackgroundColor from "../../config/background.config";

export const Header = () => {
  const { colorFamilies } = useSelector((state) => state.colorFamilies);
  const { categories } = useSelector((state) => state.categories);
  const { collections } = useSelector((state) => state.collections);
  const { user } = useSelector((state) => state.user);

  const [anchorElNav, setAnchorElNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(false);
  const [anchorElColors, setAnchorElColors] = useState(false);
  const [anchorElCategories, setAnchorElCategories] = useState(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [anchorElAbout, setAnchorElAbout] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenColorsMenu = (event) => {
    setAnchorElColors(event.currentTarget);
  };

  const handleOpenCategoriesMenu = (event) => {
    setAnchorElCategories(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseColorsMenu = () => {
    setAnchorElColors(null);
  };

  const handleCloseCategoriesMenu = () => {
    setAnchorElCategories(null);
    setIsCategoriesMenuOpen(false); 
  };

  const handleCloseAboutMenu = () => {
    setAnchorElAbout(null);
  }

  const handleCategoryClick = (path) => {
    handleCloseCategoriesMenu();
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
                {menuConfigs.navItems.map((item, index) => (
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
                        {item.display}
                      </Button>
                    </MenuItem>
                  </Grid>
                ))}
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
            setAnchorElAbout={setAnchorElAbout }
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
                  Colors
                </h2>
                {colorFamilies.map((item, index) => (
                  <MenuItem
                    container
                    maxWidth={"lg"}
                    key={index}
                    onClick={handleCloseColorsMenu}
                    className="min-w-[120px] py-0"
                  >
                    <Link
                      to={`/colors/color-family/${item.name}`}
                      key={index}
                      className="text-[#1c2759] capitalize justify-start text-base font-['Nunito']"
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem
                  container
                  maxWidth={"lg"}
                  key="allColors"
                  onClick={handleCloseColorsMenu}
                  className="min-w-[120px] py-0"
                >
                  <Link
                    to={`/colors/`}
                    key="allColors"
                    className="text-[#1c2759] capitalize justify-start text-base font-['Nunito']"
                  >
                    All Colors
                  </Link>
                </MenuItem>
              </Grid>
              <Grid item xs={6} key="Collections">
                <h2 className="px-[16px] py-[6px] text-[#1c2759] font-bold">
                  Collections
                </h2>
                {collections.map((item, index) => (
                  <MenuItem
                    container
                    maxWidth={"lg"}
                    key={index}
                    onClick={handleCloseColorsMenu}
                    className="min-w-[120px] py-0"
                  >
                    <Link
                      to={`/colors/collections/${item.name}`}
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
                  Products
                </h2>
                {categories.map((item, index) => (
                  <MenuItem
                    container
                    maxWidth={"lg"}
                    key={index}
                    onClick={() => handleCategoryClick(`/products/${item.name.replace(/\s+/g, "-")}`)} // Thay khoảng trắng bằng dấu gạch ngang
                    className="min-w-[120px] py-0"
                  >
                    <Link
                      to={`/products/${item.name}`}
                      key={index}
                      className="text-[#1c2759] capitalize justify-start text-base font-['Nunito']"
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem
                  container
                  maxWidth={"lg"}
                  key="allProducts"
                  onClick={handleCloseCategoriesMenu}
                  className="min-w-[120px] py-0"
                >
                  <Link
                    to={`/products/`}
                    key="allProducts"
                    className="text-[#1c2759] capitalize justify-start text-base font-['Nunito']"
                  >
                    All Products
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
                  About
                </h2>
                {menuConfigs.aboutMenu.map((item, index) => (
                  <MenuItem
                    container
                    maxWidth={"lg"}
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

          {/* Start User Setting */}
          <Box className="grow-0">
            <Box className="flex justify-between">
              {user === null ? (
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
                      Login
                    </Link>
                  </MenuItem>
                </Typography>
              ) : (
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
                    to="/carts"
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
                  <Tooltip title="Name of User">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: "10px",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="https://play-lh.googleusercontent.com/4qAz40o6M5w6hJ62VsjwGbYueB0fRWPmiG1yOZpNHn3qo2uzlhZZ1mwE5jtBlPp3Lw=w600-h300-pc0xffffff-pd"
                      />
                    </IconButton>
                  </Tooltip>
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
              <MenuItem key="logout" onClick={handleCloseUserMenu}>
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
