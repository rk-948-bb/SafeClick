
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from './components/SharedThem';
import ColorModeSelect from './components/SharedThem';
import { SitemarkIcon } from './components/CustomIcons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../redux/userSlice.js'
import { useDispatch } from 'react-redux';
import { Paper } from '@mui/material';
import image from '../../images/LOGO1.png'

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(30, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    }
    // '&::before': {
    //     content: '""',
    //     display: 'block',
    //     position: 'absolute',
    //     zIndex: -1,
    //     inset: 0,
    //     backgroundImage:
    //         'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    //     backgroundRepeat: 'no-repeat',
    //     ...theme.applyStyles('dark', {
    //         backgroundImage:
    //             'radial-gradient(at 50% 50%, hsla(329, 22.80%, 24.90%, 0.50), hsl(220, 30%, 5%))',
    //     }


}));

export default function SignIn(props) {

    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');



    const validateInputs = () => {

        const password = document.getElementById('password')
        const name = document.getElementById('name')

        let isValid = true;



        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        return isValid;
    };
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        if (nameError || passwordError) {
            event.preventDefault();
            return;
        }
        event.preventDefault();

        try {
            const result = await dispatch(login(user)).unwrap();
            navigate('/navbar'); // מעבר לאחר התחברות
        } catch (err) {
            alert(err);
            navigate('/signup', { state: user.name })
            // הצגת שגיאה למשתמש
        }

    };
    const navigate = useNavigate()
    const [user, setUser] = useState({ name: '', password: '' })
    function changeUser(event) {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    return (
        <div style={{display:'flex'}}>   
          <div style={{flex:'50%'}}> 
                <div style={{justifySelf:'center',}}>
                <div><img style={{width:"100px",height:"70px", marginTop:'12vw'}} src={image}></img></div>
                <h1 style={{color:"#13214E" ,fontSize:'2.7vw'}}>Welcome To<br></br> SafeClick</h1>
                <p style={{color:"#13214E" ,fontSize:'1vw'}}><strong>Secure computers-right in your community.</strong><br></br>
                Comfortable,accessibile,and filtered computer stations<br></br>
                for private or group use.<br></br>
                Come To brwose,print,study,or work - in a clean,safe,<br></br>
                and Kosher digital space.
                <div style={{color:"#1D7D93"}}>Access to technology.Commitment to values.</div></p>
            </div></div>    
            <div style={{flex:'50%', backgroundColor:'#E9F2F4'}}>
                <AppTheme {...props}>
                    <CssBaseline enableColorScheme />
                    <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                    <SignUpContainer direction="column" justifyContent="space-between"   >
                        <Card variant="outlined">
                            {/* <SitemarkIcon /> */}
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)',textAlign:'center',color:'#13214E' }}
                            >
                                Sign In
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <FormControl>
                                    <FormLabel htmlFor="name">Username</FormLabel>
                                    <TextField
                                        autoComplete="name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        placeholder="your full name"
                                        error={nameError}
                                        helperText={nameErrorMessage}
                                        color={nameError ? 'error' : 'primary'}
                                        onChange={() => changeUser(event)}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        placeholder="••••••"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        variant="outlined"
                                        error={passwordError}
                                        helperText={passwordErrorMessage}
                                        color={passwordError ? 'error' : 'primary'}
                                        onChange={() => changeUser(event)}

                                    />
                                </FormControl>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={validateInputs}
                                >
                                    Sign In
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography sx={{ textAlign: 'center' }}>
                                    You have no an account?{' '}
                                    <Link onClick={() => navigate('/signup', { state: user.name })}
                                        variant="body2"
                                        sx={{ alignSelf: 'center' }}
                                    >
                                        Sign Up
                                    </Link>
                                </Typography>
                            </Box>
                        </Card>
                    </SignUpContainer>
                </AppTheme></div>
               
        </div>

    );
}