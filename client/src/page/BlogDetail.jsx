// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Typography, Box, Divider, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { selectPosts } from '../redux/reducer/postsSlice'; // Adjust the import path as needed
// import Navigate from '../components/commons/Navigate'; // Import Navigate component
// import { Link } from 'react-router-dom';

// const BlogPost = () => {
//   const { slug } = useParams(); // Extract the slug from the URL
//   const posts = useSelector(selectPosts); // Retrieve all posts from Redux
//   const post = posts.find((post) => post.slug === slug); // Find the post by matching the slug

//   // Display an error message if the post is not found
//   if (!post) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Typography variant="h6" align="center">
//           Bài viết không tồn tại
//         </Typography>
//       </Container>
//     );
//   }

//   // Filter recent posts, excluding the current one, and limit to the 3 most recent
//   const recentPosts = posts
//     .filter((p) => p.slug !== slug) // Exclude current post
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by creation date
//     .slice(0, 3); // Limit to 3 posts

//   return (
//     <>
//       <div style={{ marginTop: '96px' }}></div>
//       <Navigate /> {/* Add Navigate component */}
//       <Container
//         maxWidth="md"
//         sx={{
//           mt: 4, // Adjust the margin as needed
//         }}
//       >
//         {/* Post Title */}
//         <Typography
//           variant="h3"
//           component="h1"
//           gutterBottom
//           sx={{ fontWeight: 'bold', textAlign: 'center' }}
//         >
//           {post.title}
//         </Typography>

//         {/* Post Date */}
//         <Typography
//           variant="subtitle1"
//           gutterBottom
//           sx={{ textAlign: 'center', color: 'gray' }}
//         >
//           {post.createdAt} {/* Adjust this to match your date format */}
//         </Typography>

//         {/* Divider for visual separation */}
//         <Divider sx={{ my: 2 }} />

//         {/* Post Image */}
//         {post.image && (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//             <img
//               src={post.image}
//               alt={post.title}
//               style={{
//                 maxWidth: '600px', // Limit the max width of the image
//                 width: '100%', // Make the image responsive
//                 height: 'auto',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//               }}
//             />
//           </Box>
//         )}

//         {/* Post Excerpt */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//           <Typography
//             variant="body2"
//             color="textSecondary"
//             sx={{ maxWidth: '80%', textAlign: 'center' }}
//           >
//             {post.excerpt}
//           </Typography>
//         </Box>

//         {/* Post Content */}
//         <Box sx={{ mt: 3 }}>
//           {Array.isArray(post.content)
//             ? post.content.map((paragraph, index) => (
//                 <Typography variant="body1" paragraph key={index}>
//                   {paragraph}
//                 </Typography>
//               ))
//             : <Typography variant="body1" paragraph>{post.content}</Typography>}
//         </Box>

//         {/* Divider before related posts */}
//         <Divider sx={{ my: 4 }} />

//         {/* Related Posts Section */}
//         <Typography variant="h4" gutterBottom>
//           Read more
//         </Typography>
//         <Grid container spacing={2}>
//           {recentPosts.map((recentPost) => (
//             <Grid item xs={12} sm={4} key={recentPost.slug}>
//               <Card sx={{ maxWidth: 345 }}>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={recentPost.image}
//                   alt={recentPost.title}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h6" component="div">
//                     {recentPost.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {recentPost.excerpt}
//                   </Typography>
//                 </CardContent>
//                 <Box sx={{ textAlign: 'center', mb: 2 }}>
//                   <Button
//                     component={Link}
//                     to={`/blogs/${recentPost.slug}`}
//                     variant="contained"
//                     color="primary"
//                   >
//                     Explore
//                   </Button>
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default BlogPost;


import React, { Fragment } from 'react';
import Navigate from '../components/commons/Navigate';
import BlogPost from '../components/commons/BlogPost';

const BlogDetail = () => {

  return (
    <Fragment>
      <div style={{ marginTop: "96px" }}></div>
      <Navigate />
      <BlogPost />
    </Fragment>
  );
};

export default BlogDetail;
