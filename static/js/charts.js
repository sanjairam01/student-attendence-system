/* Smart Attendance System - Chart.js Helper */

window.SmartCharts = {
  renderLineChart: function(canvasId, labels, dataPoints, labelName = 'Attendance %') {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    return new window.Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: labelName,
          data: dataPoints,
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(226, 232, 240, 0.3)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }
};
