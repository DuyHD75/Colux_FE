import { 
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import textConfigs from "../config/text.config";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setAdmin } from "../redux/reducer/adminSlice";


const Navbar = () => {
  const { admin } = useSelector((state) => state.admin);
  const [admin1, setAdmin1] = useState(() => JSON.parse(localStorage.getItem("admin")));
  const [employee, setEmployee] = useState(() => JSON.parse(localStorage.getItem("employee")));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (admin === true) {
      setEmployee(JSON.parse(localStorage.getItem("employee")));
      setAdmin1(JSON.parse(localStorage.getItem("admin")));
      dispatch(setAdmin(false));
    }
  }, [admin]);

  console.log(admin1);

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar sx={{ minHeight: 80, px: 4 }}>
        {/* Logo/Brand */}
        <Box display="flex" alignItems="center" variant="h6" sx={{ fontSize: '1.6rem', fontWeight: 700, ...textConfigs.style.basicFont }}>
        <img
              src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Flogo-icon.svg?alt=media&token=039706dc-1908-40c7-b42f-755ed24a70f5" 
              alt="Colux Logo"
              style={{
                width: "40px", 
                height: "40px",
                marginRight: "8px", 
              }}
            />
            LUX
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, ...textConfigs.style.basicFont }}>
              {admin1 && `${admin1.user.firstName} ${admin1.user.lastName}`}
              {employee && `${employee.user.firstName} ${employee.user.lastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ...textConfigs.style.basicFont }}>
            {admin1 && admin1.user.role}
            {employee && employee.user.role}
            </Typography>
          </Box>
          <Avatar 
            src={admin1?.user.imageUrl || employee?.user.imageUrl || "/path-to-avatar.jpg"}
            sx={{ width: 45, height: 45 }}
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 