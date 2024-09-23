import React, { useState } from 'react'
import UserSidebar from '../components/commons/UserSidebar'
import { Avatar, Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import textConfigs from '../config/text.config'
import { IoMaleFemaleOutline } from "react-icons/io5";
import { user } from '../data/Product'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Profile = () => {

    const [editInfo, setEditInfo] = useState(false)
    const [editAddress, setEditAddress] = useState(false)

    const formikInfo = useFormik({
        initialValues: {
            firstName: 'Rafael',
            lastName: 'Rahman',
            email: 'rafaelRahman51@gmail.com',
            phone: '+09 345 346 46',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string()
                .matches(/^0\d{9}$/, 'Phone number is not valid')
                .required("Phone number is required!"),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            setEditInfo(false)
        },
    });

    const formikAddress = useFormik({
        initialValues: {
            country: 'United Kingdom',
            city: 'Leeds, East London',
            postalCode: 'ERT 2354',
            taxID: 'AS45645756',
        },
        validationSchema: Yup.object({
            country: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            postalCode: Yup.string()
                .matches(/^\d{5}(-\d{4})?$/, 'Invalid postal code')
                .required('Required'),
            taxID: Yup.string()
                .matches(/^\d{3}-\d{2}-\d{4}$/, 'Invalid tax ID')
                .required('Required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            setEditAddress(false)
        },
    });

    return (
        <UserSidebar>
            <Box sx={{ width: { xs: '100%', md: '80%' }, height: '100%', bgcolor: 'white', borderRadius: '8px', padding: '1rem' }}>
                <Typography sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', fontSize: '20px', mb: '1rem' }}>Profile</Typography>
                <Box sx={{
                    borderRadius: '8px',
                    padding: '12px',
                    border: '1px solid #E5E5E5',
                    mb: '1rem'
                }}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent='space-between'>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar alt="Remy Sharp" src={user.avatar} sx={{ width: 60, height: 60 }} />
                            <Box>
                                <Typography sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', fontSize: '18px' }}>{user.name}</Typography>
                                <Typography sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', fontSize: '18px' }}>Team Manager</Typography>
                                <Typography sx={{ ...textConfigs.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Leeds, United Kingdom</Typography>
                            </Box>
                        </Stack>
                        <Button size='small' endIcon={<CiEdit />} variant="outline" sx={{ border: '1px solid grey', bgcolor: 'transparent', textTransform: 'none', fontSize: '14px', borderRadius: '8px', px: '1rem' }}>Edit</Button>
                    </Stack>
                </Box>

                <Box sx={{
                    borderRadius: '10px',
                    padding: '12px',
                    border: '1px solid #E5E5E5',
                    mb: '1rem'
                }}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent='space-between'>
                        <Typography sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', fontSize: '16px' }}>Personal Information</Typography>
                        <Button size='small' onClick={() => setEditInfo(true)} endIcon={<CiEdit />} variant="outline" sx={{ border: '1px solid grey', bgcolor: 'transparent', textTransform: 'none', fontSize: '14px', borderRadius: '10px', px: '1rem' }}>Edit</Button>
                    </Stack>
                    <form onSubmit={formikInfo.handleSubmit}>
                        <Grid container spacing={2} >
                            <Grid item md={6}>
                                <Typography sx={{ ...textConfigs.style.headerText, fontSize: '14px', color: 'text.secondary', paddingLeft: '10px' }}>First Name</Typography>

                                <input
                                    name="firstName"
                                    onChange={formikInfo.handleChange}
                                    onBlur={formikInfo.handleBlur}
                                    value={formikInfo.values.firstName}
                                    type="text" placeholder="First Name" disabled={!editInfo} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `${editInfo ? '1px solid #E5E5E5' : 'none'}` }} />

                                {formikInfo.touched.firstName && formikInfo.errors.firstName ? (
                                    <div className="text-red-500 text-sm mt-1">{formikInfo.errors.firstName}</div>
                                ) : null}
                            </Grid>
                            <Grid item md={6}>
                                <Typography sx={{ ...textConfigs.style.headerText, fontSize: '14px', color: 'text.secondary', paddingLeft: '10px' }}>Last Name</Typography>
                                <input
                                    name="lastName"
                                    onChange={formikInfo.handleChange}
                                    onBlur={formikInfo.handleBlur}
                                    value={formikInfo.values.lastName}
                                    type="text" placeholder="Last Name" disabled={!editInfo} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `${editInfo ? '1px solid #E5E5E5' : 'none'}` }} />
                                {formikInfo.touched.lastName && formikInfo.errors.lastName ? (
                                    <div className="text-red-500 text-sm mt-1">{formikInfo.errors.lastName}</div>
                                ) : null}
                            </Grid>
                            <Grid item md={6}>
                                <Typography sx={{ ...textConfigs.style.headerText, fontSize: '14px', color: 'text.secondary', paddingLeft: '10px' }}>Email address</Typography>
                                <input
                                    name="email"
                                    onChange={formikInfo.handleChange}
                                    onBlur={formikInfo.handleBlur}
                                    value={formikInfo.values.email}
                                    type="text" placeholder="Mail" disabled={!editInfo} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `${editInfo ? '1px solid #E5E5E5' : 'none'}` }} />
                                {formikInfo.touched.email && formikInfo.errors.email ? (
                                    <div className="text-red-500 text-sm mt-1">{formikInfo.errors.email}</div>
                                ) : null}
                            </Grid>
                            <Grid item md={6}>
                                <Typography sx={{ ...textConfigs.style.headerText, fontSize: '14px', color: 'text.secondary', paddingLeft: '10px' }}>Phone</Typography>
                                <input
                                    name="phone"
                                    onChange={formikInfo.handleChange}
                                    onBlur={formikInfo.handleBlur}
                                    value={formikInfo.values.phone}
                                    type="text" placeholder="Phone" disabled={!editInfo} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `${editInfo ? '1px solid #E5E5E5' : 'none'}` }} />
                                {formikInfo.touched.phone && formikInfo.errors.phone ? (
                                    <div className="text-red-500 text-sm mt-1">{formikInfo.errors.phone}</div>
                                ) : null}
                            </Grid>

                        </Grid>

                        {editInfo && <Button type='submit' size='small' variant="contained" sx={{ bgcolor: '#1c2759', textTransform: 'none', fontSize: '14px', borderRadius: '10px', px: '1rem', mt: '1rem' }}>Save</Button>}
                    </form>
                </Box>
                <Box sx={{
                    borderRadius: '10px',
                    padding: '12px',
                    border: '1px solid #E5E5E5',
                    mb: '1rem'
                }}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent='space-between'>
                        <Typography sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', fontSize: '16px' }}>Address</Typography>
                        <Button size='small' onClick={() => setEditAddress(true)} endIcon={<CiEdit />} variant="outline" sx={{ border: '1px solid grey', bgcolor: 'transparent', textTransform: 'none', fontSize: '14px', borderRadius: '10px', px: '1rem' }}>Edit</Button>
                    </Stack>
                    <form onSubmit={formikAddress.handleSubmit}>
                        <Grid container spacing={2} >
                            <Grid item md={6}>
                                <Typography sx={{ ...textConfigs.style.headerText, fontSize: '14px', color: 'text.secondary', paddingLeft: '10px' }}>Country</Typography>
                                <input
                                    name="country"
                                    onChange={formikAddress.handleChange}
                                    onBlur={formikAddress.handleBlur}
                                    value={formikAddress.values.country}
                                    type="text" placeholder="Country" disabled={!editAddress} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `${editAddress ? '1px solid #E5E5E5' : 'none'}` }} />
                                {formikAddress.touched.country && formikAddress.errors.country ? (
                                    <div className="text-red-500 text-sm mt-1">{formikAddress.errors.country}</div>
                                ) : null}
                            </Grid>
                            <Grid item md={6}>
                                <Typography sx={{ ...textConfigs.style.headerText, fontSize: '14px', color: 'text.secondary', paddingLeft: '10px' }}>City/State</Typography>
                                <input
                                    name="city"
                                    onChange={formikAddress.handleChange}
                                    onBlur={formikAddress.handleBlur}
                                    value={formikAddress.values.city}
                                    type="text" placeholder="City" disabled={!editAddress} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `${editAddress ? '1px solid #E5E5E5' : 'none'}` }} />
                                {formikAddress.touched.city && formikAddress.errors.city ? (
                                    <div className="text-red-500 text-sm mt-1">{formikAddress.errors.city}</div>
                                ) : null}
                            </Grid>
                            <Grid item md={6}>
                                <Typography sx={{ ...textConfigs.style.headerText, fontSize: '14px', color: 'text.secondary', paddingLeft: '10px' }}>Postal Code</Typography>
                                <input
                                    name="postalCode"
                                    onChange={formikAddress.handleChange}
                                    onBlur={formikAddress.handleBlur}
                                    value={formikAddress.values.postalCode}
                                    type="text" placeholder="Postal Code" disabled={!editAddress} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `${editAddress ? '1px solid #E5E5E5' : 'none'}` }} />
                                {formikAddress.touched.postalCode && formikAddress.errors.postalCode ? (
                                    <div className="text-red-500 text-sm mt-1">{formikAddress.errors.postalCode}</div>
                                ) : null}
                            </Grid>
                            <Grid item md={6}>
                                <Typography sx={{ ...textConfigs.style.headerText, fontSize: '14px', color: 'text.secondary', paddingLeft: '10px' }}>TAX ID</Typography>
                                <input
                                    name="taxID"
                                    onChange={formikAddress.handleChange}
                                    onBlur={formikAddress.handleBlur}
                                    value={formikAddress.values.taxID}
                                    type="text" placeholder="TaxID" disabled={!editAddress} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: `${editAddress ? '1px solid #E5E5E5' : 'none'}` }} />
                                {formikAddress.touched.taxID && formikAddress.errors.taxID ? (
                                    <div className="text-red-500 text-sm mt-1">{formikAddress.errors.taxID}</div>
                                ) : null}
                            </Grid>

                        </Grid>
                        {editAddress && <Button type='submit' size='small' variant="contained" sx={{ bgcolor: '#1c2759', textTransform: 'none', fontSize: '14px', borderRadius: '10px', px: '1rem', mt: '1rem' }}>Save</Button>}
                    </form>
                </Box>

            </Box>
        </UserSidebar>
    )
}

export default Profile