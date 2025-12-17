// User Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // The authentication check is now handled globally in script.js
    // Only initialize page-specific functionality here

    // Get user info from localStorage
    const userName = localStorage.getItem('userName') || 'Pengguna';
    let userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        // Fallback to a default based on user type if email isn't stored
        userEmail = localStorage.getItem('userType') === 'user' ? 'user@example.com' : 'pengguna@example.com';
    }

    // Sample user data using actual user info
    const userData = {
        name: userName,
        email: userEmail,
        totalBookings: 5,
        activeBookings: 2,
        completedBookings: 3,
        totalSpent: 1200000
    };

    // Update user info
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userEmail').textContent = userData.email;

    // Load bookings from localStorage and update stats
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // Calculate stats based on actual bookings
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const activeBookings = confirmedBookings; // For simplicity, considering confirmed as active
    const totalSpent = bookings.reduce((sum, booking) => sum + booking.total, 0);

    // Update stats with actual data
    document.getElementById('totalBookings').textContent = totalBookings;
    document.getElementById('activeBookings').textContent = activeBookings;
    document.getElementById('completedBookings').textContent = completedBookings;
    document.getElementById('totalSpent').textContent = `Rp ${totalSpent.toLocaleString('id-ID')}`;

    // Update bookings table with actual bookings (show most recent)
    const bookingsTableBody = document.getElementById('bookingsTableBody');
    if (bookingsTableBody) {
        bookingsTableBody.innerHTML = '';

        // Show most recent 5 bookings
        const recentBookings = bookings
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        if (recentBookings.length > 0) {
            recentBookings.forEach(booking => {
                // Map status to badge class
                let statusClass, displayStatus;
                switch(booking.status) {
                    case 'pending':
                        statusClass = 'warning';
                        displayStatus = 'Menunggu Pembayaran';
                        break;
                    case 'confirmed':
                        statusClass = 'success';
                        displayStatus = 'Dikonfirmasi';
                        break;
                    case 'completed':
                        statusClass = 'success';
                        displayStatus = 'Selesai';
                        break;
                    case 'cancelled':
                        statusClass = 'danger';
                        displayStatus = 'Dibatalkan';
                        break;
                    default:
                        statusClass = 'secondary';
                        displayStatus = booking.status;
                }

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.id}</td>
                    <td>${booking.field.name}</td>
                    <td>${booking.date}</td>
                    <td>${booking.time}</td>
                    <td><span class="badge bg-${statusClass}">${displayStatus}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary">Detail</button>
                        ${booking.status === "pending" ? '<button class="btn btn-sm btn-outline-danger">Batalkan</button>' : ''}
                    </td>
                `;
                bookingsTableBody.appendChild(row);
            });
        } else {
            // Show message if no bookings
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="6" class="text-center py-3">Belum ada booking. <a href="booking.html">Buat booking baru</a></td>
            `;
            bookingsTableBody.appendChild(row);
        }
    }

    // Add event listeners to detail buttons
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.closest('tr').querySelector('td:first-child').textContent;
            alert(`Detail booking: ${bookingId}`);
        });
    });

    // Add event listeners to cancel buttons
    document.querySelectorAll('.btn-outline-danger').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin membatalkan booking ini?')) {
                alert('Booking berhasil dibatalkan');
            }
        });
    });

    // Add event listeners to pay buttons
    document.querySelectorAll('.btn-outline-success').forEach(button => {
        button.addEventListener('click', function() {
            alert('Anda akan diarahkan ke halaman pembayaran');
        });
    });
});