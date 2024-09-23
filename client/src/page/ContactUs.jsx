import { Box, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import textConfigs from '../config/text.config'
import { IoChatbubblesOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageComponent from '../components/commons/ImageComponent';

const ContactUs = () => {

    const isXs = useMediaQuery('(max-width:599px)');

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            subject: Yup.string().required('Required'),
            message: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Box p={{ xs: '56px 0 16px 0', md: '96px 0 16px 0' }} bgcolor='#0000' minHeight='inherit'>
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mb: '2rem', mt: '2rem' }}>
                <Typography sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', textAlign: 'center' }} variant='h2'>Contact our team</Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '16px', mt: '5px', textAlign: 'center' }}>Got any questions about the product or scaling on our platform? We're here to help.</Typography>
                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '16px', textAlign: 'center' }}>Chat to our friendly team 24/7 and get onboard in less than 5 minutes.</Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6} justifyContent='center'>
                <Box sx={{ width: { xs: '100%', sm: '40%' }, justifyContent: 'flex-end' }}>
                    <form onSubmit={formik.handleSubmit} className="space-y-8">
                        <div className="flex flex-row gap-4">
                            <div className="w-1/2">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                    className={`shadow-sm bg-gray-50 border ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
                                ) : null}
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}
                                    className={`shadow-sm bg-gray-50 border ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={`shadow-sm bg-gray-50 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
                                placeholder="name@flowbite.com"
                                required
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.subject}
                                className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${formik.touched.subject && formik.errors.subject ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
                                placeholder="Let us know how we can help you"
                                required
                            />
                            {formik.touched.subject && formik.errors.subject ? (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.subject}</div>
                            ) : null}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                placeholder="Leave a comment..."
                            ></textarea>
                            {formik.touched.message && formik.errors.message ? (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
                            ) : null}
                        </div>
                        <button
                            type="submit"
                            className="py-3 px-5 text-sm font-medium bg-[#1C2759] text-center text-white rounded-lg bg-primary-700 w-full hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Send message
                        </button>
                    </form>
                </Box>
                <Box sx={{ width: { xs: '100%', sm: '30%' } }}>
                    <Typography sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', fontSize: '20px' }}>Chat with us</Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '16px', my: '10px' }}>We're here to help you 24/7</Typography>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <IoChatbubblesOutline />
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '16px', textDecoration: 'underline' }}>Start a live chat</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <FiSend />
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '16px', textDecoration: 'underline', my: '8px' }}>Shoot us an email</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <FaXTwitter />
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '16px', textDecoration: 'underline' }}>Message us on X</Typography>
                    </Stack>
                    <Typography sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', fontSize: '20px', mt: '20px' }}>Call us</Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '16px', my: '10px' }}>Call our team Mon-Fri from 8am to 5pm.</Typography>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <FiPhoneCall />
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '16px', textDecoration: 'underline' }}>+1(555)000-0000</Typography>
                    </Stack>
                    <Typography sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', fontSize: '20px', mt: '20px' }}>Visit us</Typography>
                    <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: '400', fontSize: '16px', my: '10px' }}>Chat to us in person at our Mellbourne HQ.</Typography>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <CiLocationOn />
                        <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '16px', textDecoration: 'underline' }}>100 Smith Street, Collingwood VIC 3066</Typography>
                    </Stack>
                </Box>
            </Stack> */}
            {/* <Box
                className="banner"
                height='250px'
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(https://img.freepik.com/premium-photo/ufo-day-background-with-copyspace-cutecartoon-aliens-collection-commercial-banner-room-copy_1108314-72236.jpg`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat", // Ngăn hình ảnh lặp lại

                    backgroundPosition: "center",
                    padding: "20px",
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ ...textConfigs.style.headerText, color: 'white' }}>
                    Contact Us
                </Typography>
                <Typography variant="body1" paragraph sx={{ ...textConfigs.style.headerText, color: 'white' }}>
                    Or come to our office to get more information
                </Typography>
            </Box> */}
            <Box sx={{
                bgcolor: '#1C2759',
                position: 'relative',
                height: { xs: '340px', sm: '421.44px' },
                mb: '100px',
            }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} sx={{
                    position: 'absolute',
                    bottom: { xs: '-20px', sm: '-50px' },
                    height: { xs: '346px', sm: '413.27px' },
                    width: '100%',
                    alignItems: 'stretch', // Đảm bảo các phần tử con có chiều cao bằng nhau
                    padding: { xs: '0 10px 0 10px', sm: '0 375.5px 0 375.5px' },
                }}>
                    <Box sx={{
                        width: { xs: '100%', sm: '50%' },
                        height: '100%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end',
                        bgcolor: '#2c3766',
                        flexDirection: 'column',
                        padding: '48px 32px',
                    }}>
                        <Typography sx={{ ...textConfigs.style.basicFont, color: 'white', fontSize: { xs: '36px', sm: '60px' } }}>Contact Us</Typography>
                        <Typography sx={{ ...textConfigs.style.basicFont, color: 'white', fontSize: '16px' }}>Have a question? Send it our way and we will get back to you as soon as possible.

                        </Typography>
                    </Box>
                    <Box sx={{
                        width: { xs: '100%', sm: '50%' },
                        height: '100%',
                    }}>
                        <ImageComponent
                            src='https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/contact-us/_jcr_content/root/container/hero/image.coreimg.85.800.jpeg/1725994956327/contact.jpeg' width='auto' height='auto'
                            className={isXs ? 'object-cover object-top w-full max-h-[186px]' : ''}
                            alt='contact-us'
                        />                    </Box>

                </Stack>
            </Box>
            <Box paddingX={{ xs: '10px', md: '600px' }} mt='1rem' justifyContent='center'>
                <Typography variant='h4' sx={{ ...textConfigs.style.basicFont, mb: '1rem' }} textAlign='center' >Submit a Request</Typography>
                <form onSubmit={formik.handleSubmit} className="space-y-8">
                    <div className="flex flex-row gap-4">
                        <div className="w-1/2">
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                className={`shadow-sm bg-gray-50 border ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
                            ) : null}
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                className={`shadow-sm bg-gray-50 border ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
                            ) : null}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`shadow-sm bg-gray-50 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
                            placeholder="name@flowbite.com"
                            required
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.subject}
                            className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${formik.touched.subject && formik.errors.subject ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
                            placeholder="Let us know how we can help you"
                            required
                        />
                        {formik.touched.subject && formik.errors.subject ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.subject}</div>
                        ) : null}
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.message}
                            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                            placeholder="Leave a comment..."
                        ></textarea>
                        {formik.touched.message && formik.errors.message ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className="py-3 px-5 text-sm font-medium bg-[#1C2759] text-center text-white rounded-lg  w-full hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Send message
                    </button>
                </form>
            </Box>
        </Box>
    )
}

export default ContactUs