let imageId = 1197 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  getFetch(imageURL)
})

document.addEventListener("submit", e=>{
  e.preventDefault()
  if (e.target.id === "comment_form") {
    submitComment(e.target.children[0].value)
  }
  e.target.reset()
})

document.addEventListener("click", e=>{
  if (e.target.id === "like_button") {
    addLike(e.target.parentElement)
  } else if (e.target.innerHTML === "Delete") {
    deleteComment(e.target.parentElement)
  }
})

const getFetch = (APILink) => {
  fetch(`${APILink}`)
    .then(res => res.json())
    .then(parsed => renderImage(parsed))
}

const renderImage = (imgObj)=>{
  document.querySelector("img").src = `${imgObj.url}`
  document.querySelector("span").innerHTML += `<span id="likes">${imgObj.like_count}</span>`
  document.querySelector("#name").innerHTML += `${imgObj.name}`
  displayComments(imgObj.comments)
}

const displayComments = (comments)=>{
  // debugger
  comments.forEach(comment=>{
    document.querySelector("ul").innerHTML+= `<li id="${comment.id}"><button>Delete</button> ${comment.content}</li>`
  })
}

const submitComment = (input)=>{
  document.querySelector("ul").innerHTML+= `<li id=""><button>Delete</button>${input}</li>`
  fetch("https://randopic.herokuapp.com/comments",{
    method: "POST",
    headers:{'Accept': 'application/json',
    'Content-Type': 'application/json'},
    body: JSON.stringify({
      "image_id": imageId,
      "content": input
    })
  }).then(res => res.json())
    .then(parsed=> document.querySelector("ul").lastElementChild.id=parsed.id)
}

const addLike=(likeDiv)=>{
  let currentLikes = parseInt(likeDiv.querySelector("#likes").innerText)
  likeDiv.querySelector("#likes").innerText = currentLikes+ 1
  fetch("https://randopic.herokuapp.com/likes",{
    method: "POST",
    headers:{'Accept': 'application/json',
    'Content-Type': 'application/json'},
    body: JSON.stringify({
      "image_id": imageId
    })
  })
}

const deleteComment = (comment)=>{
  // debugger
  comment.remove()
  fetch(`https://randopic.herokuapp.com/comments/`+comment.id,{
    method: "DELETE"
  })
}
