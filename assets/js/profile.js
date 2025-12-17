// Profile page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // The authentication check is now handled globally in script.js
    // Only initialize page-specific functionality here

    // Load user data from localStorage
    const userEmail = localStorage.getItem('userEmail');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.email === userEmail);

    if (currentUser) {
        // Update profile info
        const nameParts = currentUser.name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileEmail').textContent = currentUser.email;

        // Pre-fill form with user data
        document.getElementById('fname').value = firstName;
        document.getElementById('lname').value = lastName;
        document.getElementById('email').value = currentUser.email;
        document.getElementById('phone').value = currentUser.phone || '';

        // Load additional profile data if exists, otherwise use defaults
        const profileData = JSON.parse(localStorage.getItem('userProfile')) || {};
        document.getElementById('address').value = profileData.address || '';
        document.getElementById('birthDate').value = profileData.birthDate || '';
        document.getElementById('gender').value = profileData.gender || '';
    } else {
        // Fallback if user not found
        alert('User data not found. Please login again.');
        window.location.href = 'login.html';
    }

    // Update form when submitted
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            firstName: document.getElementById('fname').value,
            lastName: document.getElementById('lname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            birthDate: document.getElementById('birthDate').value,
            gender: document.getElementById('gender').value
        };

        // In a real application, this would send the updated data to the server
        alert('Profil berhasil diperbarui!');

        // Update display
        document.getElementById('profileName').textContent = `${formData.firstName} ${formData.lastName}`;
        document.getElementById('profileEmail').textContent = formData.email;
    });
});