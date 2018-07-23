let resizeTimer;

const resizeOverlays = function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    const videoWrapperImg = window.controller.videoWrapper.querySelector('.video-wrapper__img');
    window.controller.videoContainer.style.width = `${videoWrapperImg.clientWidth}px`;
    window.controller.videoContainer.style.height = `${videoWrapperImg.clientHeight + 1}px`;
  }, 200);
};

// ---------------
// Resize triggers
// ---------------

const initResizeTriggers = function() {
  const sideNavToggleVisibility = document.querySelector('.side-nav__toggle-visibility');
  const rightColumnToggleVisibility = document.querySelector('.right-column__toggle-visibility');
  const playerButtonsRight = document.querySelector('.player-buttons-right');

  sideNavToggleVisibility.addEventListener('click', resizeOverlays);
  rightColumnToggleVisibility.addEventListener('click', resizeOverlays);
  playerButtonsRight.addEventListener('click', resizeOverlays);
  window.addEventListener('resize', resizeOverlays);
};

export {initResizeTriggers, resizeOverlays};