import * as React from 'react';
import Button from 'react-bootstrap/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton'

import axios from 'axios';
export default function AlertDialog(prop) {
    const message = prop.flight
    const [open, setOpen] = React.useState(false);
    let history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = () => {
        setOpen(false);
        history.push("/admin");

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton aria-label="delete" onClick={handleClickOpen}>
                <CloseButton />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to exit? "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Changes will be discarded.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} variant="danger" style={{marginRight: "50%", width: "35%" }} >Yes</Button>
                    <Button onClick={handleClose}  variant="primary" style={{width: "35%" }} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
