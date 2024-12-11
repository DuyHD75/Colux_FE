import React, { useState } from 'react';
import { Alert, AlertTitle, Box, Button, Checkbox, FormControl, Input, InputLabel, Stack, TextField, Typography } from '@mui/material';
import TextConfig from '../config/text.config';
import backgroundConfigs from '../config/background.config';
import { Link } from 'react-router-dom';
import Container from '../components/commons/Container';
import ProductInfo from '../components/commons/ProductInfo';
import { useSelector } from 'react-redux';
import cartApi from '../api/modules/cart.api';
import { toast } from 'react-toastify';

const Checkout = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const [checkoutData, setCheckoutData] = useState(localStorage.getItem('checkoutData') ? JSON.parse(localStorage.getItem('checkoutData')) : { products: [], totalAmount: 0, shippingFee: 0, billing: {} });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [note, setNote] = useState('');

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    }

    const handleNoteBlur = (event) => {
        // Xử lý khi trường nhập liệu mất tiêu điểm
        setNote(event.target.value);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleCheckout = async () => {
        try {
            if(!paymentMethod) {
                toast.error('Please choose payment method');
                return;
            }
            const orderData = {
                status: 1,
                toName: checkoutData.billing.fullName,
                toPhone: checkoutData.billing.phoneNumber,
                toEmail: user?user.email:checkoutData.billing.email,
                toAddress: checkoutData.billing.address,
                toWardName: checkoutData.billing.ward,
                toDistrictName: checkoutData.billing.district,
                toProvinceName: checkoutData.billing.province,
                note: note,
                customerId: user?user.userId:null,
                purchaseProducts: checkoutData.products.map(product => ({
                    productId: product.cartItemVariant.productDetails.productId,
                    variantId: product.cartItemVariant.variantId,
                    quantity: product.cartItemQuantity,
                    ...(product.cartItemVariant.categoryName === 'Paint' && { paintId: product.cartItemVariant.productDetails.paintDetails.paintId }),
                    ...(product.cartItemVariant.categoryName === 'Wallpaper' && { wallpaperId: product.cartItemVariant.productDetails.wallpaperDetails.wallpaperId }),
                    ...(product.cartItemVariant.categoryName === 'Floor' && { floorId: product.cartItemVariant.productDetails.floorDetails.floorId }),
                })),
                totalAmount: checkoutData.totalAmount,
                tax: 10.00,
                shippingCost: 4,
                totalPay: checkoutData.totalAmount + 10.00,
                paymentMethod: paymentMethod,
                paymentStatus: 1,
            }
            const response = await cartApi.createOrder(orderData);
            if (response) {
                const paymentUrl = response.response.data.data.orderPaypalCheckoutLink
                window.location.href = paymentUrl; // Hoặc sử dụng navigate(paymentUrl) nếu bạn đang sử dụng react-router-dom v6
            } else {
                toast.error('Order failed');
            }
        } catch (error) {
            toast.error('Order failed');
        }
    }

    return (
        <>
            <Box bgcolor='#EAEAEA' p={{ xs: '72px 0 16px 0', md: '152px 0 16px 0' }} minHeight='inherit'>
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
                                            <Input id="component" defaultValue={checkoutData.billing.phoneNumber} />
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
                                    padding: '0 16px 16px 16px',
                                }}>
                                    {/* <Typography sx={{ ...TextConfig.style.basicFont, mb: '8px', fontWeight: 'bold', fontSize: '14px', marginBottom: '16px' }}>Credit Card ************2905</Typography> */}
                                    <Stack direction='row' spacing={2} alignItems='center' >
                                        <label htmlFor="paymentMethodCOD" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                id="paymentMethodCOD"
                                                name="paymentMethod"
                                                value="COD"
                                                className="border-indigo-500"
                                                onChange={handlePaymentMethodChange}
                                            />
                                            <img src='https://cdn.iconscout.com/icon/free/png-512/free-cod-icon-download-in-svg-png-gif-file-formats--credit-debit-bank-payment-methods-vol-2-pack-business-icons-32290.png?f=webp&w=256' style={{ width: '4rem', height: '4rem' }} />
                                            <Typography sx={{ ...TextConfig.style.basicFont, fontWeight: 'bold', fontSize: '16px', }}>Cash on Delivery</Typography>
                                        </label>
                                        {/*  */}

                                        <label htmlFor="paymentMethodPaypal" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                id="paymentMethodPaypal"
                                                name="paymentMethod" value="PAYPAL" className="border-indigo-500"
                                                onChange={handlePaymentMethodChange} />
                                            <img src='https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg' style={{ width: '4rem', height: '2rem', marginLeft:'12px', marginRight:'12px' }} />
                                            <Typography sx={{ ...TextConfig.style.basicFont, fontWeight: 'bold', fontSize: '16px',mt:'4px' }}>PayPal</Typography>
                                        </label>

                                       
                                    </Stack>
                                    {paymentMethod === "COD" &&
                                        <>  <Alert sx={{ mb: 1 }} severity="info">
                                            You have selected the COD payment method. To ensure the processing of your order, please pay 25% of the total order value in advance.
                                        </Alert>
                                        </>
                                    }
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px', fontWeight: 'bold' }}>{checkoutData.billing.fullName}</Typography>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}> {checkoutData.billing.ward}, {checkoutData.billing.district}, {checkoutData.billing.province}</Typography>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>{checkoutData.billing.address}</Typography>
                                    <TextField variant='outlined' size='large' sx={{ width: '100%', marginTop: '16px' }} label='Note' onBlur={handleNoteBlur} />
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
                                        {checkoutData.products && checkoutData.products.length} item(s)
                                    </Typography>
                                </Box>
                                {checkoutData.products && checkoutData.products.map((product, index) => (
                                    <Stack key={index} direction={{ xs: 'column', md: 'row' }} borderBottom={index !== checkoutData.products.length - 1 ? '1px solid #E5E5E5' : 'none'} paddingBottom='20px'>
                                        <ProductInfo product={product} checkout={'checkout'} padding='30px 8px 0px 16px' />
                                        <Stack flex={1.5} direction='row' justifyContent={{ xs: 'center', sm: 'normal' }} spacing={{ xs: 3, sm: 0 }} paddingX='11.35px'>
                                            <Box sx={{
                                                padding: '30px 8px 0px',
                                            }}>
                                                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '13px' }}>Your Price <br /><strong>{product.cartItemVariant.priceSell}$</strong></Typography>
                                            </Box>
                                            <Box sx={{
                                                padding: '30px 8px 0px',
                                            }}>
                                                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '13px' }}>Qty <br /> <strong>{product.cartItemQuantity}</strong> </Typography>
                                            </Box>
                                            <Box sx={{
                                                padding: '30px 8px 0px',
                                            }}>
                                                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '13px' }}>Item Total <br /> <strong>{product.cartItemQuantity * product.cartItemVariant.priceSell}$</strong></Typography>
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
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', fontWeight: 'bold' }}>{checkoutData.totalAmount}$</Typography>
                                </Box>
                                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px' }}>Apply coupon code</Typography>
                                <Stack direction='row' justifyContent='flex-start' pt='8.4px'>
                                    <TextField variant='outlined' size='small' sx={{
                                        width: '100%',
                                        marginRight: '3px'
                                    }} />
                                    <Button variant='contained' sx={{ ...TextConfig.style.basicFont }}>Apply</Button>
                                </Stack>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', marginTop: '12px' }}>Shipping Fee:
                                        <br />
                                        <em>(Determined later)</em>
                                    </Typography>
                                    <Box>
                                        <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', fontWeight: 'bold', marginTop: '12px', textDecoration: 'line-through' }}>{checkoutData.shippingFee}$ </Typography>
                                        {checkoutData.shippingFee > 0 && <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', fontWeight: 'bold' }}>Free</Typography>}
                                    </Box>

                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', marginTop: '12px' }}>Tax (10%):</Typography>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', fontWeight: 'bold', marginTop: '12px', }}>{(checkoutData.totalAmount * 0.1).toFixed(0)}$ </Typography>

                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '24px' }}>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', fontWeight: 'bold' }}>Estimated total:</Typography>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '17.8px', fontWeight: 'bold' }}>{(checkoutData.totalAmount + parseFloat((checkoutData.totalAmount * 0.1).toFixed(0)))}$</Typography>
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
                                    By selecting Agree & Pay you are agreeing to the Kolux <Link style={{ color: '#0069AF', fontSize: '11.9px' }}>Online Terms & Conditions of Sale</Link> Opens in new windowand have been provided with electronic access Opens in new windowto product safety data sheets and environmental data sheets for all applicable products in my order.                                </Typography>
                                <Stack direction='row' alignItems='center'>
                                    <Checkbox size='small' onChange={handleCheckboxChange} />
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px' }}>I agree to the Kolux<Link style={{ color: '#0069AF', fontSize: '11.9px' }}> Online Terms and Conditions of SaleOpens in new window.</Link></Typography>
                                </Stack>
                            </Box>
                            <button disabled={!isChecked} style={{ ...backgroundConfigs.style.backgroundPrimary, color: 'white', ...TextConfig.style.basicFont }} className='min-w-full py-2 px-3 flex justify-center' onClick={() => handleCheckout()} >Agree and Pay</button>
                        </Box>
                    </Stack>
                </Container>

            </Box>
        </>
    );
};

export default Checkout;

