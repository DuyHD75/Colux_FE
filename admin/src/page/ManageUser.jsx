import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import textConfig from '../config/text.config'
import backgroundConfig from '../config/background.config'
import { FaPlus } from "react-icons/fa6";
import { DataGrid } from '@mui/x-data-grid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaBan, FaUnlock } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import adminApi from '../api/modules/admin.api';


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

  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ role: "EMPLOYEE" });

  const [searchText, setSearchText] = useState("");


  const getAllUser = async () => {
    try {
      const { response, err } = await adminApi.getAllUser();
      if (response) {
        setRows([...response.data.users]);
        setUsers([...response.data.users]);
      } else {
        console.error(err);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("An error occurred while fetching users.");
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getAllUser();
  }, [dispatch]);

  const [editRow, setEditRow] = useState(null);

  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const ban = async (id) => {
    console.log(id);
    try {
      const { response, err } = await adminApi.setStatusUser(id);
      if (response) {
        toast.success("Update status success.");
        getAllUser();
      } else {
        console.error(err);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("An error occurred while update status.");
    }
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const filteredRows = useRef([]);
  useEffect(() => {
    if (searchText === "") {
      filteredRows.current = users;
    } else {
      filteredRows.current = users.filter((user) => {
        const fullName1 = `${user.firstName} ${user.lastName}`.toLowerCase(); 
        const fullName2 = `${user.lastName} ${user.firstName}`.toLowerCase(); 
  
        const search = searchText.toLowerCase();
        
        return (
          user.phone.toLowerCase().includes(search.toLowerCase()) || 
          user.email.toLowerCase().includes(search.toLowerCase()) || 
          fullName1.includes(search.toLowerCase()) || 
          fullName2.includes(search.toLowerCase()) ||
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) 
        );
      });
    }
    setRows(filteredRows.current); 
  }, [searchText, users]);
  

  const handleAddSave = async () => {
    try {
      const { response, err } = await adminApi.createEmployee(info);
      if (response) {
        toast.success("Create Employee success.");
        getAllUser();
      } else {
        console.error(err);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("An error occurred while create employee.");
    }
    setEditRow(false);
  };

  const handleAddCancel = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'userId', headerName: 'ID', width: 350 },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" justifyContent="start" width="100%" height="100%">
          <Avatar alt={params.row.firstName} src={params.row.imageUrl} sx={{ marginRight: 1 }} />
          <Typography>{params.row.firstName} {params.row.lastName}</Typography>
        </Box>
      ),
    },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'role', headerName: 'Role', width: 150, align: "center",
      headerAlign: "center", },
    {
      field: 'enabled',
      headerName: 'Status',
      align: "center",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
          <Typography
            sx={{
              color: params.value === true ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {params.value === true ? "Active" : "Inactive"}
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
          {/* <Button
            variant="contained"
            sx={{ ...backgroundConfig.style.backgroundPrimary }}
            onClick={() => handleEditClick(params.row)}
          >
            <CiEdit />
          </Button> */}
          {/* <Button
            variant="contained"
            onClick={() => deleteRow(params.id)}
            sx={{ ...backgroundConfig.style.backgroundPrimary }}
          >
            <MdDeleteOutline />
          </Button> */}
          <Button
            variant="contained"
            onClick={() => ban(params.row.userId)}
            sx={{ ...backgroundConfig.style.backgroundPrimary }}
          >
            {params.row.enabled === true ?  <FaBan /> : <FaUnlock/>}
           
          </Button>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 20 };

  return (
    <Stack direction='row' spacing={1} my={1}>
      <Box sx={{
        width: { xs: '100%', md: '100%' },
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
          onClick={handleAddClick}
          >New Employee</Button>
        </Stack>
        <TextField
          label='Search'
          variant='outlined'
          size='small'
          sx={{
            width: '40%',
            mb: '1rem',
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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
            checkboxSelection
            sx={{
              border: 0,
              ...customScrollbarStyle
            }}
          />
        </Paper>
      </Box>
      <Dialog open={open} onClose={handleAddCancel}>
        <DialogTitle>Create Employee</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            label="First Name"
            name="firstName"
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="lastName"
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default ManageUser