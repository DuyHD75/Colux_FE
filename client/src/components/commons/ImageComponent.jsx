import React, { useEffect, useState } from 'react';

import { Skeleton } from '@mui/material';

const ImageComponent = ({ src, width, height, className }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImageLoaded(true);
        };
    }, [src]);

    return (
        <>
            {
                !imageLoaded ? (
                    <Skeleton
                        sx={{ bgcolor: 'grey.900' }}
                        variant="rectangular"
                        width={width}
                        height={height}
                    />
                ) : (
                    <img
                        src={src}
                        alt=''
                        className={className}
                    />
                )
            }
        </>
    );
};

export default ImageComponent;
