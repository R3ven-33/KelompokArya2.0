// Owner Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // The authentication check is now handled globally in script.js
    // Only initialize page-specific functionality here

    // Load dynamic data from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // Calculate stats dynamically
    const totalUsers = users.length;
    const totalFields = 1; // Static for now
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.total || 0), 0);

    // Update stats
    document.getElementById('totalUsers').textContent = totalUsers.toLocaleString('id-ID');
    document.getElementById('totalFields').textContent = totalFields;
    document.getElementById('totalBookings').textContent = totalBookings;
    document.getElementById('totalRevenue').textContent = `Rp ${totalRevenue.toLocaleString('id-ID')}`;

    // Logout button functionality
    const ownerLogoutBtn = document.getElementById('ownerLogoutBtn');
    if (ownerLogoutBtn) {
        ownerLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Apakah Anda yakin ingin logout dari akun owner?')) {
                // Call the global logout function
                logout();
            }
        });
    }

    // Load recent bookings into the table
    loadRecentBookings();

    // Update owner profile information
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail') || 'owner@sportsfield.com';

    if (userName) {
        document.getElementById('ownerName').textContent = userName;
    }

    document.getElementById('ownerEmail').textContent = userEmail;

    // Add event listeners to quick action buttons
    document.querySelectorAll('.quick-actions .btn').forEach(button => {
        button.addEventListener('click', function() {
            console.log('Quick action clicked:', this.textContent.trim());
        });
    });

    // Add event listeners to notification items
    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', function() {
            console.log('Notification clicked');
        });
    });

    // Export report button
    const exportBtn = document.querySelector('.revenue-overview .btn-outline-primary');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('Fungsi ekspor laporan belum diimplementasikan');
        });
    }

    // Add event listeners to detail buttons in booking table
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        if (button.textContent.trim() === 'Detail') {
            button.addEventListener('click', function() {
                const bookingId = this.closest('tr').querySelector('td:first-child').textContent;
                alert(`Detail booking: ${bookingId}`);
            });
        }
    });
});

// Function to load recent bookings into the table
function loadRecentBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const tbody = document.querySelector('.recent-bookings tbody');

    if (!tbody) return;

    // Clear existing rows
    tbody.innerHTML = '';

    // Sort bookings by creation date (newest first) and take first 5
    const recentBookings = bookings
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    if (recentBookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Belum ada booking</td></tr>';
        return;
    }

    recentBookings.forEach(booking => {
        const statusClass = getStatusClass(booking.status);
        const statusText = getStatusText(booking.status);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.customer.name}</td>
            <td>${booking.field.name}</td>
            <td>${booking.date}</td>
            <td>
                <span class="badge ${statusClass}">${statusText}</span>
                ${booking.status === 'pending' ? `
                    <div class="btn-group btn-group-sm ms-2">
                        <button class="btn btn-success btn-sm status-btn" data-booking-id="${booking.id}" data-status="confirmed">Konfirmasi</button>
                        <button class="btn btn-danger btn-sm status-btn" data-booking-id="${booking.id}" data-status="cancelled">Tolak</button>
                    </div>
                ` : ''}
            </td>
            <td>Rp ${booking.total.toLocaleString('id-ID')}</td>
        `;
        tbody.appendChild(row);
    });
}

// Helper function to get status class for badges
function getStatusClass(status) {
    switch(status) {
        case 'confirmed': return 'bg-success';
        case 'pending': return 'bg-warning';
        case 'cancelled': return 'bg-danger';
        case 'completed': return 'bg-info';
        default: return 'bg-secondary';
    }
}

// Helper function to get status text
function getStatusText(status) {
    switch(status) {
        case 'confirmed': return 'Dikonfirmasi';
        case 'pending': return 'Menunggu';
        case 'cancelled': return 'Dibatalkan';
        case 'completed': return 'Selesai';
        default: return status;
    }
}

// Function to update booking status
function updateBookingStatus(bookingId, newStatus) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);

    if (bookingIndex !== -1) {
        bookings[bookingIndex].status = newStatus;
        localStorage.setItem('bookings', JSON.stringify(bookings));

        // Reload the bookings table
        loadRecentBookings();

        alert(`Booking ${bookingId} telah ${newStatus === 'confirmed' ? 'dikonfirmasi' : 'ditolak'}`);
    }
}

// This function should be available globally, but if not defined in script.js, include it here:
if (typeof logout === 'undefined' || typeof logout === 'function') {
    // Prevent duplicate definition if already in global script
} else {
    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    }
}
