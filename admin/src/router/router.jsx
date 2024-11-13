import AddProduct from "../page/AddProduct";
import Home from "../page/Home";
import ManageProduct from "../page/ManageProduct";
import ManageUser from "../page/ManageUser";

export const routesGen = {
  home: "/",
  manageUser: "/manageUser",
  addProduct: "/add-product",
  manageProduct: "/manage-products",
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
    path: routesGen.manageProduct,
    element: <ManageProduct />,
    state: "manageProduct",
  },
]
export default routes;