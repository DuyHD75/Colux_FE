import { Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextConfig from '../config/text.config'
import { useSelector, useDispatch } from 'react-redux'
// import { orders } from '../data/Product'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ImageComponent from '../components/commons/ImageComponent';
import { SiVisa } from "react-icons/si";
import { PiWarningCircle } from "react-icons/pi";
import UserSidebar from '../components/commons/UserSidebar'
import cartApi from '../api/modules/cart.api';
import { setGlobalLoading } from "../redux/reducer/globalLoadingSlice";
import { toast } from 'react-toastify'

const OrderHistory = () => {
    const { appState } = useSelector((state) => state.appState);
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    useEffect(() => {
        const getOrder = async () => {
            if (user) {
                try {
                    dispatch(setGlobalLoading(true));
                    const { response, err } = await cartApi.getOrdersbyCustomerId(user.userId);
                    if (response) {
                        
                        setOrders(response.data.orders);
                    }
                    if (err) {
                        toast.error('Failed to fetch orders data');
                    }
                } catch (error) {
                    toast.error('An error occurred while fetching order data');
                } finally {
                    dispatch(setGlobalLoading(false));
                }
            }
        };
        getOrder();
    }, [user]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

    return (
        <>
            <UserSidebar>
                <Box sx={{ width: { xs: '100%', md: '80%' }, height: '100%', bgcolor: 'white', borderRadius: '8px', padding: '1rem' }}>
                    <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '20px', mb: '1rem' }}>Order History</Typography>
                    <Stack spacing={2} direction='column' >
                        {orders.map((item, index) => {
                            return (
                                <Accordion sx={{ borderRadius: '8px', bgcolor: '#F9F9F9' }} slotProps={{ transition: { unmountOnExit: false } }} key={index}>
                                    <AccordionSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >

                                        <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center' width='100%' >
                                            <Box>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px' }}>Order ID: <span style={{ fontWeight: '400' }}>{item.code}</span></Typography>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px' }}>Order Date: <span style={{ fontWeight: '400' }}>{formatDate(item.createdAt)}</span></Typography>
                                            </Box>
                                            <Stack direction='row' spacing='12px' justifyContent='flex-start' alignItems='center' >
                                                {/* <Chip size='small' label={capitalizeFirstLetter(item.status)} sx={{ ...TextConfig.style.headerText, width: '100px', fontWeight: '700', color: 'white', fontSize: '14px', bgcolor: `${item.status === 'PENDING' ? '#B9B9B9' : '#0EA97A'}` }} /> */}
                                                <Chip size='small' label='Paid' sx={{ ...TextConfig.style.headerText, width: '100px', fontWeight: '700', color: 'white', fontSize: '14px', bgcolor: '#0EA97A' }} />

                                            </Stack>
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Divider />
                                        {item.products.map((product, index) => {
                                            return (
                                                <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center' width='100%' mt='12px' mb='16px' >
                                                    <Stack direction='row' spacing={2} justifyContent='flex-start' alignItems='center' width='80%'>
                                                        <ImageComponent src={product.productDetails&&product.productDetails.productImage} alt={product.productDetails&&product.productDetails.productImage} width='75px' height='75px' />
                                                        <Stack direction='column' spacing='12px' width={{ xs: '210px', md: '359px' }}>
                                                            <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px' }}>{product.productDetails && product.productDetails.productName}</Typography>
                                                            <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Description: {product.productDetails && product.productDetails.productDescription}</Typography>
                                                            {product.categoryName && product.categoryName === 'Paint' &&
                                                                <Stack direction='row' spacing={2}>
                                                                    <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '14px', borderRight: '1px solid', pr: 2 }}>Color code: {product.productDetails && product.productDetails.paintDetails.hex}</Typography>
                                                                    <Box sx={{ width: '20px', height: '20px', borderRadius: '8px', bgcolor: product.productDetails && product.productDetails.paintDetails.hex }}></Box>
                                                                </Stack>
                                                            }
                                                        </Stack>
                                                    </Stack>
                                                    <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '16px', width: 'max-content' }}>${product.priceSell} <span style={{ color: '#669AE7', fontWeight: '400' }}>x {product.itemQuantity}</span></Typography>
                                                </Stack>
                                            )
                                        })
                                        }
                                        <Divider />
                                        <Stack direction='row' spacing='12px' my='16px'>
                                            <Box sx={{ width: '100%', bgcolor: '#FFFFFF', mt: '16px', borderRadius: '8px', p: '12px', gap: '12px', display: 'flex', flexDirection: 'column' }}>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px' }}>Information</Typography>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '12px' }}>{item.toName}</Typography>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '12px' }}>{item.toPhone}</Typography>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '12px' }}>{item.toWardName}, {item.toDistrictName}, {item.toProvinceName}</Typography>
                                            </Box>
                                            <Box sx={{ width: '100%', bgcolor: '#FFFFFF', mt: '16px', borderRadius: '8px', p: '12px' }}>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px', pb: '9px' }}>Delivery method</Typography>
                                                <ImageComponent src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2FGHN.png?alt=media&token=bebc7279-0aba-4000-a430-da857cd9ee57" alt='delivery' width='50px' height='20px' />
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px', pb: '12px', pt: '7px' }}>Payment method</Typography>
                                                <Stack direction='row' alignItems='center' spacing='5px'>
                                                <ImageComponent src='https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg' alt='delivery' width='50px' height='20px' />
                                                </Stack>
                                            </Box>
                                            <Box sx={{ width: '100%', bgcolor: '#FFFFFF', mt: '16px', borderRadius: '8px', p: '12px' }}>
                                                <Stack direction='column' spacing='12px' >
                                                    <Stack direction='row' justifyContent='space-between'>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>Total Amount</Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>${item.totalAmount}</Typography>
                                                    </Stack>
                                                    <Stack direction='row' justifyContent='space-between'>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontSize: '14px' }}>Tax</Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>${item.tax}</Typography>
                                                    </Stack>
                                                    <Stack direction='row' justifyContent='space-between'>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontSize: '14px', display: 'inline-flex', alignItems: 'center' }}>Delivery
                                                            <span style={{ paddingLeft: '3px' }}><PiWarningCircle style={{ height: '12px', width: '12px' }} /></span></Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>${item.shippingCost}</Typography>
                                                    </Stack>
                                                    <Stack direction='row' justifyContent='space-between'>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>Total Pay</Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>${item.totalPay}</Typography>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        <Divider />
                                        <Button sx={{
                                            ...TextConfig.style.headerText,
                                            mt: '1rem',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            bgcolor: '#1c2759',
                                            color: 'white',
                                            borderRadius: '14px',
                                            width: '150px',
                                            height: '30px',
                                            textTransform: 'capitalize',
                                            '&:hover': {
                                                color: 'secondary.colorText',
                                                backgroundColor: '#2c3766',
                                            }
                                        }}>{item.status === "COMPLETED" ? 'Write a review' : 'Confirm Receipt'}</Button>

                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </Stack>
                </Box>
            </UserSidebar>
        </>
    )
}

export default OrderHistory