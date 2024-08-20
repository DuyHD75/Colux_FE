import { Stack, Typography } from '@mui/material'
import React from 'react'
import ImageComponent from './ImageComponent'
import TextConfig from '../../config/text.config'

const ProductInfo = ({ product,padding }) => {
    return (
        <Stack direction='row' flex={3} padding={padding}>
            <div style={{ width: '97.14px',paddingRight:'13.6875px' }}>
                <ImageComponent className='h-auto rounded-md' src={product.img} width='83px' height='104px' />
            </div>
            <Stack direction='column' flex={2} marginRight='14px'>
                <Typography marginBottom='7px' variant='h3' fontWeight='bold' fontSize='14px' sx={{ ...TextConfig.style.basicFont }}>{product.name}</Typography>
                <Typography marginBottom='9.1px' variant='h4' fontSize='13px' sx={{ ...TextConfig.style.basicFont }}>Sales #: {product.Sales}</Typography>
                <Typography marginBottom='9.1px' variant='h4' fontSize='13px' sx={{ ...TextConfig.style.basicFont }}>Product #: {product.Product}</Typography>
                <Typography marginBottom='5.2px' variant='h4' fontSize='13px' sx={{ ...TextConfig.style.basicFont }}>Container Size: <span style={{marginLeft:'26px'}}>{product.Container_n} </span></Typography>
                <Typography marginBottom='5.2px' variant='h4' fontSize='13px' sx={{ ...TextConfig.style.basicFont }}>Sheen:<span style={{marginLeft:'79px'}}>{product.Sheen}</span></Typography>
                <Typography marginBottom='5.2px' variant='h4' fontSize='13px' sx={{ ...TextConfig.style.basicFont }}>Base:<span style={{marginLeft:'85px'}}>{product.Base}</span></Typography>

            </Stack>
        </Stack>)
}

export default ProductInfo
