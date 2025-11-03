import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signup } from '../../redux/userSlice.js'
import { useDispatch } from 'react-redux';



// ...existing code...

// Styled Components (grouped at the bottom for clarity)
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  maxWidth: 250,
  padding: `${theme.spacing(1.5)} ${theme.spacing(0.5)} ${theme.spacing(0.5)}`,
  gap: theme.spacing(0.7),
  margin: 'auto',
  boxShadow:
    'hsla(30, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: 210,
    padding: `${theme.spacing(1)} ${theme.spacing(0.2)} ${theme.spacing(0.2)}`,
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: 270,
    padding: `${theme.spacing(2)} ${theme.spacing(0.8)} ${theme.spacing(0.8)}`,
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: 320,
    padding: `${theme.spacing(3)} ${theme.spacing(1.5)} ${theme.spacing(1.5)}`,
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
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [identityError, setIdentityError] = useState(false);
    const [identityErrorMessage, setIdentityErrorMessage] = useState('');


    const validateInputs = () => {
        const email = document.getElementById('email')
        const password = document.getElementById('password')
        const name = document.getElementById('name')
        const identity = document.getElementById('tz')
        const phone = document.getElementById('phone')
        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

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
        if (!phone.value || phone.value.length < 9 || phone.value.length > 10) {
            setPhoneError(true);
            setPhoneErrorMessage('Phone is required in 9/10 numeric.');
            isValid = false;
        } else {
            setPhoneError(false);
            setPhoneErrorMessage('');
        }
        if (!identity.value || identity.value.length != 9) {
            setIdentityError(true);
            setIdentityErrorMessage('Identity is required in 9 numeric.');
            isValid = false;
        } else {
            setIdentityError(false);
            setIdentityErrorMessage('');
        }
        return isValid;
    };
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        if (nameError || emailError || passwordError || phoneError || identityError) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        dispatch(signup(user))

    };
    const navigate = useNavigate()
    const [user, setUser] = useState({ id: 0, name: '', tz: '', email: '', phone: '', password: '' })
    function changeUser(event) {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const location = useLocation();
    const name = location.state
    console.log(name);

    return (
        <AppTheme >
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <SignUpContainer direction="column" justifyContent="space-between" backgroundColor="#E9F2F4">
                <Card variant="outlined">
                    <SitemarkIcon sx={{ width: 80, height: 40, margin: '8px auto 0 auto', display: 'block' }} />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{  color:'#13214E', fontWeight: 'bold', textAlign: 'center' }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >

                        <FormControl>

                            <FormLabel htmlFor="name">Username</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                value={location.state}
                                placeholder='your full name'
                                error={nameError}
                                helperText={nameErrorMessage}
                                color={nameError ? 'error' : 'primary'}
                                onChange={() => changeUser(event)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="name">Identity</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="tz"
                                required
                                fullWidth
                                id="tz"
                                placeholder="your id number"
                                error={identityError}
                                helperText={identityErrorMessage}
                                color={identityError ? 'error' : 'primary'}
                                onChange={() => changeUser(event)}

                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="your@email.com"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                error={emailError}
                                helperText={emailErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                                onChange={() => changeUser(event)}

                            />
                        </FormControl><FormControl>
                            <FormLabel htmlFor="name">Phone</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="phone"
                                required
                                fullWidth
                                id="phone"
                                placeholder="your phone number"
                                error={phoneError}
                                helperText={phoneErrorMessage}
                                color={phoneError ? 'error' : 'primary'}
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
                           sx={{ backgroundColor: '#13214E', color: 'white' }}
                     
                            backgroundColor="#13214E"
                            onClick={validateInputs}
                        >
                            Sign up
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Google')}
                            startIcon={<GoogleIcon />}
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            Sign up with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Facebook')}
                            startIcon={<FacebookIcon />}
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            Sign up with Facebook
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link onClick={() => navigate('/signin')}
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignUpContainer>
        </AppTheme>
    );
}