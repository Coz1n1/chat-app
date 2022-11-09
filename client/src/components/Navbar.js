import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <nav className='nav'>
                <NavLink to='/' className='title'>ChatApp</NavLink>
                <ul>
                    <li>
                        <NavLink style={({ isActive }) => ({
                            border: isActive ? "#15b0ab solid 2px" : "",
                            borderRadius: isActive ? 25 : "",
                            backgroundColor: isActive ? "rgb(57, 57, 58)" : ""
                        })} to='/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink style={({ isActive }) => ({
                            border: isActive ? "#15b0ab solid 2px" : "",
                            borderRadius: isActive ? 25 : "",
                            backgroundColor: isActive ? "rgb(57, 57, 58)" : ""
                        })} to='/register'>Register</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}
