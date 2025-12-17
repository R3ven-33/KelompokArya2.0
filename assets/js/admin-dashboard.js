// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // The authentication check is now handled globally in script.js
    // Only initialize page-specific functionality here

    // Sample admin data
    const adminData = {
        totalUsers: 1245,
        totalFields: 1,
        totalBookings: 156,
        totalRevenue: 45200000
    };

    // Update stats
    document.getElementById('totalUsers').textContent = adminData.totalUsers.toLocaleString('id-ID');
    document.getElementById('totalFields').textContent = adminData.totalFields;
    document.getElementById('totalBookings').textContent = adminData.totalBookings;
    document.getElementById('totalRevenue').textContent = `Rp ${adminData.totalRevenue.toLocaleString('id-ID')}`;

    // Recent payments functionality
    document.querySelectorAll('.btn-success').forEach(button => {
        if (button.textContent.trim() === 'Konfirmasi') {
            button.addEventListener('click', function() {
                const bookingId = this.closest('tr').querySelector('td:first-child').textContent;
                if (confirm(`Konfirmasi pembayaran untuk booking ${bookingId}?`)) {
                    // Update status in UI
                    const statusCell = this.closest('tr').querySelector('.badge');
                    statusCell.className = 'badge bg-success';
                    statusCell.textContent = 'Dikonfirmasi';
                    alert(`Pembayaran untuk ${bookingId} berhasil dikonfirmasi`);
                }
            });
        }
    });

    document.querySelectorAll('.btn-danger').forEach(button => {
        if (button.textContent.trim() === 'Tolak') {
            button.addEventListener('click', function() {
                const bookingId = this.closest('tr').querySelector('td:first-child').textContent;
                if (confirm(`Tolak pembayaran untuk booking ${bookingId}?`)) {
                    // Update status in UI
                    const statusCell = this.closest('tr').querySelector('.badge');
                    statusCell.className = 'badge bg-danger';
                    statusCell.textContent = 'Ditolak';
                    alert(`Pembayaran untuk ${bookingId} berhasil ditolak`);
                }
            });
        }
    });

    // Add event listeners to detail buttons
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        if (button.closest('.modal') === null) { // Don't apply to modal buttons
            button.addEventListener('click', function() {
                const bookingId = this.closest('tr').querySelector('td:first-child').textContent;
                alert(`Detail booking: ${bookingId}`);
            });
        }
    });
});