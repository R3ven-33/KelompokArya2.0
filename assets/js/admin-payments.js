// Admin Payments JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // The authentication check is now handled globally in script.js
    // Only initialize page-specific functionality here

    // Load pending payments from localStorage
    loadPendingPayments();

    // Use event delegation for dynamic buttons
    document.addEventListener('click', function(e) {
        // Confirm payment functionality
        if (e.target.classList.contains('btn-success') && e.target.textContent.trim() === 'Konfirmasi') {
            // Get the payment ID that was stored when modal was opened
            const paymentId = window.currentPaymentId;
            if (!paymentId) {
                alert('ID pembayaran tidak ditemukan');
                return;
            }

            // Get the payment record
            let pendingPayments = JSON.parse(localStorage.getItem('pendingPayments')) || [];
            const paymentIndex = pendingPayments.findIndex(p => p.id === paymentId);
            if (paymentIndex === -1) {
                alert('Pembayaran tidak ditemukan');
                return;
            }

            const payment = pendingPayments[paymentIndex];
            const bookingId = payment.bookingId;

            // Update payment status in localStorage
            pendingPayments[paymentIndex].status = 'confirmed';
            pendingPayments[paymentIndex].confirmedAt = new Date().toISOString();
            localStorage.setItem('pendingPayments', JSON.stringify(pendingPayments));

            // Update booking status in localStorage
            let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            const bookingIndex = bookings.findIndex(b => b.id === bookingId);
            if (bookingIndex !== -1) {
                bookings[bookingIndex].status = 'confirmed';
                localStorage.setItem('bookings', JSON.stringify(bookings));
            }

            alert(`Pembayaran untuk booking ${bookingId} berhasil dikonfirmasi`);

            // Reload the payments to reflect changes
            loadPendingPayments();

            // Close modal
            const modal = e.target.closest('.modal');
            if (modal) {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }

            // Clear the current payment ID
            window.currentPaymentId = null;
        }

        // Reject payment functionality
        if (e.target.classList.contains('btn-danger') && e.target.textContent.trim() === 'Tolak Pembayaran') {
            // Get the payment ID that was stored when modal was opened
            const paymentId = window.currentPaymentId;
            if (!paymentId) {
                alert('ID pembayaran tidak ditemukan');
                return;
            }

            // Get the payment record
            let pendingPayments = JSON.parse(localStorage.getItem('pendingPayments')) || [];
            const paymentIndex = pendingPayments.findIndex(p => p.id === paymentId);
            if (paymentIndex === -1) {
                alert('Pembayaran tidak ditemukan');
                return;
            }

            const payment = pendingPayments[paymentIndex];
            const bookingId = payment.bookingId;
            const rejectionReason = document.getElementById('rejectionReason') ?
                document.getElementById('rejectionReason').value : '';

            if (!rejectionReason) {
                alert('Mohon masukkan alasan penolakan');
                return;
            }

            // Update payment status in localStorage
            pendingPayments[paymentIndex].status = 'rejected';
            pendingPayments[paymentIndex].rejectedAt = new Date().toISOString();
            pendingPayments[paymentIndex].rejectionReason = rejectionReason;
            localStorage.setItem('pendingPayments', JSON.stringify(pendingPayments));

            // Update booking status in localStorage
            let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            const bookingIndex = bookings.findIndex(b => b.id === bookingId);
            if (bookingIndex !== -1) {
                bookings[bookingIndex].status = 'cancelled';
                localStorage.setItem('bookings', JSON.stringify(bookings));
            }

            alert(`Pembayaran untuk booking ${bookingId} berhasil ditolak\nAlasan: ${rejectionReason}`);

            // Reload the payments to reflect changes
            loadPendingPayments();

            // Close modal
            const modal = e.target.closest('.modal');
            if (modal) {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }

            // Clear the current payment ID
            window.currentPaymentId = null;
        }
    });

    // Filter functionality
    document.getElementById('statusFilter').addEventListener('change', function() {
        const selectedStatus = this.value;
        if (selectedStatus) {
            alert(`Filter pembayaran dengan status: ${selectedStatus}`);
        }
    });
});

