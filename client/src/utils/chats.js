export async function newChat(recipient_username) {
    const chat_data = {
        receiver: recipient_username
    }
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(chat_data)
    });
    if (response.status !== 200) {
        throw new Error('CHAT CREATION FAILED');
    };
};

export async function fetchChats() {
    const response = await fetch('/chat', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        }
    });
    const chats_array = await response.json();
    return chats_array
};

export async function fetchChatData(chat_id) {
    const response = await fetch(`/chat/${chat_id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        }
    });
    const chat_data = response.json()
    return chat_data
}

export async function sendMessage(post_content, username) {
    const new_post = {
        content: post_content,
        author: username
    }
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(new_post)
    });
    if (response.status !== 200) {
        throw new Error('POST CREATION FAILED');
    }
}