export default function createVideoOverlay() {
  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('video-wrapper');
  videoWrapper.innerHTML = `
    <img src="https://via.placeholder.com/2880x1620/000000" alt="" class="video-wrapper__img" />
  `;
  window.controller.video.appendChild(videoWrapper);

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video-container');
  videoWrapper.appendChild(videoContainer);

  window.controller.videoWrapper = videoWrapper;
  window.controller.videoContainer = videoContainer;
};