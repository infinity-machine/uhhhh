import React from 'react';
import LoginForm from './components/LoginForm';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated } from './utils/auth';
import { savePost } from './utils/posts';

function App() {
  const [user, setUser] = useState('');
  const [postContent, setPostContent] = useState('')

  useEffect(() => {
    const user_data = isAuthenticated()
    if (user_data) setUser(user_data)
  }, []);

  const handleInputChange = (e) => {
    setPostContent(e.target.value)
  }

  const handleSavePost = (e) => {
    e.preventDefault();
    savePost(postContent)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      {user.username ? (
        <div>
          <p>Welcome {user.username}!</p>
          <button onClick={handleLogOut}>LOG OUT</button>
          <div>
            <form onSubmit={handleSavePost}>
              <input
                value={postContent}
                onChange={handleInputChange}
                type="textarea"></input>
              <button>POST</button>
            </form>
            <div>
              
            </div>
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
