import * as React from 'react';
import { useTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ColorInversionMarketing() {
    const [color, setColor] = useState('primary');
    const [solid, setSolid] = useState(true);
    const theme = useTheme();

    const shade = (x) => theme.vars.palette[color][x];
    const color1 = solid ? shade(800) : shade(600);
    const color2 = solid ? shade(600) : shade(200);
    const color3 = shade(900);
    const gradient1 = `${color1}, ${color2} 65%`;
    const gradient2 = `${color1} 65%, ${color3}`;
    const textColor = { color: solid ? shade(50) : shade(700) };

    const buttonStyles = {
        borderRadius: 99,
        '&:hover': {
            '& .MuiButton-endDecorator': { transform: 'translate(4px, 0px)' },
        },
        '& span': { transition: '0.15s' },
    };
    const user = useSelector(state => state.User.currentUser)

    let balance = { print: 0, minute: 0 }
    if (user.purchase.length > 0)
        balance = { print: user.purchase[(user.purchase.length) - 1].print, minute: user.purchase[(user.purchase.length) - 1].minute }


    const navigate = useNavigate()

    function getStarted() {
        if(balance.minute===0){alert('you have no minute to use!!'); return;}
        alert("minimyze the browser and use, to see the balance/sign out up again the browser!")
        navigate('using', { state: { balance: balance } })
    }
    return (
        <Sheet
            variant={solid ? 'solid' : 'soft'}
            color={color}
            invertedColors
            sx={[
                {
                    flexGrow: 1,
                    position: 'relative',
                    display: 'flex',
                    p: '6rem 3rem',
                    borderRadius: 'md',
                    overflow: 'clip',
                    '&::after': {
                        content: `""`,
                        display: 'block',
                        width: '20rem',
                        height: '40rem',
                        background: `linear-gradient(to top, ${gradient1}, ${gradient2})`,
                        position: 'absolute',
                        transform: 'rotate(-45deg)',
                        top: { xs: '-80%', sm: '-95%', md: '-65%', lg: '-70%' },
                        right: { xs: '-70%', sm: '-15%' },
                    },
                },
                solid ? { bgcolor: shade(800) } : { bgcolor: shade(100) },
            ]}
        >
            <div>
                <Typography level="h1" component="h2" sx={textColor}>
                    Get started
                </Typography>
                <Typography sx={{ mt: 1, mb: 2, ...textColor }}>
                    Hello {user.name},You have {balance.minute} minutes and {balance.print} prints left for computer use.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Button
                        endDecorator={<ArrowForwardIcon fontSize="md" />}
                        sx={[
                            { ...buttonStyles },
                            solid
                                ? { '&:active': { bgcolor: shade(200) } }
                                : { '&:active': { bgcolor: shade(700) } },
                        ]}
                        onClick={() => getStarted(balance)}
                    >
                        Start
                    </Button>
                    <Button
                        variant="plain"
                        endDecorator={<ArrowForwardIcon fontSize="md" />}
                        sx={{ ...textColor, ...buttonStyles }}
                        onClick={() => navigate('packageList')}
                    >
                        To add a new package
                    </Button>
                </Box>
            </div>
            <Sheet
                sx={{
                    zIndex: 1,
                    position: 'absolute',
                    bottom: '1.5rem',
                    right: '1.5rem',
                    bgcolor: 'transparent',
                    display: 'flex',
                    gap: 2,
                    '& button': { borderRadius: '50%' },
                }}
            >
                <IconButton variant="solid" onClick={() => setSolid((state) => !state)}>
                    <InvertColorsIcon fontSize="xl" />
                </IconButton>
                <IconButton
                    variant="soft"
                    onClick={() => {
                        const colors = ['primary', 'neutral', 'danger', 'success', 'warning'];

                        const nextColorIndex = colors.indexOf(color) + 1;
                        setColor(colors[nextColorIndex] ?? colors[0]);
                    }}
                >
                    <ColorLensRoundedIcon fontSize="xl" />
                </IconButton>
            </Sheet>
        </Sheet>
    );
}
