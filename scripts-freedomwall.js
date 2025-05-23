const currentUser = {
  username: "Freedom Wall ng Batch Uncensored",
  profilePic: "Images/default-img.png"
};

let replyingTo = null;

// Load existing posts when the page loads
window.onload = loadPosts;

function loadPosts() {
  fetch('freedomwall.php?fetch=posts')
    .then(res => res.json())
    .then(data => {
      const postContainer = document.getElementById('posts-container');
      postContainer.innerHTML = '';

      for (let i = data.length - 1; i >= 0; i--) {
        const post = data[i];
        let message = post.content;

        if (post.reply_to) {
          message = `reply to <span class="repID">FWBU#${post.reply_to}</span> ${message}`;
        }
        
        addPost(message, currentUser,`FWBU#${post.postID}`);
      };
    })
    .catch(err => {
      console.error("Failed to load posts:", err);
      alert("Failed too load posts");
    });
}

document.getElementById("post-button").addEventListener("click", function () {
  const input = document.getElementById("post-input");
  const message = input.value.trim();

  if (!message) {
    alert("Please write a message");
    return;
  }

  const bodyParameter = replyingTo
    ? `content=${encodeURIComponent(message)}&reply_to=${encodeURIComponent(replyingTo.getAttribute("data-id").replace('FWBU#', ''))}`
    : `content=${encodeURIComponent(message)}`;
    
  fetch("freedomwall.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: bodyParameter
  })

    .then(response => response.text())
    .then(text => {
    console.log("RAW RESPONSE:", text); // ✅ This will show if it's HTML or JSON

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      alert("Server did not return valid JSON.");
      return;
    }

    if (data.status === "success") {
      const postID = `FWBU#${data.postID}`;

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
    } else {
      alert("Error posting message.");
    }
    })
    .catch(err => {
      console.error("Error posting to server:", err);
      alert("Network/server error.;")
    });
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

function createPostOrReply(message, user, postID) {
  const postDiv = document.createElement("div");
  postDiv.className = "post";
  postDiv.setAttribute("data-id", postID);
  postDiv.setAttribute("id", postID);

  postDiv.innerHTML = `
    <div class="user-info">
      <img src="${user.profilePic}" alt="Profile Picture">
      <div class="username">${user.username}</div>
      <button class="reply-button" type="button"><span class="material-symbols-outlined">reply</span></button>
      <button class="flag-button" type="button"><span class="material-symbols-outlined">flag</span></button>
    </div>
    <div class="message"><span class="postID">${postID}</span> <span class="content">${message}</span>
    </div>
    <div class="replies"></div>
  `;

  postDiv.querySelector(".reply-button").addEventListener("click", function () {
    replyingTo = postDiv;
    document.getElementById("post-input").placeholder = `Replying to ${postID}...`;
    document.getElementById("post-input").focus();
  });

  postDiv.querySelector(".postID").addEventListener("click", function () {
    replyingTo = postDiv;
    document.getElementById("post-input").placeholder = `Replying to ${postID}...`;
    document.getElementById("post-input").focus();
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
});

// Expandable message feature
function getHeights() {
  const messages = document.getElementsByClassName("message");
  for (const e of messages) {
    const height = e.getBoundingClientRect().height;
    if (height > 200 && !e.classList.contains("expandable")) {
      e.classList.add("expandable", "collapse");
    }
  }
}

function expand() {
  const expandableMessages = document.getElementsByClassName("expandable");
  for (const msg of expandableMessages) {
    if (!msg.classList.contains("fixed")) {
      msg.classList.add("fixed");
      msg.addEventListener("click", function () {
        msg.classList.toggle("collapse");
      });
    }
  }
}