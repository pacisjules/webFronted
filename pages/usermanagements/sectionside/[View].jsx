import React from 'react'
import { useRouter } from 'next/router';
import EditingForm from "./EditingForm";
import classes from "../../../styles/section/App.module.css";

function View() {
  const router = useRouter();
  const { View } = router.query;



  return (
    <div className={classes.main}>
    <div className={classes.topintro}>
        <h1>Section information</h1>
        <p>Here are change any information on this section</p>
        <p>{View}</p>
    </div>
</div>
  )
}

export default View