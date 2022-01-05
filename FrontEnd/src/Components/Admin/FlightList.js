import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@restart/ui/esm/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteButton from './DeleteButton'
import UpdateFlight from './UpdateFlight'
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#226AC7",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// function createData(props) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function CustomizedTables(props) {
    const flight = props.flight
    console.log("hello", flight)
    const Adate = flight.ArrivalDate
    console.log("hiiii", Adate)
    const [open, setOpen] = React.useState(false);
    const [openRow, setOpenRow] = React.useState(false);
    const handleSubmit = () => {

        <UpdateFlight flight={flight._id} />

    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 700 }} aria-label="collapsible table customized">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>       </StyledTableCell>
                        <StyledTableCell>Flight Number</StyledTableCell>
                        <StyledTableCell align="right">From</StyledTableCell>
                        <StyledTableCell align="right">To</StyledTableCell>
                        <StyledTableCell align="right">Departure Date</StyledTableCell>
                        <StyledTableCell align="right">Arrival Date</StyledTableCell>
                        <StyledTableCell align="right">Departure Time</StyledTableCell>
                        <StyledTableCell align="right">Arrival Time</StyledTableCell>
                        <StyledTableCell align="right">       </StyledTableCell>


                    </TableRow>
                </TableHead>




                <TableBody>
                    {flight.map((flight) => (
                        <React.Fragment>
                                <br/>
                            <StyledTableRow  sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell>
                                    <IconButton aria-label="expand row" size="small" onClick={() => setOpenRow(!openRow)}>
                                        {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>

                                <TableCell >{flight.FlightNumber}</TableCell>
                                <TableCell align="right">{flight.From}</TableCell>
                                <TableCell align="right">{flight.To}</TableCell>
                                <TableCell align="right">{flight.DepartureDate.substring(0, 10)}</TableCell>
                                <TableCell align="right">{flight.ArrivalDate.substring(0, 10)}</TableCell>
                                <TableCell align="right">{flight.DepartureTime}</TableCell>
                                <TableCell align="right">{flight.ArrivalTime}</TableCell>
                                <TableCell align="right" style={{ display: "flex" }}>
                                    <DeleteButton flight={flight._id} />
                                    <Link to={{ pathname: `/Update/${flight._id}`, state: { flight: { flight } } }}>
                                        <IconButton onClick={handleSubmit}>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </StyledTableRow >
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                    <Collapse in={openRow} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Boarding Classes
                                            </Typography>
                                            <Table size="small" aria-label="">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="right">First Seats</StyledTableCell>
                                                        <StyledTableCell align="right">First Bags</StyledTableCell>
                                                        <StyledTableCell align="right">First Price</StyledTableCell>
                                                        <StyledTableCell align="right">Business Seats</StyledTableCell>
                                                        <StyledTableCell align="right">Business Bags</StyledTableCell>
                                                        <StyledTableCell align="right">Business Price</StyledTableCell>
                                                        <StyledTableCell align="right">Economy Seats</StyledTableCell>
                                                        <StyledTableCell align="right">Economy Price</StyledTableCell>
                                                        <StyledTableCell align="right">Economy Bags</StyledTableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow key={flight.FlightNumber}>
                                                        <TableCell align="center">{flight.FirstSeats}</TableCell>
                                                        <TableCell align="center">{flight.PriceFirst.$numberDecimal}</TableCell>
                                                        <TableCell align="center">{flight.FirstBags}</TableCell>
                                                        <TableCell align="center">{flight.BusinessSeats}</TableCell>
                                                        <TableCell align="center">{flight.PriceBusiness.$numberDecimal}</TableCell>
                                                        <TableCell align="center">{flight.BusinessBags}</TableCell>
                                                        <TableCell align="center">{flight.EconomySeats}</TableCell>
                                                        <TableCell align="center">{flight.PriceEconomy.$numberDecimal}</TableCell>
                                                        <TableCell align="center">{flight.EconomyBags}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                            <br/>
                                        </Box>
                                    </Collapse>
                                </TableCell>

                            </TableRow>


                        </React.Fragment>
                    ))}
                </TableBody>






























                {/**
                 
                <TableBody>
                    {flight.map((flight) => (
                        
                        <StyledTableRow key={flight._id}>
                            <StyledTableCell align="center">
                                {flight.FlightNumber}
                            </StyledTableCell>
                            <StyledTableCell align="center">{flight.From}</StyledTableCell>
                            <StyledTableCell align="center">{flight.To}</StyledTableCell>
                            <StyledTableCell align="center">{flight.DepartureDate.substring(0, 10)}</StyledTableCell>
                            <StyledTableCell align="center">{flight.ArrivalDate.substring(0, 10)}</StyledTableCell>
                            <StyledTableCell align="center">{flight.DepartureTime}</StyledTableCell>
                            <StyledTableCell align="center">{flight.ArrivalTime}</StyledTableCell>
                            <StyledTableCell align="center">{flight.FirstSeats}</StyledTableCell>
                            <StyledTableCell align="center">{flight.PriceFirst.$numberDecimal}</StyledTableCell>
                            <StyledTableCell align="center">{flight.FirstBags}</StyledTableCell>
                            <StyledTableCell align="center">{flight.BusinessSeats}</StyledTableCell>
                            <StyledTableCell align="center">{flight.PriceBusiness.$numberDecimal}</StyledTableCell>
                            <StyledTableCell align="center">{flight.BusinessBags}</StyledTableCell>
                            <StyledTableCell align="center">{flight.EconomySeats}</StyledTableCell>
                            <StyledTableCell align="center">{flight.PriceEconomy.$numberDecimal}</StyledTableCell>
                            <StyledTableCell align="center">{flight.EconomyBags}</StyledTableCell>
                            
                            <StyledTableCell align="right" style={{ display: "flex" }}>

                              
                                <DeleteButton flight={flight._id} />

                                <Link to={  { pathname: `/Update/${flight._id}`,state: { flight: {flight} } } }>
                                    <IconButton  onClick={handleSubmit}>
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            */}
            </Table>
        </TableContainer >
    );
}
