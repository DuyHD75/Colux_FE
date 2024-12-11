import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import menuConfigs from "../../config/menu.config";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


export const NavItemsHeader = ({
  setAnchorElNav,
  setAnchorElCategories,
  setAnchorElColors,
  setAnchorElAbout
}) => {
  const { t } = useTranslation();

  const { appState } = useSelector((state) => state.appState);
  console.log();
  return (
    <Box className="grow hidden md:flex justify-center font-nunito">
      {menuConfigs.navItems.map((item, index) => (
        <Link
          to={item.path}
          key={index}
          onClick={(event) => {
            if (item.display === "colors") {
              event.preventDefault();
              setAnchorElColors(event.currentTarget);
            } else if (item.display === "products") {
              event.preventDefault();
              setAnchorElCategories(event.currentTarget);
            } else if (item.display === "about") {
              event.preventDefault();
              setAnchorElAbout(event.currentTarget);
            } else {
              setAnchorElNav(undefined);
            }
          }}
          className={`my-1 mx-2  ${
            appState.includes(item.state) ? "text-[#1D4Ed8]" : "text-[#1c2759]"
          } hover:text-[#1D4Ed8] flex`}
        >
          {t(item.display)}
          {item.display === "colors" || item.display === "products" || item.display === "about" ? (
            <KeyboardArrowDownIcon />
          ) : null}
        </Link>
      ))}
    </Box>
  );
};

export default NavItemsHeader;
