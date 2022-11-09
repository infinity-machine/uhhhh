import React from 'react'
import { useState, useEffect } from 'react';
// import { newChat, sendMessage } from '../utils/chats';
import { fetchChats, fetchChatData } from '../utils/chats'

const Chats = () => {
    const [chats, setChats] = useState([]);
    const [chatSelectIndex, setChatSelectIndex] = useState('')
    const [messageInput, setMessageInput] = useState('');

    const renderChats = async (chat_id_array) => {
        console.log(chat_id_array)
        const chat_data_array = []
        for (let i = 0; i < chat_id_array.length; i++) {
            const chat_data = await fetchChatData(chat_id_array[i])
            chat_data_array.push(chat_data)
        }
        setChats(chat_data_array)
        console.log(chats)
    };
    useEffect(() => {
        fetchChats()
            .then(chat_id_array => {
                console.log(chat_id_array)
                renderChats(chat_id_array)
            })
    }, [])

    const handleInputChange = (e) => {
        setMessageInput(e.target.value)
    }

    const handleChatSelect = (e) => {
        setChatSelectIndex(e.target.dataset.index)
    }

    return (
        <div>
            {
                chats ? (
                    chats.map((data, index) => {
                        return (
                            <p
                                key={index}
                                data-index={data._id}
                                onClick={handleChatSelect}
                            >{`conversation with ${data.users[1].username}`}</p>
                        )
                    })
                ) : <p>NO CHATS STARTED YET</p>
            }
            {
                chatSelectIndex ? (
                    chats.map((data, index) => {
                        return (
                            <div key={index}>
                                <p>{data.message}</p>
                            </div>
                        )
                    })
                ) : <></>
            }
        </div >

    )
}

export default Chats