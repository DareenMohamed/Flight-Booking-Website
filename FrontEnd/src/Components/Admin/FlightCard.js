import * as React from 'react';
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
// margin-left: 100
// px
// ;
//     width: 150
// px
// ;
//     height: 150
// px
// ;
//     margin-top: 100
// px
// ;
const useStyles = makeStyles(theme => ({

    smallCard: {
        marginTop: "100px",
        width: '150px',
        height: '150px',
        marginLeft: '100px',
    },
    largeCard: {
        marginTop: "100px",
        width: '350px',
        height: '150px',
        //marginLeft: '100px',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px'
    },
    ticket: {
        display: "flex"

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    }
}));

function BasicCard(props) {
    const classes = useStyles();
    return (
        <div className={classes.ticket}>
            <Card className={classes.smallCard}>
                <CardContent >

                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
            <Card className={classes.largeCard}>
                <CardContent >

                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </div>
    );
}
export default BasicCard;