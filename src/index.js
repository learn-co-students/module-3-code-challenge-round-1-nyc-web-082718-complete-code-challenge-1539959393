document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1204 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageTag = document.querySelector('#image')
  const nameH4 = document.querySelector('#name')
  const likesSpan = document.querySelector('#likes')
  const commentsUl = document.querySelector('#comments')
  const likeButton = document.querySelector('#like_button')

  // grab image info
  fetch(imageURL)
    .then(res => res.json())
    .then(imageInfo => {
      // display image
      imageTag.setAttribute('src', imageInfo.url)
      imageTag.setAttribute('data-id', imageInfo.id)

      // display name
      nameH4.innerText = imageInfo.name

      // display likes
      likesSpan.innerText = imageInfo.like_count

      // display comments
      const sortedComments = imageInfo.comments.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at)
      })
      sortedComments.forEach((comment) => {
        displayComment(comment)
        // displayComment(comment.content)
      })
    })

/////////////////////////////////
///////////////////////////////// LIKES + delete
/////////////////////////////////
  // optimistic vs pessimistic? (does pessimistic always require page refresh?)

  // add likes event listener and delete event listeners TO DOCUMENT
  document.addEventListener('click', (event) => {
    if (event.target.id === 'like_button') {
      let likes = parseInt(likesSpan.innerText)
      likes++

      // BACKEND
      fetch(likeURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          like_count: likes
        })
      })

      // FRONTEND
      likesSpan.innerText = likes
    }
    else if (event.target.className === 'delete-button') {
      const commentLi = event.target.parentElement

      // BACKEND
      fetch(`${commentsURL}${commentLi.id}`, {
        method: 'DELETE'
      })

      // FRONTEND
      commentsUl.removeChild(commentLi)

    }
  })


/////////////////////////////////
///////////////////////////////// COMMENTS
/////////////////////////////////
  // Filling out the input and clicking 'Submit' should append your new comment as an <li> to the comments unordered list element. You should also clear out the comment input, so it's an empty field for the next comment to be added.

  const commentForm = document.querySelector('#comment_form')
  const commentInput = document.querySelector('#comment_input')

  commentForm.addEventListener('submit', (event) => {
    event.preventDefault()


    // BACKEND
    // PESSIMISTIC RENDERING; NO FRONTEND
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentInput.value
      })
    })
      .then(res => res.json())
      .then(displayComment)

    // FRONTEND

    commentForm.reset()
  })

  ///////////////////// HELPERS

  function displayComment(comment) {
    const commentLi = document.createElement('li')
    commentLi.id = comment.id
    commentLi.innerHTML = `
      <span>${comment.content}</span>
      <button class='delete-button'>Delete</button>
    `
    commentsUl.prepend(commentLi)
  }
})
