document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1218 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImages()

  document.addEventListener('click', (event) => {
    event.preventDefault()

    if (event.target.id === 'like_button') {
      let totalLikes = document.getElementById('likes')
      let numLikes = Number(totalLikes.innerText)
      let newLikes = numLikes + 1
      const imageId = Number(event.target.className)
      fetch('https://randopic.herokuapp.com/likes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_id: imageId,
        })
      })
      totalLikes.innerText = newLikes
    }

    if (event.target.id === 'submitButton') {
      let commentValue = document.getElementById('comment_input').value
      let commentUl = document.getElementById('comments')
      let commentLi = document.createElement('li')
      commentLi.innerText = commentValue
      commentUl.appendChild(commentLi)
      const imageId = Number(event.target.className)
      fetch('https://randopic.herokuapp.com/comments', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_id: imageId,
          content: commentValue,
        })
      })
      event.target.parentElement.reset()
    }

  })

})

function getImages() {
  fetch('https://randopic.herokuapp.com/images/1218')
  .then(results => results.json())
  .then(result => renderImage(result))
}

function renderImage(image) {
  let imageInfo = document.getElementById('image')
  imageInfo.src = image.url
  imageInfo.dataId = image.id
  let imageName = document.getElementById('name')
  imageName.innerText = image.name
  let likeCount = document.getElementById('likes')
  likeCount.innerText = image.like_count
  let likeButton = document.getElementById('like_button')
  likeButton.className = image.id
  let submitButton = document.getElementById('submitButton')
  submitButton.className = image.id
  let commentsArray = image.comments
  let commentsUl = document.getElementById('comments')
  commentsArray.forEach(comment => {
    let commentLi = document.createElement('li')
    commentLi.innerText = comment.content
    commentLi.id = comment.id
    commentLi.ownerId = comment.image_id
    commentsUl.appendChild(commentLi)
  })
}
