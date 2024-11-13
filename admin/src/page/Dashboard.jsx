import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import TopProducts from "../components/dashboard/TopProducts";
import LatestTransaction from "../components/dashboard/LatestTransaction";
import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import adminApi from "../api/modules/admin.api";
import { setDashboardData } from "../redux/reducer/dashboardSlice";
import LoadingScreen from "../components/common/LoadingScreen";
import ErrorAlert from "../components/common/ErrorAlert";
import UserRegistrationChart from "../components/dashboard/UserRegistrationChart";
import RevenueWeekChart from "../components/dashboard/RevenueWeekChart";
import EarningsChart from "../components/dashboard/EarningsChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.admin);
  const dashboardData = useSelector((state) => state.dashboard.dashboard);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { response, err } = await adminApi.getDashboard();
        console.log("API Response:", response);

        if (response && response.code === 200) {
          dispatch(setDashboardData(response.data.dashboard));
        } else {
          setError(err?.message || "Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dispatch]);
  // Log để kiểm tra cấu trúc dữ liệu
  console.log("Profit Data:", dashboardData?.profit);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorAlert error={error} />;


  return (
    <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Stats Overview */}
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              type="customers"
              title="Total Customers"
              value={dashboardData?.customers?.value}
              icon={"ant-design:android-filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              type="products"
              title="Total Products"
              value={dashboardData?.totalProduct}
              icon={"ant-design:android-filled"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              type="orders"
              title="Total Orders"
              value={dashboardData?.totalOrder}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="delivery"
              title="Total Shipping"
              value={dashboardData?.totalShipping}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="ratings"
              title="Total Review"
              value={dashboardData?.totalReview}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="suppliers"
              title="Total Suppliers"
              value={dashboardData?.totalSupplier}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="brands"
              title="Total Brands"
              value={dashboardData?.totalBrand}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <SalesChart
              monthlyRevenueData={dashboardData?.monthlyRevenueData || []}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EarningsChart monthlyData={dashboardData?.monthlyData || []} />
          </Grid>

          <Grid item xs={12} md={8}>
            <UserRegistrationChart data={dashboardData.registrations} />
          </Grid>

          <Grid item xs={12} md={4}>
            <RevenueWeekChart
              thisWeekData={dashboardData?.thisWeekData || []}
              lastWeekData={dashboardData?.lastWeekData || []}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TopProducts products={dashboardData.products} />
          </Grid>
          <Grid item xs={12} md={8}>
            <LatestTransaction transactions={dashboardData.transactions} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
