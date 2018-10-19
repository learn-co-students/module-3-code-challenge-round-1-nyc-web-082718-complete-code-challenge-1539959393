document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1213 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likeCount = document.getElementById('likes')
  const likeButton = document.getElementById('like_button')

  const commentsList = document.getElementById('comments')

  const commentForm = document.getElementById('comment_form')
  const commentInput = document.getElementById('comment_input')

  // let numberOfLikes = 0
  // //// LIKES ////
  // // Fetch likes from json
  // // Set HTML to those likes
  //
  function fetchLikes() {
    fetch('https://randopic.herokuapp.com/images/1213')
      .then(resp => resp.json())
      .then(parsedJSON => {
        addLikesToHTML(parsedJSON)
      })
  }
  function addLikesToHTML(parsedJSON) {
    likeCount.innerHTML = parsedJSON.like_count
    // likeCount.innerHTML = numberOfLikes
  }

  fetchLikes()
  //
  // likeButton.addEventListener('click', event => {
  //   // event.preventDefault()
  //   // debugger
  //   numberOfLikes += 1
  //   // debugger
  //   fetch('https://randopic.herokuapp.com/images/1213', {
  //     'method': 'PATCH',
  //     'headers': {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     'body': JSON.stringify({
  //       'like_count': numberOfLikes
  //     })
  //   })
  // })
  //

  // Add event listener to like button
  // Increment like variable by 1
  // PATCH likes in db to new value


  function fetchComments() {
    fetch('https://randopic.herokuapp.com/images/1213')
      .then(resp => resp.json())
      .then(parsedJSON => {
        const comments = parsedJSON.comments
        for (comment of comments) {
          const individualComment = document.createElement('li')
          individualComment.innerText = comment.content
          commentsList.appendChild(individualComment)
        }
      })
  }

  fetchComments()

  // commentForm.addEventListener



  // Well... bogged down by bugs and the like button forever.
  // Obviously what I'd do next is add an event listener to the form listening for the submit.
  // I'd then 


})
