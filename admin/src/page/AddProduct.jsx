import { Box, Stack, Typography, Button, Grid, TextField, Select, MenuItem } from '@mui/material'
import React, { Fragment, useState } from 'react'
import textConfig from '../config/text.config'
import backgroundConfig from '../config/background.config'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddUser = () => {

    const formikProductInfo = useFormik({
        initialValues: {
            name: '',
            code: '',
            Place_Of_Origin: '',
            warranty: '',
            surface: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(8, "Password must be at least 8 characters!")
                .required('Required'),
            code: Yup.string()
                .min(8, "Password must be at least 8 characters!")
                .required("Required!"),
            Place_Of_Origin: Yup.string()
                .min(8, "Password must be at least 8 characters!")
                .required("Required!"),
            warranty: Yup.string()
                .min(8, "Password must be at least 8 characters!")
                .required("Required!"),
            surface: Yup.string()
                .min(8, "Password must be at least 8 characters!")
                .required("Required!"),
            description: Yup.string()
                .min(8, "Password must be at least 8 characters!")
                .required("Required!"),

        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    const formikPassword = useFormik({
        initialValues: {
            oldPassword: '',
            lastName: '',

            category: 'Default',
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .min(8, "Password must be at least 8 characters!")
                .required('Required'),
            lastName: Yup.string()
                .min(8, "Password must be at least 8 characters!")
                .required("Required!"),
            base: Yup.string()
                .oneOf([Yup.ref("lastName")], "Passwords do not match!")
                .min(8, "Password must be at least 8 characters!")
                .required("Password confirmation is required"),

        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <Stack direction='row' spacing={1} my={1}>
            <Box sx={{
                width: { xs: 0, md: '20%' },
                height: '100vh',
                ...backgroundConfig.style.backgroundPrimary,
            }}>
                <Typography sx={{
                    ...textConfig.style.headerText,
                    color: 'white',
                    textAlign: 'center',
                    padding: '1rem',
                }}>User List</Typography>

            </Box>
            <Box sx={{
                width: { xs: '100%', md: '80%' },
                justifyContent: 'end',
                border: '1px solid #ccc',
                borderRadius: '12px',
                padding: '2rem',
            }}>
                <Typography sx={{
                    ...textConfig.style.headerText,
                    fontSize: '1.5rem',
                    mb: '1rem'
                }}>Add Product</Typography>
                <form onSubmit={formikProductInfo.handleSubmit}>
                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '16px', fontWeight: 'bold' }}>General Infomation </Typography>

                    <Stack direction='row' spacing={1} mt={1} >

                        <Stack direction='column' width='100%'>

                            <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Name</Typography>
                            <TextField
                                name="name"
                                onChange={formikProductInfo.handleChange}
                                onBlur={formikProductInfo.handleBlur}
                                value={formikProductInfo.values.name}
                                type="text" placeholder="Name"
                                size='small'
                                sx={{ width: '100%', }} />
                            {formikProductInfo.touched.name && formikProductInfo.errors.name ? (
                                <div className="text-red-500 text-sm mt-1">{formikProductInfo.errors.name}</div>
                            ) : null}
                        </Stack>
                        <Stack direction='column' width='100%'>
                            <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Code</Typography>
                            <TextField
                                name="code"
                                onChange={formikProductInfo.handleChange}
                                onBlur={formikProductInfo.handleBlur}
                                value={formikProductInfo.values.code}
                                type="text" placeholder="Code"
                                size='small'
                                sx={{ width: '100%', }} />
                            {formikProductInfo.touched.code && formikProductInfo.errors.code ? (
                                <div className="text-red-500 text-sm mt-1">{formikProductInfo.errors.code}</div>
                            ) : null}
                        </Stack>
                        <Stack direction='column' width='100%'>
                            <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Place_Of_Origin</Typography>
                            <TextField
                                name="Place_Of_Origin"
                                onChange={formikProductInfo.handleChange}
                                onBlur={formikProductInfo.handleBlur}
                                value={formikProductInfo.values.Place_Of_Origin}
                                type="text" placeholder="Place_Of_Origin"
                                size='small'
                                sx={{ width: '100%', }} />
                            {formikProductInfo.touched.Place_Of_Origin && formikProductInfo.errors.Place_Of_Origin ? (
                                <div className="text-red-500 text-sm mt-1">{formikProductInfo.errors.Place_Of_Origin}</div>
                            ) : null}
                        </Stack>
                        <Stack direction='column' width='100%'>
                            <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Warranty</Typography>
                            <TextField
                                name="waranty"
                                onChange={formikProductInfo.handleChange}
                                onBlur={formikProductInfo.handleBlur}
                                value={formikProductInfo.values.warranty}
                                type="text" placeholder="Warranty"
                                size='small'
                                sx={{ width: '100%', }} />
                            {formikProductInfo.touched.warranty && formikProductInfo.errors.warranty ? (
                                <div className="text-red-500 text-sm mt-1">{formikProductInfo.errors.warranty}</div>
                            ) : null}
                        </Stack>
                        <Stack direction='column' width='100%'>
                            <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Surface</Typography>
                            <TextField
                                name="surface"
                                onChange={formikProductInfo.handleChange}
                                onBlur={formikProductInfo.handleBlur}
                                value={formikProductInfo.values.surface}
                                type="text" placeholder="Surface"
                                size='small'
                                sx={{ width: '100%', }} />
                            {formikProductInfo.touched.surface && formikProductInfo.errors.surface ? (
                                <div className="text-red-500 text-sm mt-1">{formikProductInfo.errors.surface}</div>
                            ) : null}
                        </Stack>
                    </Stack>
                    <Typography sx={{ ...textConfig.style.headerText, mt: '1rem', color: 'text.secondary' }}>Description</Typography>
                    <TextField
                        name="description"
                        onChange={formikProductInfo.handleChange}
                        onBlur={formikProductInfo.handleBlur}
                        value={formikProductInfo.values.description}
                        type="text" placeholder="Description"
                        size='small'
                        sx={{ width: '100%', }} />
                    {formikProductInfo.touched.description && formikProductInfo.errors.description ? (
                        <div className="text-red-500 text-sm mt-1">{formikProductInfo.errors.description}</div>
                    ) : null}
                    <Button type='submit' size='small' variant="contained" sx={{ bgcolor: '#1c2759', textTransform: 'none', fontSize: '14px', borderRadius: '10px', px: '1rem', mt: '1rem' }}>Create </Button>

                </form>
                <form onSubmit={formikPassword.handleSubmit}>
                    <Stack direction='column' spacing={1} mt='1rem' >
                        <Typography sx={{ ...textConfig.style.headerText, color: 'text.secondary' }}>Category</Typography>
                        <Select
                            name="category"
                            onChange={formikPassword.handleChange}
                            onBlur={formikPassword.handleBlur}
                            value={formikPassword.values.category}
                            size='small'
                            sx={{ width: '20%' }}
                        >
                            <MenuItem value='Default'>Select Category</MenuItem>
                            <MenuItem value='Paint'>Paint</MenuItem>
                            <MenuItem value='Floor'>Floor</MenuItem>
                            <MenuItem value='Wallpaper'>Wallpaper</MenuItem>
                        </Select>
                    </Stack>


                    <Typography sx={{ ...textConfig.style.headerText, my: '1rem', fontWeight: 'bold', fontSize: '16px' }}>Image</Typography>
                    <label
                        // htmlFor={`upload-photo-item${albumIndex}`}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                            justifyContent: "center",
                            border: '2px dashed #000',
                            flexDirection: "column",
                        }}
                    >
                        <input
                            // id={`upload-photo-item${albumIndex}`}
                            type="file"
                            multiple
                            name="images"
                            style={{ display: "none" }}
                        // onChange={(ev) => uploadPhoto(ev, albumIndex)}
                        // disabled={isUploading}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            style={{ width: "4.4rem" }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                        </svg>
                        {/* {isUploading ? "Đang tải ảnh lên ..." : "Thêm ảnh..."} */}
                        Thêm ảnh...
                    </label>
                    <Typography sx={{ ...textConfig.style.headerText, my: '1rem', fontWeight: 'bold', fontSize: '16px' }}>Feature</Typography>
                    <Stack direction='row' spacing={1}  >
                        <Stack direction='column' width='100%'>
                            <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Feature 1</Typography>
                            <TextField
                                name="feature1"
                                onChange={formikPassword.handleChange}
                                onBlur={formikPassword.handleBlur}
                                value={formikPassword.values.feature1}
                                type="text" placeholder="Feature 1"
                                size='small'
                                sx={{ width: '100%', }} />
                            {formikPassword.touched.feature1 && formikPassword.errors.feature1 ? (
                                <div className="text-red-500 text-sm mt-1">{formikPassword.errors.feature1}</div>
                            ) : null}
                        </Stack>
                        <Stack direction='column' width='100%'>
                            <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Feature 2</Typography>
                            <TextField
                                name="feature2"
                                onChange={formikPassword.handleChange}
                                onBlur={formikPassword.handleBlur}
                                value={formikPassword.values.feature2}
                                type="text" placeholder="Feature 2"
                                size='small'
                                sx={{ width: '100%', }} />
                            {formikPassword.touched.feature2 && formikPassword.errors.feature2 ? (
                                <div className="text-red-500 text-sm mt-1">{formikPassword.errors.feature2}</div>
                            ) : null}
                        </Stack>
                    </Stack>
                    <Typography sx={{ ...textConfig.style.headerText, my: '1rem', fontWeight: 'bold', fontSize: '16px' }}>Property</Typography>
                    <Stack direction='row' spacing={1}  >
                        <Stack direction='column' width='100%'>
                            <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Property 1</Typography>
                            <TextField
                                name="feature1"
                                onChange={formikPassword.handleChange}
                                onBlur={formikPassword.handleBlur}
                                value={formikPassword.values.feature1}
                                type="text" placeholder="Feature 1"
                                size='small'
                                sx={{ width: '100%', }} />
                            {formikPassword.touched.feature1 && formikPassword.errors.feature1 ? (
                                <div className="text-red-500 text-sm mt-1">{formikPassword.errors.feature1}</div>
                            ) : null}
                        </Stack>
                        <Stack direction='column' width='100%'>
                            <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Property 2</Typography>
                            <TextField
                                name="feature2"
                                onChange={formikPassword.handleChange}
                                onBlur={formikPassword.handleBlur}
                                value={formikPassword.values.feature2}
                                type="text" placeholder="Feature 2"
                                size='small'
                                sx={{ width: '100%', }} />
                            {formikPassword.touched.feature2 && formikPassword.errors.feature2 ? (
                                <div className="text-red-500 text-sm mt-1">{formikPassword.errors.feature2}</div>
                            ) : null}
                        </Stack>
                    </Stack>
                    <Typography sx={{ ...textConfig.style.headerText, my: '1rem', fontWeight: 'bold', fontSize: '16px' }}>Additional information </Typography>
                    {formikPassword.values.category === 'Paint' && (
                        <>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%" mb={2}>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Price</Typography>
                                    <TextField
                                        name="price"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.price}
                                        type="text" placeholder="price"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.price && formikPassword.errors.price ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.price}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Quantity</Typography>
                                    <TextField
                                        name="quantity"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.quantity}
                                        type="text" placeholder="quantity"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.quantity && formikPassword.errors.quantity ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.quantity}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Size Name</Typography>
                                    <TextField
                                        name="sizeName"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.sizeName}
                                        type="text" placeholder="sizeName"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.sizeName && formikPassword.errors.sizeName ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.sizeName}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Package Type</Typography>
                                    <TextField
                                        name="packageType"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.packageType}
                                        type="text" placeholder="packageType"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.packageType && formikPassword.errors.packageType ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.packageType}</div>
                                    ) : null}
                                </Stack>

                            </Stack>
                        </>
                    )}
                    {formikPassword.values.category === 'Floor' && (
                        <>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%" mb={2}>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Price</Typography>
                                    <TextField
                                        name="price"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.price}
                                        type="text" placeholder="price"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.price && formikPassword.errors.price ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.price}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Quantity</Typography>
                                    <TextField
                                        name="quantity"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.quantity}
                                        type="text" placeholder="quantity"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.quantity && formikPassword.errors.quantity ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.quantity}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Thickness</Typography>
                                    <TextField
                                        name="thickness"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.thickness}
                                        type="text" placeholder="thickness"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.thickness && formikPassword.errors.thickness ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.thickness}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Size</Typography>
                                    <TextField
                                        name="size"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.size}
                                        type="text" placeholder="size"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.size && formikPassword.errors.size ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.size}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Grain</Typography>
                                    <TextField
                                        name="grain"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.grain}
                                        type="text" placeholder="grain"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.grain && formikPassword.errors.grain ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.grain}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Gross</Typography>
                                    <TextField
                                        name="gross"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.gross}
                                        type="text" placeholder="gross"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.gross && formikPassword.errors.gross ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.gross}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Level</Typography>
                                    <TextField
                                        name="level"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.level}
                                        type="text" placeholder="level"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.level && formikPassword.errors.level ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.level}</div>
                                    ) : null}
                                </Stack>
                            </Stack>
                        </>
                    )}
                    {formikPassword.values.category === 'Wallpaper' && (
                        <>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%" mb={2}>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Price</Typography>
                                    <TextField
                                        name="price"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.price}
                                        type="text" placeholder="price"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.price && formikPassword.errors.price ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.price}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Quantity</Typography>
                                    <TextField
                                        name="quantity"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.quantity}
                                        type="text" placeholder="quantity"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.quantity && formikPassword.errors.quantity ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.quantity}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Size</Typography>
                                    <TextField
                                        name="size"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.size}
                                        type="text" placeholder="size"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.size && formikPassword.errors.size ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.size}</div>
                                    ) : null}
                                </Stack>
                                <Stack direction='column' width='100%'>
                                    <Typography sx={{ ...textConfig.style.headerText, fontSize: '14px', color: 'text.secondary' }}>Material</Typography>
                                    <TextField
                                        name="material"
                                        onChange={formikPassword.handleChange}
                                        onBlur={formikPassword.handleBlur}
                                        value={formikPassword.values.material}
                                        type="text" placeholder="material"
                                        size='small'
                                        sx={{ width: '100%', }} />
                                    {formikPassword.touched.material && formikPassword.errors.material ? (
                                        <div className="text-red-500 text-sm mt-1">{formikPassword.errors.material}</div>
                                    ) : null}
                                </Stack>
                            </Stack>
                        </>
                    )}
                    <Button type='submit' size='small' variant="contained" sx={{ bgcolor: '#1c2759', textTransform: 'none', fontSize: '14px', borderRadius: '10px', px: '1rem', mt: '1rem' }}>Create</Button>
                </form>
            </Box>


        </Stack>
    )
}

export default AddUser