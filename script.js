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

  let cycleInterval = null;
  const popups = [
    { id: '#popup-github', btn: '#github-btn', x: -0.9, link: 'https://github.com' },
    { id: '#popup-instagram', btn: '#instagram-btn', x: -0.3, link: 'https://instagram.com' },
    { id: '#popup-linkedin', btn: '#linkedin-btn', x: 0.3, link: 'https://linkedin.com' },
    { id: '#popup-gmail', btn: '#gmail-btn', x: 0.9, link: 'mailto:hello@example.com' }
  ];

  // Restore functional click links
  popups.forEach(p => {
    const btn = document.querySelector(p.btn);
    if (btn) {
      btn.addEventListener('click', () => window.open(p.link, '_blank'));
    }
  });

  const cursor = document.querySelector('#active-cursor');
  let currentIndex = 0;

  const showPopup = (index) => {
    // Hide all
    popups.forEach(p => {
      const el = document.querySelector(p.id);
      if (el) el.setAttribute('animation', 'property: scale; to: 0 0 0; dur: 200; easing: easeInBack');
    });

    // Show current
    const current = popups[index];
    const currentEl = document.querySelector(current.id);
    if (currentEl) {
      currentEl.setAttribute('animation', 'property: scale; to: 1 1 1; dur: 300; easing: easeOutBack');
    }

    // Move cursor
    if (cursor) {
      cursor.setAttribute('position', `${current.x} 0 0`);
      cursor.setAttribute('visible', 'true');
    }
  };

  const startCycle = () => {
    if (cycleInterval) clearInterval(cycleInterval);
    showPopup(currentIndex);
    cycleInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % popups.length;
      showPopup(currentIndex);
    }, 3000);
  };

  const stopCycle = () => {
    if (cycleInterval) clearInterval(cycleInterval);
    popups.forEach(p => {
      const el = document.querySelector(p.id);
      if (el) el.setAttribute('animation', 'property: scale; to: 0 0 0; dur: 200; easing: easeInBack');
    });
    if (cursor) cursor.setAttribute('visible', 'false');
  };

  // Attach to marker events
  marker.addEventListener('markerFound', startCycle);
  marker.addEventListener('markerLost', stopCycle);
});
