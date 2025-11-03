import Button from '@mui/joy/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { userSignout } from '../../redux/userSlice';
import { addPurchaseImpl } from '../../redux/purchaseSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import image from '../../images/signout.png';
import logo from '../../images/LOGO1.png';
import { useEffect } from 'react';

const SignOut = () => {
    const location = useLocation()
    const userId = useSelector(state => state.User.currentUser.id)
    const productId = useSelector(state => state.Product.useProductId)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //   useEffect(() => {
    //     if (!productId)
    //       navigate('/')
    //   }, []);

    function signout() {
        if (!location.state==null) {
            dispatch(addPurchaseImpl({
                userId: userId,
                date: new Date(),
                useMinute: location.state.using.minute,
                usePrint: location.state.using.print,
                productId: productId
            }))
            dispatch(userSignout())
            navigate('/')
        }
        else{
            alert('you dont getStarted')
            navigate('/navbar')
        }

    }

    return (
        <div>
            <img src={logo}
                alt='logo'
                style={{ width: '5%', marginLeft: 10, marginTop: '20px' }}
            ></img>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    marginTop: '10%',

                }}
            >
                <img
                    src={image}
                    alt="Sign out"
                    style={{ width: '500px', marginRight: '17%' }}
                />
            </div>
            <Button
                sx={{
                    justifyContent: 'center',
                    marginLeft: 12,
                    fontSize: '1.5rem',
                    padding: '16px 40px',
                    height: '60px',
                    minWidth: '220px'
                }}
                style={{ backgroundColor: "#13214E", color: "#fff" }}
                onClick={signout}
            >
                You sure sign out???
            </Button>
        </div>
    )

}
export default SignOut