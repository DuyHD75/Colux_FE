import React, { Fragment, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Tabs,
  Tab,
  Box,
  TextField,
  Pagination,
  Avatar,
  Divider,
} from "@mui/material";
import data from "../data/data";
import Navigate from "../components/commons/Navigate";

const AdvisoryPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(-1); // Default to 'All'
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  const rooms = data.rooms; // Data for rooms
  const blogs = data.blogs;

  // Filter blogs based on room ID and search query
  const filteredBlogs = blogs
    .filter(
      (blog) =>
        (selectedRoom === -1 || blog.roomId === selectedRoom) &&
        blog.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice((page - 1) * itemsPerPage, page * itemsPerPage); // Pagination

  // Total number of filtered blogs
  const totalFilteredBlogs = blogs.filter(
    (blog) =>
      (selectedRoom === -1 || blog.roomId === selectedRoom) &&
      blog.title.toLowerCase().includes(search.toLowerCase())
  ).length;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Fragment>
      <Box sx={{ marginTop: { xs: "56px", md: "96px" } }}></Box>
      <Navigate />
      <Box
        sx={{
          height: "800px",
          backgroundImage:
            "url(https://i.ytimg.com/vi/jFN4M8Ax3JQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD_-aF-X7ETmxU3nrBUCldHcTkI1Q)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h3">Expert Paint Color Suggestions</Typography>
      </Box>

      <Container maxWidth="lg" sx={{ my: 5 }}>
        {/* Search Bar */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <TextField
            label="Search blogs"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "50%" }}
          />
        </Box>

        {/* Tabs for Rooms */}
        <Tabs
          value={selectedRoom}
          onChange={(e, newValue) => setSelectedRoom(newValue)}
          centered
          sx={{ mt: 3 }}
        >
          <Tab label="All" value={-1} /> {/* Tab All */}
          {rooms.map((room) => (
            <Tab key={room.id} label={room.name} value={room.id} />
          ))}
        </Tabs>

        {/* Blog Suggestions */}
        {filteredBlogs.length > 0 ? (
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {filteredBlogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={blog.img}
                    alt={blog.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6">{blog.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {blog.description}
                    </Typography>
                    <Typography variant="subtitle2">
                      Expert: {blog.expert}
                    </Typography>
                  </CardContent>
                  <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                    See Details
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No blogs found.
          </Typography>
        )}

        {/* Pagination */}
        {totalFilteredBlogs > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(totalFilteredBlogs / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        )}

        {/* Expert Profiles */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Meet Our Experts
          </Typography>
          <Grid container spacing={4}>
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.expert}>
                <Card>
                  <CardContent>
                    <Avatar
                      alt={blog.expert}
                      src={`https://www.example.com/avatars/${blog.expert}.jpg`} // Replace with actual avatar URL
                      sx={{ width: 60, height: 60, mb: 2 }}
                    />
                    <Typography variant="h6">{blog.expert}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Expert in {rooms.find((room) => room.id === blog.roomId)?.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Newsletter Signup */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Stay Updated
          </Typography>
          <Typography variant="body1" gutterBottom>
            Subscribe to our newsletter for the latest updates and color suggestions.
          </Typography>
          <TextField
            label="Your email address"
            variant="outlined"
            sx={{ width: "50%" }}
          />
          <Button variant="contained" sx={{ mt: 2 }}>
            Subscribe
          </Button>
        </Box>

        {/* Call to Action */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Need More Help?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Contact us for personalized advice and find the perfect paint color for your home.
          </Typography>
          <Button variant="contained" href="/contact" sx={{ mt: 2 }}>
            Contact Us
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
};

export default AdvisoryPage;
