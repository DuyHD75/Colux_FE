import { Box, Button, Divider, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, MenuItem, Select } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { routesGen } from '../router/router';
import { IoIosArrowBack } from "react-icons/io";
import textConfigs from '../config/text.config';
import backgroundConfigs from '../config/background.config';
import { Delete } from '@mui/icons-material';
import { RiDeleteBin6Line } from "react-icons/ri";
import CloseIcon from "@mui/icons-material/Close";
import ImageUploader from '../components/common/ImageUploader';
import ghnApi from '../api/modules/ghn.api';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateOrder = () => {
    const location = useLocation();
    const { order } = location.state || {};
    const [products, setProducts] = useState([]);
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

    const orderForm = useFormik({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            province: '',
            district: '',
            ward: '',
            address: '',
            note: '',
            paymentMethod: 'CASH',
            paymentStatus: '',
            advancePayment: 0,
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(2, "First name at least 8 characters !")
                .required("Name is required !"),
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
            note: Yup.string(),
            paymentStatus: Yup.string(),
            advancePayment: Yup.number().
                required("Advance Payment is required !")
                .min(0, "Advance Payment must be greater than 0 !"),

        }),
        onSubmit: async values => {
            values.province = provinces.find(province => province.ProvinceID === values.province).ProvinceName;
            values.district = districts.find(district => district.DistrictID === values.district).DistrictName;
            values.ward = wards.find(ward => ward.WardCode === values.ward).WardName;


        }
    })

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
                        Create Order
                    </Typography>
                </Stack>

                <Stack direction='row' spacing={2} alignItems='start' mt={2} >
                    <Stack direction='column'
                        spacing={1}
                        flex={3}
                    >

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
                            {products.length > 0 ? (
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
                                            {/* {order.products.map((product, index) => ( */}
                                            <TableRow
                                                sx={{
                                                    '&:last-child td': { borderBottom: 0 },
                                                    backgroundColor: (1) % 2 === 0 ? '#F9FAFB' : 'white'
                                                }}
                                            >
                                                <TableCell sx={{ ...textConfigs.style.basicFont, color: '#1A56DB' }} align='center'>
                                                    {1}
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction='column' spacing={2} alignItems='start'>
                                                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: 'bold' }}>MYKOLOR GRAND GARNET FEEL</Typography>
                                                        <Stack direction='row' spacing={2}>
                                                            <Typography sx={{ color: '#9F9BA9', fontSize: '14px', ...textConfigs.style.basicFont }}>Code: KOLUX-0000001</Typography>
                                                            <Typography sx={{ fontSize: '14px', ...textConfigs.style.basicFont, color: '#4D94DD' }}>Paint</Typography>
                                                            <Typography sx={{ color: '#4D94DD', fontSize: '14px', ...textConfigs.style.basicFont }}>#ffc863</Typography>

                                                        </Stack>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ ...textConfigs.style.basicFont }} align='center'>
                                                    $100
                                                </TableCell>
                                                <TableCell sx={{ ...textConfigs.style.basicFont }} align='center'>
                                                    <Stack direction='row' alignItems='center' width='90px' height='58px'>
                                                        <button className=' w-[27px] h-[30px]  border border-gray-300 border-solid bg-[#EAEAEA] rounded-sm' >-</button>
                                                        <input
                                                            className='border border-gray-300 w-[36px] h-[30px] text-center no-arrows'
                                                            type='text'
                                                            min={1}
                                                            value={2}
                                                        />
                                                        <button className=' w-[27px] h-[30px]  border border-gray-300 border-solid bg-[#EAEAEA] rounded-sm'>+</button>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ ...textConfigs.style.basicFont }} align='center' >
                                                    $200
                                                </TableCell>

                                                <TableCell sx={{ ...textConfigs.style.basicFont }} align="center">
                                                    <IconButton>
                                                        <RiDeleteBin6Line style={{ color: 'red' }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                            {/* ))} */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography
                                    color="textSecondary"
                                    align="center"
                                    sx={{
                                        ...textConfigs.style.basicFont,
                                        my: '1rem'
                                    }}
                                >
                                    Please select the product.
                                </Typography>
                            )
                            }


                            {products.length > 0 && (
                                <>
                                    <Divider />
                                    <Stack direction='column' alignItems='end' mt={2}>
                                        <Stack width='30%' direction='row' justifyContent='space-between' alignItems='center'>
                                            <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Total Price:</Typography>
                                            <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, color: '#4D94DD' }}>$0</Typography>
                                        </Stack>
                                        <Stack width='30%' direction='row' justifyContent='space-between' alignItems='center'>
                                            <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Tax:</Typography>
                                            <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, color: '#4D94DD' }}>$0</Typography>
                                        </Stack>
                                        <Stack width='30%' direction='row' justifyContent='space-between' alignItems='center'>
                                            <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Shipping Fee:</Typography>
                                            <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, textDecoration: 'line-through', color: '#4D94DD' }}>$0</Typography>
                                        </Stack>
                                        <Stack width='30%' direction='row' justifyContent='space-between' alignItems='center'>
                                            <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Total Payment:</Typography>
                                            <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, color: '#4D94DD' }}>$0</Typography>
                                        </Stack>
                                    </Stack>
                                </>
                            )}

                        </Stack>

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
                        <form onSubmit={orderForm.handleSubmit}>
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
                                size='small'
                                type='text'
                                sx={{ mb: '28px' }}
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={orderForm.values.fullName}
                                onChange={orderForm.handleChange}
                                onBlur={orderForm.handleBlur}
                                name='fullName'
                                error={orderForm.touched.fullName && orderForm.errors.fullName !== undefined}
                                helperText={orderForm.touched.fullName && orderForm.errors.fullName}
                            ></TextField>
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
                                size='small'
                                type='text'
                                sx={{ mb: '28px' }}
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={orderForm.values.phoneNumber}
                                onChange={orderForm.handleChange}
                                onBlur={orderForm.handleBlur}
                                name='phoneNumber'
                                error={orderForm.touched.phoneNumber && orderForm.errors.phoneNumber !== undefined}
                                helperText={orderForm.touched.phoneNumber && orderForm.errors.phoneNumber}
                            />

                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>Customer Province:</Typography>

                            <Select
                                style={{ width: '100%', marginBottom: '12px', }}
                                name='province'
                                value={orderForm.values.province}
                                onChange={(e) => {
                                    orderForm.handleChange(e);
                                    fetchDistricts(e.target.value); // Fetch districts when province changes
                                }}
                                error={orderForm.touched.province && orderForm.errors.province !== undefined}
                                onBlur={orderForm.handleBlur}
                                variant='outlined' size='small' sx={{ width: 'fit-content' }}
                            >
                                {provinces.map((province, index) => (
                                    <MenuItem key={index} value={province.ProvinceID}>{province.ProvinceName}</MenuItem>
                                ))}
                            </Select>

                            {/* District Selection */}

                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>Customer District:</Typography>
                            <Select
                                style={{ width: '100%', marginBottom: '12px', }}
                                name='district'
                                value={orderForm.values.district}
                                onChange={(e) => {
                                    orderForm.handleChange(e);
                                    setSelectedDistrictID(e.target.value); // Store selected DistrictID
                                    fetchWards(e.target.value); // Fetch wards when district changes
                                }}
                                error={orderForm.touched.district && orderForm.errors.district !== undefined}
                                onBlur={orderForm.handleBlur}
                                variant='outlined' size='small' sx={{ width: 'fit-content' }}
                            >
                                {districts && districts.map((district, index) => (
                                    <MenuItem key={index} value={district.DistrictID}>{district.DistrictName}</MenuItem>
                                ))}
                            </Select>

                            {/* Ward Selection */}
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>Customer Ward:</Typography>
                            <Select
                                style={{ width: '100%', marginBottom: '12px', }}
                                name='ward'
                                value={orderForm.values.ward}
                                onChange={(e) => {
                                    orderForm.handleChange(e);
                                    calculateFee(e.target.value, selectedDistrictID); // Fetch fee when ward changes
                                }}
                                error={orderForm.touched.ward && orderForm.errors.ward !== undefined}
                                onBlur={orderForm.handleBlur}
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
                                size='small'
                                type='text'
                                sx={{ mb: '28px' }}
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={orderForm.values.address}
                                onChange={orderForm.handleChange}
                                onBlur={orderForm.handleBlur}
                                name='address'
                                error={orderForm.touched.address && orderForm.errors.address !== undefined}
                                helperText={orderForm.touched.address && orderForm.errors.address}
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
                                size='small'
                                type='text'
                                sx={{ mb: '28px' }}
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={orderForm.values.note}
                                onChange={orderForm.handleChange}
                                onBlur={orderForm.handleBlur}
                                name='note'
                                error={orderForm.touched.note && orderForm.errors.note !== undefined}
                                helperText={orderForm.touched.note && orderForm.errors.note}
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
                            <TextField
                                size='small'
                                type='text'
                                sx={{ mb: '28px' }}
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value='CASH'
                                disabled

                            />
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
                                value={orderForm.values.paymentStatus}
                                onChange={orderForm.handleChange}
                                // Fetch fee when paymentStatus changes

                                error={orderForm.touched.paymentStatus && orderForm.errors.paymentStatus !== undefined}
                                onBlur={orderForm.handleBlur}
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
                                Advance Payment
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <TextField
                                size='small'
                                type='text'
                                sx={{ mb: '28px' }}
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value=''
                                onChange={orderForm.handleChange}
                                onBlur={orderForm.handleBlur}
                                name='advancePayment'
                                error={orderForm.touched.advancePayment && orderForm.errors.advancePayment !== undefined}
                                helperText={orderForm.touched.advancePayment && orderForm.errors.advancePayment}
                            />
                            <Button
                                variant='contained'
                                type='submit'
                                sx={{
                                    width: '30%',
                                    mt: '1rem',
                                    ...backgroundConfigs.style.backgroundPrimary
                                }}
                            >
                                Create Order
                            </Button>

                        </form>

                    </Stack>
                </Stack>


            </Box>
        </Fragment >
    )
}

export default CreateOrder