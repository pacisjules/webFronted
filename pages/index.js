import { react, useState, useEffect } from "react";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { SetDateTime, getCountry } from "../features/weatherApi/getweather";
import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import { SnackbarProvider, useSnackbar } from "notistack";
import Head from 'next/head'

import classes from "../styles/login/App.module.css";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const getcoutry = useSelector((state) => state.getcountryinfo.country);
  const getcity = useSelector((state) => state.getcountryinfo.city);
  const today = useSelector((state) => state.getcountryinfo.day);
  const thisyear = useSelector((state) => state.getcountryinfo.year);
  const thismonth = useSelector((state) => state.getcountryinfo.month);
  const token = useSelector((state) => state.loginreducer.access);

  const { enqueueSnackbar } = useSnackbar();
  const [time, setTime] = useState("");
  const [period, setperiod] = useState("");
  const [viewpass, setViewpass] = useState(0);
  const [hidepass, setHide] = useState("none");
  const [showpass, setShow] = useState("block");
  const [passType, setPasstype] = useState("password");

  const [weather, setweather] = useState("");
  const [weathericon, setweathericon] = useState("");

  //Login states

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(getCountry());
    dispatch(SetDateTime());
    //getallweather();
  }, []);

  const checkPassword = () => {
    if (viewpass) {
      setViewpass(0);
      setShow("block");
      setHide("none");
      setPasstype("password");
    } else {
      setViewpass(1);
      setShow("none");
      setHide("block");
      setPasstype("text");
    }
  };

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("This is a success message!", { variant });
  };

  //Login form

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "") {
      enqueueSnackbar("Please enter your username", { variant: "error" });
    } else if (password === "") {
      enqueueSnackbar("Please enter your password", { variant: "error" });
    } else {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      console.log(res);

      if (res.ok) {
        router.push("/success");
      } else {
        enqueueSnackbar("Login failed username or password are not correct ?", {
          variant: "warning",
        });
        console.log("Not Signin");
      }
    }
  };

  //Get Weather

  // const getallweather = () => {
  //   if (localStorage.getItem("city") === null) {
  //     console.log("No city Setted");
  //   } else {
  //     const getcurrentcity = localStorage.getItem("city");
  //     try {
  //       const urlwealth =
  //         "http://api.weatherstack.com/current?access_key=8803814c8922be24ed2cf7792d60b4e8&query=" +
  //         getcurrentcity;
  //       axios
  //         .get(urlwealth)
  //         .then((respo) => {
  //           setweather(respo.data.current.feelslike);
  //           setweathericon(respo.data.current.weather_icons);
  //         })
  //         .then((error) => console.log(error));
  //     } catch (e) {

  //     }
  //   }
  // };

  setInterval(() => {
    var date = new Date();
    var fullclock =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var hour = date.getHours();
    let periodtime = "";

    if (hour >= 0 && hour <= 12) {
      periodtime = "AM";
    } else {
      periodtime = "PM";
    }
    setTime(fullclock);
    setperiod(periodtime);
  }, 500);

  return (
    <div className={classes.maincontainer}>
      <Head>
        <title>Login page</title>
      </Head>
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

          {/* <div className={classes.logodiv}>
            <h1></h1>
          </div> */}

          <div className={classes.weatherDiv}>
            <div className={classes.lft}>
              <div className={classes.tp}>
                <h2>{thismonth}</h2>
              </div>

              <div className={classes.md}>
                <h2>{today}</h2>
              </div>

              <div className={classes.btm}>
                <h2>{thisyear}</h2>
              </div>
            </div>

            <div className={classes.rgt}>
              <h1>
                20
                <sup>0</sup>
              </h1>
              <img
                src="https://www.seekpng.com/png/detail/64-641628_clouds-and-sun-weather-icon-png-clip-art.png"
                alt="Weather icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.RightDiv}>
        <div className={classes.RightTop}>
          <div className={classes.SoftLogo}></div>

          <h1>Login.</h1>

          <p>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate.
          </p>
        </div>

        <div className={classes.RightMiddle}>
          <div className={classes.Username}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <FaUserCircle
              style={{
                fontSize: "20px",
                color: "#0069CB",
              }}
            />
          </div>

          <div className={classes.Password}>
            <input
              type={passType}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <AiOutlineEye
              style={{
                fontSize: "23px",
                color: "#0069CB",
                cursor: "pointer",
                display: showpass,
              }}
              onClick={checkPassword}
            />

            <AiOutlineEyeInvisible
              style={{
                fontSize: "23px",
                color: "#0069CB",
                cursor: "pointer",
                display: hidepass,
              }}
              onClick={checkPassword}
            />
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
              <button onClick={handleLogin}>Login</button>
            </Link>
          </div>
          {token}
        </div>

        {/* <React.Fragment>
          <Button onClick={handleClickVariant("warning")}>
            Show success snackbar
          </Button>
        </React.Fragment> */}

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

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Home />
    </SnackbarProvider>
  );
}
