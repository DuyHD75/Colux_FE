import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import menuConfigs from "../../config/menu.config";
import { useSelector } from "react-redux";

export const NavItemsHeader = ({
  setAnchorElNav,
  setAnchorElCategories,
  setAnchorElColors,
  setAnchorElAbout
}) => {
  const { appState } = useSelector((state) => state.appState);
  console.log();
  return (
    <Box className="grow hidden md:flex justify-center font-['Nunito']">
      {menuConfigs.navItems.map((item, index) => (
        <Link
          to={item.path}
          key={index}
          onClick={(event) => {
            if (item.display === "Colors") {
              event.preventDefault();
              setAnchorElColors(event.currentTarget);
            } else if (item.display === "Products") {
              event.preventDefault();
              setAnchorElCategories(event.currentTarget);
            } else if (item.display === "About") {
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
          {item.display}
          {item.display === "Colors" || item.display === "Products" || item.display === "About" ? (
            <KeyboardArrowDownIcon />
          ) : null}
        </Link>
      ))}
    </Box>
  );
};

export default NavItemsHeader;
