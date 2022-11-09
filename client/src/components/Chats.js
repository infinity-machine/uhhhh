import React from 'react'
import { useState, useEffect } from 'react';
// import { newChat, sendMessage } from '../utils/chats';
import { fetchChats, fetchChatData } from '../utils/chats'

const Chats = () => {
    const [chats, setChats] = useState([]);

    const renderChats = async(chat_id) => {
        const chat_data = await fetchChatData(chat_id);
        console.log(chat_data)
    };
    useEffect(() => {
        fetchChats()
            .then(chat_id => {
                renderChats(chat_id)
            })
    }, [])

    return (
        <div>
            {
                chats ? (
                    chats.map((data, index) => {
                        return (
                            <div key={index}>
                                <p>{data}</p>
                            </div>
                        )
                    })
                ) : <p>NO CHATS STARTED YET</p>
            }
        </div>

    )
}

export default Chats