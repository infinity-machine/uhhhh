import React from 'react'
import { fetchUsers, fetchUserId } from '../utils/users';
import { newChat, fetchExistingChat } from '../utils/chats';
import {useState, useEffect} from 'react';

const Friends = () => {
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        fetchUsers()
          .then(users => setOnlineUsers(users))
      })

      const handleNewChat = async(e) => {
        const chat_exists = await fetchExistingChat(e.target.dataset.id);
        if (chat_exists) return
        if (!chat_exists) newChat(e.target.dataset.id)
      };
      
  return (
    <div className="border">
      <p>online users</p>
        {onlineUsers ? onlineUsers.map((data, index) => {
              return (
                <div key={index}>
                  <p onClick={handleNewChat}
                  data-id={data._id}>{data.username}</p>
                </div>
              )
            }) : <></>}
    </div>
  )
}

export default Friends