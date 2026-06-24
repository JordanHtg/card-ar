document.addEventListener('DOMContentLoaded', () => {
  const marker = document.querySelector('#marker');
  const uiContainer = document.querySelector('#ui-container');

  const bgm = document.querySelector('#bgm');

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

    const show = () => popup.emit('pop-in');
    const hide = () => popup.emit('pop-out');

    btn.addEventListener('mousedown', show);
    btn.addEventListener('touchstart', show);
    
    btn.addEventListener('mouseup', hide);
    btn.addEventListener('touchend', hide);
    btn.addEventListener('mouseleave', hide);
  };

  setupHoldPopup('#github-btn', '#popup-github');
  setupHoldPopup('#instagram-btn', '#popup-instagram');
  setupHoldPopup('#linkedin-btn', '#popup-linkedin');
  setupHoldPopup('#gmail-btn', '#popup-gmail');
});
