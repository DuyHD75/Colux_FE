import UserSidebar from '../components/commons/UserSidebar'
import { Avatar, Box, Button, Divider, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import textConfigs from '../config/text.config'
import SearchIcon from '@mui/icons-material/Search';
import ImageComponent from '../components/commons/ImageComponent';

const content = [
    {
        title: 'Getting Started',
        description: 'Start off on the right foot! Not the left one!',
        image: 'https://cdn-icons-png.flaticon.com/128/11461/11461801.png',
    },
    {
        title: 'Account Settings',
        description: "You're a special snowflake and so is your account",
        image: 'https://cdn-icons-png.flaticon.com/128/15541/15541738.png',
    },
    {
        title: 'Billing',
        description: 'That feel when you look at your bank account',
        image: 'https://cdn-icons-png.flaticon.com/128/6871/6871577.png',
    },
    {
        title: 'Interface',
        description: 'What does this button do .#???',
        image: 'https://cdn-icons-png.flaticon.com/128/15099/15099775.png',
    },
    {
        title: 'Trust & Safety',
        description: 'Keep things safe & sound for you and your buddies',
        image: 'https://cdn-icons-png.flaticon.com/128/6861/6861976.png',
    },
    {
        title: 'F.A.Q',
        description: 'All you can eat self-serve problem solving',
        image: 'https://cdn-icons-png.flaticon.com/128/8873/8873568.png',
    },
    {
        title: 'Community',
        description: 'Bringing people together from all over the world',
        image: 'https://cdn-icons-png.flaticon.com/128/12886/12886863.png',
    },
    {
        title: 'Server Setup',
        description: 'Almost as exciting as interior decorating',
        image: 'https://cdn-icons-png.flaticon.com/128/657/657695.png',
    },
]


const Helps = () => {
    return (
        <UserSidebar>
            <Box sx={{ width: { xs: '100%', md: '80%' }, height: '100%', bgcolor: 'transparent', padding: '1rem' }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{
                    padding: '2rem',
                    bgcolor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px',
                }}>
                    <Box sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: { xs: '100%', sm: '60%' }
                    }}>
                        <Typography variant='h4' sx={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#333',
                            textAlign: 'center',
                            mb: '1rem',
                            ...textConfigs.style.basicFont
                        }}>Welcome to Colux Support</Typography>
                        <Stack spacing={1} direction='row' justifyContent='flex-start' pt='8.4px'>
                            <TextField placeholder='How can we help you?' variant='outlined' size='small' sx={{
                                width: { xs: '60%', sm: '70%' },
                                marginRight: '3px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '14px', // Thêm borderRadius cho TextField
                                },
                            }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }} />
                            <Button sx={{ ...textConfigs.style.basicFont, bgcolor: '#1C2759', borderRadius: '20px' }} variant='contained'>Try Your Luck</Button>
                        </Stack>
                    </Box>
                    <Box sx={{
                        width: { xs: '100%', sm: '30%' }
                    }}>
                        <ImageComponent src='https://img.freepik.com/free-vector/data-analysis-business-concept-doodle-analysts-office-people-work-together-research-statistics-charts-graphs-diagrams-sales-management-operational-reports-line-art-vector-illustration_107791-9818.jpg?t=st=1726221072~exp=1726224672~hmac=e0dbacae314cae4c619dece124c75c7f0dd4777810a0ffb72b703de3968ab55e&w=1380' width='auto' height='160px' />
                    </Box>
                </Stack>

                <Typography sx={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#333',
                    mt: '2rem',
                    mb: '0.5rem',
                    ...textConfigs.style.basicFont
                }}>Need help? We've got your back</Typography>
                <Typography sx={{
                    fontSize: '16px',
                    color: '#333',
                    mb: '1.5rem',
                    ...textConfigs.style.basicFont
                }}>Perhaps you can find the answers in our collections</Typography>
                <Grid container spacing={2} gridTemplateColumns='4, 1fr'>
                    {content.map((item, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Box
                                sx={{
                                    bgcolor: '#fff',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    height: '100%',
                                }}
                            >
                                {item.image && (
                                    <ImageComponent src={item.image} width='40px' height='40px' />
                                )}
                                <Typography
                                    sx={{
                                        mt: '1rem',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#7296FF',
                                        ...textConfigs.style.basicFont,
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Divider
                                    sx={{
                                        width: '30%',
                                        my: '1rem',
                                    }}
                                />
                                <Typography
                                    sx={{
                                        ...textConfigs.style.basicFont,
                                        color: '#1C2759',
                                        fontSize: '16px',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}

                </Grid>


            </Box>


        </UserSidebar>
    )
}

export default Helps