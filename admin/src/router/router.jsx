import Dashboard from "../page/Dashboard";
import AddProduct from "../page/AddProduct";
import ManagePaint from "../page/ManagePaint";
import ManageUser from "../page/ManageUser";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Home from "../page/Home";
import ManageProduct from "../page/ManageProduct";

export const routesGen = {
  home: "/",
  manageUser: "/manageUser",
  addProduct: "/add-product",
  manageProduct: "/manage-products",
  dashboard: "/admins/dashboard",
  managePaint: "/admins/manage-paint",
};
const routes = [
  {
    path: "/*",
    element: (
      <ProtectedRoute>
        <AdminLayout />
        <Dashboard />
      </ProtectedRoute>
    ),
  
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
