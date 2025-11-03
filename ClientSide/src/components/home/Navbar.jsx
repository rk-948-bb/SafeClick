import React from 'react';
import styled from 'styled-components';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import image from '../../images/LOGO2.png'
import PersonIcon from '@mui/icons-material/Person';
const Nav = styled.nav`
    background-color: #E9F2F4;
    padding: 10px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-shadow: hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px;
`;

const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: flex-end;
`;

const ListItem = styled.li`
    margin-right: 20px;

`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
// const LeftItems = styled.div`
//     display: flex;
// margin-right: auto;
// `;

// const RightItems = styled.div`
//     display: flex;
//     align-items: center;
// `;

const Navbar = () => {
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.User.currentUser)

    useEffect(() => {
        if (!currentUser.id) {
            navigate('/')
        }

    }, []);


    return (
        <>

            <Nav >
                <List >


                    <ListItem>
                        <img src={image} alt="Logo" style={{ width: '150px', height: '45px', marginRight: '50px' }} />
                    </ListItem>

                    <ListItem>
                        <NavLink to="historyPurchases" style={{ color: '#13214E' }}>History Purchases</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="brunches" style={{ color: '#13214E' }}>List of Brunch</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="packageList" style={{ color: '#13214E' }}>Packages</NavLink>
                    </ListItem>                                        <ListItem>
                        <NavLink to="/navbar" style={{ color: '#13214E' }}>Start</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="signout" style={{ color: '#1D7D93' }} >
                            <ExitToAppIcon style={{ verticalAlign: 'middle', marginRight: 4 }} />
                            Sign Out
                        </NavLink>
                    </ListItem>

                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        <ListItem style={{ color: '#1D7D93', display: 'flex', alignItems: 'center' }}>
                            <PersonIcon style={{ marginInlineEnd: 0 }} />
                            {currentUser.name}
                        </ListItem>
                    </div>

                </List>
            </Nav>

            <Outlet />
        </>
    );
};

export default Navbar;