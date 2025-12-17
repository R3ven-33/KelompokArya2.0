// Admin Bookings Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // The authentication check is now handled globally in script.js
    // Only initialize page-specific functionality here

    // Cancel booking functionality
    document.querySelectorAll('.btn-outline-danger').forEach(button => {
        if (!button.closest('.modal') && button.textContent.trim() === 'Batalkan') {
            button.addEventListener('click', function() {
                const bookingId = this.closest('tr').querySelector('td:first-child').textContent;

                if (confirm(`Apakah Anda yakin ingin membatalkan booking ${bookingId}?`)) {
                    // In a real application, this would send cancellation request to the server
                    alert(`Booking ${bookingId} berhasil dibatalkan`);

                    // Update status in UI
                    const statusCell = this.closest('tr').querySelector('.badge');
                    statusCell.className = 'badge bg-danger';
                    statusCell.textContent = 'Dibatalkan';
                }
            });
        }
    });

    // Confirm booking functionality
    document.querySelectorAll('.btn-outline-success').forEach(button => {
        if (button.textContent.trim() === 'Konfirmasi') {
            button.addEventListener('click', function() {
                const bookingId = this.closest('tr').querySelector('td:first-child').textContent;

                // Update booking status in localStorage
                const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
                const bookingIndex = bookings.findIndex(b => b.id === bookingId);

                if (bookingIndex !== -1) {
                    bookings[bookingIndex].status = 'confirmed';
                    localStorage.setItem('bookings', JSON.stringify(bookings));

                    alert(`Booking ${bookingId} berhasil dikonfirmasi`);

                    // Update status in UI
                    const statusCell = this.closest('tr').querySelector('.badge');
                    statusCell.className = 'badge bg-success';
                    statusCell.textContent = 'Dikonfirmasi';

                    // Hide the confirm button since it's now confirmed
                    this.style.display = 'none';
                }
            });
        }
    });

    // Filter functionality
    document.getElementById('statusFilter').addEventListener('change', function() {
        const selectedStatus = this.value;
        if (selectedStatus) {
            alert(`Filter booking dengan status: ${selectedStatus}`);
        }
    });

    // Search functionality
    document.querySelector('.input-group button').addEventListener('click', function() {
        const searchTerm = document.querySelector('.input-group input').value;
        if (searchTerm) {
            alert(`Mencari booking dengan kata kunci: ${searchTerm}`);
        }
    });

    // View booking details functionality
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        if (button.textContent.trim() === 'Lihat') {
            button.addEventListener('click', function() {
                const bookingId = this.closest('tr').querySelector('td:first-child').textContent;
                // Details will be shown in modal, which is handled by Bootstrap
                console.log(`Viewing details for ${bookingId}`);
            });
        }
    });
});