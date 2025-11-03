import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllPurchases, getAllPurchasesImpl } from '../../../redux/purchaseSlice';

function createData(name, calories, fat, carbs, protein, price,history) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history
  };
}

function Row(props) {

  const { row } = props;
  const [open, setOpen] = React.useState(props.initialOpen || false);


  return (
    <React.Fragment>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <th scope="row">{row.name}</th>
        <td>{row.calories}</td>
        <td>{row.fat}</td>
        <td>{row.carbs}</td>
        <td>{row.protein}</td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={6}>
          {open && (
            <Sheet
              variant="soft"
              sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
            >
              <Typography level="body-lg" component="div">
                History Implementions
              </Typography>
              <Table
                borderAxis="bothBetween"
                size="sm"
                aria-label="purchases"
                sx={{
                  '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
                    { textAlign: 'right' },
                  '--TableCell-paddingX': '0.5rem',
                }} 
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Use Minutes</th>
                    <th>Use Prints</th>
                    <th>Model</th>
                    <th>City</th>
                  </tr> 
                </thead>
          
              
               <tbody>
               {console.log(row.history)}
               
                   
                  {row.history && row.history.map((historyRow) => (
                    <tr key={historyRow.id}>
                      <th scope="row">{historyRow.date}</th>
                      <td>{historyRow.useMinute}</td>
                      <td>{historyRow.usePrint}</td>
                      <td>{historyRow.product.model}</td>
                      <td>{historyRow.product.category.name}</td>
                    </tr>
                  ))}
                </tbody> 
              </Table>
            </Sheet>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}

Row.propTypes = {
  initialOpen: PropTypes.bool,
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};


export default function TableCollapsibleRow() {

 const dispatch = useDispatch()
  const user = useSelector(state => state.User.currentUser)
  useEffect(() => {
    if (!user)
      navigate('/')
    dispatch(getAllPurchases(user.id))
    dispatch(getAllPurchasesImpl(user.id))
  }, []);
  const { historyPurchases } = useSelector(state => state.Purchase)
  const { historyPurchasesImpl } = useSelector(state => state.Purchase)

  const rows = [
  {historyPurchases} &&( historyPurchases.map(hp => createData(hp.date,hp.packages.title,hp.packages.description,hp.packages.minute, hp.packages.print,hp.date,historyPurchasesImpl.filter(f=>f.purchaseId==hp.id))))
  ];
  
  return (
    <div> <h1>History Purchases and Implmentaions</h1>  <Sheet>
      <Table
        aria-label="collapsible table"
        sx={{
          '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
            { textAlign: 'right' },
          '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]':
          {
            borderBottom: 0,
          },
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label="empty" />
            <th style={{ width: '40%' }}>Date Of Purchase</th>
            <th>Package Name</th>
            <th>Description</th>
            <th> Number Of Minute</th>
            <th>number Of Print</th>
          </tr>
        </thead>
        <tbody>
          {rows && rows[0].reverse().map((row, index) => (
            <Row key={row.name} row={row} initialOpen={index === 0} />
          ))}
        </tbody>
      </Table>
    </Sheet></div>
  );
}
