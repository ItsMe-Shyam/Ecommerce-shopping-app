
import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";

const CheckoutSteps = ({activesteps}) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon/>
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon/>
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon/>
        },
    ]
    const stepStyles = {boxSizing: "border-box", fontSize: "4rem"}
  return (
    <Fragment>
        <Stepper alternativeLabel activeStep={activesteps} style={stepStyles}>
            {
                steps.map((item, index) => (
                    <Step key={index} active={activesteps === index ? true : false} completed={activesteps >= index ? true : false} >
                        <StepLabel style={{color: activesteps >= index ? "tomato" : "rgba(0,0,0,0.649)"}} icon={item.icon}>{item.label}</StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps