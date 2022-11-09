export async function newChat(recipient_id) {
    const chat_data = {
        receiver: recipient_id
    }
    const response = await fetch('/chats', {
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

export async function fetchRecipientID(username) {
    const response = await fetch(`/api/user/${username}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        }
    });
    const user_id = await response.json();
    return user_id
}

export async function fetchChats() {
    const response = await fetch('/chats', {
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