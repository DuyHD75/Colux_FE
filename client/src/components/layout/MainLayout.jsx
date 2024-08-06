import React from 'react'
import { Box } from '@mui/material';
import { Outlet } from "react-router-dom";
import Footer from '../footer/Footer';
import Header from "../header/Header";

const MainLayout = () => {
     return (
          <div>
                
                
               <Box className="flex min-h-screen">
                    {/* header */}
                    <Header />
                    {/* header */}

                    {/* main */}
                    <Box className="flex-grow overflow-hidden min-h-screen"
                         component="main"
                    >
                    <Outlet />
                    </Box>
                    {/* main */}
                    
               </Box>
               {/* footer */}
               <Footer />          
               {/* footer */}
          </div>
     )
}

export default MainLayout