import { react, useState, useEffect } from "react";
import {getUser_infos, add_infos} from '../features/userinfos/userinfos.js'
import { useSelector, useDispatch } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

function accounts() {
    const { data: session, status } = useSession({
      required: true,
    })
    const dispatch = useDispatch();
    const [infos, setInfos] = useState('');

    useEffect(() => {
        const getinfos = localStorage.getItem('userinfos')
        dispatch(add_infos(JSON.parse(getinfos)));
        setInfos(JSON.parse(getinfos))
      }, [])

      const username = useSelector((state) => state.user_infosred.username);
      const first_name = useSelector((state) => state.user_infosred.first_name);
      const second_name = useSelector((state) => state.user_infosred.second_name);
      const role = useSelector((state) => state.user_infosred.role);

  if(status === "authenticated") {
  return (
    <div>
        accounts
    <h1>username: {username} </h1>
    <h1>Names: {first_name} {second_name}</h1>
    <h1>role: {role} </h1>
    <br/><br/>
    <Link href="/about">Go to about</Link>
    <br/>
    <button onClick={()=>signOut()}>Logout</button>
    </div>

  )}

}

export default accounts