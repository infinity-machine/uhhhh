export async function sendMessage(message, username, chat_id) {
    const message_to_send = {
        content: message,
        author: username
    }
    const response = await fetch(`/message/${chat_id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(message_to_send)
    });
    if (response.status !== 200) {
        throw new Error('MESSAGE FAILED TO SEND');
    }
}

export async function fetchChatMessages(chat_id) {
    const response = await fetch(`/message/${chat_id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        }
    });
    const messages = await response.json()
    return messages;
}