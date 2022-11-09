export async function fetchUsers() {
    const response = await fetch('/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        }
    });
    const users_array = await response.json();
    return users_array
}

export async function fetchUserId(username) {
    const response = await fetch(`/users/${username}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        }
    });
    const user = await response.json();
    return user._id
    // return user_id
}