let theMain
const main = document.getElementById('the-main')
const theButton = document.getElementById('like_button')
const theLikes = document.getElementById('likes')
const theForm = document.getElementById('comment_form')
const theInput = document.getElementById('comment_input')
const theComments = document.getElementById('comments')

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1209
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
    theMain = myJson
    const theImage =
    `<div class="container">
      <div class="row" id="image_content">
        <div class="card col-md-4"></div>
          <div id="image_card" class="card col-md-4">
            <img src="${myJson.url}" id="image" data-id="${myJson.id}"/>
            <h4 id="name">${myJson.name}</h4>
            <span>Likes:
              <span id="likes">${myJson.like_count}</span>
            </span>
            <button id="like_button">Like</button>
            <form id="comment_form">
              <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
              <input type="submit" value="Submit"/>
            </form>
            <ul id="comments">
              <li>${myJson.comments[0].content}</li>
            </ul>
          </div>
        <div class="card col-md-4"></div>
      </div>
    </div>`
    main.innerHTML = theImage
  });

  document.addEventListener('click', event => {
    if (event.target.dataset.id) {
      console.log(event)
      let counter = 0
       counter += 1

      theLikes.innerText += counter
    }
  })
  //
  document.addEventListener('submit', function(event) {
    event.preventDefault()
    console.log(theInput.value)

    theComments.innerHTML = theInput.value
  })


})
