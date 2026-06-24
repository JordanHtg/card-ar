document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#marker');
  const uiContainer = document.querySelector('#ui-container');
  const bgm = document.querySelector('#bgm');
  const video = document.querySelector('#portfolio');

  // Force video looping for mobile browsers
  if (video) {
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play();
    });
  }

  // Prevent default context menu on long-press globally
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Handle marker tracking state
  marker.addEventListener('markerFound', () => {
    uiContainer.classList.add('marker-found');
    const arContainer = document.querySelector('#ar-container');
    if (arContainer) arContainer.emit('marker-found-anim');
    
    // Play background music
    if (bgm) {
      bgm.play().catch((e) => console.log('Audio play prevented by browser:', e));
    }
  });

  marker.addEventListener('markerLost', () => {
    uiContainer.classList.remove('marker-found');
    const arContainer = document.querySelector('#ar-container');
    if (arContainer) arContainer.setAttribute('scale', '0 0 0');
    
    // Pause background music
    if (bgm) {
      bgm.pause();
    }
  });

  // Handle clicks on AR elements
  const githubBtn = document.querySelector('#github-btn');
  const instagramBtn = document.querySelector('#instagram-btn');
  const linkedinBtn = document.querySelector('#linkedin-btn');
  const gmailBtn = document.querySelector('#gmail-btn');
  const happyModel = document.querySelector('#happy-model');

  if (happyModel) {
    happyModel.addEventListener('click', () => {
      alert('Happy 3D Model Clicked!');
    });
  }

  const setupHoldPopup = (btnId, popupId) => {
    const btn = document.querySelector(btnId);
    const popup = document.querySelector(popupId);
    if (!btn || !popup) return;

    const show = (e) => {
      if (e) e.preventDefault();
      popup.setAttribute('animation', 'property: scale; to: 1 1 1; dur: 300; easing: easeOutBack');
      
      // Once pressed, wait for ANY touch release or mouse up on the entire screen to hide it.
      // This prevents issues where the raycaster slips off the tiny icon due to shaky hands.
      const stopHold = () => {
        popup.setAttribute('animation', 'property: scale; to: 0 0 0; dur: 200; easing: easeInBack');
        window.removeEventListener('mouseup', stopHold);
        window.removeEventListener('touchend', stopHold);
      };
      
      window.addEventListener('mouseup', stopHold);
      window.addEventListener('touchend', stopHold);
    };

    btn.addEventListener('mousedown', show);
  };

  setupHoldPopup('#github-btn', '#popup-github');
  setupHoldPopup('#instagram-btn', '#popup-instagram');
  setupHoldPopup('#linkedin-btn', '#popup-linkedin');
  setupHoldPopup('#gmail-btn', '#popup-gmail');
});
