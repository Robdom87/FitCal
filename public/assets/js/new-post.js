async function newPostHandler(event) {
    event.preventDefault();
 
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]').value.trim();
 
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
 
    if (response.ok) {
        document.location.replace('/forum');
    } else {
        alert(response.statusText);
    }
}
 
document.querySelector('#new-post').addEventListener('submit', newPostHandler);
