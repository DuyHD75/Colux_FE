import Dashboard from "../page/Dashboard";
import AddProduct from "../page/AddProduct";
import ManagePaint from "../page/ManagePaint";
import ManageUser from "../page/ManageUser";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

export const adminRoutesGen = {
  dashboard: "/admins/dashboard",
  addProduct: "/admins/add-product",
  managePaint: "/admins/manage-paint",
  manageUser: "/admins/manage-user",
};

const adminRoutes = [
  {
    path: "/admins/*",
    element: (
      <ProtectedRoute>
        <AdminLayout />
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
        state: "dashboard",
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        state: "dashboard",
      },
      {
        path: "add-product",
        element: <AddProduct />,
        state: "addProduct",
      },
      {
        path: "manage-paint",
        element: <ManagePaint />,
        state: "managePaint",
      },
      {
        path: "manage-user",
        element: <ManageUser />,
        state: "manageUser",
      },
    ],
  },
];

export default adminRoutes;