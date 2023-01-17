import React, { useState, useEffect } from "react";
import classes from "../styles/homes/Homes.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { add_infos } from "../features/userinfos/userinfos.js";
import Stack from "@mui/material/Stack";

import { useSelector, useDispatch } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function homes() {
  const [time, setTime] = useState("");
  const [period, setperiod] = useState("");
  const [greeting, setGreetings] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const { data: session, status } = useSession({
    required: true,
  });

  const [infos, setInfos] = useState("");

  useEffect(() => {
    const getinfos = localStorage.getItem("userinfos");
    dispatch(add_infos(JSON.parse(getinfos)));
    setInfos(JSON.parse(getinfos));
    getrealgreat();
  }, []);

  const username = useSelector((state) => state.user_infosred.username);
  const first_name = useSelector((state) => state.user_infosred.first_name);
  const second_name = useSelector((state) => state.user_infosred.second_name);
  const role = useSelector((state) => state.user_infosred.role);

  setInterval(() => {
    var date = new Date();
    var hour = date.getHours();

    var fullclock =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let periodtime = "";

    setTime(fullclock);

    if (hour >= 0 && hour <= 12) {
      periodtime = "AM";
    } else {
      periodtime = "PM";
    }
    setperiod(periodtime);
  }, 500);

  const getrealgreat = () => {
    var date = new Date();
    var hour = date.getHours();

    if (hour > 18) {
      setGreetings("Good Night");
    } else if (hour > 17) {
      setGreetings("Good Evening");
    } else if (hour >= 12) {
      setGreetings("Good Afternoon");
    } else {
      setGreetings("Good Morning");
    }
  };

  if (status === "authenticated") {
    return (
      <div className={classes.homesContainer}>
        <div className={classes.top}>
          <div className={classes.photoSet}>
            <img src="/profilePic.png" alt="user profile" />
          </div>

          <h2>
            {greeting},{first_name} {second_name}
          </h2>

          <p className={classes.currentTime}>
            {role} Role type, {time} {period}
          </p>

          <p className={classes.appDescription}>Welcome in system</p>
          <br />
          {/* <button onClick={() => signOut()}>Logout as {username}</button> */}
          <Stack spacing={2} direction="row">
            <Link href="/Dashboard" style={{
              textDecoration:'none'
            }}>
              <Button variant="contained">Continue</Button>
            </Link>
            <Button variant="outlined" onClick={() => signOut()}>
              Logout
            </Button>
          </Stack>
        </div>
        <div className={classes.mid}>
          <h3>Use mobile here</h3>
          <div className={classes.mobileAvailable}>
            <img
              src="/appstore.png"
              alt="available on"
              className={classes.apple}
            />
            <img
              src="/google.png"
              alt="available on"
              className={classes.google}
            />
          </div>
        </div>
        <div className={classes.bot}>
          <h2>Quick start Here</h2>
          <p>Here you create easy short to open some functions</p>
          <div className={classes.botcontainer}>
            <div className={classes.div1}>
              <h2>Sales Panel</h2>
              <div className={classes.open1}>Open</div>
            </div>
            <div className={classes.div2}>
              <h2>Sales Panel</h2>
              <div className={classes.open2}>Open</div>
            </div>
            <div className={classes.div3}>
              <h1>+</h1>
              <p>Add new shortcut</p>
            </div>

            <div className={classes.div3}>
              <h1>+</h1>
              <p>Add new shortcut</p>
            </div>

            <div className={classes.div3}>
              <h1>+</h1>
              <p>Add new shortcut</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
