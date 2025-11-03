import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import image from '../../images/LOGO1.png';
// import NavBar from './components/NavBar';
import RentalCard from './components/RentalCard';
// import HeaderSection from './components/HeadersSection';
import Filters from './components/Flters';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getProductByCategory } from '../../redux/productSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { WidthFull } from '@mui/icons-material';

export default function Brunches() {

    const [products, setProducts] = useState([])

    const dispatch = useDispatch();
    const { allProducts, productsByCategory } = useSelector((state) => state.Product);
    const user = useSelector((state) => state.User.currentUser);

    useEffect(() => {
        if (!user)
            navigate('/')
        dispatch(getProduct());
    }, []);

    useEffect(() => {
        setProducts(allProducts)
    }, [allProducts]);

    useEffect(() => {
        setProducts(productsByCategory)
    }, [productsByCategory]);

    function filterByCity(catId) {
        dispatch(getProductByCategory(catId))
    }

    return (
       <CssVarsProvider disableTransitionOnChange>
            {/* <CssBaseline /> */}
            {/* <NavBar /> */}
            <Box
                component="main"
                sx={{
                    height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
                    display: 'grid',
                    gridTemplateColumns: { xs: 'auto', md: '60% 40%' },
                    gridTemplateRows: 'auto 1fr auto',
                }}
            >
                <Stack
                    sx={{
                        backgroundColor: 'background.surface',
                        px: { xs: 2, md: 4 },
                        py: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    {/* <HeaderSection /> */}
                </Stack>
                <Box 
                    sx={{
                        gridRow: 'span 3',
                        display: { xs: 'none', md: 'flex' },
                        width: 500, // increased width
                        height: 500, // increased height
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundImage: image ? `url(${image})` : 'none',
                        margin: 'auto',
                    }}
                />
                <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>

                    <Filters filterByCity={filterByCity} />
                    <Stack spacing={2} sx={{ overflow: 'auto' }}>
                        {products && products.map(prod =>
                            <RentalCard
                                title={prod.id}
                                category={prod.model}
                                city={prod.category.name}
                                image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
                            />
                        )}
                        {products.length == 0 && <p>No Result </p>}
                    </Stack>

                </Stack>
            </Box>
     </CssVarsProvider>
    );
}