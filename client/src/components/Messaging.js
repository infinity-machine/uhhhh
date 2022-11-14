import React from 'react'
import { useState, useEffect } from 'react';
import { fetchUserChatIds, fetchChatData } from '../utils/chats';
import { sendMessage, fetchChatMessages } from '../utils/messages';
import { fetchUsers, fetchUserById } from '../utils/users';
import { newChat, fetchExistingChat } from '../utils/chats';
import '../index.css';

const Messaging = (props) => {
    const [onlineUsers, setOnlineUsers] = useState([])
    const [openChats, setOpenChats] = useState([]);
    const [chatSelect, setChatSelect] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    // const [error, setError] = useState('');

    // SEND MESSAGE
    const handleSendMessage = async (e) => {
        e.preventDefault();
        sendMessage(messageInput, props.user.username, chatSelect);
        handleMessages(chatSelect);
        setMessageInput('');
    };

    // CLOSE CHAT
    const handleCloseChat = () => {
        setChatSelect(null)
    }

    // GRABS MESSAGES FROM USER DATA
    const handleMessages = async (chat_id) => {
        const messages = await fetchChatMessages(chat_id)
        setChatMessages(messages)
    }

    // HANDLES DISPLAY OF SELECTED CHAT
    const handleChatSelect = async (e) => {
        setChatSelect(e.target.dataset.id);
        handleMessages(e.target.dataset.id);
    };

    // HANDLES DISPLAY OF CHAT OUTLINES
    const handleChatOutlines = async (chat_id_array) => {
        const chat_data_array = []
        for (let i = 0; i < chat_id_array.length; i++) {
            const chat_data = await fetchChatData(chat_id_array[i])
            const chat_partner_data = await fetchUserById(chat_data.users.filter(user => user !== props.user._id));
            chat_data.title = `conversation with ${chat_partner_data.username}`;
            chat_data_array.push(chat_data)
            console.log(chat_data_array)
        }
        setOpenChats(chat_data_array)
    };

    // INPUT CHANGE
    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    // FETCH / SET ONLINE USERS, FETCH CHAT IDS FROM USER DATA
    useEffect(() => {
        fetchUsers()
            .then(users => setOnlineUsers(users))
        fetchUserChatIds()
            .then(chat_id_array => {
                if (!chat_id_array.length) return setOpenChats(null)
                handleChatOutlines(chat_id_array)
            });
    }, []);

    // POST NEW CHAT
    const handleNewChat = async (e) => {
        const chat_exists = await fetchExistingChat(e.target.dataset.id);
        if (chat_exists) return;
        if (!chat_exists) newChat(e.target.dataset.id);
        // FIND CLEANER WAY TO DO THIS
        window.location.reload();
    };
    return (
        <div>
            <div className="border centertext">
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
            <div className="centertext">
                <p>open chats</p>
                {
                    openChats ? (
                        openChats.map((data, index) => {
                            return (
                                <p
                                    key={index}
                                    data-id={data._id}
                                    onClick={handleChatSelect}
                                >{`${data.title}`}</p>
                            )
                        })
                    ) : <p>NO CHATS STARTED YET</p>
                }
            </div>
            <div>
                {
                    chatSelect ? (
                        <div>
                            <div className="border scrollbox">
                                {
                                    chatMessages ? chatMessages.map((message, index) => {
                                        return (
                                            <p key={index}>{message.content} - {message.author}</p>
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


        </div>
    )
}

export default Messaging