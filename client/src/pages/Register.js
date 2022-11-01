import React from 'react';
import { useState } from 'react';

const Register = () => {
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        const user_to_register = {
            username: input.username,
            email: input.email,
            password: input.password
        }
        fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_to_register)
        })
    }
    return (
        <div>
            <form onSubmit={handleRegister}>
                <input
                    value={input.username}
                    onChange={handleInputChange}
                    name="username"
                    type="text"
                    placeholder="username">
                </input>
                <input
                    value={input.email}
                    onChange={handleInputChange}
                    name="email"
                    type="email"
                    placeholder="email">
                </input>
                <input
                    value={input.password}
                    onChange={handleInputChange}
                    name="password"
                    type="password"
                    placeholder="password">
                </input>
                <button>LOG IN</button>
            </form>
        </div>
    )
}

export default Register