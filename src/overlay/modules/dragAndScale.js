const initDragAndScale = function() {
  window.controller.overlay.addEventListener("mousedown", dragAndScale);

  function dragAndScale(e) {
    // Elements initial width and height
    const h = this.offsetHeight;
    const w = this.offsetWidth;
    // Elements original position
    const t = this.offsetTop;
    const l = this.offsetLeft;
    // Click position within element
    const y = t + h - e.pageY;
    const x = l + w - e.pageX;
    
    const hasMoved = () =>
      !(t === this.offsetTop && l === this.offsetLeft);
    
    const hasResized = () =>
      !(w === this.offsetWidth && h === this.offsetHeight);
    
    const follow = (e) => {
      window.controller.dragging = true;

      // Set top/left of element according to mouse position
      this.style.top = `${e.pageY + y - h}px`;
      this.style.left = `${e.pageX + x - w}px`;
    }
    
    const resize = (e) => {
      // Set width/height of element according to mouse position
      const width = (e.pageX - l + x);
      const height = (e.pageY - t + y);

      if (width > 200) this.style.width = `${width}px`;
      if (height > 100) this.style.height = `${height}px`;
    }
    
    
    const unresize = (e) => {
      // Remove listeners that were bound to document
      document.removeEventListener('mousemove', resize);
      document.removeEventListener("mouseup", unresize);
      // Emit events according to interaction
      if (hasResized(e)) this.dispatchEvent(new Event('resized'));
      else this.dispatchEvent(new Event('clicked'));
      e.preventDefault();
    }
    
    const unfollow = (e) => {
      // Remove listeners that were bound to document
      document.removeEventListener('mousemove', follow);
      document.removeEventListener("mouseup", unfollow);
      // Emit events according to interaction
      if (hasMoved(e)) this.dispatchEvent(new Event('moved'));
      else this.dispatchEvent(new Event('clicked'));
      e.preventDefault();

      let timeout = setTimeout(function() {
        window.controller.dragging = false;
        clearTimeout(timeout);
      }, 100);
    }
    
    // Add follow listener if not resizing
    if (e.target.classList.contains('overlay__resize')) {
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", unresize);
      e.preventDefault();
    } else {
      if (!window.controller.draggingDisabled) {
        document.addEventListener("mousemove", follow);
        document.addEventListener("mouseup", unfollow);
        e.preventDefault();
      }
    }
  }
}

export default initDragAndScale;