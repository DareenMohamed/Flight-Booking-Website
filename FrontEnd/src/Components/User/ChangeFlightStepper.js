
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Search2 from './Search2';
import ResultCard from './ResultCardEdit'
import SummaryCard3 from './SummaryCard3';
import SeatPickerTheSequel from './SeatPickerTheSequel';
import { connect } from 'react-redux';

// import { Button } from '@material-ui/core';
const steps = ['Search for flight', 'Select Flight', 'Select Seats', "Confirm"];
const mapStateToProps = (state) => {
    return {
        details: state.DetailsReducer.details,
        //  token: state.DetailsReducer.details.token,
    };
};
export default connect(mapStateToProps)(HorizontalLinearStepper);
function HorizontalLinearStepper({ details }) {
    console.log(details)
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const renderSwitch = (i) => {
        switch (i) {
            case 0:
                return <React.Fragment>
                    <Typography style={{ fontSize: 24, marginTop: "5%", marginLeft: "-55%" }}>Search for a new departing flight </Typography>
                    <Search2 />


                    <Button style={{ background: "#10404c ", color: "wheat", marginTop: "36.5%", marginLeft: "90%" }} onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </React.Fragment>;
            case 1:
                return <React.Fragment>
                    <div >
                        <ResultCard />
                    </div>
                    <Button
                        style={{ background: "#10404c ", color: "wheat", borderWidth: 1, position: 'absolute', bottom: 100, alignSelf: 'flex-start', marginLeft: "-30%" }}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    {/* style={{ background: "#10404c ", color: "wheat", marginTop: "10%", marginLeft: "90%", position: "sticky" }} onClick={handleNext} */}
                    <Button style={{ background: "#10404c ", color: "wheat", borderWidth: 1, position: 'absolute', bottom: 100, alignSelf: 'flex-end', marginLeft: "25%" }} onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>

                </React.Fragment>
            case 3: return <React.Fragment>
                <div style={{ marginTop: "5%", marginRight: "3%" }}><SummaryCard3 /></div>

                <Button
                    style={{ background: "#10404c ", color: "wheat", borderWidth: 1, position: 'absolute', bottom: 100, alignSelf: 'flex-start', marginLeft: "-30%" }}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                {/* style={{ background: "#10404c ", color: "wheat", marginTop: "10%", marginLeft: "90%", position: "sticky" }} onClick={handleNext} */}
                {/* <Button style={{ background: "#10404c ", color: "wheat", borderWidth: 1, position: 'absolute', bottom: 100, alignSelf: 'flex-end', marginLeft: "25%" }} onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button> */}
            </React.Fragment>

            case 2: return <React.Fragment>
                <div>
                    <SeatPickerTheSequel flight={1} />
                </div>
                <Button
                    style={{ background: "#10404c ", color: "wheat", borderWidth: 1, position: 'absolute', bottom: 100, alignSelf: 'flex-start', marginLeft: "-30%" }}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                {/* style={{ background: "#10404c ", color: "wheat", marginTop: "10%", marginLeft: "90%", position: "sticky" }} onClick={handleNext} */}
                <Button style={{ background: "#10404c ", color: "wheat", borderWidth: 1, position: 'absolute', bottom: 100, alignSelf: 'flex-end', marginLeft: "25%" }} onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>


            </React.Fragment>



        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //     labelProps.optional = (
                    //         <Typography variant="caption">Optional</Typography>
                    //     );
                    // }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {renderSwitch(activeStep)}
            {/* {activeStep === 0 ? (
                <React.Fragment>
                    <Search2 />
                  

                    <Button style={{ background: "#10404c ", color: "wheat", marginTop: "45%", marginLeft: "90%" }} onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </React.Fragment>
            ) : (

                <React.Fragment>
                    <div><ResultCard /></div>
                    <Button
                        style={{ background: "#10404c ", color: "wheat", marginTop: "10%", marginLeft: "0%", position: "sticky" }}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>

                    <Button style={{ background: "#10404c ", color: "wheat", marginTop: "10%", marginLeft: "90%", position: "sticky" }} onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
               
                </React.Fragment>
            )} */}
        </Box>
    );
}
