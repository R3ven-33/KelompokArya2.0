// Booking History JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadBookingHistory();

    // Status filter functionality
    document.getElementById('statusFilter').addEventListener('change', function() {
        loadBookingHistory(this.value);
    });

    // Date filter functionality
    document.getElementById('dateFilter').addEventListener('change', function() {
        loadBookingHistory(document.getElementById('statusFilter').value, this.value);
    });
});

// Function to load booking history from localStorage
function loadBookingHistory(statusFilter = '', dateFilter = '') {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const bookingList = document.getElementById('bookingList');

    // Clear existing bookings
    bookingList.innerHTML = '';

    // Filter bookings by logged-in user
    let filteredBookings = bookings;

    // Get logged-in user's email to filter their bookings
    const currentUserEmail = localStorage.getItem('userEmail');
    if (currentUserEmail) {
        // For backward compatibility, also consider bookings where customer email matches user email
        filteredBookings = filteredBookings.filter(booking =>
            booking.userId === currentUserEmail ||
            (booking.customer && booking.customer.email === currentUserEmail)
        );
    }

    if (statusFilter) {
        filteredBookings = filteredBookings.filter(booking => booking.status === statusFilter);
    }

    if (dateFilter) {
        filteredBookings = filteredBookings.filter(booking => booking.date === dateFilter);
    }

    // Sort by creation date (newest first)
    filteredBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (filteredBookings.length === 0) {
        bookingList.innerHTML = '<div class="text-center py-5"><p class="text-muted">Belum ada riwayat booking.</p></div>';
        return;
    }

    // Display bookings
    filteredBookings.forEach(booking => {
        const bookingCard = createBookingCard(booking);
        bookingList.appendChild(bookingCard);
    });
}

// Function to create booking card
function createBookingCard(booking) {
    const card = document.createElement('div');
    card.className = 'card shadow-sm mb-3';

    const statusBadge = getStatusBadge(booking.status);
    const actions = getBookingActions(booking);

    card.innerHTML = `
        <div class="card-body">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <h5 class="mb-1">#${booking.id}</h5>
                    <p class="mb-1"><strong>${booking.field.name}</strong></p>
                    <p class="text-muted mb-0">${booking.date} | ${booking.time}</p>
                    <p class="text-muted small">Durasi: ${booking.duration} jam</p>
                </div>
                <div class="col-md-3 text-center">
                    <p class="mb-0"><strong>Rp ${booking.total.toLocaleString('id-ID')}</strong></p>
                    <p class="text-muted small">Total Bayar</p>
                </div>
                <div class="col-md-2 text-center">
                    ${statusBadge}
                </div>
                <div class="col-md-1 text-end">
                    ${actions}
                </div>
            </div>
        </div>
    `;

    return card;
}

// Function to get status badge
function getStatusBadge(status) {
    const statusMap = {
        'pending': { class: 'bg-warning', text: 'Menunggu' },
        'confirmed': { class: 'bg-success', text: 'Dikonfirmasi' },
        'completed': { class: 'bg-success', text: 'Selesai' },
        'cancelled': { class: 'bg-danger', text: 'Dibatalkan' }
    };

    const statusInfo = statusMap[status] || { class: 'bg-secondary', text: status };
    return `<span class="badge ${statusInfo.class}">${statusInfo.text}</span>`;
}

// Function to get booking actions
function getBookingActions(booking) {
    let actions = '<a href="#" class="btn btn-sm btn-outline-primary">Detail</a>';

    if (booking.status === 'pending') {
        actions += ' <a href="cancel-booking.html" class="btn btn-sm btn-outline-danger">Batalkan</a>';
    }

    return actions;
}
