/// DID NOT KNOW WHAT TO DO WITH THE /likes/, /comments/ LINKS......... README DID NOT EVEN MENTION IT..........................................

// COULD NOT FINISH BACKEND POSTING AS A RESULT......................








document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1198 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/1198`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageLocation = document.getElementById('image')

  const imageName = document.getElementById('name')

  let imageLikes = document.getElementById('likes')

  const likeButton = document.getElementById('like_button')

  const commentForm = document.getElementById('comment_form')

  const commentList = document.getElementById('comments')

  const commentInput = document.getElementById('comment_input')


  displayImage()
  function displayImage() {
    fetch(imageURL)
      .then(res => res.json())
      .then(image => {
        imageLocation.src = image.url
        imageName.innerText = image.name
        imageLikes.innerText = `${image.like_count}`
        image.comments.forEach((comment) => {
          commentList.innerText = `${comment.content}`
        })
      })
  } // END OF function displayImage()



  listenForLikes()
  function listenForLikes() {
    likeButton.addEventListener('click', (event) => {
      let likeCount = parseInt(imageLikes.innerText)
      ++likeCount
      imageLikes.innerText = likeCount
    })

  } // END OF function listenForLikes()


  // fetch(likeURL, {
  //   method: "PATCH",
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     image_id: 1198
  //   })
  // })
  //   .then(res => res.json())
  //   .then()








  inputComment()
  function inputComment() {
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault()
      let commentLi = document.createElement('li')
      commentLi.innerText = `${commentInput.value}`
      commentList.appendChild(commentLi)
      commentForm.reset()
    })



  //   fetch(commentsURL, {
  //     method: 'PATCH',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       image_id: 1198,
  //       content: commentInput.value
  //     })
  //   })
  //   .then()
  // } END OF function inputComment()



  function commentSubmitHandler() {

  }









}) // END OF DOMContentLoaded
