import { Box, Button, Divider, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Grid, Select,MenuItem } from '@mui/material';
import React, { Fragment } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { routesGen } from '../router/router';
import { IoIosArrowBack } from "react-icons/io";
import textConfigs from '../config/text.config';
import backgroundConfigs from '../config/background.config';
import { Delete } from '@mui/icons-material';
import { RiDeleteBin6Line } from "react-icons/ri";
import CloseIcon from "@mui/icons-material/Close";
import ImageUploader from '../components/common/ImageUploader';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ghnApi from '../api/modules/ghn.api';
import { useEffect } from 'react';
import { useState } from 'react';

const OrderDetails = () => {
    const location = useLocation();
    const { order } = location.state || {};
    const navigate = useNavigate();
    console.log(order);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedDistrictID, setSelectedDistrictID] = useState(null);
    const [shippingFee, setShippingFee] = useState(0);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await ghnApi.getProvince();
                if (response.err) {
                    throw new Error('Network response was not ok');
                }
                setProvinces(response.response.data.provinces.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        }
        fetchProvinces();
    }, []);

    const fetchDistricts = async (provinceID) => {
        try {
            const province_id = provinceID;
            const response = await ghnApi.getDistrict(province_id);
            setDistricts(response.response.data.fee.data);
            if (response.err) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    }

    const fetchWards = async (DistrictID) => {
        try {
            const district_id = DistrictID;
            const response = await ghnApi.getWard(district_id);
            if (response.err) {
                throw new Error('Network response was not ok');
            }
            setWards(response.response.data.fee.data);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    }

    const calculateFee = async (wardCode, DistrictID) => {
        try {
            const from_district_id = 1529
            const from_ward_code = "40401"
            const service_id = 53321
            const to_district_id = DistrictID
            const to_ward_code = wardCode
            const width = 30
            const height = 30
            const weight = 1000
            const length = 30

            const response = await ghnApi.calculateShippingFee(from_district_id, from_ward_code, service_id, to_district_id, to_ward_code, width, height, weight, length);
            setShippingFee(response.response.data.fee.data.total);

            if (response.code === 400) {
                throw new Error(response.message);
            }
        }
        catch (error) {
            console.error('Error fetching fee:', error);
        }
    }

    const selectedProvince = provinces.find(province => province.ProvinceName === order.toProvinceName);
    console.log(selectedProvince);
    
    const billingForm = useFormik({
        initialValues: {
            fullName: order.toName||'',
            employeeName: '',
            shipperName: '',
            orderCode: order.code||'',
            orderStatus: order.status||'',
            phoneNumber: order.toPhone||'',
            province: '', //selectedProvince.ProvinceID||
            district: order.toDistrictName||'',
            ward: order.toWardName||'',
            address: order.toAddress||'',
            cancellationReason: '',
            note: order.note||'',
            paymentMethod: order.paymentMethod||'',
            paymentStatus: order.paymentStatus||'', 
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(2, "First name at least 8 characters !")
                .required("Name is required !"),
            employeeName: Yup.string()
                .min(2, "Employee name at least 8 characters !"),
            shipperName: Yup.string()
                .min(2, "Shipper name at least 8 characters !"),
            orderCode: Yup.string()
                .required("Order code is required !"),
            orderStatus: Yup.string()
                .required("Order status is required !"),
            phoneNumber: Yup.string()
                .required("Phone is required !")
                .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone must be a number !"),
            province: Yup.string()
                .required("State is required !"),
            district: Yup.string()
                .required("District is required !"),
            ward: Yup.string()
                .required("Ward is required !"),
            address: Yup.string()
                .required("Address is required !"),
            cancellationReason: Yup.string(),
            note: Yup.string(),
            paymentMethod: Yup.string()
                .required("Payment method is required !"),
            paymentStatus: Yup.string()
                .required("Payment status is required !"),
        }),
        onSubmit: async values => {
        }
    })

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    };

    return (
        <Fragment>
            <Box>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <IconButton style={{ backgroundColor: 'aliceblue' }} onClick={() => navigate(routesGen.manageOrder)}><IoIosArrowBack /></IconButton>
                    <Typography sx={{
                        fontSize: 24,
                        fontWeight: 600,
                        ...textConfigs.style.headerText
                    }}>
                        Update Order
                    </Typography>
                </Stack>

                <Stack direction='row' spacing={2} alignItems='start' mt={2} >
                    <Stack direction='column'
                        spacing={1}
                        flex={3}
                    >
                        <Stack direction='row' spacing={2} alignItems='center' mt={2} p={1} bgcolor='white'
                            sx={{
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Thêm boxShadow
                                borderRadius: '8px', // Thêm borderRadius nếu cần
                            }}
                        >
                            <Stack direction='column' spacing={1} alignItems='center'>
                                <Typography sx={{
                                    fontWeight: 'bold',
                                    ...textConfigs.style.basicFont
                                }}>
                                    Order ID
                                </Typography>
                                <Typography sx={{
                                    bgcolor: '#E7F5FF',
                                    padding: '0.3rem',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    ...textConfigs.style.basicFont
                                }}>
                                    {order.id}
                                </Typography>
                            </Stack>
                            <Stack direction='column' spacing={1} alignItems='start'>
                                <Typography sx={{
                                    fontWeight: 'bold',
                                    ...textConfigs.style.basicFont
                                }}>
                                    Create At
                                </Typography>
                                <Typography sx={{
                                    bgcolor: '#E7F5FF',
                                    padding: '0.3rem',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    ...textConfigs.style.basicFont
                                }}>
                                    {formatDate(order.createdAt)}
                                </Typography>
                            </Stack>
                            <Stack direction='column' spacing={1} alignItems='start'>
                                <Typography sx={{
                                    fontWeight: 'bold',
                                    ...textConfigs.style.basicFont
                                }}>
                                    Update At
                                </Typography>
                                <Typography sx={{
                                    bgcolor: '#E7F5FF',
                                    borderRadius: '20px',
                                    padding: '0.3rem',
                                    fontSize: '14px',
                                    ...textConfigs.style.basicFont
                                }}>
                                    {formatDate(order.updatedAt)}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction='column'
                            spacing={1}
                            flex={3}
                            bgcolor='white'
                            p={2}
                            sx={{
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Thêm boxShadow
                                borderRadius: '8px', // Thêm borderRadius nếu cần
                            }} >
                            <Typography sx={{
                                mb: '5px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Add Product
                            </Typography>
                            <TextField
                                label='Search'
                                variant='outlined'
                                size='small'
                                sx={{
                                    width: '40%',
                                    mb: '1rem',
                                }}
                            />
                            <TableContainer sx={{ height: 'auto' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align='center'
                                                width="10%"
                                                sx={{
                                                    ...textConfigs.style.basicFont,
                                                    backgroundColor: '#F9FAFB',
                                                    fontWeight: 600,
                                                    borderBottom: '1px solid #E5E7EB'
                                                }}
                                            >
                                                Number
                                            </TableCell>
                                            <TableCell
                                                width="45%"
                                                sx={{
                                                    ...textConfigs.style.basicFont,
                                                    backgroundColor: '#F9FAFB',
                                                    fontWeight: 600,
                                                    borderBottom: '1px solid #E5E7EB'
                                                }}
                                            >
                                                Product Name
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                width="15%"
                                                sx={{
                                                    ...textConfigs.style.basicFont,
                                                    backgroundColor: '#F9FAFB',
                                                    fontWeight: 600,
                                                    borderBottom: '1px solid #E5E7EB'
                                                }}
                                            >
                                                Price
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                width="10%"
                                                sx={{
                                                    ...textConfigs.style.basicFont,
                                                    backgroundColor: '#F9FAFB',
                                                    fontWeight: 600,
                                                    borderBottom: '1px solid #E5E7EB'
                                                }}
                                            >
                                                Quantity
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                width="15%"
                                                sx={{
                                                    ...textConfigs.style.basicFont,
                                                    backgroundColor: '#F9FAFB',
                                                    fontWeight: 600,
                                                    borderBottom: '1px solid #E5E7EB'
                                                }}
                                            >
                                                Total
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                width="5%"
                                                sx={{
                                                    ...textConfigs.style.basicFont,
                                                    backgroundColor: '#F9FAFB',
                                                    fontWeight: 600,
                                                    borderBottom: '1px solid #E5E7EB'
                                                }}
                                            >
                                                Action
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.products.map((product, index) => (
                                            <TableRow
                                                key={product.id}
                                                sx={{
                                                    '&:last-child td': { borderBottom: 0 },
                                                    backgroundColor: (index + 1) % 2 === 0 ? '#F9FAFB' : 'white'
                                                }}
                                            >
                                                <TableCell sx={{ ...textConfigs.style.basicFont, color: '#1A56DB' }} align='center'>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction='column' spacing={2} alignItems='start'>
                                                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: 'bold' }}>{product.productDetails.productName}</Typography>
                                                        <Stack direction='row' spacing={2}>
                                                            <Typography sx={{ color: '#9F9BA9', fontSize: '14px', ...textConfigs.style.basicFont }}>Code: {product.productDetails.code}</Typography>
                                                            <Typography sx={{ fontSize: '14px', ...textConfigs.style.basicFont, color: '#4D94DD' }}>{product.categoryName}</Typography>
                                                            {product.categoryName === 'Paint' && <Typography sx={{ color: '#4D94DD', fontSize: '14px', ...textConfigs.style.basicFont }}>{product.productDetails.paintDetails.hex}</Typography>
                                                            }
                                                        </Stack>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ ...textConfigs.style.basicFont }} align='center'>
                                                    ${product.priceSell}
                                                </TableCell>
                                                <TableCell sx={{ ...textConfigs.style.basicFont }} align='center'>
                                                    <Stack direction='row' alignItems='center' width='90px' height='58px'>
                                                        <button className=' w-[27px] h-[30px]  border border-gray-300 border-solid bg-[#EAEAEA] rounded-sm' >-</button>
                                                        <input
                                                            className='border border-gray-300 w-[36px] h-[30px] text-center no-arrows'
                                                            type='text'
                                                            min={1}
                                                            value={product.itemQuantity}
                                                        />
                                                        <button className=' w-[27px] h-[30px]  border border-gray-300 border-solid bg-[#EAEAEA] rounded-sm'>+</button>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ ...textConfigs.style.basicFont }} align='center' >
                                                    ${product.priceSell * product.itemQuantity}
                                                </TableCell>

                                                <TableCell sx={{ ...textConfigs.style.basicFont }} align="center">
                                                    <IconButton>
                                                        <RiDeleteBin6Line style={{ color: 'red' }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Divider />
                            <Stack direction='column' alignItems='end' mt={2}>
                                <Stack width='35%' direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Total Price:</Typography>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, color: '#4D94DD' }}>$10.000.000</Typography>
                                </Stack>
                                <Stack width='35%' direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Tax:</Typography>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, color: '#4D94DD' }}>$10.000.000</Typography>
                                </Stack>
                                <Stack width='35%' direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Shipping Fee:</Typography>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, textDecoration: 'line-through', color: '#4D94DD' }}>$10.000.000</Typography>
                                </Stack>
                                <Stack width='35%' direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Total Payment:</Typography>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, color: '#4D94DD' }}>$10.000.000</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Box bgcolor='white'
                            p={2}
                            sx={{
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Thêm boxShadow
                                borderRadius: '8px', // Thêm borderRadius nếu cần
                            }}>
                            <Typography sx={{
                                mb: '5px',
                                fontWeight: 'bold',
                                ...textConfigs.style.headerText
                            }}>
                                Upload Image Shipping
                            </Typography>
                            <Grid
                                container
                                spacing={2}
                                alignItems="center"
                                justifyContent="flex-start"
                                width="100%"
                                my={2}
                            >
                                {order.images?.length > 0 ? (
                                    order.images.map((image, index) => (
                                        <Grid item xs={6} sm={4} md={3}>
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    width: "100%",
                                                    height: "400px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    m: 1,
                                                }}
                                            >
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
                                                        borderRadius: "50%",
                                                        padding: "5px",
                                                        position: "absolute",
                                                        top: "8px",
                                                        right: "8px",
                                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                                                        },
                                                    }}

                                                >
                                                    <CloseIcon
                                                        sx={{
                                                            fontSize: "1rem",
                                                            color: "#fff",
                                                        }}
                                                    />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    ))
                                ) : (
                                    <Grid item xs={12} md={12}>
                                        <Typography
                                            variant="body1"
                                            color="textSecondary"
                                            align="center"
                                            my={2}
                                        >
                                            There are no images for this order.
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                            <ImageUploader />
                        </Box>
                    </Stack>
                    <Stack direction='column'
                        spacing={1}
                        flex={1.5}
                        bgcolor='white'
                        p={2}
                        sx={{
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Thêm boxShadow
                            borderRadius: '8px', // Thêm borderRadius nếu cần
                        }}>
                        <form>
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Customer Name
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <TextField
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                sx={{ mb: '28px' }}
                                value={billingForm.values.fullName}
                                onChange={billingForm.handleChange}
                                onBlur={billingForm.handleBlur}
                                name='fullName'
                                error={billingForm.touched.fullName && Boolean(billingForm.errors.fullName)}
                                helperText={billingForm.touched.fullName && billingForm.errors.fullName}
                                size='small'
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Employee Name
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <TextField
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                sx={{ mb: '28px' }}
                                value={billingForm.values.employeeName}
                                onChange={billingForm.handleChange}
                                onBlur={billingForm.handleBlur}
                                name='employeeName'
                                error={billingForm.touched.employeeName && Boolean(billingForm.errors.employeeName)}
                                helperText={billingForm.touched.employeeName && billingForm.errors.employeeName}
                                size='small'
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Shipper Name
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <TextField
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                sx={{ mb: '28px' }}
                                value={billingForm.values.shipperName}
                                onChange={billingForm.handleChange}
                                onBlur={billingForm.handleBlur}
                                name='shipperName'
                                error={billingForm.touched.shipperName && Boolean(billingForm.errors.shipperName)}
                                helperText={billingForm.touched.shipperName && billingForm.errors.shipperName}
                                size='small'
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Order Code
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <TextField
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                sx={{ mb: '28px' }}
                                value={billingForm.values.orderCode}
                                onChange={billingForm.handleChange}
                                onBlur={billingForm.handleBlur}
                                name='orderCode'
                                error={billingForm.touched.orderCode && Boolean(billingForm.errors.orderCode)}
                                helperText={billingForm.touched.orderCode && billingForm.errors.orderCode}
                                size='small'
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Order Status
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <Select
                                style={{ width: '100%', marginBottom: '12px', }}
                                name='orderStatus'
                                value={billingForm.values.orderStatus}
                                onChange={billingForm.handleChange}
                                // Fetch fee when orderStatus changes

                                error={billingForm.touched.orderStatus && billingForm.errors.orderStatus !== undefined}
                                onBlur={billingForm.handleBlur}
                                variant='outlined' size='small' sx={{ width: 'fit-content' }}
                            >
                                <MenuItem >Hello</MenuItem>
                            </Select>
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Customer Phone
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <TextField
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                sx={{ mb: '28px' }}
                                value={billingForm.values.phoneNumber}
                                onChange={billingForm.handleChange}
                                onBlur={billingForm.handleBlur}
                                name='phoneNumber'
                                error={billingForm.touched.phoneNumber && Boolean(billingForm.errors.phoneNumber)}
                                helperText={billingForm.touched.phoneNumber && billingForm.errors.phoneNumber}
                                size='small'
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Customer Province
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <Select
                                style={{ width: '100%', marginBottom: '12px', }}
                                name='province'
                                value={billingForm.values.province}
                                onChange={(e) => {
                                    billingForm.handleChange(e);
                                    fetchDistricts(e.target.value); // Fetch districts when province changes
                                }}
                                error={billingForm.touched.province && billingForm.errors.province !== undefined}
                                onBlur={billingForm.handleBlur}
                                variant='outlined' size='small' sx={{ width: 'fit-content' }}
                            >
                                {provinces.map((province, index) => (
                                    <MenuItem key={index} value={province.ProvinceID}>{province.ProvinceName}</MenuItem>
                                ))}
                            </Select>
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Customer District
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <Select
                                style={{ width: '100%', marginBottom: '12px', }}
                                name='district'
                                value={billingForm.values.district}
                                onChange={(e) => {
                                    billingForm.handleChange(e);
                                    setSelectedDistrictID(e.target.value); // Store selected DistrictID
                                    fetchWards(e.target.value); // Fetch wards when district changes
                                }}
                                error={billingForm.touched.district && billingForm.errors.district !== undefined}
                                onBlur={billingForm.handleBlur}
                                variant='outlined' size='small' sx={{ width: 'fit-content' }}
                            >
                                {districts && districts.map((district, index) => (
                                    <MenuItem key={index} value={district.DistrictID}>{district.DistrictName}</MenuItem>
                                ))}
                            </Select>
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Customer Ward
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <Select
                                style={{ width: '100%', marginBottom: '12px', }}
                                name='ward'
                                value={billingForm.values.ward}
                                onChange={(e) => {
                                    billingForm.handleChange(e);
                                    calculateFee(e.target.value, selectedDistrictID); // Fetch fee when ward changes
                                }}
                                error={billingForm.touched.ward && billingForm.errors.ward !== undefined}
                                onBlur={billingForm.handleBlur}
                                variant='outlined' size='small' sx={{ width: 'fit-content' }}
                            >
                                {wards && wards.map((ward, index) => (
                                    <MenuItem key={index} value={ward.WardCode}>{ward.WardName}</MenuItem>
                                ))}
                            </Select>
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Customer Address
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <TextField
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                sx={{ mb: '28px' }}
                                value={billingForm.values.address}
                                onChange={billingForm.handleChange}
                                onBlur={billingForm.handleBlur}
                                name='address'
                                error={billingForm.touched.address && Boolean(billingForm.errors.address)}
                                helperText={billingForm.touched.address && billingForm.errors.address}
                                size='small'
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Cancellation Reason
                            </Typography>
                            <TextField
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                sx={{ mb: '28px' }}
                                value={billingForm.values.cancellationReason}
                                onChange={billingForm.handleChange}
                                onBlur={billingForm.handleBlur}
                                name='cancellationReason'
                                error={billingForm.touched.cancellationReason && Boolean(billingForm.errors.cancellationReason)}
                                helperText={billingForm.touched.cancellationReason && billingForm.errors.cancellationReason}
                                size='small'
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Note
                            </Typography>
                            <TextField
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                sx={{ mb: '28px' }}
                                value={billingForm.values.note}
                                onChange={billingForm.handleChange}
                                onBlur={billingForm.handleBlur}
                                name='note'
                                error={billingForm.touched.note && Boolean(billingForm.errors.note)}
                                helperText={billingForm.touched.note && billingForm.errors.note}
                                size='small'
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Payment Method
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <Select
                                style={{ width: '100%', marginBottom: '12px', }}
                                name='paymentMethod'
                                value={billingForm.values.paymentMethod}
                                onChange={billingForm.handleChange}
                                // Fetch fee when paymentMethod changes

                                error={billingForm.touched.paymentMethod && billingForm.errors.paymentMethod !== undefined}
                                onBlur={billingForm.handleBlur}
                                variant='outlined' size='small' sx={{ width: 'fit-content' }}
                            >
                                <MenuItem >Hello</MenuItem>
                            </Select>
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Payment Status
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <Select
                                style={{ width: '100%', marginBottom: '12px', }}
                                name='paymentStatus'
                                value={billingForm.values.paymentStatus}
                                onChange={billingForm.handleChange}
                                // Fetch fee when paymentStatus changes

                                error={billingForm.touched.paymentStatus && billingForm.errors.paymentStatus !== undefined}
                                onBlur={billingForm.handleBlur}
                                variant='outlined' size='small' sx={{ width: 'fit-content' }}
                            >
                                <MenuItem >Hello</MenuItem>
                            </Select>
                            <Button
                                variant='contained'
                                type='submit'
                                sx={{
                                    width: '30%',
                                    mt: '1rem',
                                    ...backgroundConfigs.style.backgroundPrimary
                                }}
                            >
                                Update Order
                            </Button>

                        </form>

                    </Stack>
                </Stack>


            </Box>
        </Fragment>
    )
}

export default OrderDetails