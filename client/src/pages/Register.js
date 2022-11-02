import React from 'react';
import { useState } from 'react';
import { registerUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        const user_to_register = {
            username: input.username,
            email: input.email,
            password: input.password
        }
        const token = await registerUser(user_to_register);
        localStorage.setItem('token', token);
        navigate('/')
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
                <button>REGISTER</button>
            </form>
        </div>
    )
}

export default Register