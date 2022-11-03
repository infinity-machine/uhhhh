export async function savePost(post_content) {
    const new_post = {
        content: post_content,
        author: 'me lol'
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