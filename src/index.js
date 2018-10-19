let like_count

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1201

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likeButton = document.getElementById("like_button")
  const likes = document.getElementById("likes")
  const title = document.getElementById("name")
  const imageLocation = document.getElementById("image")
  const comments = document.getElementById("comments")
  const commentForm = document.getElementById("comment_form")







  //Step 1 - Get the Image Data
const getImage = () => {

  fetch('https://randopic.herokuapp.com/images/1201')
  .then(res => res.json())
  .then(json => {
    createImage(json)}
  )
}

const createImage = (image) => {

  imageLocation.src = image.url
  imageLocation.id = image.id
  title.innerText = image.name
  likes.innerText = image.like_count
  likeButton.id = image.id
  like_count = image.like_count

  image.comments.forEach((comment) => {
    const deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"
    const li = document.createElement('li')
    li.innerText = comment.content
    li.id = comment.id
    li.appendChild(deleteButton)
    comments.appendChild(li)
  })
}



//The next feature to approach is the functionality to add likes to a picture. First get this working in the browser only without worrying about persistence.

//Clicking the 'Like' button should increase the number of likes by one.

//A user can like the same picture multiple times.
likeButton.addEventListener('click', function(event) {
  event.preventDefault()
  like_count++
  likes.innerText = like_count


  fetch('https://randopic.herokuapp.com/likes', {
    'method': 'POST',
    'body': JSON.stringify({
      image_id: imageId,
      likes: like_count
    }),
    'headers':
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
})

commentForm.addEventListener('submit', function(event) {
  event.preventDefault()
  const commentText = event.target.querySelector("input").value

  fetch('https://randopic.herokuapp.com/comments', {
    'method': 'POST',
    'body': JSON.stringify({
      image_id: imageId,
      content: commentText
    }),
    'headers':
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json)
  .then(res => console.log(res))

    // postComment(commentText)
  event.target.querySelector("input").value = ''
  comments.innerHTML = ''
  getImage()
})



const postComment = (commentText) => {
  const li = document.createElement('li')
  li.innerText = commentText
  comments.appendChild(li)
}

const deleteComment = (comment) => {
  debugger
}

getImage()
})
