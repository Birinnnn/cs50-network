document.addEventListener('DOMContentLoaded', function () {

    //Add the likeDislike () function call to the heart's onclick method
    document.querySelectorAll('.like-button').forEach(button => {
        button.onclick = function () {

            likeDislike(this);
        };
    });

    //It receives an element and makes the asynchronous call of the like method.
    async function likeDislike(element) {

        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        await fetch(`/like/${element.dataset.postId}`)
            .then(response => response.json())
            .then(data => {
                //If the user has already liked the post, the heart is filled in red
                if (data.liked) {
                    element.querySelector('i').classList.remove('far');
                    element.querySelector('i').classList.add('fas');
                } else {
                    element.querySelector('i').classList.remove('fas');
                    element.querySelector('i').classList.add('far');
                }
                element.querySelector('span').innerHTML = data.total_likes;
            });
    }

    const followButton = document.querySelector('.follow-button');
    if (followButton) {
        followButton.addEventListener('click', (event) => {
            const userId = event.currentTarget.dataset.userId; // Use event.currentTarget.dataset

            const followText = document.querySelector('.follow-button-text')
            const followersCount = document.querySelector('.follow-count')

            fetch(`/follow/${userId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.followed) {
                        followText.innerHTML = 'Unfollow';
                    }
                    else {
                        followText.innerHTML = 'Follow';
                    }
                    followersCount.innerHTML = data.total_followers;
                });
        });
    }
    // Function to toggle the visibility of elements
    function toggleVisibility(postId, elementsToShow, elementsToHide) {
        elementsToShow.forEach(element => {
            document.querySelector(`#${element}_${postId}`).style.display = 'block';
        });

        elementsToHide.forEach(element => {
            document.querySelector(`#${element}_${postId}`).style.display = 'none';
        });
    }

    // Edit post
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function () {
            const postId = this.dataset.id;
            toggleVisibility(postId, ['edit_form', 'cancel_button'], ['post_content', 'edit_link']);
        });
    });

    // Close edit post
    document.querySelectorAll('.btn-secondary').forEach(button => {
        button.addEventListener('click', function () {
            const postId = this.dataset.id;
            toggleVisibility(postId, ['post_content', 'edit_link'], ['edit_form', 'cancel_button']);
        });
    });

    // Update post
    document.querySelectorAll('.save-button').forEach(button => {
        button.onclick = function (event) {
            event.preventDefault(); // Prevent the form from submitting

            const postId = event.currentTarget.dataset.id;
            const postTextContent = document.querySelector(`#post_content_${postId}`); // New element
            const frmEdit = document.querySelector(`#edit_form_${postId}`);

            fetch(frmEdit.dataset.url, {
                method: 'POST', // Use POST method to update the content
                body: new FormData(frmEdit), // Send form data
                headers: {
                    'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value,
                },
            })
                .then(response => response.json())
                .then(result => {
                    if (result.message) {
                        // Show elements
                        toggleVisibility(postId, ['post_content', 'edit_link'], ['edit_form', 'cancel_button']);
                        postTextContent.innerHTML = result.content;
                    }
                    else {
                        // Show elements
                        toggleVisibility(postId, ['edit_form', 'cancel_button'], ['post_content', 'edit_link']);
                    }
                });
        };
    });
});