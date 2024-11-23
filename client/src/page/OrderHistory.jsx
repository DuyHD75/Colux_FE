import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
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
import customScrollbarStyle from '../config/scrollbar.config';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const OrderHistory = () => {
    const { appState } = useSelector((state) => state.appState);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const steps = [
        {
            time: "22:40 12-11-2024",
            status: "Đơn hàng đã đến kho phân loại Xã Hòa Liên, Huyện Hòa Vang, Đà Nẵng",
        },
        {
            time: "16:09 13-11-2024",
            status: "Đơn hàng đã rời kho phân loại",
        },
        {
            time: "07:13 14-11-2024",
            status: "Đơn hàng đã đến trạm giao hàng tại khu vực của bạn Thị Trấn Núi Thành, Huyện Núi Thành, Quảng Nam và sẽ được giao trong vòng 24 giờ tiếp theo",
        },
        {
            time: "08:25 14-11-2024",
            status: "Đã sắp xếp tài xế giao hàng",
        },
        {
            time: "08:25 14-11-2024",
            status: "Đang vận chuyển: Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại",
        },
        {
            time: "11:23 14-11-2024",
            status: "Đã giao: Giao hàng thành công",
            additionalInfo: "Người nhận hàng: Kiều Hoàng Đạt--",
        },
    ];

    useEffect(() => {
        const getOrder = async () => {
            if (user) {
                try {
                    dispatch(setGlobalLoading(true));
                    const { response, err } = await cartApi.getOrdersbyCustomerId(user.userId);
                    dispatch(setGlobalLoading(false));

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
    console.log(orders);

    const getOrderStatusLabel = (orderStatus) => {
        switch (orderStatus) {
            case 1:
                return 'Created';
            case 2:
                return 'Pending';
            case 3:
                return 'Approved';  
            case 4:
                return 'Completed';
            case 5:
                return 'Cancelled';
            default:
                return 'Unknown';
        }
    };

    const getOrderStatusColor = (orderStatus) => {
        switch (orderStatus) {
          case 1:
            return '#B9B9B9';
          case 2:
            return '#FFA500';
          case 3:
            return '#0EA97A';
          case 4:
            return '#0EA97A';
          case 5:
            return '#FF0000';
          default:
            return '#B9B9B9';
        }
      };


    return (
        <>
            <UserSidebar>
                <Box sx={{ width: { xs: '100%', md: '80%' }, height: '100%', bgcolor: 'white', borderRadius: '8px', padding: '1rem' }}>
                    <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '20px', mb: '1rem' }}>Order History</Typography>
                    <Stack spacing={2} direction='column' >
                        {orders.length > 0 ? orders.map((item, index) => {
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
                                                {(item.paymentStatus === 1) ? <Chip size='small' label='Unpaid' sx={{ ...TextConfig.style.headerText, width: '100px', fontWeight: '700', color: 'white', fontSize: '14px', bgcolor: '#c70000' }} /> : (item.paymentStatus === 2 ? <Chip size='small' label='Paid' sx={{ ...TextConfig.style.headerText, width: '100px', fontWeight: '700', color: 'white', fontSize: '14px', bgcolor: '#0EA97A' }} /> : <Chip size='small' label='Deposited' sx={{ ...TextConfig.style.headerText, width: '100px', fontWeight: '700', color: 'white', fontSize: '14px', bgcolor: '#0EA97A' }} />)
                                                }
                                                <Chip
                                                    size='small'
                                                    label={getOrderStatusLabel(item.status)}
                                                    sx={{
                                                        ...TextConfig.style.headerText,
                                                        width: '100px',
                                                        fontWeight: '700',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        bgcolor: getOrderStatusColor(item.status)
                                                    }}
                                                />
                                            </Stack>
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Divider />
                                        <Box sx={{
                                            overflow: 'auto',
                                            scrollbarWidth:'none',
                                            maxHeight:'200px'
                                        }}>
                                        {item.products.map((product, index) => {
                                            return (
                                                <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center' width='100%' mt='12px' mb='16px' >
                                                    <Stack direction='row' spacing={2} justifyContent='flex-start' alignItems='center' width='80%'>
                                                        <ImageComponent src={product.productDetails && product.productDetails.productImage} alt={product.productDetails && product.productDetails.productImage} width='75px' height='75px' />
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
                                                    <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '16px', width: 'max-content'}}>${product.priceSell} <span style={{ color: '#669AE7', fontWeight: '400' }}>x {product.itemQuantity}</span></Typography>
                                                </Stack>
                                            )
                                        })
                                        }
                                        </Box>
                                        <Divider />
                                        <Stack direction='row' spacing='12px' my='16px'>
                                            <Box sx={{ width: '100%', bgcolor: '#FFFFFF', mt: '16px', borderRadius: '8px', p: '12px', gap: '12px', display: 'flex', flexDirection: 'column' }}>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px' }}>Information</Typography>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '12px' }}>{item.toName}</Typography>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '12px' }}>{item.toPhone}</Typography>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '12px' }}>{item.toAddress}, {item.toWardName}, {item.toDistrictName}, {item.toProvinceName}</Typography>
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
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontSize: '14px' }}>Tax (10%)</Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>${(item.totalAmount * 0.1).toFixed(0)}</Typography>
                                                    </Stack>
                                                    <Stack direction='row' justifyContent='space-between'>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontSize: '14px', display: 'inline-flex', alignItems: 'center' }}>Delivery
                                                            <span style={{ paddingLeft: '3px' }}><PiWarningCircle style={{ height: '12px', width: '12px' }} /></span></Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>$0</Typography>
                                                    </Stack>
                                                    <Stack direction='row' justifyContent='space-between'>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>Total Pay</Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>${item.totalPay}</Typography>
                                                    </Stack>
                                                    {item.advancePayment !== item.totalPay && <Stack direction='row' justifyContent='space-between'>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>Advance Pay</Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>${item.advancePayment}</Typography>
                                                    </Stack>}
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        <Divider />
                                       <Stack direction='row' spacing={1} justifyContent='flex-end' alignItems='center' width='100%' mt='16px'>
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
                                        }}
                                            onClick={() => setOpen(true)}
                                        >View Tracking</Button>
                                        {(item.status === 1 || item.status ===2) &&<Button sx={{
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
                                        }}
                                        >Cancel Order</Button>}
                                        {(item.status === 4) &&
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
                                        }}
                                            onClick={() => setOpen(true)}
                                        >Write a Review</Button>}
                                    </Stack>

                                    </AccordionDetails>
                                </Accordion>
                            )
                        }) :
                            <Typography sx={{ p: 5, textAlign: 'center', ...TextConfig.style.basicFont, fontWeight: '700', fontSize: '20px' }}>No order history</Typography>
                        }
                    </Stack>
                </Box>
                <Dialog
                    sx={{
                        '& .MuiDialog-paper': {
                            width: '100%',
                            maxWidth: '633px',
                            maxHeight: '100%',
                            borderRadius: '0px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        }
                    }}
                    open={open} onClose={() => setOpen(false)}
                >
                    <DialogTitle sx={{ fontWeight: 400 }}>Tracking Information</DialogTitle>
                    <DialogContent
                        sx={{
                            width: "100%",
                            borderBottom: "1px solid #ccc",
                            borderTop: "1px solid #ccc",
                            overflow: "auto",
                            maxHeight: '450px',
                            ...customScrollbarStyle, backgroundColor: "#f9f9f9",
                        }}
                    >

                        <Stepper orientation="vertical" sx={{ paddingLeft: 2 }}>
                            {steps.reverse().map((step, index) => (
                                <Step
                                    sx={{ alignItems: "start", justifyContent: "start" }}
                                    key={index}
                                    active={true}
                                    completed={index === steps.length - 1}
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
                                                    color: index === 0 ? "success.main" : "text.secondary",
                                                    minWidth: "150px",
                                                }}
                                            >
                                                {step.time}
                                            </Typography>

                                            {/* Status and Additional Info */}
                                            <Stack direction="column" spacing={0.5}>
                                                <Typography variant="body2">{step.status}</Typography>
                                                {step.additionalInfo && (
                                                    <Typography variant="caption" color="text.secondary">
                                                        {step.additionalInfo}
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
                        <Button onClick={() => setOpen(false)} color="primary">
                            Cancel
                        </Button>

                    </DialogActions>
                </Dialog>
            </UserSidebar>
        </>
    )
}

export default OrderHistory