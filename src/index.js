//  I will see an image
// any comments that image has
// number of likes that image has.
// I can click to like an image
// I can fill out an input fields and submit the form to add a comment
// should be persisted

// Append to dom
// the image url
// the image name
// the number of likes
// any comments in an unordered list

//get the elements
const imageCard = document.getElementById('image_card')
let imgSrc = document.getElementById('image')
let imgLike = document.getElementById('likes')
let imgName = document.getElementById('name')
let imgComments = document.getElementById('comments')

// local Database
let myImage


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1202 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  displayImage = (respoJson) => {
    myImage = respoJson
    //src
    imgSrc.src = myImage.url

    // like
    imgLike.innerText = myImage.like_count

    //name
    imgName.innerText = myImage.name

    //comments
    myImage.comments.map(comment => {
      let newComment = document.createElement('li')
      newComment.innerText = comment.content
      imgComments.appendChild(newComment)
    })
  } //end of displayImage

  addLikeToDom = (event) => {
    myImage.like_count += 1
    imgLike.innerText = myImage.like_count
    addLikeToDatabase(event)
  }

  imageCard.addEventListener('submit', (event) => {
    event.preventDefault()
    addCommentToDom(event)
  }) //end of event addEventListener

  addCommentToDom = (event) => {
    let comment = document.getElementById('comment_input')
    let newComment ={
      id: 1202,
      content: comment.value,
      image_id: imageId,
    }
    myImage.comments.push(newComment)
    imgComments.innerHTML = ""
    myImage.comments.map(comment => {
      let newComment = document.createElement('li')
      newComment.innerText = comment.content
      imgComments.appendChild(newComment)
      addCommentToDB(event)
    })
  }




  document.addEventListener('click', (event) => {
    if (event.target.id === "like_button") {
      // debugger
      addLikeToDom(event)
    }
  }) //end addEventListener

  addLikeToDatabase = (event) => {
    fetch('https://randopic.herokuapp.com/likes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    }) //end of fetch
    .then(respo => respo.json())
    .then(jsonRes => console.log(jsonRes))
  } // end of add to DB

  addCommentToDB = (event) => {
    comm = myImage.comments.pop()
    // debugger
    fetch('https://randopic.herokuapp.com/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: comm
      })
    })
    .then(res => res.json())
  }




  //get Image
  fetch(imageURL)
    .then(respo => respo.json())
    .then(respoJson => displayImage(respoJson))

})
