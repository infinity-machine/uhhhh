import React from 'react';
import { useState } from 'react';

const LoginForm = (props) => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const user_to_login = {
            email: input.email,
            password: input.password
        }
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_to_login)
        })
        const token = await response.json();
        localStorage.setItem('token', token);
        props.setUser(user_to_login);
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
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

export default LoginForm