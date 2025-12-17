// Fields page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Single mini soccer field data
    const miniSoccerField = {
        id: 1,
        name: "Lapangan Mini Soccer",
        type: "mini-soccer",
        location: "Jakarta",
        price: 150000,
        rating: 4.7,
        image: "https://source.unsplash.com/600x400/?soccer-field",
        facilities: ["Area Parkir Luas", "Kamar Mandi", "Ruang Ganti", "Tribun Penonton", "Lighting System"]
    };

    // Update field details on page
    document.querySelector('.field-gallery img').src = miniSoccerField.image;
    document.querySelector('.field-gallery .col-3:nth-child(1) img').src = "https://source.unsplash.com/200x150/?soccer-field,1";
    document.querySelector('.field-gallery .col-3:nth-child(2) img').src = "https://source.unsplash.com/200x150/?soccer-field,2";
    document.querySelector('.field-gallery .col-3:nth-child(3) img').src = "https://source.unsplash.com/200x150/?soccer-field,3";
    document.querySelector('.field-gallery .col-3:nth-child(4) img').src = "https://source.unsplash.com/200x150/?soccer-field,4";

    document.querySelector('.field-description p').textContent = "Lapangan Mini Soccer dengan kualitas terbaik yang memiliki permukaan rumput sintetis dan pencahayaan yang baik. Lapangan ini dirancang khusus untuk permainan sepak bola dalam format yang lebih kecil, cocok untuk pertandingan internal, latihan, dan pertandingan persahabatan.";

    document.querySelector('.field-price h2').textContent = `Rp ${miniSoccerField.price.toLocaleString('id-ID')} /jam`;

    // Update rating
    const stars = document.querySelectorAll('.rating-stars i');
    for (let i = 0; i < Math.floor(miniSoccerField.rating); i++) {
        stars[i].className = "fas fa-star text-warning";
    }

    if (miniSoccerField.rating % 1 !== 0) {
        stars[Math.floor(miniSoccerField.rating)].className = "fas fa-star-half-alt text-warning";
    }

    document.querySelector('.rating-stars span').textContent = `(${miniSoccerField.rating} dari 128 ulasan)`;

    // Update location
    document.querySelector('.field-location p').innerHTML = `<i class="fas fa-map-marker-alt text-danger me-2"></i>${miniSoccerField.location}`;

    // Update field type
    document.querySelector('.field-type p').innerHTML = `<i class="fas fa-futbol me-2"></i>Mini Soccer`;

    // Update facilities
    const facilitiesList = document.querySelector('.field-facilities ul');
    facilitiesList.innerHTML = '';
    miniSoccerField.facilities.forEach((facility, index) => {
        const li = document.createElement('li');
        li.textContent = facility;
        facilitiesList.appendChild(li);
    });

});