import React from 'react';
import LoginForm from './components/LoginForm';
import Friends from './components/Friends';
import Chats from './components/Chats'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated, logoutUser } from './utils/auth';

function App() {
  const [user, setUser] = useState('');
  useEffect(() => {
    const user_data = isAuthenticated()
    if (user_data) setUser(user_data)
  }, []);

  const handleLogOut = () => {
    logoutUser(user)
    localStorage.removeItem('token')
    window.location.reload();
  };


  return (
    <div>
      {user.username ? (
        <div>
          <div>
            <p>Welcome {user.username}!</p>
            <button onClick={handleLogOut}>LOG OUT</button>
          </div>
          <div>
            <Friends user={user}/>
            < Chats user={user}/>
          </div>
        </div>
      ) : (
        <div>
          < LoginForm user={user} setUser={setUser} />
          <NavLink to="/register">CREATE ACCOUNT</NavLink>
        </div>
      )}
    </div>
  );
};

export default App;
