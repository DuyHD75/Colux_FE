import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectPosts } from '../../redux/reducer/postsSlice';
import RelatedPosts from './RelatedPosts'; 
import textConfigs from '../../config/text.config'; 

const BlogPost = () => {
  const { slug } = useParams(); 
  const posts = useSelector(selectPosts); 
  const post = posts.find((post) => post.slug === slug); 

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" align="center" sx={textConfigs.style.normalText}>
          Blog no available
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <div style={{ marginTop: '96px' }}></div>
      <Container
        maxWidth="md"
        sx={{
          mt: 4, 
          mb: 8,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', textAlign: 'center' }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ textAlign: 'center', color: 'gray', ...textConfigs.style.subText }}
        >
          {post.createdAt}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {post.image && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <img
              src={post.image}
              alt={post.title}
              style={{
                maxWidth: '600px',
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ maxWidth: '80%', textAlign: 'center', ...textConfigs.style.subText }}
          >
            {post.excerpt}
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          {Array.isArray(post.content)
            ? post.content.map((paragraph, index) => (
                <Typography variant="body1" paragraph key={index} sx={textConfigs.style.basicFont}>
                  {paragraph}
                </Typography>
              ))
            : <Typography variant="body1" paragraph sx={textConfigs.style.basicFont}>{post.content}</Typography>}
        </Box>

        <Divider sx={{ my: 4 }} />

        <RelatedPosts currentPostSlug={slug} />

        <Box sx={{ mt: 6 }}></Box>
      </Container>
    </>
  );
};

export default BlogPost;
