import React, { useState } from 'react'
import classes from "../../../styles/section/App.module.css";
import Addform from "./Addform";

function AddingForm() {
    return (
        <div className={classes.main}>
            <div className={classes.topintro}>
                <h1>Add new section</h1>
                <p>Here are fill information on new section</p>
            </div>
            <br/><br/>
            <Addform />
        </div>
    )
}

export default AddingForm