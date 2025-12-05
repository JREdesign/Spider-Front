// PlayVideo.js
document.addEventListener("DOMContentLoaded", function () {
  function playVideo(videoId) {
    const video = document.querySelector(videoId);
    video.setAttribute("autoplay", true);
    video.setAttribute("loop", true);
    video.play();
  }
  playVideo("#video");
  playVideo("#video1");
  playVideo("#video2");
});