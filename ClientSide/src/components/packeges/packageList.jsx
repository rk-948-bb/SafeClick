
import CardOverflow from '@mui/joy/CardOverflow';
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { choosePackage, getPackages } from '../../redux/packageSlice';
import { useEffect } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Purchase from '../PurchaseForm/PurchaseForm'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CardActions from '@mui/joy/CardActions';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
// import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  opacity: 0.5
};

const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .min(16, 'card number must be 16 numeric')
    .max(16, 'card number must be 16 numeric')
    .matches(/^[0-9]/, 'card number must contain a numeric values')
    .required('cardNumber is required'),
  cvc: Yup.string()
    .min(3, 'cvc must be 3 numeric')
    .max(3, 'cvc must be 3 numeric')
    .required('cvc is required'),
  expiryDate: Yup.string()
    .required('Expiry date is required'),
  id: Yup.string()
    .required('Identity is required')
    .matches(/^\d{9}$/, 'Invalid identity')
});

export default function Packages() {
  const [selectedPackId, setSelectedPackId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (packId) => {
    setSelectedPackId(packId);
    setOpen(true)
  };
  const handleClose = () =>{ 
    setSelectedPackId(null);
    setOpen(false)};
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const packages = useSelector((state) => state.Package.packages);
  const user = useSelector(state => state.User.currentUser)
  useEffect(() => {
    if (!user)
      navigate('/')
    dispatch(getPackages());
  }, []);

  // function purchase(packid) {
  //   navigate('../purchase', { state: { packId: packid } });
  // }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    // opacity: 0.5

  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: '20px', flexWrap: 'wrap', position: 'relative' }}>
      {packages && packages.map(pack =>

        <Card 
        key={pack.id} variant="outlined" sx={{
          width: 320, m: '20px', boxShadow:
            'hsla(240, 1.20%, 32.20%, 0.50) 0px 5px 15px 0px, hsla(218, 6.70%, 76.50%, 0.08) 0px 15px 35px -5px',
        }}>
          <CardOverflow>
            <AspectRatio ratio="2">
              <img src={`data:image/jpeg;base64,${pack.image}`} alt="Uploaded" />
            </AspectRatio>
          </CardOverflow>
          <CardContent style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>
            <div >
              <Typography level="title-md">{pack.title}</Typography>
              <Typography level="body-sm">{pack.description}</Typography>
            </div>
            <Button onClick={() => handleOpen(pack.id)}>
              <ShoppingCartOutlinedIcon />
            </Button>
            <Modal sx={{ style }}
              open={open && selectedPackId === pack.id}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >      
            <CardContent >
              <Typography level="title-md">{pack.title}</Typography>     
                <Purchase packId={pack.id} /></CardContent>          
            </Modal>
          </CardContent>
          <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
            <Divider inset="context" />
            <CardContent orientation="horizontal">
              <Typography
                level="body-xs"
                textColor="text.secondary"
                sx={{ fontWeight: 'md' }}
              >
                Prints
              </Typography>
              <Divider orientation="vertical" />
              <Typography
                level="body-xs"
                textColor="text.secondary"
                sx={{ fontWeight: 'md' }}
              >
                {pack.print}
              </Typography>
            </CardContent>
          </CardOverflow>
          <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
            <Divider inset="context" />
            <CardContent orientation="horizontal">
              <Typography
                level="body-xs"
                textColor="text.secondary"
                sx={{ fontWeight: 'md' }}
              >
                Minutes
              </Typography>
              <Divider orientation="vertical" />
              <Typography
                level="body-xs"
                textColor="text.secondary"
                sx={{ fontWeight: 'md' }}
              >
                {pack.minute}
              </Typography>
            </CardContent>
          </CardOverflow>
          <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
            <Divider inset="context" />
            <CardContent orientation="horizontal">
              <Typography
                level="body-xs"
                textColor="text.secondary"
                sx={{ fontWeight: 'md' }}
              >
                Price
              </Typography>
              <Divider orientation="vertical" />
              <Typography
                level="body-xs"
                textColor="text.secondary"
                sx={{ fontWeight: 'md' }}
              >
                {pack.price}
              </Typography>
            </CardContent>
          </CardOverflow>
        </Card>
      )}
    </div>
  );
}
