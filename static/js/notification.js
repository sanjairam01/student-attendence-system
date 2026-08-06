/* Smart Attendance System - Notification & Toast Manager */

(function() {
  function createToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function showToast(message, type = 'info', duration = 4000) {
    const container = createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} liquid-glass`;

    const icons = {
      success: '✓',
      danger: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    toast.innerHTML = `
      <div class="toast-icon badge badge-${type}">${icons[type] || 'ℹ'}</div>
      <div class="toast-message" style="flex:1; font-size: 13px; font-weight: 500;">${message}</div>
      <button class="toast-close" style="background:none; border:none; cursor:pointer; color:var(--text-muted);">&times;</button>
    `;

    container.appendChild(toast);

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  }

  window.SmartToast = { showToast };
})();
