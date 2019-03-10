let resizeTimer;

const resizeOverlays = function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    const videoWrapperImg = window.controller.videoWrapper.querySelector('.video-wrapper__img');
    window.controller.videoContainer.style.width = `${videoWrapperImg.clientWidth}px`;
    window.controller.videoContainer.style.height = `${videoWrapperImg.clientHeight + 2}px`;
    // Sometimes an odd aspect ratio will cause the overlay to be 1-2px smaller than the video
    // To prevent a gap on the items that are bottom: 0 we make the overlay a couple of pixels larger
  }, 200);
};

// ---------------
// Resize triggers
// ---------------

const initResizeTriggers = function() {
  const sideNavToggleVisibility = document.querySelector('.side-nav__toggle-visibility');
  const rightColumnToggleVisibility = document.querySelector('.right-column__toggle-visibility');
  const playerButtonsRight = document.querySelector('.player-buttons-right');

  if (sideNavToggleVisibility) sideNavToggleVisibility.addEventListener('click', resizeOverlays);
  if (rightColumnToggleVisibility) rightColumnToggleVisibility.addEventListener('click', resizeOverlays);
  if (playerButtonsRight) playerButtonsRight.addEventListener('click', resizeOverlays);
  window.addEventListener('resize', resizeOverlays);
};

export {initResizeTriggers, resizeOverlays};