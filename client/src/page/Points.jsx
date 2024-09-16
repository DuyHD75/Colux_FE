import React, { useState } from 'react'
import UserSidebar from '../components/commons/UserSidebar'
import { Box, Button, Chip, Pagination, PaginationItem, Stack, TextField, Typography } from '@mui/material'
import textConfigs from '../config/text.config'
import ImageComponent from '../components/commons/ImageComponent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { voucherss } from '../data/Product'

const Points = () => {

    const [page, setPage] = useState(1);
    const vouchersPerPage = 4;
    const [vouchers, setVouchers] = useState(voucherss);

    const indexOfLastVoucher = page * vouchersPerPage;
    const indexOfFirstVoucher = indexOfLastVoucher - vouchersPerPage;
    const currentVouchers = vouchers.slice(indexOfFirstVoucher, indexOfLastVoucher);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <UserSidebar>
            <Box sx={{ width: { xs: '100%', md: '80%' }, height: '100%', bgcolor: 'white', borderRadius: '8px', padding: '1rem' }}>
                <Typography sx={{ ...textConfigs.style.headerText, fontWeight: 'bold', fontSize: '20px', mb: '1rem' }}>Voucher</Typography>
                <Stack direction='row' spacing={1} sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: '1rem',
                    bgcolor: '#F6F6F7',
                    height: '100px',
                }}>
                    <Typography sx={{
                        fontSize: '16px',
                        color: '#333',
                        ...textConfigs.style.basicFont
                    }}>Voucher Code</Typography>
                    <TextField size='small' sx={{
                        width: { xs: 'auto', sm: '400px' },
                        borderRadius: '4px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '4px',
                        },
                    }} />
                    <Button sx={{
                        height: '40px',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#fff',
                        bgcolor: '#1C2759',

                        "&:hover": {
                            bgcolor: '#1C2759'
                        }, ...textConfigs.style.basicFont
                    }}>
                        Save
                    </Button>
                </Stack>
                {currentVouchers.map((voucher, index) => (
                    <Stack direction='row' sx={{
                        paddingY: '20px',
                        mb: '12px',
                        bgcolor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)'
                    }}>
                        <Box sx={{
                            borderRight: '1px dashed #e1e1e1',
                            color: '#1C2759',
                            minHeight: '98px',
                            textAlign: 'center',
                            width: '150px',
                            alignItems: 'center',
                            padding: { xs: '15px', }
                        }}>
                            <Typography sx={{
                                fontSize: '32px', fontWeight: '700',
                                ...textConfigs.style.basicFont
                            }}>{voucher.discount}%</Typography>
                            <Typography sx={{
                                fontSize: '32px', fontWeight: '700',
                                ...textConfigs.style.basicFont
                            }}>OFF</Typography>
                        </Box>
                        <Box sx={{
                            padding: { xs: '0 25px 0 25px', sm: '0 50px 0 25px' },
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Stack direction='row' spacing={1} mb='8px' alignItems='center'>
                                <Chip size='small' label="Sale" sx={{
                                    bgcolor: '#f3f4f6',
                                    color: '#00000',
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    ...textConfigs.style.basicFont
                                }} />
                                <Stack direction='row' sx={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ImageComponent src='https://www.worthepenny.com/wep/images/store/verified.svg' width='16px' height='16px' />
                                    <Typography sx={{
                                        fontSize: '14px',
                                        color: '#333',
                                        marginLeft: '4px',
                                        ...textConfigs.style.basicFont
                                    }}>Verified</Typography>
                                </Stack>
                                <Stack direction='row' sx={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ImageComponent src='https://www.worthepenny.com/wep/images/store/off_info_icon_pc/icon-staffpick@2x.png' width='17px' height='17px' />
                                    <Typography sx={{
                                        fontSize: '14px',
                                        color: '#333',
                                        marginLeft: '4px',
                                        ...textConfigs.style.basicFont
                                    }}>Staff Pick</Typography>
                                </Stack>
                            </Stack>
                            <Typography sx={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: '#333333',
                                ...textConfigs.style.basicFont,
                                mb: '8px'
                            }}>{voucher.content}
                            </Typography>
                            <Typography sx={{
                                fontSize: '14px',
                                color: '#999',
                                ...textConfigs.style.basicFont,
                            }}>{voucher.amount} People Used</Typography>
                        </Box>
                        <Button sx={{
                            height: 'fit-content',
                            mr: '25px',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontSize: '15px',
                            fontWeight: '700',
                            color: '#fff',
                            bgcolor: '#1C2759',
                            "&:hover": {
                                bgcolor: '#1C2759'
                            }, ...textConfigs.style.basicFont
                        }}>
                            Get Deal
                        </Button>
                    </Stack>
                ))}
                <Pagination
                    count={Math.ceil(vouchers.length / vouchersPerPage)}
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
        </UserSidebar>)
}

export default Points