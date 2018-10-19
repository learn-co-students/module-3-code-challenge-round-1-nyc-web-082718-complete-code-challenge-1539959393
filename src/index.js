let likeCount

// LOAD CONTENT START ---
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1214 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // const loadPage = () => {
  //   fetch(imageURL)
  //     .then(resp => resp.json())
  //     .then(imageJSON => {
  //       document.getElementById('image_card').innerHTML = imageJSON.map(image => makeImageCard(image))
  //     })
  // }
  //
  // loadPage()

  // Discouraging.
})

  likeCount = document.getElementById('likes').innerText
// --- LOAD CONTENT END

// MAKE IMAGE CARD START ---
const makeImageCard = (image) => {
  return `

         `
// This is where I would have put the image
}
// --- MAKE IMAGE CARD END

// LIKE IMAGE CARD START ---
const incrementLike = () => {
  likeCount = ++likeCount
}

document.addEventListener('click', (event) => {
  incrementLike()

  if (event.target.id === 'like_button') {
    fetch('https://randopic.herokuapp.com/likes/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: 1214
      })
    })

    document.getElementById('likes').innerText = likeCount
  }
})
// --- LIKE IMAGE CARD END

document.addEventListener('click', (event) => {

  if (event.target.id === 'submit') {
    event.preventDefault()
    fetch('https://randopic.herokuapp.com/comments/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: 1214,
        content: 'placeholder content'
      })
    })

    // Here is where I would append the comment.
  }
})
