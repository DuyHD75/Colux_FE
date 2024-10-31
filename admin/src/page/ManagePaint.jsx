import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, ImageListItem, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import textConfig from '../config/text.config'
import backgroundConfig from '../config/background.config'
import { FaPlus } from "react-icons/fa6";
import { DataGrid } from '@mui/x-data-grid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaBan } from "react-icons/fa";
import { useSelector } from 'react-redux';
import customScrollbarStyle from '../config/scrollbar.config';
import {
  Delete as DeleteIcon,
} from "@mui/icons-material";
import ImageComponent from '../components/common/ImageComponent';
import AvatarUploader from '../components/common/AvatarUploader';

const ManagePaint = () => {
  const products = useSelector((state) => state.products.products);
  const [rows, setRows] = useState(products);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [editRow, setEditRow] = useState(null);

  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const ban = (id) => {
    setRows(rows.map((row) =>
      row.id === id ? { ...row, status: row.status === 'Banned' ? 'Active' : 'Banned' } : row
    ));
  };

  const handleEditClick = (row) => {
    setEditRow(row);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRow({ ...editRow, [name]: value });
  };

  const handleFeatureChange = (e, index, field) => {
    const { value } = e.target;
    setEditRow((prevState) => {
      const newFeatures = [...prevState.feature];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      return { ...prevState, feature: newFeatures };
    });
  };

  const handlePaintChange = (e, index, field) => {
    const { value } = e.target;
    setEditRow((prevState) => {
      const newPaint = [...prevState.paint];
      newPaint[index] = { ...newPaint[index], [field]: value };
      return { ...prevState, paint: newPaint };
    });
  };
  const handleWallpaperChange = (e, index, field) => {
    const { value } = e.target;
    setEditRow((prevState) => {
      const newWallpaper = [...prevState.wallpaper];
      newWallpaper[index] = { ...newWallpaper[index], [field]: value };
      return { ...prevState, wallpaper: newWallpaper };
    });
  };
  const handleFloorChange = (e, index, field) => {
    const { value } = e.target;
    setEditRow((prevState) => {
      const newFloor = [...prevState.floor];
      newFloor[index] = { ...newFloor[index], [field]: value };
      return { ...prevState, floor: newFloor };
    });
  };

  const handleImageChange = (e, index, field) => {
    const { value } = e.target;
    setEditRow((prevState) => {
      const newImages = [...prevState.images];
      newImages[index] = { ...newImages[index], [field]: value };
      return { ...prevState, images: newImages };
    });
  };

  const handleDeleteImage = (index) => {
    setEditRow((prevState) => {
      const newImages = [...prevState.images];
      newImages.splice(index, 1);
      return { ...prevState, images: newImages };
    });
  };

  const handleEditSave = () => {
    setRows(rows.map((row) => (row.id === editRow.id ? editRow : row)));
    setEditRow(null);
  };

  const handleEditCancel = () => {
    setEditRow(null);
  };

  const handleAvatarUpload = async (avatarLink) => {
    setAvatarUrl(avatarLink);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" justifyContent="start" width="100%" height="100%" py='5px'>
          <ImageComponent src={params.row.images[0].url} width={50} height='100%' className="h-[-webkit-fill-available]" />
          <Typography sx={{
            ...textConfig.style.basicFont,
            fontSize: '14px',
            ml: '5px',
          }}>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'category', headerName: 'Category', width: 90,
      renderCell: (params) => {
        let category = '';

        if (params.row.paint && params.row.paint.length > 0) {
          category = 'Paint';
        } else if (params.row.wallpaper && params.row.wallpaper.length > 0) {
          category = 'Wallpaper';
        } else if (params.row.floor && params.row.floor.length > 0) {
          category = 'Floor';
        }

        return (
          <Box display="flex" alignItems="center" justifyContent="start" width="100%" height="100%">
            <Typography sx={{
              ...textConfig.style.basicFont,
              fontSize: '14px',
            }}>
              {category}
            </Typography>
          </Box>
        );
      }
    },
    { field: 'description', headerName: 'Description', width: 200, },
    { field: 'rating', headerName: 'Rating', width: 80 },
    {
      field: 'quantity', headerName: 'Quantity', width: 100,
      renderCell: (params) => {
        let quantity = 0;

        if (params.row.paint && params.row.paint.length > 0) {
          quantity = params.row.paint[0].quantity;
        } else if (params.row.wallpaper && params.row.wallpaper.length > 0) {
          quantity = params.row.wallpaper[0].quantity;
        } else if (params.row.floor && params.row.floor.length > 0) {
          quantity = params.row.floor[0].quantity;
        }

        return (
          <Box display="flex" alignItems="center" justifyContent="start" width="100%" height="100%">
            <Typography sx={{
              ...textConfig.style.basicFont,
              fontSize: '14px',
            }}>
              {quantity}
            </Typography>
          </Box>
        );
      }
    },
    {
      field: 'price', headerName: 'Price', width: 100,
      renderCell: (params) => {
        let price = 0;

        if (params.row.paint && params.row.paint.length > 0) {
          price = params.row.paint[0].price;
        } else if (params.row.wallpaper && params.row.wallpaper.length > 0) {
          price = params.row.wallpaper[0].price;
        } else if (params.row.floor && params.row.floor.length > 0) {
          price = params.row.floor[0].price;
        }

        return (
          <Box display="flex" alignItems="center" justifyContent="start" width="100%" height="100%">
            <Typography sx={{
              ...textConfig.style.basicFont,
              fontSize: '14px',
            }}>
              {price}
            </Typography>
          </Box>
        );
      }
    },
    { field: 'Place_Of_Origin', headerName: 'Place Of Origin', width: 150 },
    { field: 'Warranty', headerName: 'Warranty', width: 150 },
    { field: 'surface', headerName: 'Surface', width: 100 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="100%">
          <Button
            variant="contained"
            sx={{ ...backgroundConfig.style.backgroundPrimary }}
            onClick={() => handleEditClick(params.row)}
          >
            <CiEdit />
          </Button>
          {/* <Button
            variant="contained"
            onClick={() => deleteRow(params.id)}
            sx={{ ...backgroundConfig.style.backgroundPrimary }}
          >
            <MdDeleteOutline />
          </Button> */}
          <Button
            variant="contained"
            onClick={() => ban(params.id)}
            sx={{ ...backgroundConfig.style.backgroundPrimary }}
          >
            <FaBan />
          </Button>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Stack direction='row' spacing={1} my={1}>
      <Box sx={{
        width: { xs: 0, md: '20%' },
        height: '100vh',
        ...backgroundConfig.style.backgroundPrimary,
      }}>
        <Typography sx={{
          ...textConfig.style.headerText,
          color: 'white',
          textAlign: 'center',
          padding: '1rem',
        }}>Product List</Typography>

      </Box>
      <Box sx={{
        width: { xs: '100%', md: '80%' },
        justifyContent: 'end',
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '2rem',
      }}>
        <Stack direction='row' sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}>
          <Typography sx={{
            ...textConfig.style.headerText,
            fontSize: '1.5rem',
          }}>Manage Paint</Typography>
          <Button
            sx={{
              color: 'white',
              ...backgroundConfig.style.backgroundPrimary,
              '&:hover': {
                ...backgroundConfig.style.backgroundSecondary,
              }
            }} startIcon={<FaPlus />
            }
            component={Link}
            to="/addProduct"
          >New Product</Button>
        </Stack>
        <TextField
          label='Search'
          variant='outlined'
          size='small'
          sx={{
            width: '40%',
            mb: '1rem',
          }}
        />
        <Paper sx={{
          height: 600,
          width: '100%',
          overflowX: 'auto',
        }}>

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            sx={{
              ...textConfig.style.basicFont,
              '& .MuiDataGrid-root': {
                fontSize: '14px',
              },
            }}
          />
        </Paper>
      </Box>
      <Dialog maxWidth="lg" fullWidth open={!!editRow} onClose={handleEditCancel}>
        <DialogTitle>Edit Paint</DialogTitle>
        <DialogContent sx={{
          ...customScrollbarStyle,
          width: '1200px',
        }}>
          <Stack k direction="row" spacing={1} alignItems="center" justifyContent="space-between" width="100%" my={2}>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              value={editRow?.name || ''}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Code"
              name="code"
              value={editRow?.code || ''}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Base"
              name="base"
              value={editRow?.base || ''}
              onChange={handleEditChange}
              fullWidth
            />
          </Stack>
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={editRow?.description || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" width="100%" my={2}>
            <TextField
              margin="dense"
              label="Place Of Origin"
              name="Place_Of_Origin"
              value={editRow?.Place_Of_Origin || ''}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Warranty"
              name="warranty"
              value={editRow?.Warranty || ''}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Surface"
              name="surface"
              value={editRow?.surface || ''}
              onChange={handleEditChange}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" width="100%" mb={2}>

            {editRow?.feature?.map((feature, index) => (
              <TextField
                margin="dense"
                label={feature.name}
                name={feature.name}
                value={feature.value || ''}
                onChange={(e) => handleFeatureChange(e, index, 'value')}
                fullWidth
              />
            ))}
          </Stack>

          {editRow?.paint?.map((paint, index) => (
            <Stack key={paint.id} direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%" mb={2}>
              <TextField
                margin="dense"
                label='Paint Quantity '
                name='Paint Quantity'
                value={paint.quantity || ''}
                onChange={(e) => handlePaintChange(e, index, 'quantity')}
                fullWidth
              />
              <TextField
                margin="dense"
                label='Paint Price '
                name='Paint Price'
                value={paint.price || ''}
                onChange={(e) => handlePaintChange(e, index, 'price')}
                fullWidth
              />
              <TextField
                margin="dense"
                label='Volume '
                name='Volume'
                value={paint.volumn || ''}
                onChange={(e) => handlePaintChange(e, index, 'volumn')}
                fullWidth
              />
              <TextField
                margin="dense"
                label='Coverage '
                name='Coverage'
                value={paint.coverage || ''}
                onChange={(e) => handlePaintChange(e, index, 'coverage')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Drying Time"
                name="Drying Time"
                value={paint.dryingTime || ''}
                onChange={(e) => handlePaintChange(e, index, 'dryingTime')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Layer"
                name="Layer"
                value={paint.layer || ''}
                onChange={(e) => handlePaintChange(e, index, 'layer')}
                fullWidth
              />

            </Stack>
          ))}
          {editRow?.wallpaper?.map((wallpaper, index) => (
            <Stack key={wallpaper.id} direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%" mb={2}>
              <TextField
                margin="dense"
                label="Wallpaper Quantity"
                name="Wallpaper Quantity"
                value={wallpaper.quantity || ''}
                onChange={(e) => handleWallpaperChange(e, index, 'quantity')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Wallpaper Price"
                name="Wallpaper Price"
                value={wallpaper.price || ''}
                onChange={(e) => handleWallpaperChange(e, index, 'price')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Size"
                name="Size"
                value={wallpaper.size || ''}
                onChange={(e) => handleWallpaperChange(e, index, 'color')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Material"
                name="Material"
                value={wallpaper.material || ''}
                onChange={(e) => handleWallpaperChange(e, index, 'size')}
                fullWidth
              />

            </Stack>
          ))}
          {editRow?.floor?.map((floor, index) => (
            <Stack key={floor.id} direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%" mb={2}>
              <TextField
                margin="dense"
                label="Floor Quantity"
                name="Floor Quantity"
                value={floor.quantity || ''}
                onChange={(e) => handleFloorChange(e, index, 'quantity')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Floor Price"
                name="Floor Price"
                value={floor.price || ''}
                onChange={(e) => handleFloorChange(e, index, 'price')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Size"
                name="Size"
                value={floor.size || ''}
                onChange={(e) => handleFloorChange(e, index, 'color')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Thickness"
                name="Thickness"
                value={floor.thickness || ''}
                onChange={(e) => handleFloorChange(e, index, 'thickness')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Grain"
                name="Grain"
                value={floor.grain || ''}
                onChange={(e) => handleFloorChange(e, index, 'grain')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Gloss"
                name="Gloss"
                value={floor.gloss || ''}
                onChange={(e) => handleFloorChange(e, index, 'gloss')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Level"
                name="Level"
                value={floor.level || ''}
                onChange={(e) => handleFloorChange(e, index, 'level')}
                fullWidth
              />
            </Stack>
          ))}

          {editRow?.images.map((image, index) => (


            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%" height='100%' my={2}>
              <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    boxShadow: "2px 2px 5px rgba(255,255,255, 0.6)",
                    overflow: "hidden",
                  }}
                  src={image.url}
                  alt="PhotoItem"
                />
                <IconButton
                  sx={{
                    cursor: "pointer",
                    color: "#fff",
                    borderRadius: "10px",
                    padding: "10px",
                    position: "absolute",
                    bottom: 0,
                    right: '88.6px',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  onClick={() => handleDeleteImage(index)}
                >
                  <DeleteIcon sx={{ fontSize: "1.4rem", color: "#fff", borderRadius: '10px' }} />
                </IconButton>
              </Box>
              <TextField
                margin="dense"
                label="Image Name"
                name="imageName"
                value={image.imageName || ''}
                onChange={(e) => handleImageChange(e, index, 'imageName')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Caption"
                name="caption"
                value={image.caption || ''}
                onChange={(e) => handleImageChange(e, index, 'caption')}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Alt Text"
                name="altText"
                value={image.altText || ''}
                onChange={(e) => handleImageChange(e, index, 'altText')}
                fullWidth
              />
              <Select
                style={{ width: '100%', margin: 'dense' }}
                name='type'
                id='type'
                value={image.type} // Controlled value
                onChange={(e) => handleImageChange(e, index, 'type')}
              >
                <MenuItem key={index} value={image.type}>{image.type}</MenuItem>
                <MenuItem key={index} value='OTHER'>OTHER</MenuItem>
              </Select>
            </Stack>



          ))}

          <AvatarUploader handleUpload={handleAvatarUpload}  />



        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack >
  )
}

export default ManagePaint