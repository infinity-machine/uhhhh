import React from 'react';
import LoginForm from './components/LoginForm';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated } from './utils/auth';
import { savePost, fetchPosts } from './utils/posts';

function App() {
  const [user, setUser] = useState('');
  const [postContent, setPostContent] = useState('')
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then(data => setPostsData(data))
  }, [postsData])

  useEffect(() => {
    const user_data = isAuthenticated()
    if (user_data) setUser(user_data)
  }, []);

  const handleInputChange = (e) => {
    setPostContent(e.target.value)
  }

  const handleSavePost = (e) => {
    e.preventDefault();
    savePost(postContent, user.username)
    setPostContent('')
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
            {postsData ? postsData.slice(0).reverse().map((data, index) => {
              return (
                <div key={index} className="card">
                  <p>{data.content}</p>
                  <p>{data.author}</p>
                </div>
              )
            }) : <></>}
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
