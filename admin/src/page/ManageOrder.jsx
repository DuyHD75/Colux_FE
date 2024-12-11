import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import textConfig from "../config/text.config";
import backgroundConfig from "../config/background.config";
import { FaPlus } from "react-icons/fa6";
import { DataGrid, GridFilterInputValue } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import customScrollbarStyle from "../config/scrollbar.config";
import ordersApi from "../api/modules/order.api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ManageOrder = () => {
  const products = useSelector((state) => state.products.products);
  const [orders, setOrders] = useState([]);

  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [filterValues, setFilterValues] = useState("");

  const handleFilterChange = (e) => {
    setFilterValues(e.target.value);
  };

  const applyFilter = () => {
    const filterList = filterValues.split(',').map(value => value.trim());
    const filteredData = rows.filter(row =>
      filterList.includes(row.city)
    );
    setRows(filteredData);
  };

  const [steps, setSteps] = useState(null);

  const filteredRows = useRef([]);

  function removeDiacritics(str) {
    const map = {
      a: /á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g,
      e: /é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g,
      i: /í|ì|ỉ|ĩ|ị/g,
      o: /ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g,
      u: /ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g,
      y: /ý|ỳ|ỷ|ỹ|ỵ/g,
      d: /đ/g,
    };
  
    for (let key in map) {
      str = str.replace(map[key], key);
    }
    return str;
  }

  useEffect(() => {
    if (searchText === "") {
      filteredRows.current = orders;
    } else {
      filteredRows.current = orders.filter(
        (order) =>
          searchText &&
          (removeDiacritics(order.toName.toLowerCase()).includes(removeDiacritics(searchText.toLowerCase())) ||
          removeDiacritics(order.code.toLowerCase()).includes(removeDiacritics(searchText.toLowerCase())))
      );
    }
    setRows(filteredRows.current); // Cập nhật rows với kết quả lọc
  }, [searchText, orders]);

  const [formValues, setFormValues] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
  });

  const defaultFormValues = {
    weight: "",
    length: "",
    width: "",
    height: "",
  };

  // Hàm cập nhật giá trị form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const getAllOrders = async () => {
    try {
      const { response, err } = await ordersApi.getAllOrders();
      if (response) {
        setRows([
          ...response.data.orders.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
        })
        ]);
        setOrders([...response.data.orders]);
      } else if (err) {
        toast.error(err);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("An error occurred while fetching orders.");
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

  const handleOpenShippingDialog = async (waybillId) => {
    console.log(waybillId);

    try {
      const { response } = await ordersApi.getAWallbilll(waybillId);
      if (response) {
        setSteps(response.data.waybill);
      }
    } catch (error) {}

    setOpenShipping(true);
  };

  const handleCloseShippingDialog = () => {
    setOpenShipping(false);
  };

  const handleCreateWaybill = async () => {
    const { weight, length, width, height } = formValues;

    // Kiểm tra dữ liệu
    const errors = [];
    if (!weight || weight > 50000) errors.push("Weight must be <= 50000g.");
    if (!length || length > 200) errors.push("Length must be <= 200cm.");
    if (!width || width > 200) errors.push("Width must be <= 200cm.");
    if (!height || height > 200) errors.push("Height must be <= 200cm.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // Tạo object Waybill
    const waybill = {
      orderId: selectedRow.orderId,
      shippingDate: new Date().toISOString(),
      weight: parseInt(weight, 10),
      length: parseInt(length, 10),
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      note: selectedRow.note,
      ghnRequiredNote: "CHOXEMHANGKHONGTHU",
    };
    console.log(waybill);

    try {
      const { response, err } = await ordersApi.createWallbill(waybill);
      if (response) {
        getAllOrders();
        toast.success("Create Waybill success!");
      } else {
        toast.error(err.message);
      }
    } catch (error) {
      console.log(error);
    }

    setFormValues(defaultFormValues);

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleViewDetails = (row) => {
    navigate(`/orderDetails/${row.id}`, { state: { data: row } });
  };

  const paymentStatusMap = {
    1: { label: "Unpaid", color: "#f44336" }, // Red
    2: { label: "Paid", color: "#4caf50" }, // Green
    3: { label: "Advance", color: "#ff9800" }, // Orange
  };

  const statusMap = {
    1: { label: "CREATED", color: "#2196f3" }, // Blue
    2: { label: "PENDING", color: "#ff9800" }, // Orange
    3: { label: "APPROVED", color: "#4caf50" }, // Green
    4: { label: "COMPLETED", color: "#9c27b0" }, // Purple
    5: { label: "CANCELLED", color: "#f44336" }, // Red
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "toName",
      headerName: "Name",
      width: 210,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "toPhone",
      headerName: "Phone",
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "toAddress",
      headerName: "To Address",
      width: 166,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 133,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalPay",
      headerName: "Total Pay",
      width: 115,
      renderCell: (params) => `$${params.row.totalPay}`,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "advancePayment",
      headerName: "Advance Payment",
      width: 150,
      renderCell: (params) => `$${params.row.advancePayment}`,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const status = statusMap[params.row.status];
        return (
          <span
            style={{
              color: status?.color || "#000",
              fontWeight: "bold",
            }}
          >
            {status?.label || "Unknown"}
          </span>
        );
      },
      align: "center",
      headerAlign: "center",
      filterable: true,
      filterOperators: [
        {
          label: "Equals",
          value: "equals",
          getApplyFilterFn: (filterItem) => {
            if (!filterItem.value) return null;

            return (row) => row === parseInt(filterItem.value, 10);
          },
          InputComponent: ({ item, applyValue }) => (
            <div>
              <InputLabel shrink>
                Value
              </InputLabel>
              <Select
                value={item.value || ""}
                onChange={(event) =>
                  applyValue({ ...item, value: event.target.value })
                }
                fullWidth
                displayEmpty
              >
                <MenuItem value="">None</MenuItem>
                {Object.entries(statusMap).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ),
        },
      ],
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => {
        const paymentStatus = paymentStatusMap[params.row.paymentStatus];
        return (
          <span
            style={{
              color: paymentStatus?.color || "#000",
              fontWeight: "bold",
            }}
          >
            {paymentStatus?.label || "Unknown"}
          </span>
        );
      },
      align: "center",
      headerAlign: "center",
      filterable: true,
      filterOperators: [
        {
          label: "Equals",
          value: "equals",
          getApplyFilterFn: (filterItem) => {
            if (!filterItem.value) return null;

            return (row) => row === parseInt(filterItem.value, 10);
          },
          InputComponent: ({ item, applyValue }) => (

            <div>
              <InputLabel shrink>
                Value
              </InputLabel>
              <Select
              value={item.value || ""}
              onChange={(event) =>
                applyValue({ ...item, value: event.target.value })
              }
              fullWidth
              displayEmpty
            >
              <MenuItem value="">None</MenuItem>
              {Object.entries(paymentStatusMap).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value.label}
                </MenuItem>
              ))}
            </Select>
            </div>
            
          ),
        },
      ],
    },
    {
      field: "View Details",
      headerName: "Action",
      width: 220,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="center" // Căn giữa các nút
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
              width: "100px",
              height: "24px",
            }}
          >
            View Details
          </Button>
    
          {/* Điều kiện cho "Create Waybill" chỉ hiển thị khi chưa có waybillId và status là 1 hoặc 2 */}
          {!params.row.waybillId && (params.row.status === 1 || params.row.status === 2) && (
            <Button
              variant="contained"
              size="small"
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
                width: "100px",
                height: "24px",
              }}
            >
              Create Waybill
            </Button>
          )}
    
          {/* Hiển thị "View Waybill" khi có waybillId */}
          {params.row.waybillId && (
            <Button
              variant="contained"
              size="small"
              onClick={() => handleOpenShippingDialog(params.row.waybillId)}
              sx={{
                bgcolor: "#1c2759",
                "&:hover": { bgcolor: "#1976D2" },
                textTransform: "none",
                borderRadius: 1.5,
                boxShadow: "none",
                px: 1.5,
                py: 0.25,
                fontSize: "0.75rem",
                width: "100px",
                height: "24px",
              }}
            >
              View Waybill
            </Button>
          )}
        </Stack>
      ),
    }
    
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  const paginationModel = { page: 0, pageSize: 20 };

  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          height: "100%",
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // Cập nhật giá trị tìm kiếm
          sx={{
            width: "40%",
            mb: "1rem",
          }}
        />
        <Paper
          sx={{
            height: "90%",
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
          <DialogContent>
            <Stack direction="column" spacing={2} width="100%" my={2}>
              <TextField
                label="Weight (g)"
                name="weight"
                fullWidth
                size="small"
                type="number"
                value={formValues.weight}
                onChange={handleChange}
              />
              <TextField
                label="Length (cm)"
                name="length"
                fullWidth
                size="small"
                type="number"
                value={formValues.length}
                onChange={handleChange}
              />
              <TextField
                label="Width (cm)"
                name="width"
                fullWidth
                size="small"
                type="number"
                value={formValues.width}
                onChange={handleChange}
              />
              <TextField
                label="Height (cm)"
                name="height"
                fullWidth
                size="small"
                type="number"
                value={formValues.height}
                onChange={handleChange}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateWaybill} color="primary">
              Create Waybill
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              width: "100%",
              maxWidth: "633px",
              maxHeight: "100%",
              borderRadius: "0px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
          open={openShipping}
          onClose={handleCloseShippingDialog}
        >
          <DialogTitle sx={{ fontWeight: 400 }}>
            Tracking Information {steps && steps.code} <br></br>
            GHN Note: {steps && steps.ghnRequiredNote} <br></br>
            Customer Note: {steps && steps.note} <br></br>
            Shipping Date: {formatDate(steps && steps.shippingDate)}
          </DialogTitle>
          <DialogContent
            sx={{
              width: "100%",
              borderBottom: "1px solid #ccc",
              borderTop: "1px solid #ccc",
              overflow: "auto",
              maxHeight: "450px",
              ...customScrollbarStyle,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Stepper orientation="vertical" sx={{ paddingLeft: 2 }}>
              {steps &&
                steps.waybillLogs.reverse().map((step, index) => (
                  <Step
                    sx={{ alignItems: "start", justifyContent: "start" }}
                    key={index}
                    active={true}
                    completed={index === steps.waybillLogs.length - 1}
                  >
                    <StepLabel
                      icon={
                        index === 0 ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <AccessTimeIcon color="action" />
                        )
                      }
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ width: "100%" }}
                      >
                        {/* Time and Status */}
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{
                            flexShrink: 0,
                            color:
                              index === 0 ? "success.main" : "text.secondary",
                            minWidth: "150px",
                          }}
                        >
                          {formatDate(step.createdAt)}
                        </Typography>

                        {/* Status and Additional Info */}
                        <Stack direction="column" spacing={0.5}>
                          <Typography variant="body2">
                            {step.previousStatus}
                          </Typography>
                          {step.currentStatus && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {step.currentStatus}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </StepLabel>
                  </Step>
                ))}
            </Stepper>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseShippingDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ManageOrder;
