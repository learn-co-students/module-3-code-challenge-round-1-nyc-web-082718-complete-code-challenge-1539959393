// use a GET request to Fetch the image information
// render the image information on the page using the HTML template provided
//add an event listener to the Like button that will increase the likes by 1 and send a PATCH request to the API with the added like
// add an event listener to the comments form that will render a new comment to the page and send a POST request to the server with that comment's information and the image id

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1219 //Enter the id from the fetched image here

  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(response => response.json())
  .then((imageResponse) => {
    // addImageToPage(imageResponse)
    const imageHTML = document.getElementById("image")
    imageHTML.src = imageResponse.url

    const likesSpan = document.getElementById("likes")
    likesSpan.innerText = imageResponse.like_count

    let likeCount = imageResponse.like_count

    const imageComments = document.getElementById("comments")

    let imageResponseComments = imageResponse.comments

    imageResponseComments.forEach( (comment) => {
      const commentLi = document.createElement("li")
      commentLi.innerText = comment.content
      imageComments.appendChild(commentLi)
    })

    const likeButton = document.getElementById("like_button")

    likeButton.addEventListener("click", (event) => {

      eventLikeCount = likeCount += 1

      likesSpan.innerText = eventLikeCount

      fetch(`likeURL`, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: imageId,
          image_id: imageId,
          like_count: eventLikeCount
        })

      })// end of Like PATCH fetch

    }) // end of Like Button event listener

    // Add comments
    const commentForm = document.getElementById("comment_form")
    const commentFormInput = document.getElementById("comment_input")
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault()
      const commentLi = document.createElement("li")
      const commentText = commentFormInput.value
      commentLi.innerText = commentText

      imageComments.appendChild(commentLi)

      fetch(`commentsURL`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "comments": [
            {
              image_id: imageId,
              content: commentText
            }
          ]
        })
      })

      event.target.reset()

    })


  }) // end of initial Fetch THEN

  /// Sussidiary fethces do NOT work !!!!

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})
