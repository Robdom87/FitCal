async function deletePostHandler(event) {
    event.preventDefault();
    
//delete the post w corresponding ID in the URL bar
    const post_id = window.location.toString().split('/')[ 
        window.location.toString().split('/').length - 1
      ];
 
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
      });
     
      if (response.ok) {
        document.location.replace('/forum/');
      } else {
        alert(response.statusText);
      }
   
  }
 
  document.querySelector('#delete-post').addEventListener('click', deletePostHandler);
