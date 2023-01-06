import { react, useState, useEffect } from "react";
import Link from 'next/link'
import axios from 'axios';

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useSelector, useDispatch } from "react-redux";
import {
  changeMyname,
  getCountry
} from "../features/weatherApi/getweather";


import classes from '../styles/login/App.module.css';

export default function Home() {

  useEffect(() => {
    dispatch(getCountry());
    getallweather();
  }, []);

  const getcoutry = useSelector((state) => state.getcountryinfo.country);
  const getcity = useSelector((state) => state.getcountryinfo.city);
  const [time, setTime] = useState('');
  const [period, setperiod] = useState('');
  const [year, setyear] = useState();
  const [dates, setdates] = useState();
  const [month, setmonth] = useState();
  const [notes, setNotes] = useState();

  //Get Weather

  const urlwealth = "http://api.weatherstack.com/current?access_key=8803814c8922be24ed2cf7792d60b4e8&query="+getcity;

  const getallweather = () =>{
    axios.get(urlwealth)
    .then((respo)=>{  setNotes(respo.data); console.log(respo.data)})
    .then(error => console.log(error))
  }

  setInterval(() => {
    var date = new Date();
    var hour = date.getHours();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day=date.getDay();
    var fullclock = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let periodtime='';
    
    setTime(fullclock);
    setyear(year);
    setdates(day);

    switch (month) {
      case 0:
        setmonth("January");
        break;
      case 1:
        setmonth("February");
        break;
      case 2:
        setmonth("March");
        break;
      case 3:
        setmonth("April");
        break;
      case 4:
        setmonth("May");
        break;
      case 5:
        setmonth("June");
        break;
      case 6:
        setmonth("July");
        break;
      case 7:
        setmonth("August");
        break;
      case 8:
        setmonth("September");
        break;
      case 9:
        setmonth("October");
        break;
      case 10:
        setmonth("November");
        break;
      case 11:
        setmonth("December");
        break;
    }

   

    if (hour >= 0 && hour <= 12) {
      
      periodtime= "AM"
      
    } else {
      
      periodtime= "PM"
      
    }
    setperiod(periodtime)

  }, 500)


  const dispatch = useDispatch();
 
  
  return (
    <div className={classes.maincontainer}>
      
      <div className={classes.LeftDiv}>
      
      <div className={classes.InfoDiv}>
      <div className={classes.igihe}>
        <h1>{getcity}, {getcoutry}</h1> 
        
        <h3>{time} {period}</h3>
      </div>

      <div className={classes.logodiv}>
        <h1>Logo Here</h1>
      </div>

      <div className={classes.weatherDiv}>
      <div className={classes.lft}>
      <div className={classes.tp}>
      <h2>{month}</h2>
      </div>

      <div className={classes.md}>
      <h2>{dates}</h2>
      </div>

      <div className={classes.btm}>
      <h2>{year}</h2>
      </div>
      </div>

      <div className={classes.rgt}>
        <h1>20<sup>0</sup></h1>
        <img src="" alt=""/>
      </div>
      
      
      </div>



      </div>


      </div>
      <div className={classes.RightDiv}>
      <h1>Right</h1>
      <Link href="/homes">
      <button type='button' width="300px">
            login in
          </button>
      </Link>
      </div>


    </div>
  );
}
