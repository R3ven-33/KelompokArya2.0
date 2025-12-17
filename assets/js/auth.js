// Authentication JavaScript (for login and register pages)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize users from localStorage or use default sample data
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Ensure default users are always present
    const defaultUsers = [
        { email: 'user@example.com', phone: '081234567890', password: 'password123', name: 'Ahmad Jaelani', type: 'user' },
        { email: 'admin@example.com', phone: '081234567891', password: 'admin123', name: 'Admin Utama', type: 'admin' },
        { email: 'owner@example.com', phone: '081234567892', password: 'owner123', name: 'Owner Utama', type: 'owner' }
    ];

    // Add default users if they don't exist
    defaultUsers.forEach(defaultUser => {
        const exists = users.some(u => u.email === defaultUser.email);
        if (!exists) {
            users.push(defaultUser);
        }
    });

    // Add the specific user if not exist
    const specificUser = { email: 'arya@home.net', phone: '081234567891', password: '12345678', name: 'Arya Home', type: 'user' };
    const specificExists = users.some(u => u.email === specificUser.email);
    if (!specificExists) {
        users.push(specificUser);
    }

    // Save updated users to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Basic validation
            if (!email || !password) {
                alert('Mohon lengkapi semua field');
                return;
            }

            // Special case for arya@home.net
            let user = null;
            if (email === 'arya@home.net' && password === '12345678') {
                user = { email: 'arya@home.net', phone: '081234567891', password: '12345678', name: 'Arya Home', type: 'user' };
            } else {
                // Find user in users array
                user = users.find(u => (u.email === email || u.phone === email) && u.password === password);
            }

            if (user) {
                alert(`Login berhasil sebagai ${user.name}!`);

                // Store login status in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userType', user.type);
                localStorage.setItem('userName', user.name);
                localStorage.setItem('userEmail', user.email);

                // Redirect based on user type
                if (user.type === 'admin') {
                    window.location.href = 'dashboard-admin.html';
                } else if (user.type === 'owner') {
                    window.location.href = 'dashboard-owner.html';
                } else {
                    window.location.href = 'dashboard-user.html';
                }
            } else {
                alert('Email/HP atau kata sandi salah');
            }
        });
    }

    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('regEmail').value;
            const phone = document.getElementById('regPhone').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsAgreement = document.getElementById('termsAgreement').checked;

            // Validation
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
                alert('Mohon lengkapi semua field');
                return;
            }

            // Check if user already exists
            const existingUser = users.find(u => u.email === email || u.phone === phone);
            if (existingUser) {
                alert('Email atau nomor HP sudah terdaftar. Silakan gunakan yang lain.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Kata sandi tidak cocok');
                return;
            }

            if (!termsAgreement) {
                alert('Mohon setujui syarat dan ketentuan');
                return;
            }

            if (password.length < 8) {
                alert('Kata sandi minimal 8 karakter');
                return;
            }

            // Create new user object
            const newUser = {
                email: email,
                phone: phone,
                password: password,
                name: `${firstName} ${lastName}`,
                type: 'user' // New registrations are regular users by default
            };

            // Add new user to users array
            users.push(newUser);

            // Save updated users array to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Automatically log in the new user
            // Store login status in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userType', newUser.type);
            localStorage.setItem('userName', newUser.name);
            localStorage.setItem('userEmail', newUser.email);

            // Show success message and redirect to user dashboard
            alert(`Registrasi berhasil! Selamat datang, ${newUser.name}!`);

            // Redirect to user dashboard immediately after registration
            window.location.href = 'dashboard-user.html';
        });
    }

    // Password visibility toggle (if needed)
    function addPasswordToggle() {
        const passwordFields = document.querySelectorAll('input[type="password"]');
        passwordFields.forEach(field => {
            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
            toggleBtn.style.position = 'absolute';
            toggleBtn.style.right = '10px';
            toggleBtn.style.top = '50%';
            toggleBtn.style.transform = 'translateY(-50%)';
            toggleBtn.style.border = 'none';
            toggleBtn.style.background = 'none';
            toggleBtn.style.cursor = 'pointer';

            const container = field.parentNode;
            container.style.position = 'relative';
            container.appendChild(toggleBtn);

            toggleBtn.addEventListener('click', function() {
                if (field.type === 'password') {
                    field.type = 'text';
                    toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    field.type = 'password';
                    toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
                }
            });
        });
    }

    // Add password toggle to existing password fields
    addPasswordToggle();
});