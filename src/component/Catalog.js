import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import './Catalog.css';
// import { Button, IconButton, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
// import { PlayArrow, Pause, ChevronLeft, ChevronRight } from '@mui/material';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';


// style theme 

const useStyles = styled((theme) => ({
    container: {
        marginTop: theme.spacing(5),
    },
    image: {
        maxWidth: '100px',
        maxHeight: '400px',
        marginBottom: theme.spacing(2),
    },
    thumbnailContainer: {
        marginTop: theme.spacing(2),
    },
    thumbnail: {
        width: '50px',
        height: '50px',
        marginRight: theme.spacing(1),
        filter: 'grayscale(100%)',
    },
    selectedThumbnail: {
        filter: 'none',
    },
    details: {
        marginLeft: theme.spacing(2),
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2),
    },
    iconButton: {
        marginLeft: theme.spacing(1),
        alignItems: "center",
        marginBottom: "2rem",
    },
}));

// array of images and their details  
const images = [
    {
        id: 1,
        src: './images/image1.jpg',
        detailsHeading: 'This mount',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis libero a risus euismod, id tempus libero pretium. Donec eu metus felis. Morbi luctus nunc non urna dignissim consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget ullamcorper lectus. Donec quis magna congue, mattis metus sit amet, blandit ipsum. Morbi ultrices, est quis dignissim eleifend, odio lacus molestie dolor, a accumsan nulla felis quis orci. Nam in bibendum mauris. Proin aliquet nulla id enim dictum semper. In lacinia arcu bibendum nulla mollis, et faucibus diam pretium.',
    },
    {
        id: 2,
        src: './images/image2.jpg',
        detailsHeading: 'This Sky',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis libero a risus euismod, id tempus libero pretium. Donec eu metus felis. Morbi luctus nunc non urna dignissim consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget ullamcorper lectus. Donec quis magna congue, mattis metus sit amet, blandit ipsum. Morbi ultrices, est quis dignissim eleifend, odio lacus molestie dolor, a accumsan nulla felis quis orci. Nam in bibendum mauris. Proin aliquet nulla id enim dictum semper. In lacinia arcu bibendum nulla mollis, et faucibus diam pretium.',
    },
    {
        id: 3,
        src: './images/image3.jpg',
        detailsHeading: 'This Snow',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis libero a risus euismod, id tempus libero pretium. Donec eu metus felis. Morbi luctus nunc non urna dignissim consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget ullamcorper lectus. Donec quis magna congue, mattis metus sit amet, blandit ipsum. Morbi ultrices, est quis dignissim eleifend, odio lacus molestie dolor, a accumsan nulla felis quis orci. Nam in bibendum mauris. Proin aliquet nulla id enim dictum semper. In lacinia arcu bibendum nulla mollis, et faucibus diam pretium.',
    },
    {
        id: 4,
        src: './images/image4.jpg',
        detailsHeading: 'This Green',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis libero a risus euismod, id tempus libero pretium. Donec eu metus felis. Morbi luctus nunc non urna dignissim consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget ullamcorper lectus. Donec quis magna congue, mattis metus sit amet, blandit ipsum. Morbi ultrices, est quis dignissim eleifend, odio lacus molestie dolor, a accumsan nulla felis quis orci. Nam in bibendum mauris. Proin aliquet nulla id enim dictum semper. In lacinia arcu bibendum nulla mollis, et faucibus diam pretium.',
    },
    // {
    //     id: 5,
    //     src: './images/image5.jpg',
    //     details: 'Image 5 details',
    // },
    // Add more images as needed
];

// catalog function 

const CatalogViewer = () => {
    const classes = useStyles();
    const [currentImage, setCurrentImage] = useState(null);
    const [slideshowActive, setSlideshowActive] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        // Initialize the current image with the first image
        setCurrentImage(images[0]);
    }, []);

    useEffect(() => {
        if (slideshowActive) {
            const id = window.setInterval(() => {
                handleNext();
            }, 3000);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
            setIntervalId(null);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [slideshowActive]);

    const handleNext = () => {
        if (currentImage) {
            const currentIndex = images.findIndex((image) => image.id === currentImage.id);
            const nextIndex = (currentIndex + 1) % images.length;
            setCurrentImage(images[nextIndex]);
        }
    };

    const handlePrevious = () => {
        if (currentImage) {
            const currentIndex = images.findIndex((image) => image.id === currentImage.id);
            const previousIndex = (currentIndex - 1 + images.length) % images.length;
            setCurrentImage(images[previousIndex]);
        }
    };

    const handleThumbnailClick = (image) => {
        setCurrentImage(image);
        setSlideshowActive(false);
    };

    const handleToggleSlideshow = () => {
        setSlideshowActive(!slideshowActive);
    };

    return (
        <div>
            {currentImage && (
                <Grid container className={classes.container} style={{ marginTop: "2rem" }}>
                    <Grid item xs={12} sm={6} >
                        <img src={currentImage.src} alt="Catalog" className={classes.image} width={700} height={500} style={{ borderRadius: "20px" }} />
                        {/* <div className={classes.controls} style={{marginTop:"1rem"}}> */}

                        {/* </div> */}
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.details} width={100}>
                        <Typography variant="h4" className='heading' >{currentImage.detailsHeading}</Typography>
                        <Typography variant="body1" className='para' >{currentImage.details}</Typography>


                    </Grid>


                </Grid>
            )}
            <Box>
                <div style={{ direction: "flex", display: "flex", paddingLeft: "1rem" }}>
                    <div style={{ paddingTop: "3rem" }}>
                        <span>
                            <IconButton onClick={handlePrevious} className={classes.iconButton} style={{ color: "white", backgroundColor: "aqua" }}>
                                <ChevronLeft />
                            </IconButton>

                        </span>

                    </div>
                    <div style={{ paddingLeft: "1rem" }}>
                        <div className={classes.thumbnailContainer} style={{ marginTop: "1rem", alignItems: "center" }}>


                            {images.map((image) => (
                                <img
                                    key={image.id}
                                    src={image.src}
                                    width={200}
                                    height={100}
                                    style={{ borderRadius: "15px", marginLeft: "0.5rem" }}
                                    alt={`Thumbnail ${image.id}`}
                                    className={`${classes.thumbnail} ${currentImage && image.id === currentImage.id ? classes.selectedThumbnail : ''
                                        }`}
                                    onClick={() => handleThumbnailClick(image)}
                                />
                            ))}


                        </div>

                    </div>
                    <div style={{ paddingTop: "3rem", paddingLeft: "1rem", }}>
                        <span>
                            <IconButton onClick={handleNext} className={classes.iconButton} style={{ color: "white", backgroundColor: "aqua" }} >
                                <ChevronRight />
                            </IconButton>
                        </span>
                    </div>
                    <div style={{ alignItems: "center", marginTop: "3rem", marginLeft: "10rem" }}>
                        <IconButton onClick={handleToggleSlideshow} style={{ width: "50px", height: "50px", color: "white", backgroundColor: "aqua", }}>
                            {slideshowActive ? <Pause /> : <PlayArrow />}
                        </IconButton>
                    </div>
                </div>

            </Box>




        </div>
    );
};

export default CatalogViewer;
