import React, { useState } from 'react'
import UserSidebar from '../components/commons/UserSidebar'
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Pagination, PaginationItem, Rating, Stack, Typography } from '@mui/material'
import textConfigs from '../config/text.config'
import { MdOutlineDelete } from "react-icons/md";
import { RiDoubleQuotesL } from "react-icons/ri";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { productReviewss } from '../data/Product'
import { toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io';
import ImageComponent from '../components/commons/ImageComponent';

const ProductReviews = () => {

    const [page, setPage] = useState(1);
    const reviewsPerPage = 4;
    const [productReviews, setProductReviews] = useState(productReviewss);
    const [open, setOpen] = useState(false);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);

    const handleClickOpen = (index) => {
        setOpen(true);
        setSelectedProductIndex(index);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedProductIndex(null);
    };

    const handleRemove = () => {
        const updatedProducts = [...productReviews];
        updatedProducts.splice(selectedProductIndex, 1);
        setProductReviews(updatedProducts);
        handleClose();
        toast.success('Item removed from wishlist');
    };

    // Tính toán các review cần hiển thị dựa trên trang hiện tại
    const indexOfLastReview = page * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = productReviews.slice(indexOfFirstReview, indexOfLastReview);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <UserSidebar>
            <Box sx={{ width: { xs: '100%', md: '80%' }, height: '100%', bgcolor: 'white', borderRadius: '8px', padding: '1rem' }}>
                <Typography sx={{ ...textConfigs.style.headerText, fontWeight: '700', fontSize: '20px', mb: '1rem' }}>Product Reviews</Typography>
                <Stack direction='row' spacing={2} border='1px solid #eaeaea' borderRadius='10px' padding='10px' width='fit-content' mb='14px' alignItems='center'>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Box sx={{ width: '16px', height: '16px', borderRadius: '50%', bgcolor: '#ADB5BD' }}></Box>
                        <Typography sx={{ ...textConfigs.style.basicFont, fontSize: '14px' }}>Pending approval</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Box sx={{ width: '16px', height: '16px', borderRadius: '50%', bgcolor: '#1fc593' }}></Box>
                        <Typography sx={{ ...textConfigs.style.basicFont, fontSize: '14px' }}>Approved</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Box sx={{ width: '16px', height: '16px', borderRadius: '50%', bgcolor: '#ED6495' }}></Box>
                        <Typography sx={{ ...textConfigs.style.basicFont, fontSize: '14px' }}>Not approved</Typography>
                    </Stack>
                </Stack>
                {currentReviews.map((review, index) => (
                    <Box sx={{ borderRadius: '10px', bgcolor: '#E1FCF3', p: '10px', mb: '18px' }}>
                        <Stack direction={{ xs: 'column', md: 'row' }} alignItems='center' justifyContent='space-between'>
                            <Stack direction='row' spacing={2} alignItems='center' pb='12px' >
                                <ImageComponent src={review.img} width='30px' height='30px' alt='product' />
                                <Typography sx={{ ...textConfigs.style.basicFont, fontWeight: 'bold', fontSize: '14px' }}>{review.name}</Typography>
                                <Typography sx={{ ...textConfigs.style.basicFont, fontSize: '14px' }}>{review.date}</Typography>
                                <Rating size='small' name="read-only" value={review.rating} readOnly />
                            </Stack>
                            <Stack direction='row' spacing={2} sx={{
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                pb: '12px',
                                pl: '12px'
                            }}>
                                <Chip size='small' label={review.state} sx={{ ...textConfigs.style.basicFont, bgcolor: `${review.state === 'Approved' ? '#1fc593' : (review.state === 'Not approved' ? '#ED6495' : '#ADB5BD')}`, color: 'white' }} />
                                <Button onClick={() => handleClickOpen(index)} size='small' variant='outlined' startIcon={<MdOutlineDelete />} sx={{ borderRadius: '8px', color: '#F4717A', border: '1px solid #F4717A', ...textConfigs.style.basicFont }}>Delete </Button>
                                <Dialog
                                    onClose={handleClose}
                                    aria-labelledby="customized-dialog-title"
                                    open={open && selectedProductIndex === index}
                                >
                                    <DialogTitle sx={{ m: 0, p: 2, ...textConfigs.style.basicFont }} id="customized-dialog-title">
                                        Kolux
                                    </DialogTitle>
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleClose}
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                        }}
                                    >
                                        <IoMdClose />
                                    </IconButton>
                                    <DialogContent dividers>
                                        <Typography sx={{ fontSize: '22px', ...textConfigs.style.basicFont, fontWeight: 'semibold' }} gutterBottom>
                                            Remove Review?
                                        </Typography>
                                        <Typography sx={{ fontSize: '14px', ...textConfigs.style.basicFont }} gutterBottom>
                                            Are you sure you want to delete this review?
                                        </Typography>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button sx={{
                                            backgroundColor: '#1C2759',
                                            ...textConfigs.style.basicFont,
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#005792' // Darker shade of blue for hover
                                            }
                                        }} autoFocus onClick={handleRemove}>
                                            Yes, Delete It
                                        </Button>
                                        <Button
                                            sx={{
                                                backgroundColor: '#1C2759',
                                                ...textConfigs.style.basicFont,
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#005792' // Darker shade of blue for hover
                                                }
                                            }}
                                            autoFocus
                                            onClick={handleClose
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Stack>
                        </Stack>
                        <Stack direction='row' spacing={3} >
                            <RiDoubleQuotesL size='20px' style={{ flexShrink: 0 }} />
                            <Typography sx={{ ...textConfigs.style.basicFont, fontSize: '14px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. Nullam ac ante mollis, fermentum nunc nec, tincidunt nunc. </Typography>
                        </Stack>
                    </Box>
                ))}

                <Pagination
                    count={Math.ceil(productReviews.length / reviewsPerPage)}
                    page={page}
                    onChange={handleChange}
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...item}
                        />
                    )}
                />
            </Box>
        </UserSidebar>
    )
}

export default ProductReviews