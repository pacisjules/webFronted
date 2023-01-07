import { react, useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { FaUserCircle } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
import { changeMyname, getCountry } from "../features/weatherApi/getweather";

import classes from "../styles/login/App.module.css";

export default function Home() {
  useEffect(() => {
    dispatch(getCountry());
    getallweather();
  }, []);

  const getcoutry = useSelector((state) => state.getcountryinfo.country);
  const getcity = useSelector((state) => state.getcountryinfo.city);

  const [time, setTime] = useState("");
  const [period, setperiod] = useState("");
  const [year, setyear] = useState();
  const [dates, setdates] = useState();
  const [month, setmonth] = useState();
  const [weather, setweather] = useState("");
  const [weathericon, setweathericon] = useState("");

  //Get Weather

  //const getcurrentcity = localStorage.getItem('city')

  const getallweather = () => {
    if (localStorage.getItem("city") === null) {
      console.log("No city Setted");
    } else {
      const getcurrentcity = localStorage.getItem("city");
      try {
        const urlwealth =
          "http://api.weatherstack.com/current?access_key=8803814c8922be24ed2cf7792d60b4e8&query=" +
          getcurrentcity;
        axios
          .get(urlwealth)
          .then((respo) => {
            setweather(respo.data.current.feelslike);
            setweathericon(respo.data.current.weather_icons);
          })
          .then((error) => console.log(error));
      } catch (e) {}
    }
  };

  setInterval(() => {
    var date = new Date();
    var hour = date.getHours();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
    var fullclock =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let periodtime = "";

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
      periodtime = "AM";
    } else {
      periodtime = "PM";
    }
    setperiod(periodtime);
  }, 500);

  const dispatch = useDispatch();

  return (
    <div className={classes.maincontainer}>
      <div className={classes.LeftDiv}>
        <div className={classes.InfoDiv}>
          <div className={classes.igihe}>
            <h1>
              {getcity}, {getcoutry}
            </h1>

            <h3>
              {time} {period}
            </h3>
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
              <h1>
                {weather}
                <sup>0</sup>
              </h1>
              <img src={weathericon} alt="Weather icon" />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.RightDiv}>
        <div className={classes.RightTop}>
          <div className={classes.SoftLogo}></div>

          <h1>Hello Again!</h1>

          <p>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content.
          </p>
        </div>

        <div className={classes.RightMiddle}>
          <div className={classes.Username}>
            <input type="text" placeholder="Username" />
            <FaUserCircle />
          </div>

          <div className={classes.Password}>
            <input type="password" placeholder="Password" />
            <IoMdLock />
          </div>

          <div className={classes.loginfo}>
            <p>
              <input type="checkbox" name="vehicle1" value="Bike" /> Remember me
            </p>
            <p>
              {" "}
              <Link href="/homes">Recovery Password</Link>
            </p>
          </div>

          <div className={classes.loginbutton}>
            <Link href="/homes">
              <button>Login</button>
            </Link>
          </div>
        </div>

        <div className={classes.RightBottom}>
          <p>Don’t have account yet?</p>

          <p>
            <Link href="/homes">Please ask administrators to register you</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
