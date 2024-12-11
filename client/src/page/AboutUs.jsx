import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import textConfigs from '../config/text.config'
import ImageComponent from '../components/commons/ImageComponent'

const AboutUs = () => {
    return (
        <Box p={{ xs: '56px 0 16px 0', md: '150px 0 16px 0' }} bgcolor='#0000' minHeight='inherit'>
            <Box sx={{
                bgcolor: '#476C9A',
                height: 'auto'
            }}>
                <Box sx={{
                    paddingTop: { xs: '0', sm: '48px' },
                    paddingX: { xs: '0', sm: '375.5px' },
                    position: 'relative',
                }}>
                    <img src="https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/our-company/_jcr_content/root/container/hero/image.coreimg.85.1600.jpeg/1724774377094/about-us.jpeg" alt="" style={{ width: '100%' }} />
                    <Box sx={{
                        position: { xs: 'none', sm: 'absolute' },
                        bottom: 0,
                        left: { xs: '0', sm: '375.5px' },
                        color: '#fff',
                        textAlign: 'left',
                        bgcolor: '#476C9A',
                        padding: { xs: '24px 32px', sm: '3rem 6rem 3rem 0' },
                        "::before": {
                            bottom: '-35px',
                            content: '""',
                            height: '2.1875rem',
                            position: 'absolute',
                            right: 0,
                            transform: 'translateY(100 %)',
                            width: '100vw',
                            backgroundColor: '#476C9A',
                            display: 'none', // Ẩn mặc định
                            "@media (min-width: 600px)": { // Hiển thị khi màn hình >= 600px (sm)
                                display: 'block',
                            },
                        },
                    }}>
                        <Typography sx={{
                            fontSize: { xs: '36px', sm: '60px' },
                            marginBottom: '24px',
                            color: '#fff',
                            ...textConfigs.style.basicFont
                        }}>About Us</Typography>
                        <Typography sx={{
                            fontSize: '16px',
                            ...textConfigs.style.basicFont,
                            color: '#fff'
                        }}>Bringing color to the world for more than 150 years

                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{
                padding: { xs: '1.5rem 10px 0 10px', sm: '71px 375.5px 0 375.5px ' },
                mb: '1.5rem',
            }}>
                <Box sx={{
                    width: { xs: '100%', sm: '50%' }
                }}>
                    <ImageComponent src='https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/our-company/_jcr_content/root/container/dividedteaser/media.coreimg.85.800.jpeg/1724774377162/employee-painting.jpeg' width='auto' height='auto' />
                </Box>
                <Box sx={{
                    padding: '24px 48px',
                    width: { xs: '100%', sm: '50%' }
                }}>
                    <Typography sx={{
                        ...textConfigs.style.basicFont,
                        fontSize: { xs: '32px', md: '48px' },
                        marginBottom: '24px',
                    }}>
                        A Global Leader in Paints and Coatings
                    </Typography>
                    <Typography sx={{
                        ...textConfigs.style.basicFont,
                        fontSize: '16px',
                        marginBottom: '24px',
                    }}>
                        The Kolux Company delivers the best in paint and coatings products to the world. Every day, our more than 64,000 employees provide the energy and experience to build on our track record of success – enabling us to innovate and grow in new and exciting ways. With our people as the foundation of our Company, we offer industry-leading innovation, value-added service and expertise, and differentiated distribution to our growing base of professional, industrial, commercial and consumer customers.
                    </Typography>
                    <Typography sx={{
                        ...textConfigs.style.basicFont,
                        fontSize: '16px',
                        marginBottom: '24px',
                    }}>
                        Kolux has one of the industry’s most recognized portfolios of branded and private-label products. The Company’s Kolux® branded products are sold exclusively through a chain of more than 5,000 company operated stores and facilities in the United States, Canada, the Caribbean and Latin America.
                    </Typography>
                    <Typography sx={{
                        ...textConfigs.style.basicFont,
                        fontSize: '16px',
                        marginBottom: '24px',
                    }}>
                        Additional brands are sold through leading mass merchandisers, home centers, independent paint dealers, hardware stores, automotive retailers, and industrial distributors across North America and in parts of Europe, China, Australia and New Zealand. We also supply a broad range of highly engineered solutions for the construction, industrial, packaging and transportation markets in more than 120 countries around the world.
                    </Typography>
                </Box>
            </Stack>
            <Box sx={{
                padding: { xs: '0 10px 0 10px', sm: '0 375.5px 0 375.5px ' },
                marginBottom: '3.5rem',
            }}>
                <Divider sx={{
                    width: '100%-375.5px',
                    marginY: '3rem',
                    bgcolor: 'black',
                }} />
                <Typography sx={{
                    ...textConfigs.style.basicFont,
                    fontSize: '36px',
                    textAlign: 'start',
                    marginBottom: '24px',
                }}>
                    Our world-class portfolio of brands
                </Typography>
                <Grid container spacing={3} gridTemplateColumns='4,1fr'>
                    <Grid item xs={6} sm={3} >
                        <ImageComponent src='https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/our-company/_jcr_content/root/container/componentgrid/parsys/image_482285121.coreimg.85.320.png/1724774377978/cabot-logo.png' />
                    </Grid>
                    <Grid item xs={6} sm={3} >
                        <ImageComponent src='https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/our-company/_jcr_content/root/container/componentgrid/parsys/image_482285121.coreimg.85.320.png/1724774377978/cabot-logo.png' />
                    </Grid>
                    <Grid item xs={6} sm={3} >
                        <ImageComponent src='https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/our-company/_jcr_content/root/container/componentgrid/parsys/image_482285121.coreimg.85.320.png/1724774377978/cabot-logo.png' />
                    </Grid>
                    <Grid item xs={6} sm={3} >
                        <ImageComponent src='https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/our-company/_jcr_content/root/container/componentgrid/parsys/image_482285121.coreimg.85.320.png/1724774377978/cabot-logo.png' />
                    </Grid>
                    <Grid item xs={6} sm={3} >
                        <ImageComponent src='https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/our-company/_jcr_content/root/container/componentgrid/parsys/image_482285121.coreimg.85.320.png/1724774377978/cabot-logo.png' />
                    </Grid>
                    <Grid item xs={6} sm={3} >
                        <ImageComponent src='https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/our-company/_jcr_content/root/container/componentgrid/parsys/image_482285121.coreimg.85.320.png/1724774377978/cabot-logo.png' />
                    </Grid>
                    <Grid item xs={6} sm={3} >
                        <ImageComponent src='https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/our-company/_jcr_content/root/container/componentgrid/parsys/image_482285121.coreimg.85.320.png/1724774377978/cabot-logo.png' />
                    </Grid>
                    <Grid item xs={6} sm={3} >
                        <ImageComponent src='https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/our-company/_jcr_content/root/container/componentgrid/parsys/image_482285121.coreimg.85.320.png/1724774377978/cabot-logo.png' />
                    </Grid>


                </Grid>
            </Box>

            <Stack direction={{ xs: 'column-reverse', sm: 'row' }} sx={{
                padding: { xs: '50px 10px 50px 10px', sm: '50px 375.5px 50px 375.5px ' },
                bgcolor: '#EEEFEA',
            }}>
                <Box sx={{
                    width: { xs: '100%', sm: '50%' },
                    padding: '24px 48px',
                    bgcolor: '#3090AA'
                }}>
                    <Typography sx={{
                        ...textConfigs.style.basicFont,
                        fontSize: { xs: '32px', md: '41px' },
                        marginBottom: '49px',
                        color: '#fff',
                        pt: '80px'
                    }}>
                        Create Your Possible™
                    </Typography>
                    <Typography sx={{
                        ...textConfigs.style.basicFont,
                        fontSize: '16px',
                        marginBottom: '25px',
                        color: '#fff'
                    }}>
                        At Kolux, we support you in life + career + connection. Plus, we're always looking for great talent to join our growing global team. Visit our Kolux Careers website to learn more and explore available opportunities.
                    </Typography>
                    <a href='11' style={{ ...textConfigs.style.basicFont, color: '#fff', textDecoration: 'underline', marginBottom: '20px' }}>View Careers</a>
                </Box>
                <Box sx={{
                    width: { xs: '100%', sm: '50%' }
                }}>
                    <ImageComponent src='https://corporate.sherwin-williams.com/content/sherwin/corp/corp-aem-sherwin/us/en/our-company/_jcr_content/root/container/container/dividedteaser/media.coreimg.85.800.jpeg/1724774378037/woman-smiling-at-desk.jpeg' width='auto' height='auto' />
                </Box>
            </Stack>

        </Box>
    )
}

export default AboutUs