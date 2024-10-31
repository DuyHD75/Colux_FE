import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import textConfig from '../config/text.config'
import backgroundConfig from '../config/background.config'
import { FaPlus } from "react-icons/fa6";
import { DataGrid } from '@mui/x-data-grid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaBan } from "react-icons/fa";


const customScrollbarStyle = {
  '& .MuiDataGrid-virtualScroller': {
    '::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
      backgroundColor: '#A8A8A8',
    },
    '::-webkit-scrollbar-track': {
      WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
      backgroundColor: '#F5F5F5',
    },
    '::-webkit-scrollbar': {
      width: '2px',
      backgroundColor: '#F5F5F5',
    }
  },
};

const ManageUser = () => {

  const [rows, setRows] = useState([
    { id: 1, name: 'Randal Kuhn', phone: '1-770-736-8031 x56442', email: 'Kuhn.Randal@brend', address: 'Kuhn.Randal@brend', city: 'Lebsackbury', avatar: 'https://via.placeholder.com/40', status: 'Active' },
    { id: 2, name: 'John Henry', phone: '1-770-736-8031 x56442', email: 'Kuhn.Randal@brend', address: 'Kuhn.Randal@brend', city: 'Lebsackbury', avatar: 'https://via.placeholder.com/40', status: 'Active' },
    { id: 3, name: 'Randal Kuhn', phone: '1-770-736-8031 x56442', email: 'Kuhn.Randal@brend', address: 'Kuhn.Randal@brend', city: 'Lebsackbury', avatar: 'https://via.placeholder.com/40', status: 'Active' },
    { id: 4, name: 'Randal Kuhn', phone: '1-770-736-8031 x56442', email: 'Kuhn.Randal@brend', address: 'Kuhn.Randal@brend', city: 'Lebsackbury', avatar: 'https://via.placeholder.com/40', status: 'Active' },
    { id: 5, name: 'Randal Kuhn', phone: '1-770-736-8031 x56442', email: 'Kuhn.Randal@brend', address: 'Kuhn.Randal@brend', city: 'Lebsackbury', avatar: 'https://via.placeholder.com/40', status: 'Active' },
    { id: 6, name: 'Randal Kuhn', phone: '1-770-736-8031 x56442', email: 'Kuhn.Randal@brend', address: 'Kuhn.Randal@brend', city: 'Lebsackbury', avatar: 'https://via.placeholder.com/40', status: 'Active' },
    { id: 7, name: 'Randal Kuhn', phone: '1-770-736-8031 x56442', email: 'Kuhn.Randal@brend', address: 'Kuhn.Randal@brend', city: 'Lebsackbury', avatar: 'https://via.placeholder.com/40', status: 'Active' },
    { id: 8, name: 'Randal Kuhn', phone: '1-770-736-8031 x56442', email: 'Kuhn.Randal@brend', address: 'Kuhn.Randal@brend', city: 'Lebsackbury', avatar: 'https://via.placeholder.com/40', status: 'Active' },
    { id: 9, name: 'Randal Kuhn', phone: '1-770-736-8031 x56442', email: 'Kuhn.Randal@brend', address: 'Kuhn.Randal@brend', city: 'Lebsackbury', avatar: 'https://via.placeholder.com/40', status: 'Active' },
  ]);

  const [editRow, setEditRow] = useState(null);

  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const ban = (id) => {
    setRows(rows.map((row) => 
      row.id === id ? { ...row, status: row.status === 'Banned' ? 'Active' : 'Banned' } : row
    ));  };

  const handleEditClick = (row) => {
    setEditRow(row);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRow({ ...editRow, [name]: value });
  };

  const handleEditSave = () => {
    setRows(rows.map((row) => (row.id === editRow.id ? editRow : row)));
    setEditRow(null);
  };

  const handleEditCancel = () => {
    setEditRow(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" justifyContent="start" width="100%" height="100%">
          <Avatar alt={params.value} src={params.row.avatar} sx={{ marginRight: 1 }} />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    { field: 'phone', headerName: 'Phone', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'city', headerName: 'City', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 80,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
          <Typography
            sx={{
              color: params.value === 'Active' ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
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

  const paginationModel = { page: 0, pageSize: 5 };

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
        }}>User List</Typography>

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
          }}>Manage User</Typography>
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
          to="/addUser"
          >New User</Button>
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
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{
              border: 0,
              ...customScrollbarStyle
            }}
          />
        </Paper>
      </Box>
      <Dialog open={!!editRow} onClose={handleEditCancel}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
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
            label="Phone"
            name="phone"
            value={editRow?.phone || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={editRow?.email || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            value={editRow?.address || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="City"
            name="city"
            value={editRow?.city || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="State"
            name="state"
            value={editRow?.state || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Country"
            name="country"
            value={editRow?.country || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="ZIP Code"
            name="zip"
            value={editRow?.zip || ''}
            onChange={handleEditChange}
            fullWidth
          />
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
    </Stack>
  )
}

export default ManageUser