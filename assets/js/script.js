// Global script for the application
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status on every page
    checkAuthStatus();

    // Add any global functionality here
    console.log('Sports Field Rental App loaded');

    // Example: Handle logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Apakah Anda yakin ingin logout?')) {
                logout();
            }
        });
    }

    // Admin logout
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Apakah Anda yakin ingin logout dari admin?')) {
                logout();
            }
        });
    }

    // Profile logout
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    if (profileLogoutBtn) {
        profileLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Apakah Anda yakin ingin logout?')) {
                logout();
            }
        });
    }
});

// Authentication checking function
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    const userType = localStorage.getItem('userType');

    // Pages that require user authentication
    const userProtectedPages = [
        'dashboard-user.html',
        'profile.html',
        'booking-history.html'
    ];

    // Pages that require admin authentication
    const adminProtectedPages = [
        'dashboard-admin.html',
        'admin-fields.html',
        'admin-schedule.html',
        'admin-payments.html',
        'admin-reports.html',
        'admin-bookings.html'
    ];

    // Pages that require owner authentication
    const ownerProtectedPages = [
        'dashboard-owner.html'
    ];

    // Special handling for booking page - redirect to login if not logged in
    if (currentPage === 'booking.html' && (!isLoggedIn || isLoggedIn !== 'true')) {
        window.location.href = 'login.html';
        return false;
    }

    // Check if this is a user protected page
    if (userProtectedPages.includes(currentPage) && (!isLoggedIn || isLoggedIn !== 'true')) {
        window.location.href = 'login.html';
        return false;
    }

    // Check if this is an admin protected page
    if (adminProtectedPages.includes(currentPage)) {
        if (!isLoggedIn || isLoggedIn !== 'true' || (userType !== 'admin' && userType !== 'owner')) {
            window.location.href = 'login.html';
            return false;
        }
    }

    // Check if this is an owner protected page
    if (ownerProtectedPages.includes(currentPage)) {
        if (!isLoggedIn || isLoggedIn !== 'true' || userType !== 'owner') {
            window.location.href = 'login.html';
            return false;
        }
    }

    // Check if user is admin/owner and on login page - redirect to appropriate dashboard
    if (currentPage === 'login.html' && isLoggedIn === 'true') {
        if (userType === 'owner') {
            window.location.href = 'dashboard-owner.html';
        } else if (userType === 'admin') {
            window.location.href = 'dashboard-admin.html';
        } else {
            window.location.href = 'dashboard-user.html';
        }
        return false;
    }

    // Check if user is regular user and on login page - redirect to user dashboard
    if (currentPage === 'login.html' && isLoggedIn === 'true' && userType === 'user') {
        window.location.href = 'dashboard-user.html';
        return false;
    }

    // Update UI based on auth status
    updateAuthUI();

    return isLoggedIn === 'true';
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}

// Update UI based on authentication status
function updateAuthUI() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    const userName = localStorage.getItem('userName');

    // Update navigation based on auth status
    updateNavigation(isLoggedIn === 'true', userType);

    // Show/hide content based on auth status
    const authRequiredElements = document.querySelectorAll('.auth-required');
    if (isLoggedIn === 'true') {
        authRequiredElements.forEach(el => el.style.display = 'block');
    } else {
        authRequiredElements.forEach(el => el.style.display = 'none');
    }
}

// Update navigation menu based on auth status
function updateNavigation(isLoggedIn, userType) {
    // Update the header navigation
    const navDropdown = document.querySelector('.navbar-nav .dropdown');
    if (navDropdown) {
        if (isLoggedIn) {
            // Update for logged in user
            let dropdownMenu = navDropdown.querySelector('.dropdown-menu');
            if (!dropdownMenu) {
                dropdownMenu = document.createElement('div');
                dropdownMenu.className = 'dropdown-menu';
                navDropdown.appendChild(dropdownMenu);
            }

            // Different menu for admin vs owner vs regular user
            if (userType === 'admin') {
                dropdownMenu.innerHTML = `
                    <a class="dropdown-item" href="dashboard-admin.html">Dashboard Admin</a>
                    <a class="dropdown-item" href="admin-bookings.html">Kelola Booking</a>
                    <a class="dropdown-item" href="admin-payments.html">Konfirmasi Pembayaran</a>
                    <hr class="dropdown-divider">
                    <a class="dropdown-item" href="#" id="adminLogoutBtn">Logout</a>
                `;
            } else if (userType === 'owner') {
                dropdownMenu.innerHTML = `
                    <a class="dropdown-item" href="dashboard-owner.html">Dashboard Owner</a>
                    <a class="dropdown-item" href="admin-bookings.html">Kelola Booking</a>
                    <a class="dropdown-item" href="admin-payments.html">Konfirmasi Pembayaran</a>
                    <a class="dropdown-item" href="admin-reports.html">Laporan Keuangan</a>
                    <hr class="dropdown-divider">
                    <a class="dropdown-item" href="#" id="ownerLogoutBtn">Logout</a>
                `;
            } else {
                dropdownMenu.innerHTML = `
                    <a class="dropdown-item" href="profile.html">Profile</a>
                    <a class="dropdown-item" href="booking-history.html">Riwayat Booking</a>
                    <hr class="dropdown-divider">
                    <a class="dropdown-item" href="#" id="logoutBtn">Logout</a>
                `;
            }

            // Reattach logout event listeners
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (confirm('Apakah Anda yakin ingin logout?')) {
                        logout();
                    }
                });
            }

            const adminLogoutBtn = document.getElementById('adminLogoutBtn');
            if (adminLogoutBtn) {
                adminLogoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (confirm('Apakah Anda yakin ingin logout dari admin?')) {
                        logout();
                    }
                });
            }

            const ownerLogoutBtn = document.getElementById('ownerLogoutBtn');
            if (ownerLogoutBtn) {
                ownerLogoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (confirm('Apakah Anda yakin ingin logout dari owner?')) {
                        logout();
                    }
                });
            }
        } else {
            // Show login/register for non-logged in users
            const dropdownMenu = navDropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.innerHTML = `
                    <a class="dropdown-item" href="login.html">Login</a>
                    <a class="dropdown-item" href="register.html">Register</a>
                `;
            }
        }
    }

    // Update the main "Akun" link text based on auth status
    const accountLink = document.querySelector('.navbar-nav .dropdown-toggle');
    if (accountLink) {
        if (isLoggedIn) {
            if (userType === 'admin') {
                accountLink.textContent = 'Admin';
            } else if (userType === 'owner') {
                accountLink.textContent = 'Owner';
            } else {
                accountLink.textContent = userName || 'Akun Saya';
            }
        } else {
            accountLink.textContent = 'Akun';
        }
    }
}

// Redirect to booking page with login check
function redirectToBooking(event) {
    event.preventDefault();
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    } else {
        window.location.href = 'booking.html';
    }
}

// Utility functions
function formatRupiah(angka) {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) {
        if(i%3 == 0) {
            rupiah += angkarev.substr(i,3)+'.';
        }
    }
    return 'Rp '+rupiah.split('',rupiah.length-1).reverse().join('');
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}