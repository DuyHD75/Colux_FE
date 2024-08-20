import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, Input, InputLabel, Stack, TextField, Typography } from '@mui/material';
import TextConfig from '../config/text.config';
import backgroundConfigs from '../config/background.config';
import { Link } from 'react-router-dom';
import Container from '../components/commons/Container';
import ProductInfo from '../components/commons/ProductInfo';
import { useSelector } from 'react-redux';
import { LiaCcVisa } from "react-icons/lia";

const Checkout = () => {

    const products = useSelector((state) => state.checkout.checkoutData);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const calculateTotalAmount = () => {
        let totalAmount = products.reduce((acc, product) => acc + product.total, 0);
        return totalAmount;
    };

    return (
        <>
            <Box bgcolor='#EAEAEA' p={{ xs: '72px 0 16px 0', md: '112px 0 16px 0' }} minHeight='inherit'>
                <Stack direction='row' sx={{ width: { lg: '1152px' }, mx: { lg: 'auto' } }}>
                    <Button
                        component={Link}
                        to='/cart'
                        sx={{
                            height: '50px',
                            width: '100%',
                            bgcolor: '#FAFAFA',
                            border: '1px solid #E5E5E5',
                            ...TextConfig.style.basicFont
                        }}>CART</Button>
                    <Button
                        component={Link}
                        to='/billing'
                        sx={{
                            height: '50px',
                            width: '100%',
                            bgcolor: '#FAFAFA',
                            border: '1px solid #E5E5E5',
                            ...TextConfig.style.basicFont
                        }}>PAYMENT & BILLING</Button>
                    <Button sx={{
                        height: '50px',
                        width: '100%',
                        bgcolor: 'White',
                        ...TextConfig.style.basicFont
                    }}>REVIEW ORDER</Button>

                </Stack>
                <Container>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} sx={{
                        padding: { xs: '50px 16px 0 16px', lg: '50px 16px 0 0' },
                        alignItems: { xs: 'center', sm: 'flex-start' },
                        justifyContent: 'center',

                    }}>
                        <Box flex={8} width='100%' >
                            <Box sx={{
                                ...backgroundConfigs.style.subBackgroundContext,
                                position: 'relative',
                                borderRadius: 3,
                                border: '1px solid #E5E5E5',
                                flex: 8,
                                paddingTop: '50px',
                                marginBottom: '1rem'
                            }}>
                                <Box borderRadius='12px 12px 0 0' sx={{
                                    bgcolor: '#F6F6F6',
                                    position: 'absolute',
                                    width: '100%',
                                    top: 0,
                                    left: 0,
                                    height: '47px',
                                    padding: '3.5px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <Typography fontWeight='bold' fontSize='14px' sx={{ ...TextConfig.style.basicFont }}>
                                        Order Contact
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    padding: '16px',
                                }}>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px', marginBottom: '16px' }}>Please provide a contact number for questions about this order.</Typography>
                                    <Stack direction='row' spacing={2}>
                                        <FormControl variant="standard" sx={{ color: 'inherit' }}>
                                            <InputLabel htmlFor="component" sx={{ ...TextConfig.style.basicFont }}>Phone Number</InputLabel>
                                            <Input id="component" defaultValue="0818080927" />
                                        </FormControl>
                                        <Stack direction='row' alignItems='center'>
                                            <Checkbox />
                                            <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}> Save this Mobile Number to Profile
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Box>

                            </Box>
                            <Box sx={{
                                ...backgroundConfigs.style.subBackgroundContext,
                                position: 'relative',
                                borderRadius: 3,
                                border: '1px solid #E5E5E5',
                                flex: 8,
                                paddingTop: '50px',
                                marginBottom: '1rem'
                            }}>
                                <Box borderRadius='12px 12px 0 0' sx={{
                                    bgcolor: '#F6F6F6',
                                    position: 'absolute',
                                    width: '100%',
                                    top: 0,
                                    left: 0,
                                    height: '47px',
                                    padding: '3.5px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <Typography fontWeight='bold' fontSize='14px'>
                                        Payment Details
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    padding: '16px',
                                }}>
                                    {/* <Typography sx={{ ...TextConfig.style.basicFont, mb: '8px', fontWeight: 'bold', fontSize: '14px', marginBottom: '16px' }}>Credit Card ************2905</Typography> */}

                                    <Stack direction='row' spacing={1} alignItems='center'>

                                        <LiaCcVisa style={{ fontSize: '2rem' }} />
                                        <Typography sx={{ ...TextConfig.style.basicFont, mb: '8px', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>Credit Card </Typography>
                                        <input type="radio" class="border-indigo-500" />
                                    </Stack>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px', fontWeight: 'bold' }}>Kieu Dat</Typography>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>FPT University</Typography>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>Da Nang, U.S. Virgin Islands 90001
                                    </Typography>
                                </Box>

                            </Box>
                            <Box borderRadius={3} paddingTop='50px' bgcolor={{ ...backgroundConfigs.style.subBackgroundContext }} sx={{

                                position: 'relative',

                                border: '1px solid #E5E5E5',

                            }}>
                                <Box borderRadius='12px 12px 0 0' sx={{
                                    bgcolor: '#F6F6F6',
                                    position: 'absolute',
                                    borderBottom: '1px solid #E5E5E5',
                                    width: '100%',
                                    top: 0,
                                    left: 0,
                                    height: '47px',
                                    padding: '3.5px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <Typography fontWeight='bold' fontSize='14px' sx={{ ...TextConfig.style.basicFont }}>
                                        {products && products.length} item(s)
                                    </Typography>
                                </Box>
                                {products && products.map((product, index) => (
                                    <Stack key={index} direction={{ xs: 'column', md: 'row' }} borderBottom={index !== products.length - 1 ? '1px solid #E5E5E5' : 'none'} paddingBottom='20px'>
                                        <ProductInfo product={product} padding='30px 8px 0px 16px' />
                                        <Stack flex={1.5} direction='row' justifyContent={{ xs: 'center', sm: 'normal' }} spacing={{ xs: 3, sm: 0 }} paddingX='11.35px'>
                                            <Box sx={{
                                                padding: '30px 8px 0px',
                                            }}>
                                                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '13px' }}>Your Price <br /><strong>{product.price}$</strong></Typography>
                                            </Box>
                                            <Box sx={{
                                                padding: '30px 8px 0px',
                                            }}>
                                                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '13px' }}>Qty <br /> <strong>{product.quantity}</strong> </Typography>
                                            </Box>
                                            <Box sx={{
                                                padding: '30px 8px 0px',
                                            }}>
                                                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '13px' }}>Item Total <br /> <strong>{product.total}$</strong></Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Box>

                        </Box>
                        <Box width='auto' height='auto' flex={{ xs: 1, md: 3.5 }} sx={{ flexDirection: 'column', border: '1px solid #E5E5E5', marginLeft: '2rem' }}>
                            <Box sx={{ padding: '12px', borderBottom: '1px solid #E5E5E5' }}>
                                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '22px' }}>Order Summary</Typography>
                            </Box>

                            <Box sx={{ padding: '12px', borderBottom: '1px solid #E5E5E5' }}></Box>
                            <Box sx={{
                                padding: '12px',
                                borderBottom: '1px solid #E5E5E5'
                            }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '10px' }}>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px' }}>Subtotal</Typography>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', fontWeight: 'bold' }}>{calculateTotalAmount()}$</Typography>
                                </Box>
                                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px' }}>Apply coupon code</Typography>
                                <Stack direction='row' justifyContent='flex-start' pt='8.4px'>
                                    <TextField variant='outlined' size='small' sx={{
                                        width: '100%',
                                        marginRight: '3px'
                                    }} />
                                    <Button variant='contained' sx={{ ...TextConfig.style.basicFont }}>Apply</Button>
                                </Stack>
                                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', marginTop: '12px' }}>Estimated Tax:
                                    <br />
                                    <em>(Determined later)</em>
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '24px' }}>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', fontWeight: 'bold' }}>Estimated total:</Typography>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '17.8px', fontWeight: 'bold' }}>{calculateTotalAmount()}$</Typography>
                                </Box>
                                <Typography marginTop='12px' sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px' }}>Product pricing shown reflects applicable sales and discounts
                                </Typography>
                            </Box>
                            <Box sx={{
                                padding: '12px',
                                borderBottom: '1px solid #E5E5E5'
                            }}>
                                <Typography marginY='5.95px' fontSize='11.9px' fontWeight='bold' sx={{ textWrap: 'balance', ...TextConfig.style.basicFont }}>
                                    Orders not picked up, received, or scheduled for delivery within 14 days will be forfeited. You will be charged for custom and special order items; all others will be cancelled and restocked without charge. Tinted paint cannot be returned. <Link style={{ color: '#0069AF', fontSize: '11.9px' }}>See Return Policy for details.</Link>
                                </Typography>
                            </Box>
                            <Box sx={{
                                padding: '12px',
                                borderBottom: '1px solid #E5E5E5'
                            }}>
                                <Typography marginY='5.95px' fontSize='11.9px' fontWeight='bold' sx={{ textWrap: 'balance', ...TextConfig.style.basicFont }}>
                                    By selecting Agree & Pay you are agreeing to the Sherwin-Williams <Link style={{ color: '#0069AF', fontSize: '11.9px' }}>Online Terms & Conditions of Sale</Link> Opens in new windowand have been provided with electronic access Opens in new windowto product safety data sheets and environmental data sheets for all applicable products in my order.                                </Typography>
                                <Stack direction='row' alignItems='center'>
                                    <Checkbox size='small' onChange={handleCheckboxChange} />
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px' }}>I agree to the Sherwin-Williams<Link style={{ color: '#0069AF', fontSize: '11.9px' }}> Online Terms and Conditions of SaleOpens in new window.</Link></Typography>
                                </Stack>
                            </Box>
                            <button disabled={!isChecked} style={{ ...backgroundConfigs.style.backgroundPrimary, color: 'white', ...TextConfig.style.basicFont }} className='min-w-full py-2 px-3 flex justify-center' href='/billing' >Agree and Pay</button>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Checkout;

