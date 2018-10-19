document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1212

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(`${imageURL}`)
  .then(response => response.json())
  .then(image => renderImage(image))
})

const imageHTML = document.getElementById('image')
const imageName = document.getElementById('name')
const imageLikes = document.getElementById('likes')
const imageComments = document.getElementById('comments')

function renderImage(image) {
  imageHTML.src = image.url
  imageHTML.setAttribute('data-id', image.id)
  imageName.innerText = image.name
  imageLikes.innerText = image.like_count
  image.comments.forEach((comment) => {
    const comment2 = document.createElement('li')
    const input = document.getElementById('comment_input')
    comment2.innerText = comment.content
    imageComments.appendChild(comment2)
  })
}

const likeButton = document.getElementById('like_button')

likeButton.addEventListener('click', function(e) {
  imageLikes.innerText = parseInt(imageLikes.innerText) + 1

  fetch('https://randopic.herokuapp.com/likes', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify({
      'image_id': 1212
    })
  })
})

const commentForm = document.getElementById('comment_form')

commentForm.addEventListener('submit', function(e) {
  e.preventDefault()

  const comment = document.createElement('li')
  const input = document.getElementById('comment_input')
  comment.innerText = input.value
  imageComments.appendChild(comment)

  fetch('https://randopic.herokuapp.com/comments', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify({
      'image_id': 1212,
      'content': input.value
    })
  })

})
