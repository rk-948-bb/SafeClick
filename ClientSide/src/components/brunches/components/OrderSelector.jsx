import * as React from 'react';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Dropdown from '@mui/joy/Dropdown';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCategory } from '../../../redux/categorySlice';

export default function OrderSelector(props) {

    const dispatch = useDispatch();
    const { categoryList } = useSelector((state) => state.Category);
    const filterByCity = props.filterByCity
    useEffect(() => {
      dispatch(getCategory());
    }, []);
  
  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        color="primary"
        endDecorator={<ArrowDropDown />}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Choose a City
      </MenuButton>
      <Menu sx={{ minWidth: 120 }}>
        {categoryList && categoryList.map(cat=>
        <MenuItem onClick={()=>filterByCity(cat.id)}>{cat.name}</MenuItem>)}
      </Menu>
    </Dropdown>
  );
}