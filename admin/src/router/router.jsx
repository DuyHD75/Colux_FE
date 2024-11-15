import Dashboard from "../page/Dashboard";
import AddProduct from "../page/AddProduct";
import ManageUser from "../page/ManageUser";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ManageProduct from "../page/ManageProduct";
import Login from "../page/Auth"
import ManageOrder from "../page/ManageOrder";
import OrderDetails from "../page/OrderDetails";

export const routesGen = {
  manageUser: "/manageUser",
  addProduct: "/add-product",
  manageProduct: "/manage-products",
  dashboard: "/dashboard",
  managePaint: "/manage-paint",
  manageOrder: "/manage-orders",
  orderDetails: "/orderDetails/:id",
};
const routes = [
  {
    index: true,
    element: <Login />,
    state: "login",
  },
  {
    path: "/login",
    element: <Login />,
    state: "login",
  },
  {
    path: routesGen.dashboard,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    state: "dashboard"
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
  {
    path: routesGen.manageOrder,
    element: <ManageOrder />,
    state: "manageOrders",
  },
  {
    path: routesGen.orderDetails,
    element: <OrderDetails />,
    state: "orderDetails",
  },
]
export default routes;
