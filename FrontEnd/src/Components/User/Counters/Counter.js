import React, { useState } from "react";
import './Counter.css'
import AddBoxRoundedIcon from "@material-ui/icons/AddCircleRounded";
import IconButton from "@material-ui/core/IconButton";
import RemoveBoxRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import { SettingsCellOutlined } from "@material-ui/icons";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({


}));
const mapStateToProps = (state) => {
    //console.log(state.DetailsReducer.details.destination)
    return {
        Adults: state.DetailsReducer.details.Adults,
    };
};
const mapDispatchToState = (dispatch) => {
    return {

        setAdult: (Adults) => {
            dispatch({ type: 'setAdult', payload: Adults });
        },


    };
};
export default connect(mapStateToProps, mapDispatchToState)(Counter);


export function Counter({ count, setCount, Adults, setAdult }) {
    // Set the initial count state to zero, 0

    const [count2, setCount2] = useState(0);
    const [col, setCol] = useState("disabled");
    const [col2, setCol2] = useState("primary");

    // Create handleIncrement event handler
    const handleIncrement = () => {
        if (Adults === 1) {
            // setCount(1);
            setAdult(Adults + 1);

            setCol("primary")
        }
        else if (Adults === 8) {
            // setCount(1);
            setCol2("disabled")
            setAdult(Adults + 1);

        }
        else if (Adults === 9) {
            // setCount(1);
            setCol2("disabled")
            setAdult(Adults);

        }

        else {
            setAdult(Adults + 1);
            setCol("primary")
        }
        console.log("handleInc ", Adults)
    };
    const handleDecrement = () => {
        if (Adults === 1) {
            setAdult(1);
            setCol("disabled")
        }
        // else if (Adults === 8) {
        //     setAdult(Adults - 1);
        //     setCol("primary")
        // }


        else {
            setAdult(Adults - 1);
            setCol2("primary")
        }
    };


    const iconColor = (value) => {
        if (Adults + 1 === 1) {
            setCol("disabled")
            console.log("disabled", { count })
        }
        if (Adults == 2 && value === "dec") {
            setCol("disabled")
            // console.log("ahmed")
        }
        else if (Adults === 1 && value === "dec") {
            setCol("disabled")
        }
        else {
            setCol("primary")
            console.log("primary", { count })
        }
    }

    const func2 = () => {
        handleIncrement();
        iconColor("inc");
    }
    const func = () => {

        handleDecrement();
        iconColor("dec");

    }



    return (
        <div className="b">
            <div className="counter">
                Aged +18    <small className="small"></small>
                <div className="counterB">
                    <div className="sum1">
                        <IconButton color={col} sign="-" onClick={func} >
                            <RemoveBoxRoundedIcon />
                        </IconButton>
                    </div>
                    <div className="sum">
                        {Adults}
                    </div>
                    <div className="sum2">
                        <IconButton color={col2} sign="-" onClick={func2} >
                            <AddBoxRoundedIcon />
                        </IconButton>
                    </div>
                </div>
            </div>


        </div >

    );
}

