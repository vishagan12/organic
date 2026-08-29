export function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bgClass = type === 'error' ? 'bg-error text-on-error' : 'bg-primary text-surface';
  const icon = type === 'error' ? 'error' : 'check_circle';

  toast.className = `${bgClass} px-5 py-3.5 rounded-lg shadow-xl shadow-primary-container/20 flex items-center gap-3 text-sm font-medium border border-surface/10 transform transition-all duration-300 translate-y-4 opacity-0 pointer-events-auto max-w-md`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] text-accent">${icon}</span>
    <span class="flex-1">${message}</span>
    <button class="text-surface/70 hover:text-surface transition-colors" onclick="this.parentElement.remove()">
      <span class="material-symbols-outlined text-[16px]">close</span>
    </button>
  `;

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  // Auto dismiss after 3.5s
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
