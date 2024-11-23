import Dashboard from "../page/Dashboard";
import AddProduct from "../page/AddProduct";
import ManageUser from "../page/ManageUser";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ProtectedEmployeeRoute from "../components/common/ProtectedEmployeeRoute";
import ManageProduct from "../page/ManageProduct";
import Login from "../page/Auth";
import ManageOrder from "../page/ManageOrder";
import OrderDetails from "../page/OrderDetails";
import CreateOrder from "../page/CreateOrder";

export const routesGen = {
  manageUser: "/manageUser",
  addProduct: "/add-product",
  manageProduct: "/manage-products",
  dashboard: "/dashboard",
  managePaint: "/manage-paint",
  manageOrder: "/manage-orders",
  orderDetails: "/orderDetails/:id",
  createOrder: "/create-order",
};
const routes = [
  {
    index: true,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    state: "dashboard",
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
    state: "dashboard",
  },
  {
    path: routesGen.manageUser,
    element: (
      <ProtectedRoute>
        <ManageUser />
      </ProtectedRoute>
    ),
    state: "manageUser",
  },
  {
    path: routesGen.addProduct,
    element: (
      <ProtectedEmployeeRoute>
        <AddProduct />
      </ProtectedEmployeeRoute>
    ),
    state: "addProduct",
  },
  {
    path: routesGen.manageProduct,
    element: (
      <ProtectedEmployeeRoute>
        <ManageProduct />
      </ProtectedEmployeeRoute>
    ),
    state: "manageProduct",
  },
  {
    path: routesGen.manageOrder,
    element: (
      <ProtectedEmployeeRoute>
        <ManageOrder />
      </ProtectedEmployeeRoute>
    ),
    state: "manageOrders",
  },
  {
    path: routesGen.orderDetails,
    element: (
      <ProtectedEmployeeRoute>
        <OrderDetails />
      </ProtectedEmployeeRoute>
    ),
    state: "orderDetails",
  },
  {
    path: routesGen.createOrder,
    element: (
      <ProtectedEmployeeRoute>
        <CreateOrder />
      </ProtectedEmployeeRoute>
    ),
    state: "createOrder",
  },
];
export default routes;
