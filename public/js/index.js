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
    postTitleEl.css({ display: "none" });
    blogPostTitleInputEl.removeClass("d-none").removeAttr("disabled");
    newPostDescriptionEl.removeAttr("disabled");
  } else if (updatePostButtonText.trim() == "Done") {
    updatePostButtonEl.text("Update");
    updatePostButtonText = "Update";
    postTitleEl.css({ display: "block" });
    blogPostTitleInputEl.addClass("d-none").prop("disabled", true);
    newPostDescriptionEl.prop("disabled", true);
  }
});

// This is for the logIn page
let SignInFormEl = document.getElementById("SignInForm");
if (SignInFormEl !== null) {
  SignInFormEl.addEventListener("submit", async function (e) {
    e.preventDefault();
    const userSignInDetails = new FormData(SignInFormEl);
    const formProps = Object.fromEntries(userSignInDetails);

    try {
      const response = await fetch(`/api/users/signIn`, {
        method: "POST",
        body: JSON.stringify(formProps),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error in POST request:", error);
    }
  });
}
