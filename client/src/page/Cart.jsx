import React, { useState } from 'react';
import { Box, Button, Checkbox, Stack, TextField, Typography } from '@mui/material';
import TextConfig from '../config/text.config';
import backgroundConfigs from '../config/background.config';
import { Link, useNavigate } from 'react-router-dom';
import ImageComponent from '../components/commons/ImageComponent';
import Container from '../components/commons/Container';
import { productss } from '../data/Product';
import ProductInfo from '../components/commons/ProductInfo';
import { setCheckoutDetail } from '../redux/reducer/checkoutSlice';
import { useDispatch } from 'react-redux';
import customScrollbarStyle from '../config/scrollbar.config';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState(productss);
  const [checkedProducts, setCheckedProducts] = useState({});

  const handleCheckout = (data) => {
    dispatch(setCheckoutDetail(data));
    navigate('/billing');
  };

  const handleCheckboxChange = (productId, isChecked) => {
    setCheckedProducts(prevCheckedProducts => ({
      ...prevCheckedProducts,
      [productId]: isChecked,
    }));
  };

  const getCheckedProducts = () => {
    return products.filter(product => checkedProducts[product.id]);
  };

  const CheckoutDetail = getCheckedProducts();

  const handleDecrease = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = Math.max(0, updatedProducts[index].quantity - 1);
    updatedProducts[index].total = updatedProducts[index].price * updatedProducts[index].quantity;
    setProducts(updatedProducts);
  };

  const handleIncrease = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity++;
    updatedProducts[index].total = updatedProducts[index].price * updatedProducts[index].quantity;
    setProducts(updatedProducts);
  };

  const handleRemove = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const calculateTotalAmount = () => {
    let totalAmount = products
      .filter(product => checkedProducts[product.id])
      .reduce((acc, product) => acc + product.total, 0);
    return totalAmount;
  };

  return (
    <>
      <Box p={{ xs: '73px 0 1rem 0', md: '75px 0 1rem 0' }} bgcolor='#EAEAEA' >
        <Container>
          <Box sx={{
            padding: { xs: '0px', md: '40px 32px 40px 0' },
            alignContent: 'center',
            mb: '12px'
          }}>
            <Typography sx={{
              ...TextConfig.style.headerText,
              marginBottom: '15px',
              left: '0',
              fontSize: { xs: '2rem', md: '2rem', lg: '3rem' },
              fontWeight: 800,
              position: 'relative',
              textShadow: '1px 1px 1px #000',
              "::before": {
                position: 'absolute',
                content: '""',
                width: '2rem',
                height: '2px',
                bgcolor: 'primary.main',
                bottom: 0,
                left: 0
              }
            }}>
              Cart
            </Typography>
            <ImageComponent
              className='w-full h-auto'
              height='auto'
              width='auto'
              src='https://sherwin.scene7.com/is/image/sw/a-m24_ppsale_last_pricing_banner_Desktop?&qlt=92&resMode=bilin&wid=1440'
            />
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems='flex-start' sx={{ padding: { xs: '0 1rem 0 1rem', lg: '0 1rem 0 0' } }}>
            <Box flex={8} width='100%'>
              <Box sx={{
                bgcolor: '#F6F6F6',
                width: '100%',
                top: 0,
                left: 0,
                height: '47px',
                padding: '3.5px 1rem',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '12px 12px 0 0',
                border: '1px solid #E5E5E5',

              }}>
                <Typography fontWeight='bold' fontSize='14px' sx={{ ...TextConfig.style.basicFont }}>
                  {products.length} item(s)
                </Typography>
              </Box>
              <Box borderRadius='0 0 0 12px' bgcolor={{ ...backgroundConfigs.style.subBackgroundContext }} sx={{
                paddingBottom: '1rem',
                overflowY: 'auto',
                maxHeight: '800px',
                position: 'relative',
                // scrollbarWidth: 'thin',
                // scrollbarColor: '#ccc rgba(0,0,0,0.1)',
                border: '1px solid #E5E5E5',
                ...customScrollbarStyle

              }}>

                {products.map((product, index) => (
                  <Stack key={product.id} marginY={1} sx={{ p: '1rem' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} flex borderBottom={1} borderColor='#e0e0e0' paddingBottom='1rem'>
                      <ProductInfo product={product} />
                      <Stack direction='row' spacing={{ xs: 0, md: 6 }} sx={{ flex: 1, alignItems: 'center', mt: { xs: "1rem", md: 0 } }} >
                        <Stack direction='column' justifyContent='flex-start' alignItems={{ xs: 'center', sm: 'normal' }} flex={1}>
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography variant='h4' marginBottom='2.8px' sx={{ ...TextConfig.style.basicFont, width: 'max-content' }} fontSize='14px'>Your price: </Typography>
                            <Typography variant='h4' marginBottom='7px' sx={{ ...TextConfig.style.basicFont }} fontSize='14px'>{product.price}$ </Typography>
                          </Stack>
                          <Stack direction='row' alignItems='center' width='90px' height='58px'>
                            <button className=' w-[27px] h-[30px]  border border-gray-300 border-solid bg-[#EAEAEA] rounded-sm' onClick={() => handleDecrease(index)}>-</button>
                            <input disabled className='border border-gray-300 w-[36px] h-[30px] text-center ' type='number' min={1} value={product.quantity} $ />
                            <button className=' w-[27px] h-[30px]  border border-gray-300 border-solid bg-[#EAEAEA] rounded-sm' onClick={() => handleIncrease(index)}>+</button>
                          </Stack>
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography variant='h4' sx={{ ...TextConfig.style.basicFont, mb: '2.8px' }} fontSize='14px'>Total:</Typography>
                            <Typography variant='h4' sx={{ ...TextConfig.style.basicFont }} fontSize='17px'>{product.total}$</Typography>
                          </Stack>
                          <Stack marginTop='20px' direction='row'>
                            <Link className='' style={{ borderRight: 'solid', marginRight: '10px', width: '60px', color: '#0069AF', fontSize: '13px', fontWeight: 'bold' }} onClick={() => handleRemove(index)}>Remove</Link>
                            <Link className='' style={{ color: '#0069AF', fontSize: '13px', fontWeight: 'bold' }} onClick={() => handleRemove(index)}>Edit</Link>
                          </Stack>
                        </Stack>
                        <Stack direction='column' justifyContent='flex-end' alignItems='center' flex={1} borderLeft={{ xs: '1px solid #E5E5E5', md: 0 }}>
                          <Typography variant='h4' sx={{ ...TextConfig.style.basicFont, fontSize: '1rem', color: 'green', fontWeight: 'bold', width: 'max-content' }}>In Stock</Typography>
                          <Checkbox
                            sx={{ width: '20px', height: '20px', flex: { xs: 1, md: 0 } }}
                            key={product.id}
                            checked={checkedProducts[product.id] || false}
                            onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Box>
            </Box>
            <Box width='auto' height='auto' flex={{ xs: 1, md: 3.5 }} sx={{ flexDirection: 'column', border: '1px solid #E5E5E5', marginLeft: '2rem' }}>
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
                  <Button sx={{ ...TextConfig.style.basicFont }} variant='contained'>Apply</Button>
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
                <Typography marginY='5.95px' fontSize='11.9px' fontWeight='bold' sx={{ textWrap: 'wrap', ...TextConfig.style.basicFont }}>
                  By placing this order, you agree to the Sherwin-Williams Online <Link style={{ color: '#0069AF', fontSize: '11.9px' }}>Terms and Conditions of Sale</Link>
                </Typography>
              </Box>
              <button style={{ ...backgroundConfigs.style.backgroundPrimary, color: 'white', ...TextConfig.style.basicFont }} className='min-w-full py-2 px-3 flex justify-center' onClick={() => handleCheckout(CheckoutDetail)}>Go to checkout</button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Cart;

