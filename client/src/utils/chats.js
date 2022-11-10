export async function fetchExistingChat(recipient_id) {
    const response = await fetch(`/chat/users/${recipient_id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        }
    });
    const existing_chat = await response.json();
    if (existing_chat) return true;
    if (!existing_chat) return false;

        
    // if (response.status !== 200) throw new Error('CHAT ALREADY EXISTS')
}

export async function newChat(recipient_id) {
    const chat_data = {
        receiver: recipient_id
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

export async function fetchUserChatIds() {
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