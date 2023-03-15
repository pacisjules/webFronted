import React, { useState } from 'react'
import classes from "../../styles/section/App.module.css";
import Addform from "./Addform";
import Head from 'next/head';
function AddingForms() {
    return (
        <div className={classes.main}>
            <Head>
                <title>New Customer</title>
            </Head>
            <div className={classes.topintro}>
                <h1>Add New Customer</h1>
                <p>Here are fill information on new Customer</p>
            </div>
            <br/><br/>
            <Addform />
        </div>
    )
}

export default AddingForms