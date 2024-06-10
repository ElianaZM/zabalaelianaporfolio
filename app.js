document.addEventListener("DOMContentLoaded", function() {
  const video = document.querySelector(".video-container");
  const playPauseBtn = document.querySelector(".switch-btn");

  playPauseBtn.addEventListener("click", function() {
      if (video.paused) {
          video.play();
          playPauseBtn.innerHTML = '<span>pause</span>'; // Cambia el contenido del botón a "pause"
      } else {
          video.pause();
          playPauseBtn.innerHTML = '<span>play</span>'; // Cambia el contenido del botón a "play"
      }
  });
});