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


export async function fetchUserById(user_id) {
    const response = await fetch(`/users/${user_id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        }
    });
    const user = await response.json();
    return user
}