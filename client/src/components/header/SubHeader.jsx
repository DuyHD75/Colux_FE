import { Box, Typography, MenuItem, Container } from "@mui/material/";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import menuConfigs from "../../config/menu.config";
import { Link } from "react-router-dom";
import BackgroundConfigs from "../../config/background.config";
import textConfigs from "../../config/text.config";
import { useTranslation } from "react-i18next";

export const SubHeader = () => {
  const { t } = useTranslation();

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
            sx={{ cursor: "default", fontSize: "12px", paddingLeft: "0", ...textConfigs.style.basicFont, }}
          >
            <LocationOnIcon className="mr-0.5" sx={{ fontSize: "12px", ...textConfigs.style.basicFont, }} />
            Da Nang, Viet Nam
          </MenuItem>
          <MenuItem className="" sx={{ cursor: "default", fontSize: "12px", ...textConfigs.style.basicFont,}}>
            <EmailIcon className="mr-0.5" sx={{ fontSize: "12px", ...textConfigs.style.basicFont, }} />
            coluxalpha@gmail.com
          </MenuItem>
          <MenuItem
            className="capitalize"
            sx={{ cursor: "default", fontSize: "12px", ...textConfigs.style.basicFont, }}
          >
            <PhoneIcon className="mr-0.5" sx={{ fontSize: "12px", ...textConfigs.style.basicFont, }} />
            0327113934
          </MenuItem>
        </Typography>

        <Typography variant="body1" className="flex">
          {menuConfigs.termItems.map((item, index) => (
            <MenuItem key={index}>
              <Link
                to={item.path}
                className="text-white capitalize text-xs hover:text-[#6dacd5] font-nunito"
                style={{ ...textConfigs.style.basicFont, }}
              >
                {t(item.display)}
              </Link>
            </MenuItem>
          ))}
        </Typography>
      </Container>
    </Box>
  );
};

export default SubHeader;
