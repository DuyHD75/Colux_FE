import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import textConfigs from '../config/text.config';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px', marginTop: "152px"}}>
            {/* <h1 style={{ fontSize: '4rem', color: '#ff5252' }}>404</h1> */}
            <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    my: "2rem",
                  }}
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2F404.png?alt=media&token=a8a59775-5287-4cba-9e45-bb0355e39fa0"
                    alt="No products found"
                    style={{
                      maxWidth: "100%",
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
                    Oops! The page you're looking for doesn't exist.
                  </Typography>
                </Box>
        </div>
    );
};

export default NotFound;