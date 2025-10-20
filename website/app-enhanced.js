/* ========================================
   ENHANCED APP.JS WITH DYNAMIC COMPONENTS
   ======================================== */

// ========== CONFIGURATION ==========
const DATA_URL = 'data/leaderboard.json';
const state = {
  users: [],
  generatedAt: null,
};

// ========== DOM ELEMENTS ==========
const tableBody = document.querySelector('#leaderboard-table tbody');
const participantCount = document.getElementById('participant-count');
const totalDays = document.getElementById('total-days');
const lastUpdated = document.getElementById('last-updated');
const activeToggle = document.getElementById('active-only');
const canvas = document.getElementById('particles-canvas');
const toastContainer = document.getElementById('toast-container');

// ========== PARTICLE SYSTEM ==========
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 50;
    this.colors = ['#00eaff', '#ffd803', '#ff006e', '#06ffa5', '#8b5cf6'];
    
    this.resize();
    this.init();
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  init() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }
  
  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
    });
    
    // Draw connections
    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0, 24, 88, ${0.2 - distance / 750})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      });
    });
  }
  
  animate() {
    this.update();
    requestAnimationFrame(() => this.animate());
  }
}

// ========== TOAST NOTIFICATIONS ==========
class Toast {
  static show(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, duration);
  }
}

// ========== COUNTER ANIMATION ==========
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (target - start) * easeOutQuart);
    
    element.textContent = current;
    element.setAttribute('data-count', current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }
  
  requestAnimationFrame(update);
}

