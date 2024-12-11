import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import {
  Dashboard,
  ShoppingCart,
  People,
  Inbox,
  ExpandLess,
  ExpandMore,
  ExitToApp,
} from "@mui/icons-material";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { Link, useNavigate } from "react-router-dom";
import textConfigs from "../../config/text.config";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../redux/reducer/adminSlice";
import adminApi from "../../api/modules/admin.api";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [openEcommerce, setOpenEcommerce] = React.useState(false);
  const admin = localStorage.getItem("admin");
  const employee = localStorage.getItem("employee");

  const handleClick = () => {
    setOpenEcommerce(!openEcommerce);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { response, err } = await adminApi.logout();
    if (response) {
      dispatch(setAdmin(null));
      localStorage.removeItem("admin");
      localStorage.removeItem("employee");
      navigate("/login");
      toast.success("Logout Success.");
    } else {
      toast.error("Error while logout.");
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f8f9fa",
          color: "#333",
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="16px"
      >
        <img
          src="https://flowbite.s3.amazonaws.com/brand/logo-dark/mark/flowbite-logo.png"
          alt="Logo"
          style={{ height: "40px", marginRight: "8px" }}
        />
        <Typography
          variant="h5"
          color="#333"
          sx={{ ...textConfigs.style.basicFont }}
        >
          Kolux
        </Typography>
      </Box>
      <List>
        {/* Dashboard */}
        {admin && (
          <ListItem component={Link} to="/dashboard">
            <ListItemIcon>
              <Dashboard style={{ color: "#666" }} />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={{ ...textConfigs.style.basicFont }}
            />
          </ListItem>
        )}
        {/* E-commerce Menu */}
        <ListItem onClick={handleClick}>
          <ListItemIcon>
            <ShoppingCart style={{ color: "#666" }} />
          </ListItemIcon>
          <ListItemText
            primary="E-commerce"
            sx={{ ...textConfigs.style.basicFont }}
          />
          {openEcommerce ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openEcommerce} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem component={Link} to="/manage-products" sx={{ pl: 4 }}>
              <ListItemText
                primary="Products"
                sx={{ ...textConfigs.style.basicFont }}
              />
            </ListItem>
            {/* <ListItem component={Link} to="#" sx={{ pl: 4 }}>
              <ListItemText
                primary="Billing"
                sx={{ ...textConfigs.style.basicFont }}
              />
            </ListItem> */}
            <ListItem component={Link} to="/manage-orders" sx={{ pl: 4 }}>
              <ListItemText
                primary="Orders"
                sx={{ ...textConfigs.style.basicFont }}
              />
            </ListItem>
          </List>
        </Collapse>
        <ListItem component={Link} to="/manage-colors">
          <ListItemIcon>
            <ColorLensIcon style={{ color: "#666" }} />
          </ListItemIcon>
          <ListItemText
            primary="Color"
            sx={{ ...textConfigs.style.basicFont }}
          />
        </ListItem>
        {/* Inbox */}
        {/* <ListItem component={Link} to="#">
          <ListItemIcon>
            <Inbox style={{ color: "#666" }} />
          </ListItemIcon>
          <ListItemText
            primary="Inbox"
            sx={{ ...textConfigs.style.basicFont }}
          />
        </ListItem> */}
        {admin && (
        <ListItem component={Link} to="/manage-users">
          <ListItemIcon>
            <People style={{ color: "#666" }} />
          </ListItemIcon>
          <ListItemText
            primary="Users"
            sx={{ ...textConfigs.style.basicFont }}
          />
        </ListItem>
        )}
        <ListItem component={Link} to="#" onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp style={{ color: "#666" }} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            sx={{ ...textConfigs.style.basicFont }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
