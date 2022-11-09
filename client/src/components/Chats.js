import React from 'react'
import {useState, useEffect} from 'react';
// import { newChat, sendMessage } from '../utils/chats';
import {fetchChats} from '../utils/chats'

const Chats = () => {
    const [chatData, setChatData] = useState('');
    // const [postContent, setPostContent] = useState('')

    // useEffect(() => {
    //     fetchPosts()
    //         .then(data => setPostsData(data))
    // }, [postsData])

    useEffect(() => {
        fetchChats()
            .then(chats => console.log(chats))
    })
    // const handleInputChange = (e) => {
    //     setPostContent(e.target.value)
    // }

    // const handleSavePost = (e) => {
    //     e.preventDefault();
    //     savePost(postContent, user.username)
    //     setPostContent('')
    // }
    return (
        <div>
            {
                chatData ? (
                    chatData.map((data, index) => {
                        return (
                            <div key={index}>
                                <p>{data}</p>
                            </div>
                        ) 
                    })
                ) : <p>NO CHATS STARTED YET</p>
            }

            {/* <form onSubmit={handleSavePost}>
                <input
                    value={postContent}
                    onChange={handleInputChange}
                    type="textarea"></input>
                <button>POST</button>
            </form> */}
            {/* {postsData ? postsData.slice(0).reverse().map((data, index) => {
              return (
                <div key={index} className="card">
                  <p>{data.content}</p>
                  <p>{data.author}</p>
                </div>
              )
            }) : <></>} */}
        </div>

    )
}

export default Chats