// This is for the dashBoard page

let updatePostButtonEl = $(".updatePostButton");

updatePostButtonEl.click(function () {
  let postTitleEl = $(".blogPostTitle").css({ display: "none" });
  let blogPostTitleInputEl = $(".blogPostTitleInput")
    .removeClass("d-none")
    .removeAttr("disabled");
  let newPostDescriptionEl = $(".newPostDescription").removeAttr("disabled");
  console.log(newPostDescriptionEl);
});
