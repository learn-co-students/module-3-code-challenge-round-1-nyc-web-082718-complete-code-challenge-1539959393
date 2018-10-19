document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1216 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  //fetch image
  let getImage = document.getElementById('image')
  let getHeader = document.querySelector('h4')
  let getLikes = document.getElementById('likes')
  let getComments = document.getElementById('comments')
  let getLikeButton = document.getElementById('like_button')
  let getCommentInput = document.getElementById('comment_input')
  let getSubmit = document.querySelectorAll('input')[1]

  fetch(imageURL)
    .then( resp => resp.json() )
    .then( parsedResp => {

      let image = parsedResp
      let commentsArray = image.comments

      getImage.src = image.url
      getHeader.innerText = image.name
      getLikes.innerText = image.like_count

      commentsArray.forEach((comment) => {
        getComments.innerHTML += `<li>${comment.content} || <button>Delete!</button></li>`
      })

      getLikeButton.addEventListener('click', (event) => {

        let incrementLikes = ++image.like_count
        getLikes.innerText = incrementLikes


        fetch(likeURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image_id: imageId
          })
        })

      })

      getSubmit.addEventListener('click', (event) => {

        event.preventDefault()

        let userComment = getCommentInput.value

        getComments.innerHTML += `<li>${userComment} || <button>Delete!</button></li>`

        fetch(commentsURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image_id: imageId,
            content: userComment
          })
        })

        getCommentInput.value = ''

      })

      getComments.addEventListener('click', (event) => {

        if (event.target && event.target.nodeName === 'BUTTON') {
          event.target.parentElement.remove()

        }

      })


      // getImage.dataId =


    })

})
