import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import TextConfig from '../config/text.config';
import backgroundConfigs from '../config/background.config';
import { Link } from 'react-router-dom';
import ImageComponent from '../components/commons/ImageComponent';
import Container from '../components/commons/Container';
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import { productss } from '../data/Product';

const WishList = () => {

    const [products, setProducts] = useState(productss);
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
        const updatedProducts = [...products];
        updatedProducts.splice(selectedProductIndex, 1);
        setProducts(updatedProducts);
        handleClose();
        toast.success('Item removed from wishlist');
    };
    const handleAddAllToCart = () => {
        setProducts([]);
        handleClose();
        toast.success('All items added to cart and wishlist cleared');
    };

    const calculateTotalAmount = () => {
        let totalAmount = products.reduce((acc, product) => acc + product.total, 0);
        return totalAmount;
    };

    return (
        <>
            <Box p={{ xs: '73px 0 16px 0', md: '75px 0 16px 0' }} bgcolor='#EAEAEA'  >
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
                            Wishlist
                        </Typography>
                    </Box>
                    <Stack minHeight='600px' direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ paddingRight: { xs: 0, lg: '16px' } }}>
                        <Stack flex={{ xs: 2, sm: 8 }} direction='column'>
                            {products.map((product, index) => (
                                <TableContainer component={Paper} key={index}>
                                    <Table sx={{

                                        border: '1px solid #E5E5E5'
                                    }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow sx={{ display: { xs: 'none', md: 'contents' } }}>
                                                <TableCell sx={{ ...TextConfig.style.basicFont, background: '-webkit-gradient(linear, left bottom, left top, color-stop(0, #eee), color-stop(1, #fafafa))', border: '1px solid #E5E5E5' }}>Product</TableCell>
                                                <TableCell sx={{ ...TextConfig.style.basicFont, background: '-webkit-gradient(linear, left bottom, left top, color-stop(0, #eee), color-stop(1, #fafafa))', border: '1px solid #E5E5E5' }} align="left">Color</TableCell>
                                                <TableCell sx={{ ...TextConfig.style.basicFont, background: '-webkit-gradient(linear, left bottom, left top, color-stop(0, #eee), color-stop(1, #fafafa))', border: '1px solid #E5E5E5' }} align="left">Qty</TableCell>
                                                <TableCell sx={{ ...TextConfig.style.basicFont, background: '-webkit-gradient(linear, left bottom, left top, color-stop(0, #eee), color-stop(1, #fafafa))', border: '1px solid #E5E5E5' }} align="left">Price (Each)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{ position: 'relative' }}>
                                            <button style={{
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                width: '25px',
                                                height: '25px',
                                                backgroundColor: '#F3EfEE',
                                                border: 'none',
                                                borderBottom: '1px solid #E2E1E6',
                                                borderLeft: '1px solid #E2E1E6',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }} onClick={() => handleClickOpen(index)}>
                                                <IoMdClose />
                                            </button>
                                            <Dialog
                                                onClose={handleClose}
                                                aria-labelledby="customized-dialog-title"
                                                open={open && selectedProductIndex === index}
                                            >
                                                <DialogTitle sx={{ m: 0, p: 2, ...TextConfig.style.basicFont }} id="customized-dialog-title">
                                                    PaintPerks
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
                                                    <Typography sx={{ fontSize: '22px', ...TextConfig.style.basicFont, fontWeight: 'semibold' }} gutterBottom>
                                                        Remove Saved Item?
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '14px', ...TextConfig.style.basicFont }} gutterBottom>
                                                        Are you sure you want to delete this item?
                                                    </Typography>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button sx={{
                                                        backgroundColor: '#1C2759',
                                                        ...TextConfig.style.basicFont,
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
                                                            ...TextConfig.style.basicFont,
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
                                            <TableRow
                                                key={product.name}
                                                sx={{ width: 'auto', '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell sx={{ width: { xs: 'fit-content', md: '45%' }, padding: '30px 5px 20px 10px', border: '1px solid #E5E5E5' }} align='left' >
                                                    <Stack justifyContent='center' direction='row' mb={2} flex>
                                                        <Box sx={{ width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', paddingRight: '13.6875px' }}>
                                                            <ImageComponent className='h-auto rounded-md' src={product.img} width='60px' height='75.11px' />
                                                        </Box>
                                                        <Stack direction='column' flex={2}>
                                                            <Typography width='fit-content' variant='h3' fontWeight='bold' fontSize='13.86px' color='#0069AF' sx={{ ...TextConfig.style.basicFont }} >{product.name}</Typography>
                                                            <Typography width='fit-content' marginBottom='3.78px' variant='h4' fontSize='12.6px' sx={{ ...TextConfig.style.basicFont }}>Sales #: {product.Sales}</Typography>
                                                            <Typography width='fit-content' marginBottom='3.78px' variant='h4' fontSize='12.6px' sx={{ ...TextConfig.style.basicFont }}>Product #: {product.Product}</Typography>
                                                            <Box paddingTop='10px'>
                                                                <Typography width='fit-content' marginBottom='3.78px' variant='h4' fontSize='12.6px' fontWeight='bold' sx={{ ...TextConfig.style.basicFont }}>
                                                                    Container Size: <span style={{ fontWeight: 'normal' }}>{product.Container_n}</span>
                                                                </Typography>
                                                                <Typography width='fit-content' marginBottom='3.78px' variant='h4' fontSize='12.6px' fontWeight='bold' sx={{ ...TextConfig.style.basicFont }}>
                                                                    Sheen: <span style={{ fontWeight: 'normal' }}>{product.Sheen}</span>
                                                                </Typography>
                                                                <Typography width='fit-content' marginBottom='3.78px' variant='h4' fontSize='12.6px' fontWeight='bold' sx={{ ...TextConfig.style.basicFont }}>
                                                                    Base: <span style={{ fontWeight: 'normal' }}>{product.Base}</span>
                                                                </Typography>
                                                            </Box>
                                                            <Link className='' style={{ ...TextConfig.style.basicFont, marginRight: '10px', color: '#0069AF', fontSize: '12px' }} onClick={() => handleRemove(index)}>Change Options</Link>
                                                        </Stack>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ display: { xs: 'block', md: 'table-cell' }, width: { xs: 'fit-content', md: '20%' }, padding: '30px 10px 20px ', border: '1px solid #E5E5E5' }}>
                                                    {product.colorID ?
                                                        <Stack direction='column'>
                                                            <Box sx={{
                                                                width: '60px',
                                                                height: '60px',
                                                                backgroundColor: 'green'
                                                            }}></Box>
                                                            <Typography marginTop='6px' marginBottom='6px' variant='h4' fontSize='12px' sx={{ ...TextConfig.style.basicFont }}>{product.colorID}</Typography>
                                                            <Typography marginBottom='6px' variant='h4' fontSize='12px' sx={{ ...TextConfig.style.basicFont }}>{product.colorName}</Typography>
                                                            <Typography marginBottom='6px' variant='h4' fontSize='12px' sx={{ ...TextConfig.style.basicFont }}>{product.type}</Typography>
                                                            <Link className='' style={{ ...TextConfig.style.basicFont, marginRight: '10px', color: '#0069AF', fontSize: '10.8px' }} onClick={() => handleRemove(index)}>Change Color</Link>
                                                        </Stack> :
                                                        <Stack direction='column'>
                                                            <Typography margin='5.4px 0px 3.24px' variant='h4' fontSize='10.8px' sx={{ ...TextConfig.style.basicFont }} fontWeight='bold'>No Color Specified</Typography>
                                                            <Link className='' style={{ ...TextConfig.style.basicFont, marginRight: '10px', color: '#0069AF', fontSize: '10.8px' }} onClick={() => handleRemove(index)}>Select Color</Link>
                                                        </Stack>
                                                    }
                                                </TableCell>
                                                <TableCell sx={{ display: { xs: 'block', md: 'table-cell' }, width: { xs: 'fit-content', md: '5%' }, border: '1px solid #E5E5E5' }}>
                                                    <input value={1} maxLength={4} style={{ border: '1px solid', borderRadius: '4px', width: '43.66px', height: '43px', textAlign: 'center', boxShadow: '0 0 8px rgba(0,0,0,.15) inset' }} />
                                                </TableCell>
                                                <TableCell sx={{ display: { xs: 'block', md: 'table-cell' }, width: { xs: 'fit-content', md: '25%' }, border: '1px solid #E5E5E5' }}>
                                                    <Typography paddingTop='4px' fontWeight='bold' variant='h4' fontSize='11px' sx={{ ...TextConfig.style.basicFont }}>
                                                        PainPerks <span style={{ marginLeft: '4px', fontWeight: 'bold', fontSize: '15px' }}>${product.price}</span>
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ))}
                        </Stack>

                        <Box width='auto' height='auto' flex={{ xs: 1, sm: 3.5 }} sx={{ position: 'sticky', top: '0', zIndex: 1, flexDirection: 'column', marginLeft: '2rem', justifyContent: 'flex-start' }}>
                            <Box sx={{ flexDirection: 'column', border: '1px solid #E5E5E5', borderRadius: '10px 10px 0 0' }}>
                                <Box sx={{ padding: '4.2px 14px 2.8px', ...backgroundConfigs.style.backgroundPrimary, borderBottom: '1px solid grey', ...TextConfig.style.basicFont, fontSize: '16px', color: 'white', borderRadius: '6px 6px 0 0' }}>Summary</Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '7.9125px' }}>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px', fontWeight: 'bold' }}>Total <span style={{ fontWeight: 'normal' }}>({products.length})</span></Typography>
                                    <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px', fontWeight: 'bold', color: '#0069AF' }}>{calculateTotalAmount()}$</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ ...TextConfig.style.basicFont, fontSize: '14px', margin: '7px 0px' }}>Prices do not include taxes or other fees as applicable.</Typography>
                            <button style={{ ...backgroundConfigs.style.backgroundPrimary, color: 'white', ...TextConfig.style.basicFont }} className='min-w-full py-2 px-3 flex justify-center' onClick={() => handleAddAllToCart()}>Add All Items To Cart</button>

                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default WishList;
