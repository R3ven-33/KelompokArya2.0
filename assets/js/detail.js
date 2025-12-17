// Detail page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mini soccer field data
    const miniSoccerField = {
        name: "Lapangan Mini Soccer",
        description: "Lapangan Mini Soccer dengan kualitas terbaik yang memiliki permukaan rumput sintetis dan pencahayaan yang baik. Lapangan ini dirancang khusus untuk permainan sepak bola dalam format yang lebih kecil, cocok untuk pertandingan internal, latihan, dan pertandingan persahabatan.",
        location: "Jl. Raya Bogor No.123, Jakarta Timur",
        type: "Mini Soccer",
        price: 150000,
        facilities: [
            "Area Parkir Luas",
            "Kamar Mandi",
            "Ruang Ganti",
            "Tribun Penonton",
            "Lighting System"
        ],
        rating: 4.7
    };

    // Update field details on page
    document.getElementById('fieldName').textContent = miniSoccerField.name;
    document.getElementById('fieldBreadcrumb').textContent = miniSoccerField.name;
    document.getElementById('fieldDescription').textContent = miniSoccerField.description;
    document.getElementById('fieldLocation').innerHTML = `<i class="fas fa-map-marker-alt text-danger me-2"></i>${miniSoccerField.location}`;
    document.getElementById('fieldType').innerHTML = `<i class="fas fa-futbol me-2"></i>${miniSoccerField.type}`;
    document.getElementById('fieldPrice').textContent = `Rp ${miniSoccerField.price.toLocaleString('id-ID')} /jam`;

    // Update facilities
    const facilitiesList = document.getElementById('facility1').parentElement;
    facilitiesList.innerHTML = '';
    miniSoccerField.facilities.forEach((facility, index) => {
        const li = document.createElement('li');
        li.id = `facility${index + 1}`;
        li.textContent = facility;
        facilitiesList.appendChild(li);
    });

    // Calculate total based on selection
    const bookingTime = document.getElementById('bookingTime');
    const duration = document.getElementById('duration');
    const totalAmount = document.getElementById('totalAmount');

    function calculateTotal() {
        const timeValue = bookingTime.value;
        const durationValue = parseInt(duration.value);

        if (timeValue && durationValue) {
            const totalTime = miniSoccerField.price * durationValue;
            totalAmount.value = `Rp ${totalTime.toLocaleString('id-ID')}`;
        } else {
            totalAmount.value = '';
        }
    }

    bookingTime.addEventListener('change', calculateTotal);
    duration.addEventListener('change', calculateTotal);

    // Booking confirmation
    document.getElementById('confirmBooking').addEventListener('click', function() {
        const bookingDate = document.getElementById('bookingDate').value;
        const bookingTimeValue = document.getElementById('bookingTime').value;
        const durationValue = document.getElementById('duration').value;
        const termsCheck = document.getElementById('termsCheck').checked;

        if (!bookingDate || !bookingTimeValue || !durationValue) {
            alert('Mohon lengkapi semua data booking');
            return;
        }

        if (!termsCheck) {
            alert('Mohon setujui syarat dan ketentuan');
            return;
        }

        // Store booking details in sessionStorage for the booking page
        const bookingDetails = {
            fieldName: miniSoccerField.name,
            fieldPrice: miniSoccerField.price,
            location: miniSoccerField.location,
            date: bookingDate,
            time: bookingTimeValue,
            duration: parseInt(durationValue),
            totalAmount: parseInt(totalAmount.value.replace(/\D/g, '')) // Remove all non-digit characters
        };

        sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

        // Redirect to booking page at step 2 (Booking Details)
        window.location.href = 'booking.html?step=2';
    });

    // Calculate end time
    function calculateEndTime(startTime, duration) {
        const [hours, minutes] = startTime.split(':').map(Number);
        const start = new Date();
        start.setHours(hours, minutes, 0, 0);

        const end = new Date(start.getTime() + duration * 60 * 60 * 1000);
        return `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
    }

    // Image gallery functionality
    const mainImage = document.getElementById('mainImage');
    const galleryImages = document.querySelectorAll('.field-gallery .img-fluid');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            mainImage.src = this.src;
        });
    });
});