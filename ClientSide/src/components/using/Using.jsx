import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Using() {
    const [using, setUsing] = useState({ print: 0, minute:0, use: true })
    const location = useLocation()
    const navigate = useNavigate()
    // const currentPurchase=useSelector((state)=>state.Purchase)
    // console.log(currentPurchase);
    
    const balance = location?.state.balance


    useEffect(() => {
        if (!using.use || using.minute >= balance.minute) return;

        const timer = setInterval(() => {
            setUsing(prev => ({
                ...prev,
                minute: prev.minute + 1
            }));
        }, 10000);

        return () => clearInterval(timer);
    }, [using.use, using.minute]);

    function signout() {
        setUsing(prev => ({
            ...prev,
            use: prev.use ? false : true
        }));
        navigate('../signout', { state: { using: using } }) 
    }

    return (
        <Card
            variant="solid"
            color="primary"
            invertedColors
            sx={{ gap: 2, maxWidth: 300, boxShadow: 'md' }}
        >
            <Chip
                size="sm"
                variant="soft"
                sx={{ alignSelf: 'flex-start', borderRadius: 'xl' }}
            >
                New
            </Chip>
            <IconButton
                variant="outlined"
                size="sm"
                sx={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
            >
                <BookmarkOutlinedIcon />
            </IconButton>
            <Typography level="h3">you have {balance.minute - using.minute} minutes, {balance.print - using.print} prints.</Typography>
            <input type='file' />
            <Button variant="solid" onClick={()=>setUsing(prev => ({ ...prev,  print: prev.print + 1 }))} endDecorator={<KeyboardArrowRightIcon />}>
                For Print
            </Button>
            <Button variant="solid" onClick={signout} endDecorator={<KeyboardArrowRightIcon />}>
                To Sign Out
            </Button>
        </Card>
    );
}
