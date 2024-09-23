import React from 'react';
import { Typography, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBlogCategories } from '../../redux/reducer/blogCategoriesSlice';
import { setSearchQuery, clearSearchQuery, filterPostsByCategory, clearCategoryFilter } from '../../redux/reducer/postsSlice';
import { selectSearchQuery } from '../../redux/reducer/postsSlice';
import textConfigs from '../../config/text.config';

const SidebarBlog = () => {
  const categories = useSelector(selectBlogCategories);
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(state => state.posts.selectedCategory);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    const query = event.target.value;
    dispatch(setSearchQuery(query));
  };

  const handleClearSearch = () => {
    dispatch(clearSearchQuery());
  };

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      dispatch(clearCategoryFilter());
      navigate('/blogs');
    } else {
      dispatch(filterPostsByCategory(categoryName));
      const formattedCategoryName = categoryName.replace(/\s+/g, '-');
      navigate(`/blogs/category/${formattedCategoryName}`);
    }
    handleClearSearch();
  };

  return (
    <div style={{
      padding: '1rem',
      borderRight: '1px solid #ddd',
      boxSizing: 'border-box',
      width: '100%',
      maxWidth: '300px',
      '@media (max-width: 600px)': {
        padding: '0.5rem',
      },
    }}>
      
      <Typography
        variant="h6"
        gutterBottom
        sx={{ 
          color: "#333",  
          fontFamily: '"Nunito", sans-serif',
          marginTop: '2rem', 
          '@media (max-width: 600px)': {
            marginTop: '1rem',
          }
        }}
      >
        Search
      </Typography>
      
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Posts Search"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ 
          marginBottom: '2rem',
          ...textConfigs.style.basicFont,
          '@media (max-width: 600px)': {
            marginBottom: '1rem',
          }
        }}
      />

      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: "#333",
          fontFamily: '"Nunito", sans-serif',
          '@media (max-width: 600px)': {
            fontSize: '1.2rem',
          },
        }}
      >
        Categories
      </Typography>

      <List>
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;

          return (
            <ListItem
              button
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              sx={{
                backgroundColor: isSelected ? '#e0f7fa' : 'inherit',
                '&:hover': {
                  backgroundColor: '#b2ebf2',
                },
                borderLeft: isSelected ? '4px solid #1976d2' : '4px solid transparent',
                paddingLeft: '1rem',
                '@media (max-width: 600px)': {
                  paddingLeft: '0.5rem',
                },
              }}
            >
              <ListItemText
                primary={category.name}
                sx={{
                  fontWeight: isSelected ? 'bold' : 'normal',
                  color: isSelected ? '#1976d2' : 'inherit',
                  ...textConfigs.style.subHeaderText,
                  '@media (max-width: 600px)': {
                    fontSize: '0.9rem',
                  },
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};


export default SidebarBlog;
