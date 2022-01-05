import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const id = "617c1565dffabf0988bf4a2a"





    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: "100%",

    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addFlight = () => {
        let body =
        {
            "From": "CAI",
            "To": "Lax",
            "FlightDate": "2000-11-20",
            "Cabin": "loujaina",
            "SeatsAvailable": 1,
        }
        let url = "http://localhost:8080/createFlight";
        axios.post(url, body)
            .then(async (response) => {
                console.log("response ===> ", response)
            })
            .catch((e) => {
                console.log("ana hena")
                console.log("error ===>", e);


            });

    };
    const deleteFlight = () => {
        let body =
        {
            "From": "CAI",
            "To": "Lax",
            "FlightDate": "2000-11-20",
            "Cabin": "loujaina",
            "SeatsAvailable": 1,
        }
        let url = "http://localhost:8080//flight/:id";
        axios.post(url, body)
            .then(async (response) => {
                console.log("response ===> ", response)
            })
            .catch((e) => {
                console.log("ana hena")
                console.log("error ===>", e);


            });

    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {

        let url = "http://localhost:8080/allflights";

        axios.get(url)
            .then(async (response) => {
                console.log("response ===> ", response)
            })
            .catch((e) => {
                console.log("ana hena")
                console.log("error ===>", e);
            });

    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="View flights" {...a11yProps(0)} />
                <Tab label="Delete" {...a11yProps(1)} />
                <Tab label="Search for a flight" {...a11yProps(2)} />
                <Tab label="Update" {...a11yProps(3)} />
                <Tab label="Create" {...a11yProps(4)} />
                {/* <Tab label="Item Six" {...a11yProps(5)} /> 
                <Tab label="Item Seven" {...a11yProps(6)} /> */}
            </Tabs>
            <TabPanel value={value} index={0}>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    View all flights
                </Button>
            </TabPanel>
            <TabPanel value={value} index={1}>

                <div>
                    <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                        Delete
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Sure you want to delete this?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                yes
                            </Button>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                no
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>



            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Button variant="contained" color="secondary" onClick={addFlight}>
                    add flight
                </Button>
            </TabPanel>
            {/* <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel> */}
        </div>
    );
}
