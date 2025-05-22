const currentUser = {
  username: "Freedom Wall ng Batch Uncensored",
  profilePic: "Images/default-img.png"
};

let postCounter = 1000;
let replyingTo = null;

document.getElementById("post-button").addEventListener("click", function () {
  const input = document.getElementById("post-input");
  const message = input.value.trim();

  if (!message) {
    alert("Please write a message")
    return
  };

  const postID = `FWBU#${postCounter++}`;

  if (replyingTo) {
    const replyToID = replyingTo.getAttribute("data-id");
    const fullMessage = `reply to <span class="repID">${replyToID}</span> ${message}`;
    const repliesContainer = replyingTo.querySelector(".replies");

    addReply(fullMessage, currentUser, repliesContainer, postID);
    replyingTo = null;
    input.placeholder = "Write your message...";
  } else {
    addPost(message, currentUser, postID);
  }

  getHeights();
  expand();
  input.value = "";
});

function addPost(message, user, postID) {
  const container = document.getElementById("posts-container");
  const postDiv = createPostOrReply(message, user, postID);
  container.prepend(postDiv);
}

function addReply(message, user, replyContainer, postID) {
  const replyDiv = createPostOrReply(message, user, postID);
  replyContainer.prepend(replyDiv);

  const mainContainer = document.getElementById("posts-container");
  mainContainer.prepend(replyDiv);
}

// Core function that creates both posts & replies (recursive support)
function createPostOrReply(message, user, postID) {
  const postDiv = document.createElement("div");
  postDiv.className = "post";
  postDiv.setAttribute("data-id", postID);
  postDiv.setAttribute("id", postID);

  postDiv.innerHTML = `
    <div class="user-info">
      <img src="Images/default-img.png" alt="Profile Picture">
      <div class="username">Freedom Wall ng Batch Uncensored</div>
      <button class="reply-button" type="button"><span class="material-symbols-outlined">reply</span></button>
      <button class="flag-button" type="button"><span class="material-symbols-outlined">flag</span></button>
    </div>
    <div class="message"><span class="postID">${postID}</span> ${message}</div>
    <div class="replies"></div>
  `;


  postDiv.querySelector(".reply-button").addEventListener("click", function () {
    replyingTo = postDiv;
    document.getElementById("post-input").placeholder = `Replying to ${postID}...`;
    postInput.focus();
    // document.getElementById("post-input").focus();
  });

   postDiv.querySelector(".postID").addEventListener("click", function () {
    replyingTo = postDiv;
    document.getElementById("post-input").placeholder = `Replying to ${postID}...`;
    postInput.focus();
    // document.getElementById("post-input").focus();
  });

  return postDiv;
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("repID")) {
    const targetID = e.target.textContent.trim();
    const targetPost = document.getElementById(targetID);
    if (targetPost) {
      targetPost.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } 
})

// keith part
function getHeights() {
  const message = document.getElementsByClassName('message');
  for (e of message){
      const height = e.getBoundingClientRect().height;
      console.log(height);
      if (height > 200 && !e.classList.contains("expandable")){
        e.classList.add("expandable");
        e.classList.add("collapse");
      }
  }
}

function expand() {
  const expandMessage = document.getElementsByClassName("expandable");
  console.log(expandMessage);
  for (i of expandMessage) {
    const test = i;

    if (!test.classList.contains("fixed")) {
      test.classList.add("fixed");

      test.addEventListener("click", function (){
        if (test.classList.contains("collapse")){
          test.classList.remove("collapse")
        } else if (!test.classList.contains("collapse")){
          test.classList.add("collapse");
        }
      });
    }
  }
}