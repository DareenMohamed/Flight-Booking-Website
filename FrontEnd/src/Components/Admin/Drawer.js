// import React from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Divider from '@material-ui/core/Divider';
// import Drawer from '@material-ui/core/Drawer';
// import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import MailIcon from '@material-ui/icons/Mail';
// import MenuIcon from '@material-ui/icons/Menu';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import axios from 'axios';
// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//     },
//     drawer: {
//         [theme.breakpoints.up('sm')]: {
//             width: drawerWidth,
//             flexShrink: 0,
//         },
//     },
//     appBar: {
//         [theme.breakpoints.up('sm')]: {
//             width: `calc(100% - ${drawerWidth}px)`,
//             marginLeft: drawerWidth,
//         },
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//         [theme.breakpoints.up('sm')]: {
//             display: 'none',
//         },
//     },
//     // necessary for content to be below app bar
//     toolbar: theme.mixins.toolbar,
//     drawerPaper: {
//         width: drawerWidth,
//     },
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//     },
// }));

// function ResponsiveDrawer(props) {
//     const { window } = props;
//     const classes = useStyles();
//     const theme = useTheme();
//     const [mobileOpen, setMobileOpen] = React.useState(false);
//     const id = "617c1565dffabf0988bf4a2a"
//     const handleDrawerToggle = () => {
//         setMobileOpen(!mobileOpen);
//     };
//     const addFlight = () => {
//         let body =
//         {
//             "From": "CAI",
//             "To": "Lax",
//             "FlightDate": "2000-11-20",
//             "Cabin": "loujaina",
//             "SeatsAvailable": 1,
//         }
//         let url = "http://localhost:8080/createFlight";
//         axios.post(url, body)
//             .then(async (response) => {
//                 console.log("response ===> ", response)
//             })
//             .catch((e) => {
//                 console.log("ana hena")
//                 console.log("error ===>", e);


//             });

//     };
//     const deleteFlight = () => {
//         let body =
//         {
//             "From": "CAI",
//             "To": "Lax",
//             "FlightDate": "2000-11-20",
//             "Cabin": "loujaina",
//             "SeatsAvailable": 1,
//         }
//         let url = "http://localhost:8080//flight/:id";
//         axios.post(url, body)
//             .then(async (response) => {
//                 console.log("response ===> ", response)
//             })
//             .catch((e) => {
//                 console.log("ana hena")
//                 console.log("error ===>", e);


//             });

//     };
//     const handleSubmit = async () => {

//         let url = "http://localhost:8080/allflights";

//         axios.get(url)
//             .then(async (response) => {
//                 console.log("response ===> ", response)
//             })
//             .catch((e) => {
//                 console.log("ana hena")
//                 console.log("error ===>", e);


//             });




//     };



//     const drawer = (
//         <div>
//             <div className={classes.toolbar} />
//             <Divider />
//             <List>
//                 {['Create Flight', 'Delete Flight', 'Update', 'View'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//             <Divider />

//         </div>
//     );

//     const container = window !== undefined ? () => window().document.body : undefined;

//     return (
//         <div className={classes.root}>
//             <CssBaseline />
//             <AppBar position="fixed" className={classes.appBar}>
//                 <Toolbar>
//                     <IconButton
//                         color="inherit"
//                         aria-label="open drawer"
//                         edge="start"
//                         onClick={handleDrawerToggle}
//                         className={classes.menuButton}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" noWrap>
//                         Responsive drawer
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <nav className={classes.drawer} aria-label="mailbox folders">
//                 {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//                 <Hidden smUp implementation="css">
//                     <Drawer
//                         container={container}
//                         variant="temporary"
//                         anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//                         open={mobileOpen}
//                         onClose={handleDrawerToggle}
//                         classes={{
//                             paper: classes.drawerPaper,
//                         }}
//                         ModalProps={{
//                             keepMounted: true, // Better open performance on mobile.
//                         }}
//                     >
//                         {drawer}
//                     </Drawer>
//                 </Hidden>
//                 <Hidden xsDown implementation="css">
//                     <Drawer
//                         classes={{
//                             paper: classes.drawerPaper,
//                         }}
//                         variant="permanent"
//                         open
//                     >
//                         {drawer}
//                     </Drawer>
//                     <Button variant="contained" color="secondary" onClick={handleSubmit}>
//                         View all flights
//                     </Button>
//                 </Hidden>
//             </nav>
//             <main className={classes.content}>
//                 <div className={classes.toolbar} />
//                 {/* <Typography paragraph> */}
//                 {/* <Button variant="contained" color="secondary" onClick={handleSubmit}>
//                     View all flights
//                 </Button>
//                 <Button variant="contained" color="secondary" onClick={addFlight}>
//                     add flight
//                 </Button> */}
//                 {/* </Typography> */}
//                 <Typography paragraph>

//                 </Typography>
//             </main>
//         </div>
//     );
// }

// ResponsiveDrawer.propTypes = {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * You won't need it on your project.
//      */
//     window: PropTypes.func,
// };

// export default ResponsiveDrawer;
