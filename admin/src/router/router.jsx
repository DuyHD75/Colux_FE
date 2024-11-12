import AddProduct from "../page/AddProduct";
import Home from "../page/Home";
import ManageFloor from "../page/ManageFloor";
import ManagePaint from "../page/ManagePaint";
import ManageUser from "../page/ManageUser";
import ManageWallpaper from "../page/ManageWallpaper";

export const routesGen = {
  home: "/",
  manageUser: "/manageUser",
  addProduct: "/addProduct",
  managePaint: "/managePaint",
  ManageFloor: "/ManageFloor",
  manageWallpaper: "/manageWallpaper",
};

const routes = [
  {
    index: true,
    element: <Home />,
    state: "home",
  },
  {
    path: routesGen.manageUser,
    element: <ManageUser />,
    state: "manageUser",
  },
  {
    path: routesGen.addProduct,
    element: <AddProduct />,
    state: "addProduct",
  },
  {
    path: routesGen.managePaint,
    element: <ManagePaint />,
    state: "managePaint",
  },
  {
    path: routesGen.ManageFloor,
    element: <ManageFloor />,
    state: "manageFloor",
  },
  {
    path: routesGen.manageWallpaper,
    element: <ManageWallpaper />,
    state: "manageWallpaper",
  },
  
    

]
export default routes;