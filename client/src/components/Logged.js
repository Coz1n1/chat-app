import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3002")

export default function Logged() {

    const [user, setUser] = useState("")
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState("")
    const [everyMessage, setEveryMessage] = useState([])

    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get("http://localhost:3002/login").then((response) => {
            if (response.data.log === true) {
                console.log(response.data.user[0].name)
                setUser(response.data.user[0].name)
            }
        })
    })

    const send = async () => {
        if (message !== "") {
            const all = {
                room: room,
                name: user,
                message: message
            }
            await socket.emit("send", all)
            setEveryMessage((list) => [...list, all])
            setMessage('')
        }
    }

    const joinR = () => {
        socket.emit('join', room)
    }

    useEffect(() => {
        socket.on("getting", (data) => {
            console.log(data)
            setEveryMessage((list) => [...list, data])
        })
    }, [socket])

    const end = () => {
        Axios.delete('http://localhost:3002/logout', {
            username: user,
        }).then((response) => {

        });
    }
    return (
        <>
            <h1>Hello: {user}</h1>
            <div id='messages'>
                {everyMessage.map((e) => {
                    return (
                        <div className='chat' id={user === e.name ? "author" : "guest"}>
                            <div className='chat-message'>
                                <p className='text'>
                                    {e.message}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <form id='mainForm'>
                <label for='mes'>Message</label>
                <input type='text' id='mes' value={message} onChange={(e) => { setMessage(e.target.value) }}></input>
                <button type='button' id='send' onClick={send}>Send</button>
                <label for='room'>Room</label>
                <input type='text' id='room' onChange={(e) => { setRoom(e.target.value) }}></input>
                <button onClick={joinR} type='button' id='rButton'>Join</button>
            </form>
            <button type='submit' onClick={end}><a href='/login'>Logout</a></button>
        </>
    )
}
