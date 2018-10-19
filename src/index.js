document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1203 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // step 1: get image data and render to page ✅
  fetch(imageURL)
  .then( (response) => {
    return response.json()
  })
  .then( (json) => {
    renderImgData(json)
    // step 2: add like feature (frontend) ✅
    addLikeListener(likeURL, imageId)
    // step 4: add comment listener (frontend) ✅
    addCommentListener(commentsURL, imageId)
    // step 6: add delete listener ✅
    addDeleteListener(commentsURL)
  })
})

function renderImgData(json) {
  const img = document.getElementById('image')
  img.setAttribute('src', json.url)
  img.setAttribute('data-id', json.id)

  const name = document.querySelector('h4')
  name.innerText = json.name

  const likes = document.getElementById('likes')
  likes.innerText = json.like_count

  const commentList = document.getElementById('comments')
  const comments = createCommentsFromJSON(json)
  attachCommentsToPage(comments)
}

function attachCommentsToPage(comments) {
  const commentList = document.getElementById('comments')
  comments.forEach( (comment) => {
    commentList.appendChild(comment)
  })
}

function createCommentsFromJSON(json) {
  return json.comments.map( (comment) => {
    return createCommentHTML(comment)
  })
}

function createCommentHTML(comment) {
  const li = document.createElement('li')
  li.setAttribute('data-comment-id', comment.id)
  li.setAttribute('class', 'comment')
  li.innerText = comment.content

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'delete'
  deleteBtn.innerText = 'Delete'
  li.appendChild(deleteBtn)

  return li
}

function addLikeListener(likeURL, imgId) {
  const likeBtn = document.getElementById('like_button')
  likeBtn.addEventListener('click', (event) => {
    const likes = getLikes()
    document.getElementById('likes').innerText = likes + 1
    // step 3: make likes persist in backend ✅
    sendLikeUpdate(likeURL, imgId)
  })
}

function sendLikeUpdate(likeURL, imgId) {
  fetch(likeURL, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    'body': JSON.stringify({
      'image_id': imgId
    })
  })
}

function getLikes() {
  return parseInt(document.getElementById('likes').innerText)
}

function addCommentListener(commentsURL, imgId) {
  const textBox = document.querySelectorAll('input')[0]
  const submitBtn = document.querySelectorAll('input')[1]
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const text = textBox.value
    if (text !== '') {
      const li = createCommentHTML({'content': text})
      attachCommentsToPage([li])
      textBox.value = ''
      // step 5: comment persistence ✅
      sendCommentRequest(commentsURL, imgId, text)
    }
  })
}

function sendCommentRequest(commentsURL, imgId, commentText) {
  fetch(commentsURL, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    'body': JSON.stringify({
      'image_id': imgId,
      'content': commentText
    })
  })
  .then( (response) => {
    return response.json()
  })
  .then( (json) => {
    addIdToLastComment(json)
  })
}

function addIdToLastComment(responseJSON) {
  const comments = document.querySelectorAll('.comment')
  const lastComment = comments[comments.length - 1]
  lastComment.setAttribute('data-comment-id', responseJSON.id)
}

function addDeleteListener(commentsURL) {
  const container = document.getElementsByClassName('container')[0]
  container.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'delete') {
      const id = parseInt(e.target.parentElement.getAttribute('data-comment-id'))
      e.target.parentElement.remove()
      sendDeleteCommentRequest(commentsURL, id)
    }
  })
}

function sendDeleteCommentRequest(commentsURL, commentId) {
  fetch(commentsURL + `/${commentId}`, {
    'method': 'DELETE',
    'headers': {
      'Accept': 'application/json'
    }
  })
}
