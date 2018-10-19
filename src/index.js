const fetchImg = (imageURL) => {
  fetch(imageURL)
  .then(resp => resp.json())
  .then(imageJSON => {
    showImgInfo(imageJSON);
  })
}

const showImgInfo = (imageInfo) => {
  const imageCard = document.getElementById('image_card');
  const image = document.getElementById('image');
  image.src = imageInfo.url;
  image.dataset.id = imageInfo.id;
  imageCard.querySelector('h4').innerText = imageInfo.name;
  imageCard.querySelector('span').innerText = imageInfo.like_count;
  let commentsBody = imageInfo.comments
  .sort((comment1, comment2) => comment1.id > comment2.id)
  .map(cmt => liComment(cmt)).join('');
  imageCard.querySelector('#comments').innerHTML = commentsBody;
}

const liComment = (comment) => {
  return `<div data-id="${comment.id}" data-imageid="${comment.image_id}">
  <li style="display: inline-block">${comment.content}</li>
  <button name="button" style="display: inline-block" onClick="remove(this)">🗑</button>
  </div>`;
}

const remove = (btn) => {
  const comment = btn.parentElement;
  fetch(`https://randopic.herokuapp.com/comments/${comment.dataset.id}`, {
    method: 'DELETE'
  })
    .then(() => {
      const bye = document.querySelector(`[data-id="${comment.dataset.id}"]`);
      bye.parentElement.removeChild(bye);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  let imageId = 1205;
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  fetchImg(imageURL);

  document.getElementById('like_button').addEventListener('click', event => {
    // optimistically render new like count
    const newLikeCount = parseInt(event.target.parentElement.querySelector('span').innerText) + 1;
    document.getElementById('image_card').querySelector('span').innerText = newLikeCount;
    // update, like, to server
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_id: imageId
      })
    });
  }); // end, like, eventlistener;

  document.getElementById('comment_form').addEventListener('submit', event => {
    event.preventDefault();

    // optimistically render new comment
    const newCommentBody = event.target.comment.value;
    const tempNewCmt = {
      image_id: imageId,
      content: newCommentBody
    };
    document.getElementById('comments').innerHTML += liComment(tempNewCmt);

    // update new comment to server
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tempNewCmt)
    });

    event.target.reset();
  }) // end new comment eventlistener
})
