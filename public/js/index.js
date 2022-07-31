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
