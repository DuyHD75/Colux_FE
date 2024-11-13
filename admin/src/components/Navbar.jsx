import { 
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar
} from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar sx={{ minHeight: 80, px: 4 }}>
        {/* Logo/Brand */}
        <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 500 }}>
          COLUX
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Thomas Anree
            </Typography>
            <Typography variant="body2" color="text.secondary">
              UX Designer
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