document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1210 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageContent = document.getElementById('image_content')
  const imageCard = document.getElementById('image_card')
  const commentsContainer = document.getElementById('comments')
  const commentForm = document.getElementById('comment_form')
  const commentInput = document.getElementById('comment_input')

function fetchImage() {
  fetch('https://randopic.herokuapp.com/images/1210')
  .then(response => response.json())
  .then( imageObj => {
    displayImage(imageObj)
  })
}
fetchImage()


function displayImage(imageObj){
  const imageContainer = document.getElementById('image-container')
  const imageCardDiv = document.createElement('div')

  imageCardDiv.innerHTML = `
    <div class="container">
      <div class="row" id="image_content">
        <div class="card col-md-4"></div>
        <div id="image_card" class="card col-md-4">
          <img src="https://randopic.herokuapp.com/images/1210" id="image" data-id="1210"/>
          <h4 id="name">${imageObj.name}</h4>
          <span>Likes:
            <span id="likes">${imageObj.like_count}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
            <li>${imageObj.comments}</li>
          </ul>
        </div>
        <div class="card col-md-4"></div>
      </div>
    </div>
  `
  imageContainer.appendChild(imageCardDiv)


  const likeButton = imageCardDiv.querySelector('button')

  likeButton.addEventListener('click', event => {
    likeComment(imageObj)
  })

}

function commentEventHandler(){
  commentForm.addEventListener('submit', event => {
    event.preventDefault()
    createComment(commentInput.value)
  })
}
commentEventHandler()


function createComment(comment){
  fetch('https://randopic.herokuapp.com/comments/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: comment,
    })
  }).then(displayImage)
}





})
