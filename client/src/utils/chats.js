export async function newChat(chat_data) {
    const response = await fetch('/api/chats', {
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
    }
}