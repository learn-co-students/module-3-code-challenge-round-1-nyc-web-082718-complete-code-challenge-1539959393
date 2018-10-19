document.addEventListener('DOMContentLoaded', () => {
  console.log('%c The wheel of fate is turning', 'color: red')
  const pic = document.getElementById('image')
  const picname = document.getElementById('name')
  const likes = document.getElementById('likes')
  const commentList = document.getElementById('comments')
  const likeButton = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')

  let imageId = 1199 //Enter the id from the fetched image here

  let imageURL = "https://randopic.herokuapp.com/images/1199"
  fetch(`${imageURL}`).then(res => res.json()).then(json => {
    pic.src = json["url"]
    picname.innerText = json["name"]
    likes.innerText = json["like_count"]
    for (comment of json["comments"]){
      commentList.innerHTML += `<li>${comment.content}</li>`
      commentList.lastElementChild.innerHTML += `<button data-id=${comment.id} class="unmake">Delete</button>`
    }
  })

  document.addEventListener("click", (event) =>{
    if (event.target === likeButton){
    likes.innerText = Number(likes.innerText)+1
    fetch('https://randopic.herokuapp.com/likes', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id:`${imageId}`
      })
    })
    }
    else if(event.target === commentForm.lastElementChild){
      event.preventDefault()
      let commentField = document.getElementById('comment_input')
      commentList.innerHTML += `<li>${commentField.value}</li>`
      fetch('https://randopic.herokuapp.com/comments', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id:`${imageId}`,
          content: `${commentField.value}`
        })
      }).then(res => res.json()).then(res => {
        commentList.lastElementChild.innerHTML += `<button data-id=${res.id} class="unmake">Delete</button>`
      })
      commentField.value = ""
    }
    else if(event.target.className === "unmake"){
      fetch(`https://randopic.herokuapp.com/comments/${event.target.dataset.id}`, {
        method: "DELETE"
      })
      event.target.parentNode.parentNode.removeChild(event.target.parentNode)
    }
  })

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})
