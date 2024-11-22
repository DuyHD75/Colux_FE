import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ImageListItem,
  MenuItem,
  Paper,
  Select,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import textConfig from "../config/text.config";
import backgroundConfig from "../config/background.config";
import { FaPlus } from "react-icons/fa6";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import customScrollbarStyle from "../config/scrollbar.config";
import ordersApi from "../api/modules/order.api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ManageOrder = () => {
  const products = useSelector((state) => state.products.products);
  const [orders, setOrders] = useState([]);

  const [rows, setRows] = useState(products);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const getAllOrders = async () => {
    try {
      const { response, err } = await ordersApi.getAllOrders();
      if (response) {
        setOrders([...response.data.products]);
      } else if (err) {
        toast.error(err);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("An error occurred while fetching products.");
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getAllOrders();
  }, [dispatch]);

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    console.log(row);
    
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleViewDetails = (row) => {
    navigate(`/orderDetails/${row.id}`, { state: { order: row } });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "toName", headerName: "Name", width: 210 },
    { field: "toPhone", headerName: "Phone", width: 170 },
    { field: "note", headerName: "Note", width: 358 },
    { field: "toAddress", headerName: "To Address", width: 166 },
    { field: "paymentMethod", headerName: "Payment Method", width: 133 },
    { field: "totalAmount", headerName: "Total Amount", width: 115 },
    // { field: 'tax', headerName: 'Tax', width: 65 },
    // { field: 'shippingCost', headerName: 'Shipping Cost', width: 125 },
    // { field: 'totalPay', headerName: 'totalPay', width: 132, },
    { field: "paymentStatus", headerName: "Payment Status", width: 150 },
    {
      field: "View Details",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => handleViewDetails(params.row)}
            sx={{
              bgcolor: "#1c2759",
              "&:hover": { bgcolor: "#1976D2" },
              textTransform: "none",
              borderRadius: 1.5,
              boxShadow: "none",
              px: 1.5,
              py: 0.25,
              fontSize: "0.75rem",
              minWidth: "80px",
              height: "24px",
            }}
          >
            View Details
          </Button>
          {params.row.status === 1 ? (
            <Button
              variant="contained"
              size="small"
              component={Link}
              onClick={() => handleOpenDialog(params.row)}
              sx={{
                bgcolor: "#1c2759",
                "&:hover": { bgcolor: "#1976D2" },
                textTransform: "none",
                borderRadius: 1.5,
                boxShadow: "none",
                px: 1.5,
                py: 0.25,
                fontSize: "0.75rem",
                minWidth: "80px",
                height: "24px",
              }}
            >
              Create Waybill
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              component={Link}
              sx={{
                bgcolor: "#1c2759",
                "&:hover": { bgcolor: "#1976D2" },
                textTransform: "none",
                borderRadius: 1.5,
                boxShadow: "none",
                px: 1.5,
                py: 0.25,
                fontSize: "0.75rem",
                minWidth: "80px",
                height: "24px",
              }}
            >
              View shipping
            </Button>
          )}
        </Stack>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          justifyContent: "end",
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            sx={{
              ...textConfig.style.headerText,
              fontSize: "1.5rem",
            }}
          >
            Manage Order
          </Typography>
          <Button
            sx={{
              color: "white",
              ...backgroundConfig.style.backgroundPrimary,
              "&:hover": {
                ...backgroundConfig.style.backgroundSecondary,
              },
            }}
            startIcon={<FaPlus />}
            component={Link}
            to="/create-order"
          >
            Create Order
          </Button>
        </Stack>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{
            width: "40%",
            mb: "1rem",
          }}
        />
        <Paper
          sx={{
            height: 600,
            width: "100%",
            overflowX: "auto",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            sx={{
              ...textConfig.style.basicFont,
              "& .MuiDataGrid-root": {
                fontSize: "14px",
              },
            }}
          />
        </Paper>
        <Dialog fullWidth open={open} onClose={handleCloseDialog}>
          <DialogTitle>Create Waybill</DialogTitle>
          <DialogContent
            sx={{
              ...customScrollbarStyle,
              width: "100%",
            }}
          >
            <Stack direction="column" spacing={2} width="100%" my={2}>
              <TextField
                margin="dense"
                label="Shipping Date"
                name="shippingDate"
                fullWidth
                size="small"
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3f51b5",
                    },
                  },
                }}
              />
              <TextField
                margin="dense"
                label="Width"
                name="width"
                fullWidth
                size="small"
                sx={{
                  flex: 4,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3f51b5",
                    },
                  },
                }}
              />
              <TextField
                margin="dense"
                label="Height"
                name="height"
                fullWidth
                size="small"
                sx={{
                  flex: 4,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3f51b5",
                    },
                  },
                }}
              />
              <TextField
                margin="dense"
                label="Length"
                name="length"
                fullWidth
                size="small"
                sx={{
                  flex: 4,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3f51b5",
                    },
                  },
                }}
              />
              <TextField
                margin="dense"
                label="Weight"
                name="weight"
                fullWidth
                size="small"
                sx={{
                  flex: 4,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3f51b5",
                    },
                  },
                }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button color="primary">Creat WayBill</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ManageOrder;
