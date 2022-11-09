import React from 'react'
import { fetchUsers } from '../utils/users';
import { fetchRecipientID, newChat } from '../utils/chats';
import {useState, useEffect} from 'react';

const Friends = (props) => {
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        fetchUsers()
          .then(users => setOnlineUsers(users))
      })
      const handleNewChat = async(e) => {
        const recipient_id = await fetchRecipientID(e.target.innerText);
        newChat(recipient_id);
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