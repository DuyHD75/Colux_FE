import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import TextConfig from '../config/text.config';
import backgroundConfigs from '../config/background.config';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/commons/Container';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PaymentBilling = () => {
  const navigate = useNavigate();

  const products = useSelector((state) => state.checkout.checkoutData);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProvinces(data.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    }
    fetchProvinces();
  }, []);

  const fetchDistricts = async (provinceId) => {
    try {
      console.log("provinceId fetch" + provinceId);

      const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("data fetch" + data.data);

      setDistricts(data.data); // Assuming the response has districts array
      setWards([]); // Reset wards when the province changes
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const fetchWards = async (districtId) => {
    try {
      const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWards(data.data); // Assuming the response has wards array
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  const calculateTotalAmount = () => {
    let totalAmount = products ? products.reduce((acc, product) => acc + product.total, 0) : 0;
    return totalAmount;
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const billingForm = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      address: '',
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
    }),
    onSubmit: async values => {
      console.log('Form data:', values);
      navigate('/checkout');
    }
  })

  return (
    <>
      <Box p={{ xs: '72px 0 16px 0', md: '112px 0 16px 0' }} bgcolor='#EAEAEA' minHeight='inherit' >
        <Stack direction='row' sx={{ width: { lg: '1152px' }, mx: { lg: 'auto' } }}>
          <Button component={Link}
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
              ...TextConfig.style.basicFont
            }}>PAYMENT & BILLING</Button>
          <Button sx={{
            height: '50px',
            width: '100%', border: '1px solid #E5E5E5',
            color: 'gray',
            ...TextConfig.style.basicFont
          }}>REVIEW ORDER</Button>

        </Stack>
        <Container >

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems='center' sx={{ padding: { xs: '50px 16px 0 16px', lg: '50px 16px 0 0' } }}>
            <Box component='form' flex={8} width='100%'>
              <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px', fontWeight: 'bold' }}>Billing & contact information
              </Typography>
              <label>
                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>Full name:</Typography>
              </label>
              <TextField style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
                type='text' name='fullName'
                fullWidth value={billingForm.values.fullName}
                onChange={billingForm.handleChange}
                error={billingForm.touched.fullName && billingForm.errors.fullName !== undefined}
                onBlur={billingForm.handleBlur}
                helperText={billingForm.touched.fullName && billingForm.errors.fullName}
                variant='outlined' size='small' sx={{ width: '100%' }}></TextField>
              <label>
                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>Phone Number:</Typography>
              </label>
              <TextField style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
                name='phoneNumber'
                fullWidth value={billingForm.values.phoneNumber}
                onChange={billingForm.handleChange}
                error={billingForm.touched.phoneNumber && billingForm.errors.phoneNumber !== undefined}
                onBlur={billingForm.handleBlur}
                helperText={billingForm.touched.phoneNumber && billingForm.errors.phoneNumber}
                variant='outlined' size='small' sx={{ width: '100%' }}></TextField>
              <label>
                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>Province:</Typography>
              </label>
              <Select
                style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
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
                  <MenuItem key={index} value={province.id}>{province.full_name}</MenuItem>
                ))}
              </Select>

              {/* District Selection */}
              <label>
                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>District:</Typography>
              </label>
              <Select
                style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
                name='district'
                value={billingForm.values.district}
                onChange={(e) => {
                  billingForm.handleChange(e);
                  fetchWards(e.target.value); // Fetch wards when district changes
                }}
                error={billingForm.touched.district && billingForm.errors.district !== undefined}
                onBlur={billingForm.handleBlur}
                variant='outlined' size='small' sx={{ width: 'fit-content' }}
              >
                {districts && districts.map((district, index) => (
                  <MenuItem key={index} value={district.id}>{district.full_name}</MenuItem>
                ))}
              </Select>

              {/* Ward Selection */}
              <label>
                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>Ward:</Typography>
              </label>
              <Select
                style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
                name='ward'
                value={billingForm.values.ward}
                onChange={billingForm.handleChange}
                error={billingForm.touched.ward && billingForm.errors.ward !== undefined}
                onBlur={billingForm.handleBlur}
                variant='outlined' size='small' sx={{ width: 'fit-content' }}
              >
                {wards && wards.map((ward, index) => (
                  <MenuItem key={index} value={ward.id}>{ward.full_name}</MenuItem>
                ))}
              </Select>
              <label>
                <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>Street Address:</Typography>
              </label>
              <TextField style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
                type='text' name='address'
                fullWidth value={billingForm.values.address}
                onChange={billingForm.handleChange}
                error={billingForm.touched.address && billingForm.errors.address !== undefined}
                onBlur={billingForm.handleBlur}
                helperText={billingForm.touched.address && billingForm.errors.address}
                variant='outlined' size='small' sx={{ width: '100%' }}></TextField>
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
                <Typography marginY='5.95px' fontSize='11.9px' fontWeight='bold' sx={{ textWrap: 'wrap', ...TextConfig.style.basicFont }}>
                  By placing this order, you agree to the Sherwin-Williams Online <Link style={{ color: '#0069AF', fontSize: '11.9px' }}>Terms and Conditions of Sale</Link>
                </Typography>
              </Box>
              <button style={{ ...backgroundConfigs.style.backgroundPrimary, color: 'white', ...TextConfig.style.basicFont }} className='min-w-full py-2 px-3 flex justify-center' onClick={handleCheckout} >Continue</button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default PaymentBilling;

