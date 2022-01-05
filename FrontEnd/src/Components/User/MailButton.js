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


export default function AlertDialog(prop) {
    const reservation = prop.reservation
    const [open, setOpen] = React.useState(false);

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
                alert("Reservation canceled successfully!")
                console.log("response ===> ", response)

            })
            .catch((e) => {
                console.log("error ===>", e);
            });
        window.location.reload(false);

    };

    const handleClose = () => {
        setOpen(false);
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
        </div>
    );
}
