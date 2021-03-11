const shareButton = document.querySelector("#share_btn");

shareButton.addEventListener("click", (event) => {
  if (navigator.share) {
    navigator
      .share({
        title: window.location.title,
        text:
          "Discover the wishlists to help you please your friends and relatives",
        url: window.location.href,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  } else {
    shareDialog.classList.add("is-open");
  }
});
