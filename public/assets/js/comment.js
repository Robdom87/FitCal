async function commentFormHandler(event) {
    event.preventDefault();
 
    const comment_text = document.querySelector('input[name="comment-content"]').value.trim(); //eliminate leading & trailing spaces
 
    const post_id = window.location.toString().split('/')[ //toString used to be displayed as a text/string
        window.location.toString().split('/').length - 1
    ];
 
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
 
        if (response.ok) {
            document.location.reload();
 
        } else {
            alert(response.statusText);
            document.querySelector('#comment-form').style.display = "block";
        }
    }
}
 
document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);
