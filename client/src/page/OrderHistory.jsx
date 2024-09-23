import { Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import Navigate from '../components/commons/Navigate'
import menuConfigs from '../config/menu.config'
import { Link } from 'react-router-dom'
import TextConfig from '../config/text.config'
import { useSelector } from 'react-redux'
import { orders } from '../data/Product'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ImageComponent from '../components/commons/ImageComponent';
import { SiVisa } from "react-icons/si";
import { PiWarningCircle } from "react-icons/pi";
import UserSidebar from '../components/commons/UserSidebar'



const OrderHistory = () => {
    const { appState } = useSelector((state) => state.appState);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    console.log(orders);

    return (
        <>
            <UserSidebar>
                <Box sx={{ width: { xs: '100%', md: '80%' }, height: '100%', bgcolor: 'white', borderRadius: '8px', padding: '1rem' }}>
                    <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '20px', mb: '1rem' }}>Order History</Typography>
                    <Stack spacing={2} direction='column' >
                        {orders.map((item, index) => {
                            return (
                                <Accordion sx={{ borderRadius: '8px', bgcolor: '#F9F9F9' }} slotProps={{ transition: { unmountOnExit: false } }} key={index}>
                                    <AccordionSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >

                                        <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center' width='100%' >
                                            <Box>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px' }}>Order ID: <span style={{ fontWeight: '400' }}>{item.orderID}</span></Typography>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px' }}>Order Date: <span style={{ fontWeight: '400' }}>{item.orderDate}</span></Typography>
                                            </Box>
                                            <Stack direction='row' spacing='12px' justifyContent='flex-start' alignItems='center' >
                                                <Chip size='small' label={capitalizeFirstLetter(item.status)} sx={{ ...TextConfig.style.headerText, width: '100px', fontWeight: '700', color: 'white', fontSize: '14px', bgcolor: `${item.status === 'PENDING' ? '#B9B9B9' : '#0EA97A'}` }} />
                                                <Chip size='small' label='Paid' sx={{ ...TextConfig.style.headerText, width: '100px', fontWeight: '700', color: 'white', fontSize: '14px', bgcolor: '#0EA97A' }} />

                                            </Stack>
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Divider />
                                        <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center' width='100%' mt='12px' mb='16px' >
                                            <Stack direction='row' spacing={2} justifyContent='flex-start' alignItems='center' width='80%'>
                                                <ImageComponent src={item.img} alt={item.name} width='75px' height='75px' />
                                                <Stack direction='column' spacing='12px' width={{ xs: '210px', md: '359px' }}>
                                                    <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px' }}>{item.name}</Typography>
                                                    <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Description: {item.description}</Typography>
                                                    <Stack direction='row' spacing={2}>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '14px', borderRight: '1px solid', pr: 2 }}>Color code: {item.colorCode}</Typography>
                                                        <Box sx={{ width: '20px', height: '20px', borderRadius: '8px', bgcolor: '#BF3535' }}></Box>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                            <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '16px', width: 'max-content' }}>${item.price} <span style={{ color: '#669AE7', fontWeight: '400' }}>x {item.quantity}</span></Typography>
                                        </Stack>
                                        <Divider />
                                        <Stack direction='row' spacing='12px' my='16px'>
                                            <Box sx={{ width: '100%', bgcolor: '#FFFFFF', mt: '16px', borderRadius: '8px', p: '12px', gap: '12px', display: 'flex', flexDirection: 'column' }}>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px' }}>Information</Typography>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '12px' }}>{item.paymentAddress.name}</Typography>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '12px' }}>{item.paymentAddress.phone}</Typography>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '12px' }}>{item.paymentAddress.address}</Typography>
                                            </Box>
                                            <Box sx={{ width: '100%', bgcolor: '#FFFFFF', mt: '16px', borderRadius: '8px', p: '12px' }}>
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px', pb: '9px' }}>Delivery method</Typography>
                                                <ImageComponent src='https://s3-alpha-sig.figma.com/img/02fc/f888/d00be9a7e580840b034e627bd1a8dc56?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JXDLowt-irATfOv2JwqbiFdN8has5RgWRfqyA3XTT2~YdLgnpwbPiL~kgVy058nGU~llwog350tOaNeDXHjBzq2Lj263HN5JVpyjUcbqE2fgZj5nl3rVKLMgm52tmmrv2PaHW0YSQlsVq~dDEfcgS~avZOKVur1fRWYM1winCV82QtEeXgotCul6HtwFJhHfKLRDCzn-NZFasH5eEa5~KJNYOZtkFwrHSQMQglSicTdzUR2c7SrY-o8Ma3YcuF6QrQucntns9PzHvngT1jtTPCmdYpHWlecrhHGrsUyoK8SFR6SAhkYv4Dr5jvrdDBkRKWPk30HUnLRd4JDHyPMtWg__' alt='delivery' width='50px' height='20px' />
                                                <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '700', fontSize: '14px', pb: '12px', pt: '7px' }}>Payment method</Typography>
                                                <Stack direction='row' alignItems='center' spacing='5px'>
                                                    <Typography sx={{ ...TextConfig.style.headerText, fontWeight: '400', fontSize: '12px' }}>{item.paymentAddress.Visa}</Typography>
                                                    <SiVisa style={{ fontSize: '25px', color: '#1061A3' }} />
                                                </Stack>
                                            </Box>
                                            <Box sx={{ width: '100%', bgcolor: '#FFFFFF', mt: '16px', borderRadius: '8px', p: '12px' }}>
                                                <Stack direction='column' spacing='12px' >
                                                    <Stack direction='row' justifyContent='space-between'>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>Subtotal</Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>${item.total}.00</Typography>
                                                    </Stack>
                                                    <Stack direction='row' justifyContent='space-between'>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontSize: '14px' }}>Discount</Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>(10%) - $20.00</Typography>
                                                    </Stack>
                                                    <Stack direction='row' justifyContent='space-between'>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontSize: '14px', display: 'inline-flex', alignItems: 'center' }}>Delivery
                                                            <span style={{ paddingLeft: '3px' }}><PiWarningCircle style={{ height: '12px', width: '12px' }} /></span></Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>$10.00</Typography>
                                                    </Stack>
                                                    <Stack direction='row' justifyContent='space-between'>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>Total</Typography>
                                                        <Typography sx={{ ...TextConfig.style.headerText, fontWeight: 'bold', fontSize: '14px' }}>$190.00</Typography>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        <Divider />
                                        <Button sx={{
                                            ...TextConfig.style.headerText,
                                            mt: '1rem',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            bgcolor: '#1c2759',
                                            color: 'white',
                                            borderRadius: '14px',
                                            width: '150px',
                                            height: '30px',
                                            textTransform: 'capitalize',
                                            '&:hover': {
                                                color: 'secondary.colorText',
                                                backgroundColor: '#2c3766',
                                            }
                                        }}>{item.status === "COMPLETED" ? 'Write a review' : 'Confirm Receipt'}</Button>

                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </Stack>
                </Box>
            </UserSidebar>
        </>
    )
}

export default OrderHistory