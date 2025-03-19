import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Slider from "react-slick";

const items = [
    { id: 1, image: '/foto5.jpg' },
    { id: 2, image: '/foto4.jpg' },
    { id: 3, image: '/foto2.jpg' },
    { id: 4, image: '/foto1.jpg' },
];

const Fade = () => {
    const settings = {
        infinite: true,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div>
            <Box sx={{
                width: '100%',
                height: isSmallScreen ? '100px' : isMediumScreen ? '300px' : '350px',
                overflow: 'hidden'
            }}>
                <Slider {...settings}>
                    {items.map((item) => (
                        <Box key={item.id}>
                            <img src={item.image} style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                height: 'auto',
                            }} />
                        </Box>
                    ))}
                </Slider>
                <Typography
                    variant={isSmallScreen ? 'h6' : isMediumScreen ? 'h3' : 'h2'}
                    sx={{
                        alignContent: 'center',
                        position: 'absolute',
                        top: isSmallScreen ? '30%' : isMediumScreen ? '45%' : '45%',
                        left: '34%',
                        transform: isSmallScreen ? 'translate(-44%, -150%)' : isMediumScreen ? 'translate(-45%, -150%)' : 'translate(-45%, -50%)',
                        color: 'green',
                        userSelect: 'none',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                    }}
                >
                    La Mejor Calidad todos los Días
                </Typography>
            </Box>
            <Divider sx={{ borderColor: 'none', borderStyle: 'none', paddingTop: "10px" }} />
        </div>
    );
}

export default Fade;
