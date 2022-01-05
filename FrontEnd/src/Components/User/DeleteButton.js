import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import './ViewAllReservations.css'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertDialog(prop) {
    const reservation = prop.reservation
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openAlertFail, setOpenAlertFail] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = () => {
        setOpen(false);
        
        console.log("reservation: ", reservation)
        let url = `http://localhost:8080/reservation/${reservation}`;
        console.log("url", url)
        axios.delete(url)
        .then(async (response) => {
            setOpenAlert(true);
            console.log("response ===> ", response)
        })
        .catch((e) => {
                setOpenAlertFail(true);
                console.log("error ===>", e);
            });
       // window.location.reload(false);

    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseAlert = () => {
        setOpenAlert(false);
        window.location.reload(false);
    };

    return (
        <div>

            <Button variant="danger" onClick={handleClickOpen} >
                <DeleteIcon />
                Cancel Reservation</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to cancel your reservation?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="danger" style={{marginRight: "70%", width: "35%" }} onClick={handleDelete}>Yes</Button>
                    <Button variant="primary" style={{width: "35%" }} onClick={handleClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openAlert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >  <DialogTitle id="alert-dialog-title">
                    {" "}
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert action={
                            <IconButton aria-label="close" color="inherit" size="small" onClick={handleCloseAlert}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>}
                            sx={{ mb: 2 }}
                        ><AlertTitle> <strong>Reservation Was Cancelled Successfully!</strong> </AlertTitle>
                        You will be refunded with the reservation amount. 
                        </Alert>
                    </DialogContentText>
                </DialogContent>
            </Dialog>


            <Dialog open={openAlertFail}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            > <DialogTitle id="alert-dialog-title">
            {"Failed"}
        </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="error" action={
                            <IconButton aria-label="close" color="inherit" size="small" onClick={handleCloseAlert}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>}
                            sx={{ mb: 2 }}
                        ><AlertTitle> <strong>Reservation Wasn't Cancelled!</strong> </AlertTitle>
                            Please try again later.
                        </Alert>
                    </DialogContentText>
                </DialogContent>
            </Dialog>



        </div>
    );
}
