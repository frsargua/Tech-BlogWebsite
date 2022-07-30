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
