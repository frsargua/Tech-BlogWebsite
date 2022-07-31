// This is for the dashBoard page

let updatePostButtonEl = $(".updatePostButton");
let updatePostButtonText = $(".updatePostButton").text();
let postTitleEl = $(".blogPostTitle");
let blogPostTitleInputEl = $(".blogPostTitleInput");
let newPostDescriptionEl = $(".newPostDescription");
updatePostButtonEl.click(function () {
  if (updatePostButtonText.trim() == "Update") {
    updatePostButtonEl.text("Done");
    updatePostButtonText = "Done";
    updatePostButtonEl.prop("type", "submit");
    postTitleEl.css({ display: "none" });
    blogPostTitleInputEl.removeClass("d-none").removeAttr("disabled");
    newPostDescriptionEl.removeAttr("disabled");
  } else if (updatePostButtonText.trim() == "Done") {
    updatePostButtonEl.text("Update");
    updatePostButtonText = "Update";
    updatePostButtonEl.prop("type", "");
    postTitleEl.css({ display: "block" });
    blogPostTitleInputEl.addClass("d-none").prop("disabled", true);
    newPostDescriptionEl.prop("disabled", true);
  }
});

function showCreatePostContainer() {
  $("#createPost__container")
    .removeClass("createPost__container--hidden")
    .addClass("createPost__container");
}

function closeCreatePostContainer() {
  $("#createPost__container")
    .removeClass("createPost__container")
    .addClass("createPost__container--hidden");
}

// let updatePostForm = document.getElementById("updatePostCard");
// console.log(updatePostForm);
// updatePostForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const signUpData = new FormData(updatePostForm);
//   let signUpFormProps = Object.fromEntries(signUpData);
//   console.log(signUpFormProps);

// Login fetch request
// const response = await fetch("/api/user/signUp", {
//   method: "POST",
//   body: JSON.stringify(signUpFormProps),
//   headers: { "Content-Type": "application/json" },
// });
// if (response.ok) {
//   window.location.href = "/";
// }
// });

async function signOut() {
  try {
    const response = await fetch("/api/users/signOut", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Error in POST request:", error);
  }
}

let commentFormEl = document.getElementById("commentForm");
if (commentFormEl) {
  commentFormEl.addEventListener("submit", async (e) => {
    e.preventDefault();

    let newComment = new FormData(commentFormEl);
    let newCommentProps = Object.fromEntries(newComment);

    let postId = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );

    const response = await fetch(`/api/comment/${postId}`, {
      method: "POST",
      body: JSON.stringify(newCommentProps),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.href = "/";
    }
  });
}

let mainContainer = $("#posts-container");
mainContainer.on("click", async function (e) {
  let clickedEl = e.target;
  if (clickedEl.hasAttribute("key")) {
    let keyEl = clickedEl.getAttribute("key");
    const something = document
      .querySelectorAll(`[data-key='${keyEl}']`)
      .forEach((el) => {
        el.disabled = false;
      });
    clickedEl.nextElementSibling.classList.remove("d-none");
    clickedEl.classList.add("d-none");
  } else if (clickedEl.hasAttribute("key-send")) {
    let keySendEl = clickedEl.getAttribute("key-send");
    let formEl = document.getElementById(`updateForm${keySendEl}`);
    // formEl.getAttribute("post-id");
    const signUpData = new FormData(formEl);
    let signUpFormProps = Object.fromEntries(signUpData);
    let postId = formEl.getAttribute("post-id");

    const response = await fetch(`/api/post/update/${postId}`, {
      method: "PUT",
      body: JSON.stringify(signUpFormProps),
      headers: { "Content-Type": "application/json" },
    });

    clickedEl.classList.add("d-none");
    clickedEl.previousElementSibling.classList.remove("d-none");
    const something = document
      .querySelectorAll(`[data-key='${keySendEl}']`)
      .forEach((el) => {
        el.disabled = true;
      });

    // if (response.ok) {
    //   window.location.href = "/";
    // }
  } else if (clickedEl.hasAttribute("key-delete")) {
    let keyDeleteEl = clickedEl.getAttribute("key-delete");
    console.log(`/api/post/${keyDeleteEl}`);

    const response = await fetch(`/api/post/${keyDeleteEl}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }
});

function sendData(e) {
  e.preventDefault();
  alert("true");
}
