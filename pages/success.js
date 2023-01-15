import { react, useState, useEffect } from "react";
import { useSession,signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import {getUser_infos, add_infos} from '../features/userinfos/userinfos.js'
import axios from 'axios';


function success() {

  const router = useRouter();
  const dispatch = useDispatch();

  const [info, setInfos]=useState(null);
  const [time, settime] = useState(4);

  const { data: session, status } = useSession({
    required:true
  })

  const entering= async () =>{
    const Urls = "http://127.0.0.1:8000/users/me";
    const response =await axios.get(Urls, { headers: { Authorization: `Bearer ${session.user.token}` } });
    localStorage.setItem('userinfos', JSON.stringify(response.data));
  }

  const interval = setInterval(() => {
    settime(time - 1)
  }, 1000)


  if (time == 1) {
    clearInterval(interval);
    entering();
    router.push('/homes');
  }

  return (
    <div><h1>Number {time}</h1></div>
  );
}

export default success;