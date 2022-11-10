import React from 'react'
import { useState, useEffect } from 'react';
import { fetchUserChatIds, fetchChatData } from '../utils/chats';
import { sendMessage, fetchChatMessages } from '../utils/messages';

const Chats = (props) => {
    const [openChats, setOpenChats] = useState([]);
    const [chatSelect, setChatSelect] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [error, setError] = useState('');

    const handleSendMessage = async(e) => {
        e.preventDefault();
        sendMessage(messageInput, props.user.username, chatSelect);
        handleMessages(chatSelect);
        setMessageInput('');
    };

    const handleCloseChat = () => {
        setChatSelect(null)
    }

    const handleMessages = async(chat_id) => {
        const messages = await fetchChatMessages(chat_id)
        setChatMessages(messages)
    }

    const handleChatSelect = async (e) => {
        setChatSelect(e.target.dataset.id);
        handleMessages(e.target.dataset.id);
    };

    const handleChatOutlines = async (chat_id_array) => {
        const chat_data_array = []
        for (let i = 0; i < chat_id_array.length; i++) {
            const chat_data = await fetchChatData(chat_id_array[i])
            chat_data_array.push(chat_data)
        }
        setOpenChats(chat_data_array)
    };

    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    useEffect(() => {
        fetchUserChatIds()
            .then(chat_id_array => {
                if (!chat_id_array.length) return setOpenChats(null)
                handleChatOutlines(chat_id_array)
            });
    }, []);

    return (
        <div className="border">
            {
                openChats ? (
                    openChats.map((data, index) => {
                        return (
                            <p
                                key={index}
                                data-id={data._id}
                                onClick={handleChatSelect}
                            >{`${data._id}`}</p>
                        )
                    })
                ) : <p>NO CHATS STARTED YET</p>
            }
            {
                chatSelect ? (
                    <div>
                        <div>
                            {
                                chatMessages ? chatMessages.map((message, index) => {
                                    return (
                                        <p key={index}>{message.content}</p>
                                    )
                                }) : <p>NO MESSAGES YET</p>
                            }
                        </div>
                        <div>
                            <form onSubmit={handleSendMessage}>
                                <input 
                                    onChange={handleInputChange}
                                    value={messageInput} 
                                    type="text"></input>
                                <button>SEND</button>
                            </form>
                            <button onClick={handleCloseChat}>CLOSE</button>
                        </div>
                    </div>
                ) : <></>
            }
        </div >

    )
}

export default Chats