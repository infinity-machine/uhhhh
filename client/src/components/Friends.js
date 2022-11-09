import React from 'react'
import { fetchUsers, fetchUserId } from '../utils/users';
import { newChat } from '../utils/chats';
import {useState, useEffect} from 'react';

const Friends = () => {
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        fetchUsers()
          .then(users => setOnlineUsers(users))
      })

      const handleNewChat = async(e) => {
        newChat(e.target.innerText);
      };
  return (
    <div>
        {onlineUsers ? onlineUsers.map((data, index) => {
              return (
                <div key={index}>
                  <p onClick={handleNewChat}>{data.username}</p>
                </div>
              )
            }) : <></>}
    </div>
  )
}

export default Friends