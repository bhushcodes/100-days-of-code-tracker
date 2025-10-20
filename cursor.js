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
    
    // Check if hovering over clickable element
    const target = e.target;
    const clickableSelector = 'a, button, .button, .how-it-works-card, .feature-card, .toggle-slider, [role="button"], input[type="submit"], input[type="button"], .github-login-btn';
    
    // Check if target or any parent is clickable
    if (target.matches(clickableSelector) || target.closest(clickableSelector)) {
      cursor.classList.add('hover');
    } else {
      cursor.classList.remove('hover');
    }
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
});
