import { 
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar
} from '@mui/material';
import { useState } from 'react';

const Navbar = () => {

  const [admin, setAdmin] = useState(() => JSON.parse(localStorage.getItem("admin")));
  const [employee, setEmployee] = useState(() => JSON.parse(localStorage.getItem("employee")));

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar sx={{ minHeight: 80, px: 4 }}>
        {/* Logo/Brand */}
        <Box display="flex" alignItems="center" variant="h6" sx={{ fontSize: '1.6rem', fontWeight: 700 }}>
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
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {admin && `${admin.user.firstName} ${admin.user.lastName}`}
              {employee && `${employee.user.firstName} ${employee.user.lastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {admin && admin.user.role}
            {employee && employee.user.role}
            </Typography>
          </Box>
          <Avatar 
            src="/path-to-avatar.jpg"
            sx={{ width: 45, height: 45 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 