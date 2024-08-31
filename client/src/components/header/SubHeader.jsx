import { Box, Typography, MenuItem, Container } from "@mui/material/";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import menuConfigs from "../../config/menu.config";
import { Link } from "react-router-dom";
import BackgroundConfigs from "../../config/background.config";
import textConfigs from "../../config/text.config";

export const SubHeader = () => {
  return (
    <Box
      className="w-full"
      sx={{ ...BackgroundConfigs.style.backgroundSecondary }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
          marginX: "auto",
          ...textConfigs.style.basicFont,
        }}
      >
        <Typography variant="body1" className="text-white flex">
          <MenuItem
            className="capitalize"
            sx={{ cursor: "default", fontSize: "12px", paddingLeft: "0" }}
          >
            <LocationOnIcon className="mr-0.5" sx={{ fontSize: "12px" }} />
            Da Nang, Viet Nam
          </MenuItem>
          <MenuItem className="" sx={{ cursor: "default", fontSize: "12px" }}>
            <EmailIcon className="mr-0.5" sx={{ fontSize: "12px" }} />
            kolux7529@gmail.com
          </MenuItem>
          <MenuItem
            className="capitalize"
            sx={{ cursor: "default", fontSize: "12px" }}
          >
            <PhoneIcon className="mr-0.5" sx={{ fontSize: "12px" }} />
            0123456789
          </MenuItem>
        </Typography>

        <Typography variant="body1" className="flex">
          {menuConfigs.termItems.slice(0, -1).map((item, index) => (
            <MenuItem key={index}>
              <Link
                to={item.path}
                className="text-white capitalize text-xs hover:text-[#6dacd5]"
              >
                {item.display}
              </Link>
            </MenuItem>
          ))}
          <MenuItem
            sx={{ paddingRight: 0 }}
            key={menuConfigs.termItems.length - 1}
          >
            <Link
              to={menuConfigs.termItems[menuConfigs.termItems.length - 1].path}
              className="text-white capitalize text-xs hover:text-[#6dacd5]"
            >
              {menuConfigs.termItems[menuConfigs.termItems.length - 1].display}
            </Link>
          </MenuItem>
        </Typography>
      </Container>
    </Box>
  );
};

export default SubHeader;
