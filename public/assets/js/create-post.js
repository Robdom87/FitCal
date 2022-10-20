async function createPostHandler(event) {
    event.preventDefault();

    document.location.replace('/forum/new')
}


document.querySelector('#create-new-post').addEventListener('click', createPostHandler);