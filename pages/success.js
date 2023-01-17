import { react, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getUser_infos, add_infos } from "../features/userinfos/userinfos.js";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import Head from 'next/head'
function success() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [info, setInfos] = useState(null);
  const [time, settime] = useState(2.5);

  const { data: session, status } = useSession({
    required: true,
  });

  const entering = async () => {
    const Urls = "http://127.0.0.1:8000/users/me";
    const response = await axios.get(Urls, {
      headers: { Authorization: `Bearer ${session.user.token}` },
    });
    localStorage.setItem("userinfos", JSON.stringify(response.data));
  };

  const interval = setInterval(() => {
    settime(time - 1.5)
  }, 1000)

  if (time == 1) {
    clearInterval(interval);
    entering();
    router.push('/homes');
  }
  
  if (status === "authenticated") {
  return (
    <div
      style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100vh',
      }}
    >
      <Head>
        <title>Loading</title>
      </Head>
     
        <img src="/DoubleRing.gif" alt="user profile" width='130px'/>
        <h1 style={{
          fontWeight:'normal'
        }}>Loading...</h1>
      
    </div>
  );
}
}

export default success;
