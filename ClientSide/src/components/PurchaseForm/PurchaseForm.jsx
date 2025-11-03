
import * as React from 'react';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addPurchase } from '../../redux/purchaseSlice.js'

const Card = styled(MuiCard)(({ theme }) => ({
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  width: '100%',
  '&:hover': {
    background:
      'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
    borderColor: 'primary.light',
    boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
    ...theme.applyStyles('dark', {
      background:
        'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
      borderColor: 'primary.dark',
      boxShadow: '0px 1px 8px hsla(210, 31.40%, 66.30%, 0.50) ',
    }),
  },
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        borderColor: (theme.vars || theme).palette.primary.light,
        ...theme.applyStyles('dark', {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));
const PaymentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '40%',
  justifyContent: 'space-between',
  width: '100%',
  height: 375,
  padding: theme.spacing(3),
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  border: '1px solid ',
  borderColor: (theme.vars || theme).palette.divider,
  background:
    'white',
  boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
  [theme.breakpoints.up('xs')]: {
    height: 300,
  },
  [theme.breakpoints.up('sm')]: {
    height: 350,
  },
  ...theme.applyStyles('dark', {
    background:
      'linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)',
    boxShadow: '0px 4px 8px hsl(220, 35%, 0%)',
  }),
}));

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PaymentForm({packId}) {


  const userId = useSelector((state) => state.User.currentUser.id)
  // const location = useLocation();

  const purchase = useState({ id: 0, date: new Date(), usersID: userId, packagesID: packId})

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if (!userId)
      navigate('/')
  }, []);

  function addpurchase(purchase) {


    if (!cardNumber || !cvv || !expirationDate) {
      alert("Please fill all the fields");
      return;
    }
    dispatch(addPurchase(purchase[0]))
    alert("The purchase successfully completed")
    navigate(-2)
  }

  const [paymentType, setPaymentType] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }

  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
      <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
        {paymentType === 'creditCard' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <PaymentContainer>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2">Credit card</Typography>
                <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
              </Box>
              <SimCardRoundedIcon
                sx={{
                  fontSize: { xs: 48, sm: 56 },
                  transform: 'rotate(90deg)',
                  color: 'text.secondary',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: 2,
                }}
              >
                <FormGrid sx={{ flexGrow: 1, maxWidth: '80%' }}>
                  <FormLabel htmlFor="card-number" required>
                    Card number
                  </FormLabel>
                  <OutlinedInput
                    id="card-number"
                    autoComplete="card-number"
                    placeholder="0000 0000 0000 0000"
                    required
                    size="small"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </FormGrid>
                <FormGrid sx={{ maxWidth: '20%' }}>
                  <FormLabel htmlFor="cvv" required>
                    CVV
                  </FormLabel>
                  <OutlinedInput
                    id="cvv"
                    autoComplete="CVV"
                    placeholder="123"
                    required
                    size="small"
                    value={cvv}
                    onChange={handleCvvChange}
                  />
                </FormGrid>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormGrid sx={{ flexGrow: 1 }}>
                  <FormLabel htmlFor="card-name" required>
                    Name
                  </FormLabel>
                  <OutlinedInput
                    id="card-name"
                    autoComplete="card-name"
                    placeholder="John Smith"
                    required
                    size="small"
                  />
                </FormGrid>
                <FormGrid sx={{ flexGrow: 1 }}>
                  <FormLabel htmlFor="card-expiration" required>
                    Expiration date
                  </FormLabel>
                  <OutlinedInput
                    id="card-expiration"
                    autoComplete="card-expiration"
                    placeholder="MM/YY"
                    required
                    size="small"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                  />
                </FormGrid>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormGrid sx={{ flexGrow: 1 }}>
                  <Button
                    placeholder="Submit Payment"
                    color=''
                    type="submit"
                    variant="contained"
                    id="submit"
                    sx={{ width: '100%', height: 40 }}
                    onClick={() => addpurchase(purchase)}
                  >Submit Payment</Button>
                </FormGrid>
              </Box>
            </PaymentContainer>
            <FormControlLabel
              control={<Checkbox name="saveCard" />}
              label="Remember credit card details for next time"
            />
          </Box>
        )}
      </Stack></div>
  )
}
