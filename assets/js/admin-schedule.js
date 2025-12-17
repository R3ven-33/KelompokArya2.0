// Admin Schedule Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // The authentication check is now handled globally in script.js
    // Only initialize page-specific functionality here

    // Save schedule functionality
    document.getElementById('scheduleForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const scheduleField = document.getElementById('scheduleField').value;
        const scheduleDay = document.getElementById('scheduleDay').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
        const status = document.getElementById('status').value;

        if (!scheduleField || !scheduleDay || !startTime || !endTime) {
            alert('Mohon lengkapi semua field');
            return;
        }

        // In a real application, this would send data to the server
        alert(`Jadwal berhasil disimpan untuk Lapangan ID: ${scheduleField}, Hari: ${scheduleDay}`);

        // Reset form
        this.reset();
        document.getElementById('startTime').value = '08:00';
        document.getElementById('endTime').value = '22:00';
    });

    // Save pricing functionality
    document.getElementById('pricingForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const pricingField = document.getElementById('pricingField').value;
        const weekdayPrice = document.getElementById('weekdayPrice').value;
        const weekendPrice = document.getElementById('weekendPrice').value;

        if (!pricingField || !weekdayPrice || !weekendPrice) {
            alert('Mohon lengkapi semua field harga');
            return;
        }

        // In a real application, this would send data to the server
        alert(`Harga berhasil disimpan untuk Lapangan ID: ${pricingField}`);

        // Reset form
        this.reset();
    });

    // Edit pricing functionality
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        if (button.textContent.trim() === 'Edit' && button.closest('tbody')) {
            button.addEventListener('click', function() {
                const fieldRow = this.closest('tr');
                const fieldName = fieldRow.cells[0].textContent;
                const weekdayPrice = fieldRow.cells[1].textContent.replace('Rp ', '').replace(/\./g, '');

                // In a real application, this would open an edit modal
                alert(`Edit harga untuk: ${fieldName}\nHarga Weekday: Rp ${parseInt(weekdayPrice).toLocaleString('id-ID')}`);
            });
        }
    });

    // Filter functionality
    document.getElementById('filterField').addEventListener('change', function() {
        const selectedField = this.value;
        if (selectedField) {
            alert(`Menampilkan jadwal untuk Lapangan ID: ${selectedField}`);
        }
    });
});