// Function to load pending payments from localStorage
function loadPendingPayments() {
    const pendingPayments = JSON.parse(localStorage.getItem('pendingPayments')) || [];
    const tbody = document.querySelector('.table tbody');

    // Clear existing rows
    tbody.innerHTML = '';

    if (pendingPayments.length > 0) {
        // Add dynamic rows from localStorage
        pendingPayments.forEach(payment => {
            const row = document.createElement('tr');

            const statusBadge = payment.status === 'pending' ? '<span class="badge bg-warning">Menunggu</span>' :
                               payment.status === 'confirmed' ? '<span class="badge bg-success">Dikonfirmasi</span>' :
                               '<span class="badge bg-danger">Ditolak</span>';

            const actions = payment.status === 'pending' ?
                `<button class="btn btn-sm btn-success me-1" data-bs-toggle="modal" data-bs-target="#confirmPaymentModal" onclick="setPaymentId('${payment.id}')">Konfirmasi</button>
                 <button class="btn btn-sm btn-danger me-1" data-bs-toggle="modal" data-bs-target="#rejectPaymentModal" onclick="setPaymentId('${payment.id}')">Tolak</button>
                 <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#viewProofModal" onclick="setPaymentId('${payment.id}')">Lihat Bukti</button>` :
                `<button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#viewProofModal" onclick="setPaymentId('${payment.id}')">Lihat Bukti</button>`;

            row.innerHTML = `
                <td>${payment.bookingId}</td>
                <td>${payment.userName}</td>
                <td>${payment.paymentMethod === 'ewallet' ? 'E-Wallet' : payment.paymentMethod === 'bank_transfer' ? 'Transfer Bank' : payment.paymentMethod}</td>
                <td>Rp ${payment.amount.toLocaleString('id-ID')}</td>
                <td>${new Date(payment.submittedAt).toLocaleString('id-ID')}</td>
                <td>${statusBadge}</td>
                <td>${actions}</td>
            `;

            tbody.appendChild(row);
        });
    } else {
        // Show no payments message
        tbody.innerHTML = `
            <tr id="noPaymentsRow">
                <td colspan="7" class="text-center py-4">
                    <div class="text-muted">
                        <i class="fas fa-info-circle fa-2x mb-2"></i>
                        <p>Belum ada pembayaran yang menunggu konfirmasi.</p>
                        <small>Pembayaran akan muncul di sini setelah customer mengupload bukti pembayaran.</small>
                    </div>
                </td>
            </tr>
        `;
    }
}

// Function to set payment ID for modals
function setPaymentId(paymentId) {
    // Store the payment ID in a global variable or data attribute
    window.currentPaymentId = paymentId;

    // Update modal content for view proof modal
    const payment = getPaymentById(paymentId);
    if (payment) {
        // Update view proof modal
        const viewProofModal = document.getElementById('viewProofModal');
        if (viewProofModal) {
            viewProofModal.querySelector('.modal-title').textContent = `Bukti Pembayaran - ${payment.bookingId}`;
            viewProofModal.querySelector('.payment-details').innerHTML = `
                <p><strong>Booking ID:</strong> ${payment.bookingId}</p>
                <p><strong>Pengguna:</strong> ${payment.userName}</p>
                <p><strong>Total Pembayaran:</strong> Rp ${payment.amount.toLocaleString('id-ID')}</p>
                <p><strong>Metode Pembayaran:</strong> ${payment.paymentMethod === 'ewallet' ? 'E-Wallet' : payment.paymentMethod === 'bank_transfer' ? 'Transfer Bank' : payment.paymentMethod}</p>
                <p><strong>Tanggal Pembayaran:</strong> ${new Date(payment.submittedAt).toLocaleString('id-ID')}</p>
                <p><strong>Status:</strong> ${payment.status === 'pending' ? 'Menunggu' : payment.status === 'confirmed' ? 'Dikonfirmasi' : 'Ditolak'}</p>
            `;
        }

        // Update confirm payment modal
        const confirmModal = document.getElementById('confirmPaymentModal');
        if (confirmModal) {
            confirmModal.querySelector('.alert').innerHTML = `
                <strong>Booking ID:</strong> ${payment.bookingId}<br>
                <strong>Pengguna:</strong> ${payment.userName}<br>
                <strong>Jumlah:</strong> Rp ${payment.amount.toLocaleString('id-ID')}
            `;
        }

        // Update reject payment modal
        const rejectModal = document.getElementById('rejectPaymentModal');
        if (rejectModal) {
            rejectModal.querySelector('.alert').innerHTML = `
                <strong>Booking ID:</strong> ${payment.bookingId}<br>
                <strong>Pengguna:</strong> ${payment.userName}<br>
                <strong>Jumlah:</strong> Rp ${payment.amount.toLocaleString('id-ID')}
            `;
        }
    }
}

// Function to get payment by ID
function getPaymentById(paymentId) {
    const pendingPayments = JSON.parse(localStorage.getItem('pendingPayments')) || [];
    return pendingPayments.find(p => p.id === paymentId);
}
