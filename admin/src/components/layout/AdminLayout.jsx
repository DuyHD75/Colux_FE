import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const AdminLayout = () => {
  return (
    <Box>
      <Navbar />
      <Box sx={{ mt: 8, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout; 