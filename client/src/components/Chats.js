import React from 'react'
import { useState, useEffect } from 'react';
import { fetchUserChatIds, fetchChatData } from '../utils/chats';
import { sendMessage, fetchChatMessages } from '../utils/messages';

const Chats = (props) => {
    const [openChats, setOpenChats] = useState([]);
    const [chatSelect, setChatSelect] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const handleChatOutlines = async (chat_id_array) => {
        const chat_data_array = []
        for (let i = 0; i < chat_id_array.length; i++) {
            const chat_data = await fetchChatData(chat_id_array[i])
            chat_data_array.push(chat_data)
        }
        setOpenChats(chat_data_array)
    };

    // useEffect(() => {
    //     handleMessages(chatSelect)

    // }, [newMessage])

    useEffect(() => {
        fetchUserChatIds()
            .then(chat_id_array => {
                handleChatOutlines(chat_id_array)
            });
    }, []);

    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleMessages = async(chat_id) => {
        const messages = await fetchChatMessages(chat_id)
        setChatMessages(messages)
    }

    const handleChatSelect = async (e) => {
        console.log(e.target.dataset.id)
        setChatSelect(e.target.dataset.id)
        handleMessages(e.target.dataset.id)
    };

    const handleSendMessage = async(e) => {
        e.preventDefault();
        sendMessage(messageInput, props.user.username, chatSelect)
        handleMessages(chatSelect)
        setMessageInput('')
    };

    return (
        <div>
            {
                openChats ? (
                    openChats.map((data, index) => {
                        return (
                            <p
                                key={index}
                                data-id={data._id}
                                onClick={handleChatSelect}
                            >{`conversation with ${data.users[1].username}`}</p>
                        )
                    })
                ) : <p>NO CHATS STARTED YET</p>
            }
            {
                chatSelect ? (
                    <div>
                        <div>
                            {
                                chatMessages ? chatMessages.slice().reverse().map((message, index) => {
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
                        </div>
                    </div>
                ) : <></>
            }
        </div >

    )
}

export default Chats