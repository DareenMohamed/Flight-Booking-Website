import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
export default function AlertDialog(prop) {
    const flight = prop.flight
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = () => {
        setOpen(false);

        // let body =
        // {
        //     "From": "CAI",
        //     "To": "Lax",
        //     "FlightDate": "2000-11-20",
        //     "Cabin": "loujaina",
        //     "SeatsAvailable": 1,
        // }
        //let FId = flight
        console.log("flight: ", flight)
        let url = `http://localhost:8080/flight/${flight}`;
        console.log("url", url)
        axios.delete(url)
            .then(async (response) => {
                console.log("response ===> ", response)
                
                

            })
            .catch((e) => {
               // console.log("ana hena")
                console.log("error ===>", e);


            });
        window.location.reload(false);

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
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
                        Are you sure you want to delete this flight?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete}>Yes</Button>
                    <Button onClick={handleClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
