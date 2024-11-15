import { Box, Button, Divider, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { Fragment } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { routesGen } from '../router/router';
import { IoIosArrowBack } from "react-icons/io";
import textConfigs from '../config/text.config';
import backgroundConfigs from '../config/background.config';
import { Delete } from '@mui/icons-material';
import { RiDeleteBin6Line } from "react-icons/ri";

const OrderDetails = () => {
    const location = useLocation();
    const { order } = location.state || {};
    const navigate = useNavigate();
    console.log(order);

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
                                                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight:'bold' }}>{product.productDetails.productName}</Typography>
                                                        <Stack direction='row' spacing={2}>
                                                            <Typography sx={{ color: '#9F9BA9', fontSize: '14px', ...textConfigs.style.basicFont }}>Code: {product.productDetails.code}</Typography>
                                                            <Typography sx={{ fontSize: '14px', ...textConfigs.style.basicFont, color:'#4D94DD' }}>{product.categoryName}</Typography>
                                                            {product.categoryName === 'Paint' && <Typography sx={{ color:'#4D94DD', fontSize: '14px', ...textConfigs.style.basicFont }}>{product.productDetails.paintDetails.hex}</Typography>
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
                                                        <RiDeleteBin6Line style={{color:'red'}}/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Divider />
                            <Stack direction='column' alignItems='end' mt={2}>
                                <Stack width='30%' direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Total Price:</Typography>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, color:'#4D94DD' }}>${order.totalAmount}</Typography>
                                </Stack>
                                <Stack width='30%' direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Tax:</Typography>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, color:'#4D94DD' }}>${order.tax}</Typography>
                                </Stack>
                                <Stack width='30%' direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Shipping Fee:</Typography>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, textDecoration: 'line-through', color:'#4D94DD' }}>${order.shippingCost}</Typography>
                                </Stack>
                                <Stack width='30%' direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont }}>Total Payment:</Typography>
                                    <Typography sx={{ fontWeight: '700', ...textConfigs.style.basicFont, color:'#4D94DD' }}>${order.totalPay}</Typography>
                                </Stack>
                            </Stack>
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
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={order.toName}
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
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={''}
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
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={''}
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
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={order.code}
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
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={order.status}
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Customer Phone
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={order.toPhone}
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
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={order.toProvinceName}
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Customer District
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={order.toDistrictName}
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Customer Ward
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={order.toWardName}
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Customer Address
                                <span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                            </Typography>
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={order.toAddress}
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Cancellation Reason
                            </Typography>
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={''}
                            />
                            <Typography sx={{
                                fontSize: '16px',
                                mb: '2px',
                                fontWeight: 'bold',
                                ...textConfigs.style.basicFont
                            }}>
                                Note
                            </Typography>
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={order.note}
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
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={order.paymentMethod}
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
                            <input
                                type='text'
                                className='border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg'
                                value={order.paymentStatus}
                            />
                            <Button
                                variant='contained'
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