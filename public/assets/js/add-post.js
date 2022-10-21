async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]').value.trim();
    console.log(post_content);

    const response = await fetch(`/api/posts/forum`, {
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

function newPostBtn(){
    $(".new-post-form").toggle();
}

document.querySelector('.new-post-btn').addEventListener('click', newPostBtn);
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
