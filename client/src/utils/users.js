export async function fetchUsers() {
    const response = await fetch('/api/users', {
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