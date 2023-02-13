import React, { useState } from 'react'
import classes from "../../../styles/section/App.module.css";
import Addform from "./Addform";
import Head from 'next/head';
function AddingForm() {
    return (
        <div className={classes.main}>
            <Head>
                <title>New Product</title>
            </Head>
            <div className={classes.topintro}>
                <h1>Add new product</h1>
                <p>Here are fill information on new product</p>
            </div>
            <br/><br/>
            <Addform />
        </div>
    )
}

export default AddingForm