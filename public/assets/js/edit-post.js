async function editPostHandler(event) {
    event.preventDefault();
  //retrieve post info
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]').value;
  //edit referenced post ID in URL
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
 
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
     
      if (response.ok) {
        document.location.replace('/forum/');
      } else {
        alert(response.statusText);
      }
  }
 
  document.querySelector('#edit-post').addEventListener('submit', editPostHandler);
