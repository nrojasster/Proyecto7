import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const items = [
    { id: 1, image: '/src/assets/images/foto5.jpg' },
    { id: 2, image: '/src/assets/images/foto4.jpg' },
    { id: 3, image: '/src/assets/images/foto2.jpg' },
    { id: 4, image: '/src/assets/images/foto1.jpg' },
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

    return (
        <div>
            <Box sx={{
                width: '100%',
                height: '350px',
                overflow: 'hidden'
            }}>
                <Slider {...settings}>
                    {items.map((item) => (
                        <Box key={item.id}>
                            <img src={item.image} style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                            }} />
                        </Box>
                    ))}
                </Slider>
                <Typography
                    variant="h2"
                    sx={{
                        alignContent: 'center',
                        position: 'absolute',
                        top: '45%',
                        left: '34%',
                        transform: 'translate(-45%, -50%)',
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
