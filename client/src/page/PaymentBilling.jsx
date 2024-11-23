import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import TextConfig from '../config/text.config';
import backgroundConfigs from '../config/background.config';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/commons/Container';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ghnApi from '../api/modules/ghn.api';
import textConfigs from '../config/text.config';
import { FaPlus } from "react-icons/fa6";
import customScrollbarStyle from '../config/scrollbar.config';
import { toast } from 'react-toastify';

const PaymentBilling = () => {
  const navigate = useNavigate();

  // const checkoutData = useSelector((state) => state.checkout.checkoutData);
  const [checkoutData, setCheckoutData] = useState(localStorage.getItem('checkoutData') ? JSON.parse(localStorage.getItem('checkoutData')) : { products: [], totalAmount: 0, shippingFee: 0, billing: {} });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedShipmentId, setSelectedShipmentId] = useState(null);
  const [selectedEditShipment, setSelectedEditShipment] = useState(null);
  const [openSelectAddress, setOpenSelectAddress] = useState(false);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [selectedDistrictID, setSelectedDistrictID] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const { user } = useSelector((state) => state.user);
  const sortedProvinces = [...provinces].sort((a, b) => a.ProvinceName.localeCompare(b.ProvinceName));
  const sortedDistricts = [...districts].sort((a, b) => a.DistrictName.localeCompare(b.DistrictName));
  const sortedWards = [...wards].sort((a, b) => a.WardName.localeCompare(b.WardName));

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await ghnApi.getProvince();
        if (response.err) {
          toast.error(response.err);
        }
        setProvinces(response.response.data.provinces.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    }

    fetchProvinces();
  }, []);

  useEffect(() => {
    const getAllShipments = async () => {
      try {
        const response = await ghnApi.getAllShipments(user.userId);
        if (response.err) {
          throw new Error(response.err);
        }
        setShipments(response.response.data.shipments);
        setSelectedShipment(response.response.data.shipments[0]);

      } catch (error) {
        console.error('Error fetching shipments:', error);
      }
    }
    getAllShipments();
  }, [shipments])

  const fetchDistricts = async (provinceID) => {
    try {
      const province_id = provinceID;
      const response = await ghnApi.getDistrict(province_id);
      setDistricts(response.response.data.fee.data);
      if (response.err) {
        throw new Error(response.err);
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
        throw new Error(response.err);
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
      setShippingFee((response.response.data.fee.data.total / 23000).toFixed(1));

      if (response.code === 400) {
        throw new Error(response.message);
      }
    }
    catch (error) {
      console.error('Error fetching fee:', error);
    }
  }

  const createShipment = async (values) => {
    try {
      const data = {
        customerId: user.userId,
        shipmentId: values.shipmentId ? values.shipmentId : null,
        customerName: values.fullName,
        customerPhone: values.phoneNumber,
        toAddress: values.address,
        toWardName: values.ward,
        toDistrictName: values.district,
        toProvinceName: values.province,
        status: 1
      }

      const response = await ghnApi.createShipments(data);
      if (response.err) {
        throw new Error(response.err);
      }
      else {
        toast.success('Create shipment successfully');
        setShipments([...shipments, response.response.data.data]);

      }
    } catch (error) {
      console.error('Error create shipment', error);
    }
  }

  const handleShipmentChange = (e) => {
    setSelectedShipment(shipments.find(shipment => shipment.shipmentId === e.target.value));
  }


  const billingForm = useFormik({
    initialValues: {
      fullName: checkoutData.billing.fullName || '',
      phoneNumber: checkoutData.billing.phoneNumber || '',
      province: '',
      district: '',
      ward: '',
      address: checkoutData.billing.address || '',
      email: checkoutData.billing.email || '',
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
      email: Yup.string()
        .email("Invalid email address")
    }),
    onSubmit: async values => {
      if (typeof values.province === 'number') {

        values.province = provinces.find(province => province.ProvinceID === values.province).ProvinceName;
        values.district = districts.find(district => district.DistrictID === values.district).DistrictName;
        values.ward = wards.find(ward => ward.WardCode === values.ward).WardName;
      }
      const updatedCheckoutData = {
        ...checkoutData,
        billing: values,
        shippingFee: shippingFee,
      };
      user && createShipment(values)
      localStorage.setItem('checkoutData', JSON.stringify(updatedCheckoutData));
      navigate('/checkout');
    }
  })
  const addAddressForm = useFormik({
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

      values.province = provinces.find(province => province.ProvinceID === values.province).ProvinceName;
      values.district = districts.find(district => district.DistrictID === values.district).DistrictName;
      values.ward = wards.find(ward => ward.WardCode === values.ward).WardName;

      createShipment(values)
      setOpenAddAddress(false);
    }
  })

  const editAddressForm = useFormik({
    initialValues: {
      fullName: selectedEditShipment?.customerName || '',
      phoneNumber: selectedEditShipment?.customerPhone || '',
      province: '',
      district: '',
      ward: '',
      address: selectedEditShipment?.toAddress || '',
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
      values.shipmentId = selectedEditShipment.shipmentId;
      values.province = provinces.find(province => province.ProvinceID === values.province).ProvinceName;
      values.district = districts.find(district => district.DistrictID === values.district).DistrictName;
      values.ward = wards.find(ward => ward.WardCode === values.ward).WardName;

      createShipment(values)
      setOpenEditAddress(false);
    }
  })

  useEffect(() => {
    if (selectedShipment) {
      billingForm.setFieldValue('address', selectedShipment.toAddress);
      billingForm.setFieldValue('fullName', selectedShipment.customerName);
      billingForm.setFieldValue('phoneNumber', selectedShipment.customerPhone);
      billingForm.setFieldValue('province', selectedShipment.toProvinceName);
      billingForm.setFieldValue('district', selectedShipment.toDistrictName);
      billingForm.setFieldValue('ward', selectedShipment.toWardName);
    }
  }, [selectedShipment]);

  useEffect(() => {
    if (selectedEditShipment) {
      editAddressForm.setFieldValue('address', selectedEditShipment.toAddress);
      editAddressForm.setFieldValue('fullName', selectedEditShipment.customerName);
      editAddressForm.setFieldValue('phoneNumber', selectedEditShipment.customerPhone);

    }
  }, [selectedEditShipment]);

  return (
    <>
      <Box p={{ xs: '72px 0 16px 0', md: '152px 0 16px 0' }} bgcolor='#EAEAEA' minHeight='inherit' >
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
        <Container>
          <form onSubmit={billingForm.handleSubmit}>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems='center' sx={{ padding: { xs: '50px 16px 0 16px', lg: '50px 16px 0 0' } }}>
              <Box flex={8} width='100%'>
                <Stack direction='row' justifyContent='space-between' alignItems='center' width={{ xs: '100%', md: '70%' }}>
                  <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px', fontWeight: 'bold' }}>Billing & contact information
                  </Typography>
                  {user && <Button onClick={() => setOpenSelectAddress(true)} sx={{ ...TextConfig.style.basicFont, fontSize: '14px', fontWeight: 'bold', color: '#0069AF' }}>Change</Button>}
                </Stack>
                {(shipments.length === 0 || !user) && (
                  <> <label>
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
                    {!user && (
                      <>
                        <label>
                          <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>Email:</Typography>
                        </label>
                        <TextField style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
                          type='text' name='email' 
                          fullWidth value={billingForm.values.email}
                          onChange={billingForm.handleChange}
                          error={billingForm.touched.email && billingForm.errors.email !== undefined}
                          onBlur={billingForm.handleBlur}
                          helperText={billingForm.touched.email && billingForm.errors.email}
                          variant='outlined' size='small' sx={{ width: '100%' }}></TextField>
                      </>
                    )}
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
                      {sortedProvinces.map((province, index) => (
                        <MenuItem key={index} value={province.ProvinceID}>{province.ProvinceName}</MenuItem>
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
                        setSelectedDistrictID(e.target.value); // Store selected DistrictID
                        fetchWards(e.target.value); // Fetch wards when district changes
                      }}
                      error={billingForm.touched.district && billingForm.errors.district !== undefined}
                      onBlur={billingForm.handleBlur}
                      variant='outlined' size='small' sx={{ width: 'fit-content' }}
                    >
                      {sortedDistricts && sortedDistricts.map((district, index) => (
                        <MenuItem key={index} value={district.DistrictID}>{district.DistrictName}</MenuItem>
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
                      onChange={(e) => {
                        billingForm.handleChange(e);
                        calculateFee(e.target.value, selectedDistrictID); // Fetch fee when ward changes
                      }}
                      error={billingForm.touched.ward && billingForm.errors.ward !== undefined}
                      onBlur={billingForm.handleBlur}
                      variant='outlined' size='small' sx={{ width: 'fit-content' }}
                    >
                      {sortedWards && sortedWards.map((ward, index) => (
                        <MenuItem key={index} value={ward.WardCode}>{ward.WardName}</MenuItem>
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
                  </>
                )}
                {(shipments.length > 0 && user) && (
                  <> <label>
                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>Full name:</Typography>
                  </label>
                    <TextField style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
                      type='text' name='fullName' disabled
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
                      disabled
                      fullWidth value={billingForm.values.phoneNumber}
                      onChange={billingForm.handleChange}
                      error={billingForm.touched.phoneNumber && billingForm.errors.phoneNumber !== undefined}
                      onBlur={billingForm.handleBlur}
                      helperText={billingForm.touched.phoneNumber && billingForm.errors.phoneNumber}
                      variant='outlined' size='small' sx={{ width: '100%' }}></TextField>
                    <label>
                      <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>Province:</Typography>
                    </label>
                    <TextField
                      style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
                      name='province'
                      disabled
                      value={billingForm.values.province}
                      onChange={(e) => {
                        billingForm.handleChange(e);
                        fetchDistricts(e.target.value); // Fetch districts when province changes
                      }}
                      error={billingForm.touched.province && billingForm.errors.province !== undefined}
                      onBlur={billingForm.handleBlur}
                      variant='outlined' size='small' sx={{ width: 'fit-content' }}
                    />
                    <label>
                      <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>District:</Typography>
                    </label>
                    <TextField
                      style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
                      name='district'
                      disabled
                      value={billingForm.values.district}
                      onChange={(e) => {
                        billingForm.handleChange(e);
                        setSelectedDistrictID(e.target.value); // Store selected DistrictID
                        fetchWards(e.target.value); // Fetch wards when district changes
                      }}
                      error={billingForm.touched.district && billingForm.errors.district !== undefined}
                      onBlur={billingForm.handleBlur}
                      variant='outlined' size='small' sx={{ width: 'fit-content' }}
                    />


                    <label>
                      <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>Ward:</Typography>
                    </label>
                    <TextField
                      style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
                      name='ward'
                      disabled
                      value={billingForm.values.ward}
                      onChange={(e) => {
                        billingForm.handleChange(e);
                        calculateFee(e.target.value, selectedDistrictID); // Fetch fee when ward changes
                      }}
                      error={billingForm.touched.ward && billingForm.errors.ward !== undefined}
                      onBlur={billingForm.handleBlur}
                      variant='outlined' size='small' sx={{ width: 'fit-content' }}
                    />
                    <label>
                      <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px' }}>Street Address:</Typography>
                    </label>
                    <TextField style={{ width: '70%', marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}
                      type='text' name='address' disabled
                      fullWidth value={selectedShipment.toAddress}
                      onChange={billingForm.handleChange}
                      error={billingForm.touched.address && billingForm.errors.address !== undefined}
                      onBlur={billingForm.handleBlur}
                      helperText={billingForm.touched.address && billingForm.errors.address}
                      variant='outlined' size='small' sx={{ width: '100%' }}></TextField>
                  </>)}
              </Box>


              <Box width='auto' height='auto' flex={{ xs: 1, md: 3.5 }} sx={{ flexDirection: 'column', border: '1px solid #E5E5E5', marginLeft: '2rem' }}>
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
                      <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', fontWeight: 'bold', marginTop: '12px', textDecoration: 'line-through' }}>{shippingFee}$ </Typography>
                      {shippingFee > 0 && <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', fontWeight: 'bold' }}>Free</Typography>}
                    </Box>

                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '24px' }}>
                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '11.9px', fontWeight: 'bold' }}>Estimated total:</Typography>
                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '17.8px', fontWeight: 'bold', }}>{checkoutData.totalAmount}$</Typography>
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
                <button type='submit' style={{ ...backgroundConfigs.style.backgroundPrimary, color: 'white', ...TextConfig.style.basicFont }} className='min-w-full py-2 px-3 flex justify-center' >Continue</button>
              </Box>
            </Stack>
          </form>
          <Dialog
            sx={{
              '& .MuiDialog-paper': {
                width: '100%',
                maxWidth: '430px',
                maxHeight: '100%',
                borderRadius: '0px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }
            }}
            open={openSelectAddress} onClose={() => setOpenSelectAddress(false)}
          >
            <DialogTitle sx={{ fontWeight: 400 }}>My Address</DialogTitle>
            <DialogContent
              sx={{
                width: "100%",
                borderBottom: "1px solid #ccc",
                borderTop: "1px solid #ccc",
                overflow: "auto",
                maxHeight: '450px',
                ...customScrollbarStyle
              }}
            >
              <Stack direction="column" spacing={2} width="100%" my={2}>
                {!shipments ? <Typography sx={{ ...textConfigs.style.basicFont, fontSize: '14px', color: '#757575' }}>You have no address</Typography> :
                  shipments.map((shipment, index) => (
                    <>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="start"
                        width="100%">
                        <Stack direction='row' justifyContent='start' alignItems='start'>
                          <Checkbox
                            value={shipment.shipmentId}
                            onChange={handleShipmentChange}
                            checked={selectedShipment.shipmentId === shipment.shipmentId}
                          />
                          <Stack direction='column'>
                            <Stack direction='row'>
                              <Typography sx={{ ...textConfigs.style.basicFont, fontSize: '16px', fontWeight: 'bold' }}>{shipment.customerName}</Typography>
                              <Typography sx={{ ...textConfigs.style.basicFont, color: '#757575', fontSize: '14px', mx: 1 }}>|</Typography>
                              <Typography sx={{ ...textConfigs.style.basicFont, color: '#757575', fontSize: '14px' }}>{shipment.customerPhone}</Typography>
                            </Stack>
                            <Typography sx={{ ...textConfigs.style.basicFont, fontSize: '14px', color: '#757575', mt: 1 }}>{shipment.toAddress}, {shipment.toWardName}, {shipment.toDistrictName}, {shipment.toProvinceName}</Typography>
                          </Stack>
                        </Stack>
                        <Button onClick={() => {
                          setOpenEditAddress(true)
                          setSelectedEditShipment(shipment)
                        }}>
                          Edit
                        </Button>
                      </Stack>

                      {index !== shipments.length - 1 && <Divider />}
                    </>
                  ))}
                <Button sx={{
                  width: 'fit-content',
                  height: '40px',
                  ml: '13px',
                  border: '1px solid #E5E5E5',
                  borderRadius: '0px',
                  color: 'black',
                  ...TextConfig.style.basicFont
                }}
                  onClick={() => setOpenAddAddress(true)}
                >
                  <FaPlus style={{
                    marginRight: '5px',
                    fontSize: '14px',
                  }} />
                  Add new address
                </Button>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenSelectAddress(false)} color="primary">
                Close
              </Button>

            </DialogActions>
          </Dialog>
          <Dialog
            sx={{
              '& .MuiDialog-paper': {
                width: '100%',
                maxWidth: '430px',
                maxHeight: '100%',
                borderRadius: '0px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }
            }}
            open={openAddAddress} onClose={() => setOpenAddAddress(false)}
          >
            <DialogTitle sx={{ fontWeight: 400 }}>Add Address</DialogTitle>
            <form onSubmit={addAddressForm.handleSubmit}>
              <DialogContent
                sx={{
                  width: "100%",
                  borderBottom: "1px solid #ccc",
                  borderTop: "1px solid #ccc",
                  overflow: "auto",
                  maxHeight: '450px',
                  ...customScrollbarStyle
                }}
              >
                <Stack direction="column" spacing={2} width="100%" my={2}>
                  <TextField
                    style={{ width: '100%', marginBottom: '6px' }}
                    type='text'
                    name='fullName'
                    fullWidth
                    value={addAddressForm.values.fullName}
                    onChange={addAddressForm.handleChange}
                    error={addAddressForm.touched.fullName && addAddressForm.errors.fullName !== undefined}
                    onBlur={addAddressForm.handleBlur}
                    helperText={addAddressForm.touched.fullName && addAddressForm.errors.fullName}
                    variant='outlined'
                    size='small'
                    sx={{ width: '100%' }}
                    placeholder='Full name'
                  />
                  <TextField
                    style={{ width: '100%', marginBottom: '6px', }}
                    type='text'
                    name='phoneNumber'
                    fullWidth
                    value={addAddressForm.values.phoneNumber}
                    onChange={addAddressForm.handleChange}
                    error={addAddressForm.touched.phoneNumber && addAddressForm.errors.phoneNumber !== undefined}
                    onBlur={addAddressForm.handleBlur}
                    helperText={addAddressForm.touched.phoneNumber && addAddressForm.errors.phoneNumber}
                    variant='outlined'
                    size='small'
                    sx={{ width: '100%' }}
                    placeholder='Phone number'
                  />
                  <FormControl fullWidth variant="outlined" size="small" style={{ marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}>
                    <InputLabel>Province</InputLabel>
                    <Select
                      name='province'
                      value={addAddressForm.values.province}
                      onChange={(e) => {
                        addAddressForm.handleChange(e);
                        fetchDistricts(e.target.value); // Fetch districts when province changes
                      }}
                      error={addAddressForm.touched.province && addAddressForm.errors.province !== undefined}
                      onBlur={addAddressForm.handleBlur}
                      label='Province'
                    >
                      {sortedProvinces.map((province, index) => (
                        <MenuItem key={index} value={province.ProvinceID}>{province.ProvinceName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth variant="outlined" size="small" style={{ marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}>
                    <InputLabel>District</InputLabel>
                    <Select
                      name='district'
                      value={addAddressForm.values.district}
                      onChange={(e) => {
                        addAddressForm.handleChange(e);
                        setSelectedDistrictID(e.target.value); // Store selected DistrictID
                        fetchWards(e.target.value); // Fetch wards when district changes
                      }}
                      error={addAddressForm.touched.district && addAddressForm.errors.district !== undefined}
                      onBlur={addAddressForm.handleBlur}
                      label='District'
                    >
                      {sortedDistricts && sortedDistricts.map((district, index) => (
                        <MenuItem key={index} value={district.DistrictID}>{district.DistrictName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth variant="outlined" size="small" style={{ marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}>
                    <InputLabel>Ward</InputLabel>
                    <Select
                      name='ward'
                      value={addAddressForm.values.ward}
                      onChange={(e) => {
                        addAddressForm.handleChange(e);
                        calculateFee(e.target.value, selectedDistrictID); // Fetch fee when ward changes
                      }}
                      error={addAddressForm.touched.ward && addAddressForm.errors.ward !== undefined}
                      onBlur={addAddressForm.handleBlur}
                      label='Ward'
                    >
                      {sortedWards && sortedWards.map((ward, index) => (
                        <MenuItem key={index} value={ward.WardCode}>{ward.WardName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField style={{ width: '100%', marginBottom: '12px' }}
                    type='text' name='address'
                    placeholder='Street Address'
                    fullWidth value={addAddressForm.values.address}
                    onChange={addAddressForm.handleChange}
                    error={addAddressForm.touched.address && addAddressForm.errors.address !== undefined}
                    onBlur={addAddressForm.handleBlur}
                    helperText={addAddressForm.touched.address && addAddressForm.errors.address}
                    variant='outlined' size='small' sx={{ width: '100%' }}></TextField>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {
                  setOpenAddAddress(false)
                  // setOpen(true)
                }} color="primary">
                  Back
                </Button>
                <Button type='submit' color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <Dialog
            sx={{
              '& .MuiDialog-paper': {
                width: '100%',
                maxWidth: '430px',
                maxHeight: '100%',
                borderRadius: '0px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }
            }}
            open={openEditAddress} onClose={() => setOpenEditAddress(false)}
          >
            <DialogTitle sx={{ fontWeight: 400 }}>Edit Address</DialogTitle>
            <form onSubmit={editAddressForm.handleSubmit}>
              <DialogContent
                sx={{
                  width: "100%",
                  borderBottom: "1px solid #ccc",
                  borderTop: "1px solid #ccc",
                  overflow: "auto",
                  maxHeight: '450px',
                  ...customScrollbarStyle
                }}
              >
                <Stack direction="column" spacing={2} width="100%" my={2}>
                  <TextField
                    style={{ width: '100%', marginBottom: '6px' }}
                    type='text'
                    name='fullName'
                    fullWidth
                    value={editAddressForm.values.fullName}
                    onChange={editAddressForm.handleChange}
                    error={editAddressForm.touched.fullName && editAddressForm.errors.fullName !== undefined}
                    onBlur={editAddressForm.handleBlur}
                    helperText={editAddressForm.touched.fullName && editAddressForm.errors.fullName}
                    variant='outlined'
                    size='small'
                    sx={{ width: '100%' }}
                    placeholder='Full name'
                  />
                  <TextField
                    style={{ width: '100%', marginBottom: '6px', }}
                    type='text'
                    name='phoneNumber'
                    fullWidth
                    value={editAddressForm.values.phoneNumber}
                    onChange={editAddressForm.handleChange}
                    error={editAddressForm.touched.phoneNumber && editAddressForm.errors.phoneNumber !== undefined}
                    onBlur={editAddressForm.handleBlur}
                    helperText={editAddressForm.touched.phoneNumber && editAddressForm.errors.phoneNumber}
                    variant='outlined'
                    size='small'
                    sx={{ width: '100%' }}
                    placeholder='Phone number'
                  />
                  <FormControl fullWidth variant="outlined" size="small" style={{ marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}>
                    <InputLabel>Province</InputLabel>
                    <Select
                      name='province'
                      value={editAddressForm.values.province}
                      onChange={(e) => {
                        editAddressForm.handleChange(e);
                        fetchDistricts(e.target.value); // Fetch districts when province changes
                      }}
                      error={editAddressForm.touched.province && editAddressForm.errors.province !== undefined}
                      onBlur={editAddressForm.handleBlur}
                      label='Province'
                    >
                      {sortedProvinces.map((province, index) => (
                        <MenuItem key={index} value={province.ProvinceID}>{province.ProvinceName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth variant="outlined" size="small" style={{ marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}>
                    <InputLabel>District</InputLabel>
                    <Select
                      name='district'
                      value={editAddressForm.values.district}
                      onChange={(e) => {
                        editAddressForm.handleChange(e);
                        setSelectedDistrictID(e.target.value); // Store selected DistrictID
                        fetchWards(e.target.value); // Fetch wards when district changes
                      }}
                      error={editAddressForm.touched.district && editAddressForm.errors.district !== undefined}
                      onBlur={editAddressForm.handleBlur}
                      label='District'
                    >
                      {sortedDistricts && sortedDistricts.map((district, index) => (
                        <MenuItem key={index} value={district.DistrictID}>{district.DistrictName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth variant="outlined" size="small" style={{ marginBottom: '12px', boxShadow: 'inset 0 0 8px rgba(0, 0, 0, .15)' }}>
                    <InputLabel>Ward</InputLabel>
                    <Select
                      name='ward'
                      value={editAddressForm.values.ward}
                      onChange={(e) => {
                        editAddressForm.handleChange(e);
                        calculateFee(e.target.value, selectedDistrictID); // Fetch fee when ward changes
                      }}
                      error={editAddressForm.touched.ward && editAddressForm.errors.ward !== undefined}
                      onBlur={editAddressForm.handleBlur}
                      label='Ward'
                    >
                      {sortedWards && sortedWards.map((ward, index) => (
                        <MenuItem key={index} value={ward.WardCode}>{ward.WardName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField style={{ width: '100%', marginBottom: '12px' }}
                    type='text' name='address'
                    placeholder='Street Address'
                    fullWidth value={editAddressForm.values.address}
                    onChange={editAddressForm.handleChange}
                    error={editAddressForm.touched.address && editAddressForm.errors.address !== undefined}
                    onBlur={editAddressForm.handleBlur}
                    helperText={editAddressForm.touched.address && editAddressForm.errors.address}
                    variant='outlined' size='small' sx={{ width: '100%' }}></TextField>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {
                  setOpenEditAddress(false)
                  // setOpen(true)
                }} color="primary">
                  Back
                </Button>
                <Button type='submit' color="primary">
                  Update Address
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Container>
      </Box>
    </>
  );
};

export default PaymentBilling;

