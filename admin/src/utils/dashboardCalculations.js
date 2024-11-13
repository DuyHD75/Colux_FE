const calculateStats = (transactions) => {
  const currentDate = new Date();
  const lastWeek = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Tính toán cho tuần hiện tại
  const currentWeekTransactions = transactions.filter(t => new Date(t.date) >= lastWeek);
  const lastWeekTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date >= new Date(lastWeek.getTime() - 7 * 24 * 60 * 60 * 1000) && date < lastWeek;
  });

  // Tổng doanh thu
  const totalRevenue = transactions.reduce((sum, t) => sum + parseFloat(t.total.replace('$', '')), 0);
  const lastWeekRevenue = lastWeekTransactions.reduce((sum, t) => sum + parseFloat(t.total.replace('$', '')), 0);
  const revenueGrowth = ((totalRevenue - lastWeekRevenue) / lastWeekRevenue) * 100;

  // Số đơn hàng
  const totalOrders = transactions.length;
  const lastWeekOrders = lastWeekTransactions.length;
  const orderGrowth = ((totalOrders - lastWeekOrders) / lastWeekOrders) * 100;

  // Số khách hàng (unique)
  const uniqueCustomers = new Set(transactions.map(t => t.name)).size;
  const lastWeekCustomers = new Set(lastWeekTransactions.map(t => t.name)).size;
  const customerGrowth = ((uniqueCustomers - lastWeekCustomers) / lastWeekCustomers) * 100;

  // Tỷ lệ tăng trưởng
  const growth = revenueGrowth;

  return {
    revenue: {
      value: totalRevenue.toFixed(0),
      percentage: revenueGrowth.toFixed(2),
      trend: revenueGrowth >= 0 ? 'up' : 'down'
    },
    orders: {
      value: totalOrders,
      percentage: orderGrowth.toFixed(2),
      trend: orderGrowth >= 0 ? 'up' : 'down'
    },
    customers: {
      value: uniqueCustomers,
      percentage: customerGrowth.toFixed(2),
      trend: customerGrowth >= 0 ? 'up' : 'down'
    },
    growth: {
      value: `${growth > 0 ? '+' : ''}${growth.toFixed(2)}%`,
      percentage: growth.toFixed(2),
      trend: growth >= 0 ? 'up' : 'down'
    }
  };
};

export { calculateStats }; 