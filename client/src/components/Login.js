import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { NavLink } from 'react-router-dom';


export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState("")
    const [follow, setFollow] = useState("")

    Axios.defaults.withCredentials = true

    const onLog = () => {
        Axios.post('http://localhost:3002/login', {
            username: username,
            userpassword: password,
        }).then((response) => {
            if (response.data.com) {
                setLogin(response.data.com)
            }
        });
    }

    useEffect(() => {
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.log === true) {
                console.log(response)
                setFollow("/logged")
            } else {
                console.log(response)
            }
        })
    }, [])

    return (
        <>
            <div className='logF'>
                <h2 className='hL'>Login</h2>
                <label className='label'>Usser name: </label><br></br>
                <input type='text' placeholder='Enter your name...' onChange={(e) => setUsername(e.target.value)} className='inp'></input><br></br>
                <label className='label'>Usser password: </label><br></br>
                <input type='password' placeholder='Enter your password...' onChange={(e) => setPassword(e.target.value)} className='inp'></input><br></br>
                <button onClick={onLog} className='confirm'>Go!</button>
                <h2>{login}</h2>
                <NavLink to={follow}>ok</NavLink>
            </div>
        </>
    )
}


