import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Card, CardContent, CardMedia, IconButton, Snackbar } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import colorsApi from '../api/modules/color.api';


const ColorManagementPage = () => {
  const [colorFamilies, setColorFamilies] = useState([
    {
      id: '1',
      name: 'Color Family 1',
      title: 'Warm Colors',
      description: 'A collection of warm colors.',
      hex: '#FF5733',
      image: 'url-to-image',
      collections: [
        {
          id: '1',
          name: 'Collection 1',
          title: 'Reds',
          description: 'Different shades of red.',
          hex: '#FF5733',
          image: 'url-to-image',
          colors: [
            {
              id: '1',
              name: 'Red',
              code: '#FF5733',
              hex: '#FF5733',
              interior: 'Interior Use',
              exterior: 'Exterior Use',
              description: 'Bright red color',
              colorTypeId: '1',
              image: 'url-to-image'
            }
          ]
        }
      ]
    }
  ]);
  const [availableColors, setAvailableColors] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const colorsPerPage = 20000;


  const dispatch = useDispatch();

  useEffect(() => {
    const getListColors = async () => {
      try {
        const { response } = await colorsApi.getAllColors(currentPage - 1, colorsPerPage);
            
        if (response) {
          setAvailableColors(response.data.colors.content);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching colors.");
      }
    };

    getListColors();
  }, [dispatch, currentPage]);

  const [selectedColor, setSelectedColor] = useState(null); // Trạng thái lưu màu được chọn
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Hàm thêm màu vào collection
  const handleAddColor = (colorFamilyId, collectionId) => {
    if (!selectedColor) {
      setSnackbarMessage('Please select a color!');
      setOpenSnackbar(true);
      return;
    }

    const updatedColorFamilies = colorFamilies.map((family) => {
      if (family.id === colorFamilyId) {
        family.collections = family.collections.map((collection) => {
          if (collection.id === collectionId) {
            // Kiểm tra xem màu đã tồn tại trong collection chưa
            const colorExists = collection.colors.some((c) => c.id === selectedColor.id);
            if (colorExists) {
              setSnackbarMessage('Color already exists in this collection!');
              setOpenSnackbar(true);
              return collection; // Nếu màu đã tồn tại thì không thêm
            } else {
              collection.colors.push(selectedColor); // Nếu chưa tồn tại, thêm màu vào collection
            }
          }
          return collection;
        });
      }
      return family;
    });
    setColorFamilies(updatedColorFamilies);
    setSelectedColor(null); // Reset màu đã chọn
  };

  // Hàm xóa màu khỏi collection
  const handleRemoveColor = (colorFamilyId, collectionId, colorId) => {
    const updatedColorFamilies = colorFamilies.map((family) => {
      if (family.id === colorFamilyId) {
        family.collections = family.collections.map((collection) => {
          if (collection.id === collectionId) {
            collection.colors = collection.colors.filter((color) => color.id !== colorId);
          }
          return collection;
        });
      }
      return family;
    });
    setColorFamilies(updatedColorFamilies);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Color Family Management
      </Typography>

      {colorFamilies.map((family) => (
        <Card key={family.id} sx={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6">{family.title}</Typography>
            <Typography variant="body2">{family.description}</Typography>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              {family.collections.map((collection) => (
                <Box key={collection.id} sx={{ marginRight: '20px' }}>
                  <Typography variant="subtitle1">{collection.title}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {collection.colors.map((color) => (
                      <Card key={color.id} sx={{ marginBottom: '10px' }}>
                        <CardMedia component="img" image={color.image} alt={color.name} />
                        <CardContent>
                          <Typography variant="body2">{color.name}</Typography>
                          <Typography variant="body2">{color.description}</Typography>
                          <IconButton onClick={() => handleRemoveColor(family.id, collection.id, color.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      onClick={() => handleAddColor(family.id, collection.id)}
                      disabled={!selectedColor} // Disabled nếu chưa chọn màu
                    >
                      Add Selected Color
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h5" gutterBottom sx={{ marginTop: '40px' }}>
        Available Colors
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {availableColors.map((color) => (
          <Card
            key={color.id}
            sx={{
              width: '120px',
              marginRight: '20px',
              marginBottom: '20px',
              border: selectedColor?.id === color.id ? '2px solid blue' : 'none', // Đánh dấu màu đã chọn
            }}
            onClick={() => setSelectedColor(color)} // Chọn màu khi click
          >
            <CardMedia component="img" image={color.image} alt={color.name} />
            <CardContent>
              <Typography variant="body2">{color.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Snackbar thông báo khi trùng màu hoặc không chọn màu */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default ColorManagementPage;