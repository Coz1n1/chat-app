import React, { useRef, useState } from 'react'
import Axios from 'axios'


export default function Register() {
    const nameRef = useRef()
    const passRef = useRef()
    const [reg, isReg] = useState()

    Axios.defaults.withCredentials = true

    const onSub = () => {
        let uName = nameRef.current.value
        let uPass = passRef.current.value

        if (uName !== '' && uPass !== '') {
            Axios.post('http://localhost:3002/register', {
                username: uName,
                userpassword: uPass,
            }).then((response) => {
                console.log(response.data)
                if (response.data === "exists") {
                    isReg(<h2>User already exists</h2>)
                } else if (response.data === "registered") {
                    isReg(<a href='/login'>Login Page</a>)
                }
            });
        } else {
            isReg(<h2>Fill in all blanks</h2>)
        }
    };
    return (
        <>
            <div className='regF'>
                <h2 className='hR'>Create your username and password</h2>
                <label className='label'>Usser name: </label><br></br>
                <input type='text' placeholder='Enter your name...' ref={nameRef} className='inp'></input><br></br>
                <label className='label'>Usser password: </label><br></br>
                <input type='password' placeholder='Enter your password...' ref={passRef} className='inp'></input><br></br>
                {reg}
                <button type='submit' onClick={onSub} className='confirm'>Register</button>
            </div>
        </>
    )
}
