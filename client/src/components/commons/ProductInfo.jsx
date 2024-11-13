import { Stack, Typography } from '@mui/material'
import React from 'react'
import ImageComponent from './ImageComponent'
import TextConfig from '../../config/text.config'

const ProductInfo = ({ product, padding }) => {
    return (
        <Stack direction='row' flex={4} padding={padding} >
            <div style={{ width: '97.14px', paddingRight: '13.6875px' }}>
                <ImageComponent className='h-auto rounded-md' src={product.cartItemVariant.productDetails.productImage} width='83px' height='104px' />
            </div>
            <Stack direction='column' flex={2} marginRight='14px'sx={{ maxWidth: '355px', overflow: 'hidden' }}>
                <Typography marginBottom='7px' variant='h3' fontWeight='bold' fontSize='14px' sx={{
                    ...TextConfig.style.basicFont, whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>{product.cartItemVariant.productDetails.productName}</Typography>
                <Typography marginBottom='9.1px' variant='h4' fontSize='13px' sx={{ ...TextConfig.style.basicFont }}>Inventory : <span style={{ marginLeft: '18px' }}>{product.cartItemVariant.variantInventory}</span></Typography>
                <Typography marginBottom='9.1px' variant='h4' fontSize='13px' sx={{ ...TextConfig.style.basicFont }}>Product #: <span style={{ marginLeft: '20px' }}> {product.cartItemVariant.productDetails.code}</span></Typography>
                { product.cartItemVariant.categoryName==="Paint"&&<Typography marginBottom='9.1px' variant='h4' fontSize='13px' sx={{ ...TextConfig.style.basicFont }}>Color Code : <span style={{ marginLeft: '8px' }}>{product.cartItemVariant.productDetails.paintDetails.hex}</span></Typography>}
                <Typography marginBottom='5.2px' variant='h4' fontSize='13px' sx={{ ...TextConfig.style.basicFont }}>Package Type: <span style={{ marginLeft: '26px' }}>{product.cartItemVariant.packageType} </span></Typography>
                <Typography marginBottom='5.2px' variant='h4' fontSize='13px' sx={{ ...TextConfig.style.basicFont }}>Size Name:<span style={{ marginLeft: '47px' }}>{product.cartItemVariant.variantDescription}</span></Typography>
                <Typography marginBottom='5.2px' variant='h4' fontSize='13px' sx={{ ...TextConfig.style.basicFont }}>Category:<span style={{ marginLeft: '57px' }}>{product.cartItemVariant.categoryName}</span></Typography>
            </Stack>
        </Stack>)
}

export default ProductInfo
