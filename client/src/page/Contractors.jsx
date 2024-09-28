import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Tabs,
  Tab,
  TextField,
  Box,
  Pagination,
  Avatar,
  Stack,
} from '@mui/material';
import { styled } from '@mui/system';

// Dữ liệu mẫu
const services = ["All", "Construction", "Renovation", "Interior Design"];
const contractorsData = [
  { id: 1, name: "BuildCo", rating: 4.5, service: "Construction", location: "New York", featured: true },
  { id: 2, name: "RenovatePro", rating: 4.0, service: "Renovation", location: "Los Angeles", featured: false },
  { id: 3, name: "DesignMasters", rating: 4.8, service: "Interior Design", location: "Chicago", featured: true },
  { id: 4, name: "HomeBuilders", rating: 3.9, service: "Construction", location: "Houston", featured: false },
  { id: 5, name: "RenovaHome", rating: 4.2, service: "Renovation", location: "Phoenix", featured: false },
  { id: 6, name: "InteriorPros", rating: 4.7, service: "Interior Design", location: "Philadelphia", featured: true },
  { id: 7, name: "ConstructIt", rating: 4.1, service: "Construction", location: "San Antonio", featured: false },
  { id: 8, name: "RenovExperts", rating: 4.3, service: "Renovation", location: "San Diego", featured: true },
  { id: 9, name: "DesignGenius", rating: 4.6, service: "Interior Design", location: "Dallas", featured: false },
  { id: 10, name: "BuildRight", rating: 3.8, service: "Construction", location: "San Jose", featured: false },
  // Thêm nhiều nhà thầu hơn để phân trang
];

// Styled component cho Banner
const Banner = styled(Box)(({ theme }) => ({
  height: 300,
  backgroundImage: 'url(/images/contractors-banner.jpg)', // Đảm bảo bạn có hình ảnh này trong thư mục public/images
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
}));

const ContractorsPage = () => {
  const [selectedService, setSelectedService] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Bộ lọc theo dịch vụ và tìm kiếm
  const filteredContractors = contractorsData.filter((contractor) =>
    (services[selectedService] === "All" || contractor.service === services[selectedService]) &&
    contractor.name.toLowerCase().includes(search.toLowerCase())
  );

  // Phân trang
  const paginatedContractors = filteredContractors.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredContractors.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang khi thay đổi trang
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      {/* Banner */}
      <Banner>
        <Typography variant="h3" align="center">
          Our Partner Contractors
        </Typography>
      </Banner>

      {/* Giới Thiệu Ngắn */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Trusted Professionals for Your Projects
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We collaborate with top-rated contractors to ensure your projects are completed with excellence and precision.
        </Typography>
      </Box>

      {/* Thanh Tìm Kiếm */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <TextField
          label="Search contractors by name"
          variant="outlined"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }} // Reset trang khi tìm kiếm
          sx={{ width: '50%' }}
        />
      </Box>

      {/* Tabs Bộ Lọc Dịch Vụ */}
      <Tabs
        value={selectedService}
        onChange={(e, newValue) => { setSelectedService(newValue); setPage(1); }} // Reset trang khi thay đổi bộ lọc
        centered
        sx={{ mt: 3 }}
      >
        {services.map((service, index) => (
          <Tab key={index} label={service} />
        ))}
      </Tabs>

      {/* Contractor Cards */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {paginatedContractors.map((contractor) => (
          <Grid item xs={12} sm={6} md={4} key={contractor.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{contractor.name}</Typography>
                <Typography variant="body2" color="textSecondary">Location: {contractor.location}</Typography>
                <Typography variant="body2" color="textSecondary">Service: {contractor.service}</Typography>
                <Rating value={contractor.rating} readOnly precision={0.5} sx={{ mt: 1 }} />
              </CardContent>
              <Button variant="contained" fullWidth sx={{ mt: 'auto' }}>Contact</Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>

      {/* Featured Contractors */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Featured Contractors
        </Typography>
        <Grid container spacing={4}>
          {contractorsData.filter(c => c.featured).map((contractor) => (
            <Grid item xs={12} sm={6} md={4} key={contractor.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{contractor.name}</Typography>
                  <Typography variant="body2" color="textSecondary">Location: {contractor.location}</Typography>
                  <Typography variant="body2" color="textSecondary">Service: {contractor.service}</Typography>
                  <Rating value={contractor.rating} readOnly precision={0.5} sx={{ mt: 1 }} />
                </CardContent>
                <Button variant="contained" fullWidth sx={{ mt: 'auto' }}>View Profile</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials */}
      <Box sx={{ mt: 6, backgroundColor: '#e0f7fa', p: 4, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          What Our Clients Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ padding: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar alt="Client 1" src="/images/client1.jpg" />
                <Typography variant="subtitle1">Emily R.</Typography>
              </Stack>
              <Typography variant="body2" sx={{ mt: 2 }}>
                "BuildCo transformed our home with professionalism and attention to detail. Highly recommended!"
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ padding: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar alt="Client 2" src="/images/client2.jpg" />
                <Typography variant="subtitle1">Michael S.</Typography>
              </Stack>
              <Typography variant="body2" sx={{ mt: 2 }}>
                "RenovatePro delivered exceptional results on our kitchen remodel. Their team was fantastic to work with."
              </Typography>
            </Card>
          </Grid>
          {/* Thêm nhiều testimonial hơn nếu cần */}
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 6, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
        <Typography variant="body2">
          Contact us: info@yourcompany.com | +1 (123) 456-7890
        </Typography>
      </Box>
    </Container>
  );
};

export default ContractorsPage;
