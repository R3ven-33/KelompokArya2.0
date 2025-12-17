// Admin Reports JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // The authentication check is now handled globally in script.js
    // Only initialize page-specific functionality here

    // Initialize charts if Chart.js is available
    if (typeof Chart !== 'undefined') {
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        const revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Pendapatan (Rp)',
                    data: [3500000, 4200000, 5100000, 4800000, 5500000, 6200000, 5800000, 6500000, 7200000, 6800000, 7500000, 8200000],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'Rp ' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });

        // Booking Type Chart
        const bookingTypeCtx = document.getElementById('bookingTypeChart').getContext('2d');
        const bookingTypeChart = new Chart(bookingTypeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Mini Soccer', 'Other'],
                datasets: [{
                    data: [100, 0],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Export report functionality
    document.querySelector('.btn-primary[href="#"]').addEventListener('click', function() {
        // In a real application, this would generate and download a report
        alert('Laporan akan segera diunduh');
    });

    // Filter functionality
    document.querySelector('#statusFilter').addEventListener('change', function() {
        const selectedStatus = this.value;
        if (selectedStatus) {
            alert(`Filter booking dengan status: ${selectedStatus}`);
        }
    });
});