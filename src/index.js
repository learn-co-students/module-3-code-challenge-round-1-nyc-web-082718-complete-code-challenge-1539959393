let likeCount

// LOAD CONTENT START ---
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1214 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const loadPage = () => {
    fetch(imageURL)
      .then(resp => resp.json())
      .then(imageJSON => inputData(imageJSON))
  }
  loadPage()

  function inputData(image) {
    document.getElementById('image').src = image.url
    document.getElementById('name').innerHTML = image.name
    document.getElementById('likes').innerHTML = image.like_count
    likeCount = image.like_count
    addComments(image)
  }
  const addComments = (image) => {
    document.getElementById('comments').innerHTML = ''
    document.getElementById('comments').innerHTML = image.comments.sort((c1, c2) => c1.id > c2.id).map(comment => {
      return `<li>${comment.content}</li>
      <button class='delete' id='${comment.id}'>Delete Comment</button>
      `
    }).join('')
  }
  // LIKE IMAGE CARD START ---
  const incrementLike = () => {
    likeCount = ++likeCount
  }

  document.addEventListener('click', (event) => {
    incrementLike()

    if (event.target.id === 'like_button') {
      fetch(likeURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId
        })
      })

      document.getElementById('likes').innerText = likeCount
    }
  })
  // --- LIKE IMAGE CARD END

  // ADD COMMENT START ---
  document.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.type === 'submit') {
      const commentContent = document.getElementById('comment_input').value

      fetch(commentsURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          content: commentContent
        })
      }).then(runLoadPage => loadPage())

      event.target.parentElement.firstElementChild.value = ''
    }
  })
  // --- ADD COMMENT END

  // DELETE IMAGE START ---
  document.addEventListener('click', (event) => {
    if (event.target.className === 'delete') {

      fetch(`https://randopic.herokuapp.com/comments/${event.target.id}`, {
        method: 'DELETE',
      }).then(runLoadPage => loadPage())
    }
  })
  // --- DELETE IMAGE END

})
// --- LOAD CONTENT END
