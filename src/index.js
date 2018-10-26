document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1296 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/1296`
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
    fetch('https://randopic.herokuapp.com/images/1296')
      .then(res => res.json())
      .then(image => {
        imageLocation.src = image.url
        imageName.innerText = image.name
        imageLikes.innerText = image.like_count
        image.comments.forEach((comment) => {
          displayComment(comment.content)
        })
      })

      res => res.json() => res.json().url or res.json().name
  } // END OF function displayImage()


  likeButton.addEventListener('click', (event) => {
    like()
  })

  function like() {
    // FRONTEND
    let likeCount = parseInt(imageLikes.innerText)
    ++likeCount
    imageLikes.innerText = likeCount

    //BACKEND
    fetch('https://randopic.herokuapp.com/likes/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: 1296,
        likes: likeCount
      })
    })

  } // END OF function like()


  commentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    inputComment()
  })

  function inputComment() {
    displayComment(commentInput.value)

    fetch('https://randopic.herokuapp.com/comments/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: 1296,
        content: commentInput.value
      })
    })

    commentInput.value = ''

  } // END OF function inputComment

  function displayComment(str) {
    let commentLi = document.createElement('li')
    commentLi.innerText = str
    commentList.appendChild(commentLi)
  }


}) // END OF DOMContentLoaded
