import { Box } from '@mui/material';
import React from 'react';

const Container = ({ children }) => {
  return (
    <Box sx={{
      width: { lg: '1152px' },
      mx: 'auto',
      bgcolor: 'white',
      padding: { xs: '0 0 16px 0', md: '0 0 16px 32px' },
      minHeight: '800px',
    }}>
      {children}
    </Box>
  );
};

export default Container;