// ========== DATA LOADING ==========
async function bootstrap() {
  try {
    Toast.show('🔄 Loading leaderboard data...');
    
    const response = await fetch(DATA_URL, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Failed to fetch leaderboard: ${response.status}`);
    }
    
    const payload = await response.json();
    state.users = Array.isArray(payload.users) ? payload.users : [];
    state.generatedAt = payload.generated_at ?? null;
    
    Toast.show('✅ Data loaded successfully!');
    // Initial render with animations
    render(false);
    
  } catch (error) {
    Toast.show('❌ Failed to load data');
    renderError(error);
  }
}

// ========== RENDERING ==========
function render(skipAnimation = true) {
  const filtered = activeToggle.checked
    ? state.users.filter((entry) => entry.active_streak)
    : state.users;

  renderTable(filtered, skipAnimation);
  renderStats(filtered, skipAnimation);
}

function renderTable(dataset, skipAnimation = false) {
  tableBody.innerHTML = '';

  if (!dataset.length) {
    tableBody.innerHTML = `
      <tr>
        <td class="empty" colspan="8">
          No entries yet. Be the first to log your progress! 🚀
        </td>
      </tr>
    `;
    return;
  }

  dataset.forEach((entry, index) => {
    const row = document.createElement('tr');
    
    // Only add animations on initial load, not on toggle
    if (!skipAnimation) {
      row.style.animationDelay = `${index * 0.05}s`;
      row.className = 'animate__animated animate__fadeInUp';
    }
    
    // Create medal emoji for top 3
    let rank = index + 1;
    let rankDisplay = rank;
    if (rank === 1) rankDisplay = '🥇';
    else if (rank === 2) rankDisplay = '🥈';
    else if (rank === 3) rankDisplay = '🥉';
    
    // Status badge with emoji
    const statusEmoji = entry.active_streak ? '🔥' : '💤';
    const statusText = entry.active_streak ? 'Active' : 'Paused';
    
    row.innerHTML = `
      <td>${rankDisplay}</td>
      <td><strong>${escapeHtml(entry.user)}</strong></td>
      <td><strong>${entry.total_days}</strong> days</td>
      <td>${entry.current_streak} 🔥</td>
      <td>${entry.longest_streak} 🚀</td>
      <td>${formatDate(entry.last_update)}</td>
      <td><span class="status-badge">${statusEmoji} ${statusText}</span></td>
      <td>${escapeHtml(entry.highlight || '—')}</td>
    `;
    
    tableBody.appendChild(row);
  });
}

function renderStats(dataset, skipAnimation = false) {
  const totalParticipants = state.users.length;
  const totalLoggedDays = state.users.reduce((sum, item) => sum + (item.total_days || 0), 0);

  // Animate counters only on initial load
  if (!skipAnimation) {
    animateCounter(participantCount, totalParticipants);
    animateCounter(totalDays, totalLoggedDays);
    // Add sparkle effect to stats
    addSparkleEffect();
  } else {
    // Update without animation
    participantCount.textContent = totalParticipants;
    totalDays.textContent = totalLoggedDays;
  }
  
  lastUpdated.textContent = state.generatedAt ? formatDateTime(state.generatedAt) : '—';
}

function addSparkleEffect() {
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate__animated', 'animate__pulse');
      setTimeout(() => {
        card.classList.remove('animate__animated', 'animate__pulse');
      }, 1000);
    }, index * 200);
  });
}

function renderError(error) {
  console.error(error);
  tableBody.innerHTML = `
    <tr>
      <td class="empty" colspan="8">
        ❌ ${escapeHtml(error.message)}
      </td>
    </tr>
  `;
  participantCount.textContent = '0';
  totalDays.textContent = '0';
  lastUpdated.textContent = '—';
}

// ========== FORMATTING UTILITIES ==========
function formatDate(value) {
  if (!value) return 'n/a';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function formatDateTime(value) {
  if (!value) return 'n/a';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ========== INTERACTIVE ELEMENTS ==========
function setupInteractivity() {
  // Toggle filter
  activeToggle.addEventListener('change', () => {
    Toast.show(activeToggle.checked ? '🔥 Showing active streaks only' : '📊 Showing all participants');
    render();
  });
  
  // Add hover effects to table rows
  document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('leaderboard-table');
    if (table) {
      table.addEventListener('mouseenter', (e) => {
        if (e.target.tagName === 'TR' && e.target.parentElement.tagName === 'TBODY') {
          e.target.style.transform = 'scale(1.02)';
        }
      }, true);
      
      table.addEventListener('mouseleave', (e) => {
        if (e.target.tagName === 'TR' && e.target.parentElement.tagName === 'TBODY') {
          e.target.style.transform = 'scale(1)';
        }
      }, true);
    }
  });
  
  // Add click effect to buttons
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      button.classList.add('animate__animated', 'animate__rubberBand');
      setTimeout(() => {
        button.classList.remove('animate__animated', 'animate__rubberBand');
      }, 1000);
    });
  });
  
  // Stats card click effect
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.add('animate__animated', 'animate__tada');
      setTimeout(() => {
        card.classList.remove('animate__animated', 'animate__tada');
      }, 1000);
    });
  });
}

// ========== EASTER EGGS ==========
function setupEasterEggs() {
  // Konami code easter egg
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        Toast.show('🎮 KONAMI CODE ACTIVATED! You are a true developer! 🚀');
        document.body.classList.add('animate__animated', 'animate__flash');
        setTimeout(() => {
          document.body.classList.remove('animate__animated', 'animate__flash');
        }, 1000);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  // Double-click on title for surprise
  const title = document.querySelector('h1');
  if (title) {
    title.addEventListener('dblclick', () => {
      Toast.show('💻 Keep coding! You got this! 💪');
      title.classList.add('animate__animated', 'animate__bounce');
      setTimeout(() => {
        title.classList.remove('animate__animated', 'animate__bounce');
      }, 1000);
    });
  }
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe all cards
  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });
}

// ========== THEME TOGGLE (OPTIONAL) ==========
function setupThemeToggle() {
  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
}

// ========== PERFORMANCE MONITORING ==========
function logPerformance() {
  if (window.performance && window.performance.timing) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
  }
}

// ========== INITIALIZATION ==========
function init() {
  console.log('🚀 Initializing 100 Days of Code Tracker...');
  
  // Start particle system
  if (canvas) {
    const particles = new ParticleSystem(canvas);
    particles.animate();
  }
  
  // Setup interactivity
  setupInteractivity();
  setupEasterEggs();
  setupScrollAnimations();
  setupThemeToggle();
  
  // Load data
  bootstrap();
  
  // Log performance
  window.addEventListener('load', logPerformance);
  
  // Welcome message
  Toast.show('👋 Welcome to 100 Days of Code Tracker!');
  
  console.log('✅ App initialized successfully!');
}

// ========== START THE APP ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ========== AUTO-REFRESH (OPTIONAL) ==========
// Uncomment to enable auto-refresh every 5 minutes
// setInterval(bootstrap, 5 * 60 * 1000);
