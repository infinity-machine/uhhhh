import React from 'react';
import LoginForm from './components/LoginForm';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated, logoutUser } from './utils/auth';
import { savePost, fetchPosts } from './utils/posts';
import { newChat } from './utils/chats'
import { fetchUsers } from './utils/users'

function App() {
  const [user, setUser] = useState('');
  const [postContent, setPostContent] = useState('')
  const [postsData, setPostsData] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([])

  // useEffect(() => {
  //   fetchPosts()
  //     .then(data => setPostsData(data))
  // }, [postsData])

  useEffect(() => {
    fetchUsers()
      .then(users => setOnlineUsers(users))
  })

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
    logoutUser(user)
    localStorage.removeItem('token')
    window.location.reload();
  };

  const handleChat = (e) => {
    const chat_data = {
      sender: user,
      receiver: e.target.innerText
    }
    newChat(chat_data);
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
            {/* {postsData ? postsData.slice(0).reverse().map((data, index) => {
              return (
                <div key={index} className="card">
                  <p>{data.content}</p>
                  <p>{data.author}</p>
                </div>
              )
            }) : <></>} */}
            {onlineUsers ? onlineUsers.map((data, index) => {
              return (
                <div key={index}>
                  <p onClick={handleChat}>{data.username}</p>
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
