const DATA_URL = 'data/leaderboard.json';
const tableBody = document.querySelector('#leaderboard-table tbody');
const participantCount = document.getElementById('participant-count');
const totalDays = document.getElementById('total-days');
const lastUpdated = document.getElementById('last-updated');
const activeToggle = document.getElementById('active-only');

const state = {
  users: [],
  generatedAt: null,
};

async function bootstrap() {
  try {
    const response = await fetch(DATA_URL, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Failed to fetch leaderboard: ${response.status}`);
    }
    const payload = await response.json();
    state.users = Array.isArray(payload.users) ? payload.users : [];
    state.generatedAt = payload.generated_at ?? null;
    render();
  } catch (error) {
    renderError(error);
  }
}

function render() {
  const filtered = activeToggle.checked
    ? state.users.filter((entry) => entry.active_streak)
    : state.users;

  renderTable(filtered);
  renderStats(filtered);
}

function renderTable(dataset) {
  tableBody.innerHTML = '';

  if (!dataset.length) {
    tableBody.innerHTML = '<tr><td class="empty" colspan="8">No entries yet. Be the first to log your progress!</td></tr>';
    return;
  }

  dataset.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${escapeHtml(entry.user)}</strong></td>
      <td>${entry.total_days}</td>
      <td>${entry.current_streak}</td>
      <td>${entry.longest_streak}</td>
      <td>${formatDate(entry.last_update)}</td>
      <td>${entry.active_streak ? 'active' : 'paused'}</td>
      <td>${escapeHtml(entry.highlight || '')}</td>
    `;
    tableBody.appendChild(row);
  });
}

function renderStats(dataset) {
  const totalParticipants = state.users.length;
  const totalLoggedDays = state.users.reduce((sum, item) => sum + (item.total_days || 0), 0);

  participantCount.textContent = String(totalParticipants);
  totalDays.textContent = String(totalLoggedDays);
  lastUpdated.textContent = state.generatedAt ? formatDateTime(state.generatedAt) : '—';
}

function renderError(error) {
  console.error(error);
  tableBody.innerHTML = `<tr><td class="empty" colspan="8">${escapeHtml(error.message)}</td></tr>`;
  participantCount.textContent = '0';
  totalDays.textContent = '0';
  lastUpdated.textContent = '—';
}

function formatDate(value) {
  if (!value) return 'n/a';
  const date = new Date(value);
  // Guard against invalid dates if a log contains bad data.
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

activeToggle.addEventListener('change', render);

bootstrap();
