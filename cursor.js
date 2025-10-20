// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
  // Create cursor element
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor movement
  function animate() {
    const speed = 0.2;
    
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animate);
  }
  animate();

  // Add hover effect for clickable elements
  const clickableElements = 'a, button, .button, .how-it-works-card, .feature-card, .toggle-slider, [role="button"], svg, input[type="submit"], input[type="button"], .github-login-btn';
  
  document.querySelectorAll(clickableElements).forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // Re-apply hover listeners for dynamically added elements
  const observer = new MutationObserver(() => {
    document.querySelectorAll(clickableElements).forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
