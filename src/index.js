// A RandoPic user will be able to do the following things:
//
//
// - As a user I can fill out an input fields and submit the form to add a comment to an image. I should see my new comment below any previous comments.
//
// - As a user, when I refresh the page, any comments or likes I have added should be persisted to the backend API and I should see my changes on the page.
//
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1211 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/${imageId}`

  const commentsURL = `https://randopic.herokuapp.com/comments/${imageId}`

// - As a user, when the page loads I will see an image, any comments that image has, and the number of likes that image has.
  fetch(imageURL)
    .then(function(response) {
      return response.json()
    }) // END OF FIRST FETCH
    .then(function(dataObj) {
      console.log((dataObj))

      const imageSrc = document.getElementById('image')
      imageSrc.dataset.id = dataObj.id
      const nameH4 = document.getElementById('name')
      const likes = document.getElementsByTagName('likes')
      const comments = document.getElementById('comments')

      imageSrc.src = dataObj.url
      nameH4.innerText = dataObj.name
      likes.innerText = dataObj.like_count
      comments.innerText = dataObj.comments[0].content

// - As a user, I can click to like an image, which will increase the number of likes that image has by one.
      const likeButton = document.getElementById('like_button')

      likeButton.addEventListener('click', (event) => {
        const number = event.target.parentElement.children[2].children[0].innerText
        const newNumber = likes.innerText++
        // numberNumber.value === number.value

        fetch((likeURL), {
          method : 'POST',
          headers :
          {
            'Accept' : 'application/json'
            'Content-Type' : 'application/json'
          }
        }) //END OF LIKE addEventListener
      }) //END OF BUTTON addEventListener
    }) // END OF SECOND FETCH


}) // END OF DOM addEventListener
