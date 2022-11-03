export async function fetchPosts() {
    const response = await fetch('./api/posts', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.token}`
        }
    });
    const posts_array = await response.json();
    return posts_array;
}


export async function savePost(post_content, username) {
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