// Admin Fields Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // The authentication check is now handled globally in script.js
    // Only initialize page-specific functionality here

    // Add field functionality
    document.getElementById('saveFieldBtn').addEventListener('click', function() {
        const fieldName = document.getElementById('fieldName').value;
        const fieldType = document.getElementById('fieldType').value;
        const fieldLocation = document.getElementById('fieldLocation').value;
        const fieldPrice = document.getElementById('fieldPrice').value;
        const fieldCapacity = document.getElementById('fieldCapacity').value;

        // Validation
        if (!fieldName || !fieldType || !fieldLocation || !fieldPrice || !fieldCapacity) {
            alert('Mohon lengkapi semua field');
            return;
        }

        // In a real application, this would send data to the server
        alert(`Lapangan baru berhasil ditambahkan: ${fieldName}`);

        // Reset form
        document.getElementById('addFieldForm').reset();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addFieldModal'));
        modal.hide();
    });

    // Update field functionality
    document.getElementById('updateFieldBtn').addEventListener('click', function() {
        const fieldName = document.getElementById('editFieldName').value;

        // In a real application, this would send data to the server
        alert(`Lapangan berhasil diperbarui: ${fieldName}`);

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editFieldModal'));
        modal.hide();
    });

    // Delete field functionality
    document.querySelectorAll('.btn-outline-danger').forEach(button => {
        if (!button.closest('.modal')) { // Only handle delete buttons in the main table
            button.addEventListener('click', function() {
                const fieldName = this.closest('tr').querySelector('td:nth-child(2)').textContent;
                if (confirm(`Apakah Anda yakin ingin menghapus lapangan: ${fieldName}?`)) {
                    // In a real application, this would send delete request to the server
                    this.closest('tr').remove();
                    alert(`Lapangan ${fieldName} berhasil dihapus`);
                }
            });
        }
    });

    // Search functionality
    document.querySelector('.input-group button').addEventListener('click', function() {
        const searchTerm = document.querySelector('.input-group input').value;
        if (searchTerm) {
            alert(`Mencari lapangan dengan kata kunci: ${searchTerm}`);
        }
    });
});