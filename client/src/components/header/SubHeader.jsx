import { Box, Typography, Button, MenuItem } from "@mui/material/";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import menuConfigs from "../../config/menu.config";
import { Link } from "react-router-dom";
import BackgroundConfigs from "../../config/background.config";

export const SubHeader = () => {
  return (
    <Box className="hidden md:flex justify-between items-center rounded-[230px] py-px mx-auto font-['Nunito']" 
     sx={{ ...BackgroundConfigs.style.backgroundSecondary}}
    >
      <Typography variant="body1" className="text-white flex">
        <MenuItem className="capitalize" sx={{ cursor: "default", fontSize: "12px"}}>
          <LocationOnIcon className="mr-0.5" sx={{fontSize: "12px"}}/>
          Da Nang, Viet Nam
        </MenuItem>
        <MenuItem className="" sx={{ cursor: "default", fontSize: "12px"}}>
          <EmailIcon className="mr-0.5" sx={{fontSize: "12px"}}/>
          kolux7529@gmail.com
        </MenuItem>
        <MenuItem className="capitalize" sx={{ cursor: "default", fontSize: "12px"}}>
          <PhoneIcon className="mr-0.5" sx={{fontSize: "12px", }}/>
          0123456789
        </MenuItem>
      </Typography>
      
      <Typography variant="body1" className="flex">
        {menuConfigs.termItems.map((item, index) => (
          <MenuItem>
            <Link
              to={item.path}
              key={index}
              className="text-white capitalize text-xs hover:text-[#6dacd5]"
            >
              {item.display}
            </Link>
          </MenuItem>
        ))}
      </Typography>
    </Box>
  );
};

export default SubHeader;
