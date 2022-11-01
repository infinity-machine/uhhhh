import React from 'react';
import { useState } from 'react';
import Register from './pages/Register';

function App() {
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

  const handleLogin = (e) => {
    e.preventDefault()
    const user_to_login = {
      email: input.email,
      password: input.password
    }
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user_to_login)
    })
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
      < Register /> 
    </div>
  );
}

export default App;
