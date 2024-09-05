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

  const handleCategoryClick = (path) => {
    handleCloseCategoriesMenu();
  };

  const columnsNav = menuConfigs.navItems.reduce((acc, curr, index) => {
    const columnIndex = Math.floor(index / 4);
    if (!acc[columnIndex]) {
      acc[columnIndex] = [];
    }
    acc[columnIndex].push(curr);
    return acc;
  }, []);

  return (
    <AppBar
      className="fixed top-0 left-0 right-0 z-10 font-['Nunito']"
      sx={{ ...BackgroundColor.style.backgroundPrimary }}
    >
      <Container maxWidth="lg">
        <SubHeader />
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
              color: "inherit",
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
                        if (item.display === "Colors") {
                          // event.preventDefault();
                          // setAnchorElColors(event.currentTarget);
                        } else if (item.display === "Products") {
                          // event.preventDefault();
                          // setAnchorElCategories(event.currentTarget);
                        } else {
                          handleCloseNavMenu(event);
                        }
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
              {/* <Menu
                sx={{ mt: "45px" }}
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
                {colorFamilies.map((color, index) => (
                  <MenuItem
                    key={index}
                    onClick={handleCloseColorsMenu}
                    sx={{ minWidth: "120px" }}
                  >
                    <Typography textAlign="center">{color.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Menu
                sx={{ mt: "45px" }}
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
                  {categories.map((category, index) => (
                        <MenuItem
                          key={index}
                          onClick={handleCloseCategoriesMenu}
                          sx={{ minWidth: "120px" }}
                        >
                          <Typography textAlign="center">
                            {category.name}
                          </Typography>
                        </MenuItem>
                  ))}
              </Menu> */}
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
          />
          {/* End nav items */}

          {/* Start menu colors */}
          <Menu
            sx={{ mt: "45px", paddingTop: 0 }}
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
                width: "50vw",
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
                      to={`/colors/${item.name}`}
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
                <MenuItem
                  container
                  maxWidth={"lg"}
                  key="allCollections"
                  onClick={handleCloseColorsMenu}
                  className="min-w-[120px] py-0"
                >
                  <Link
                    to={`/colors/collections/`}
                    key="allCollections"
                    className="text-[#1c2759] capitalize justify-start text-base font-['Nunito']"
                  >
                    All Collections
                  </Link>
                </MenuItem>
              </Grid>
            </Grid>
          </Menu>
          {/* End menu colors */}

          {/* Start menu Products */}
          <Menu
            sx={{ mt: "45px", padding: 0 }}
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
                width: "50vw",
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
                    onClick={() => handleCategoryClick(`/products/${item.name}`)}
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
                  onClick={handleCloseColorsMenu}
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

          {/* search */}
          {/* <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              width: 250,
              height: 40,
              mx: 2,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search..." }}
            />
            <IconButton
              component={Link}
              to="/products"
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper> */}

          {/* Start User Setting */}
          <Box className="grow-0">
            <Box className="flex justify-between">
              {user === null ? (
                <Typography className="flex">
                  <MenuItem className="p-0">
                    <Link
                      component={Link}
                      to="/login"
                      className="text-white capitalize text-center text-base hover:text-[#6dacd5]"
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
                    color="inherit"
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    type="button"
                    component={Link}
                    to="/carts"
                    aria-label="ShoppingCart"
                    color="inherit"
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                  <Tooltip title="Name of User">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: "10px" }}>
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
              sx={{ mt: "55px" }}
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
