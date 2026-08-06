/* Smart Attendance System - Interactive DataTable Helper */

document.addEventListener('DOMContentLoaded', () => {
  const searchInputs = document.querySelectorAll('[data-table-search]');

  searchInputs.forEach(input => {
    const targetId = input.getAttribute('data-table-search');
    const table = document.getElementById(targetId);
    if (!table) return;

    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  });
});
