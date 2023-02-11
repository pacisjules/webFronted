import React, { useState } from 'react'
import classes from "../../styles/section/App.module.css";
import Addform from "./Addform";

function AddingForm() {
    return (
        <div className={classes.main}>
            <div className={classes.topintro}>
                <h1>Add new Store</h1>
                <p>Here are fill information on new store</p>
            </div>
            <br/><br/>
            <Addform />
        </div>
    )
}

export default AddingForm