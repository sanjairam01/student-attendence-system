/* Smart Attendance System - Master Dashboard Controller */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Smart Attendance System Dashboard Initialized.');
  
  // Profile dropdown toggle logic
  const profileBtn = document.querySelector('#profile-menu-btn');
  const profileDropdown = document.querySelector('#profile-dropdown-menu');

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      profileDropdown.classList.add('hidden');
    });
  }

  // Notification panel toggle logic
  const notifBtn = document.querySelector('#notif-panel-btn');
  const notifPanel = document.querySelector('#notification-panel');

  if (notifBtn && notifPanel) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifPanel.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      notifPanel.classList.add('hidden');
    });
  }
});
