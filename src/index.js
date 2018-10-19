document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1200 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const loadImage = () => {
    fetch(imageURL)
      .then(response => response.json())
      .then(json => {
          formatImage(json)
      })
   }  // load images end

  loadImage()

  const formatImage = (image) => {
    const imageContainer = document.getElementById('image-card')
    const imagePic = document.getElementById('image')
    const imageName = document.getElementById('name')
    const imageLikes = document.getElementById('likes')
    const imageComments = document.getElementById('comments')

    imagePic.src = image.url
    imageName.innerText = image.name
    imageLikes.innerText = image.like_count
    imageComments.innerText = image.comments[0].content
    // comments hardcoded to first because there is only one comment by default
    imagePic.id = image.id
    // assigned image id to id instead of 'data-id'
    // debugger
  } // format images end

  document.addEventListener('click', (e) => {
      console.log(e.target);
      const likeButton = document.getElementById('like_button')
      const likeSpan = document.getElementById('likes')
      let likesNumber = likeSpan.innerText

      if (e.target === likeButton) {
        // debugger
        ++likesNumber
        likeSpan.innerText = likesNumber
      } // end conditional

      const editLikes = () => {
        const theLikeButton = document.getElementById('like_button')

        fetch('https://randopic.herokuapp.com/likes', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, // end headers
          body: JSON.stringify({
            'image_id': theLikeButton.parentElement.firstElementChild.id,
            'like_count': theLikeButton.parentElement.children[2].children[0].innerText
          }), // end body
        }) // end fetch
          .then(response => response.json())
          .then(console.log) // to check return object, new like with image id
       } // func edit likes end

      editLikes()

  }) // click event listener end

  // didn't have time to add comment feature. I would have added an event listener for 'submit' and set a post request up to trigger when the comments form was submitted to create a new comment that belongs to this image (e.g. pass it the image_id in post request so it knows which image is it's parent). I would do that similarly to the likes post request above. I would also optimisticallt render the comment by adding it to the inner text of image comments.

}) // dom content loaded event listener end
