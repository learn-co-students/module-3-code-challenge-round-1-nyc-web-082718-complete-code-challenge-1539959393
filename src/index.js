document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1206 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImageData(imageURL)
  addEventListenerForLike(likeURL, imageId)
  addEventListenerForSubmit(commentsURL, imageId)
})

function getImageData(imageURL) {
  fetch(imageURL)
    .then(response => response.json())
    .then(json => makeImageHTML(json))
}//end of function

function makeImageHTML(imageObj) {
  //debugger
  //grab img tag to enter src attribute of url
  const imgTag = document.getElementById('image')
  imgTag.setAttribute('src', imageObj.url)
  imgTag.setAttribute('data-id', `${imageObj.id}`)

  const imageName = document.getElementById('name')
  imageName.innerText = imageObj.name

  const imageLikes = document.getElementById('likes')
  imageLikes.innerText = imageObj.like_count

  makeCommentsHTML(imageObj)

}//end of function

function makeCommentsHTML(imageObj) {
  // debugger
  const imageCommentsList = document.getElementById('comments')
  const imageComments = imageObj.comments
  const commentLi = document.querySelector('li')

  for (const comment of imageComments) {
    const newCommentLi = document.createElement('li')
    newCommentLi.innerText = comment.content
    imageCommentsList.appendChild(newCommentLi)
  }
}//end of function

function addEventListenerForLike(likeURL, imageId) {
  const likeBtn = document.getElementById('like_button')

  likeBtn.addEventListener('click', event => {
    //get span tag and save to const so you can increment it on click event
    const imageLikes = document.getElementById('likes')
    let likeCount = imageLikes.innerText
    ++likeCount

    //fetch and post like to the database
    fetch(likeURL, {
      'method': 'POST',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify({
        'image_id': imageId,
      })
    })
    .then(response => response.json())
    .then(json => console.log(json))
  })

}//end of function

function addEventListenerForSubmit(commentsURL, imageId) {

  const newForm = document.getElementById('comment_form')

  newForm.addEventListener('submit', event => {
    event.preventDefault()

    const commentInput = document.getElementById('comment_input').value
    const imageCommentsList = document.getElementById('comments')

    const newCommentLi = document.createElement('li')
    newCommentLi.innerText = commentInput
    imageCommentsList.appendChild(newCommentLi)

    const clearForm = document.getElementById('comment_input')
    clearForm.value = ''

    //fetch and post the new comment to the database
    fetch(commentsURL, {
      'method': 'POST',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify({
        'image_id': imageId,
        'content': commentInput
      })
    })
    .then(response => response.json())
    .then(json => console.log(json))
  })
}//end of function
