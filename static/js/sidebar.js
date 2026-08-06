/* Smart Attendance System - Sidebar Controller */

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.app-sidebar');
  const toggleBtn = document.querySelector('#sidebar-toggle');
  const mobileToggle = document.querySelector('#mobile-menu-toggle');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      localStorage.setItem('sidebar_collapsed', sidebar.classList.contains('collapsed'));
    });
  }

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Restore collapsed state
  if (localStorage.getItem('sidebar_collapsed') === 'true' && sidebar) {
    sidebar.classList.add('collapsed');
  }
});
