import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Divider, useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectPosts } from '../../redux/reducer/postsSlice';
import RelatedPosts from './RelatedPosts'; 
import textConfigs from '../../config/text.config'; 

const BlogPost = () => {
  const { slug } = useParams(); 
  const posts = useSelector(selectPosts); 
  const post = posts.find((post) => post.slug === slug); 

  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6" align="center" sx={textConfigs.style.normalText}>
          Blog not available
        </Typography>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}> 
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
          sx={{
            ...textConfigs.style.headerText, 
            fontWeight: 'bold', 
            textAlign: 'center',
            fontSize: isMobile ? '1.75rem' : '3rem',
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ 
            textAlign: 'center', 
            color: 'gray', 
            ...textConfigs.style.subText,
            fontSize: isMobile ? '0.875rem' : '1.25rem',
          }}
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
            sx={{ 
              maxWidth: '80%', 
              textAlign: 'center', 
              ...textConfigs.style.subText,
              fontSize: isMobile ? '0.75rem' : '1rem',
            }}
          >
            {post.excerpt}
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          {Array.isArray(post.content)
            ? post.content.map((paragraph, index) => (
                <Typography 
                  variant="body1" 
                  paragraph 
                  key={index} 
                  sx={{ 
                    ...textConfigs.style.basicFont, 
                    fontSize: isMobile ? '0.875rem' : '1rem',
                  }}
                >
                  {paragraph}
                </Typography>
              ))
            : <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  ...textConfigs.style.basicFont, 
                  fontSize: isMobile ? '0.875rem' : '1rem',
                }}
              >
                {post.content}
              </Typography>}
        </Box>

        <Divider sx={{ my: 4 }} />

        <RelatedPosts currentPostSlug={slug} />

        <Box sx={{ mt: 6 }}></Box>
      </Container>
    </ThemeProvider>
  );
};

export default BlogPost;
