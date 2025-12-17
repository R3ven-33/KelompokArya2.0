// Booking page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check if we have booking details from the detail page
    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));

    // Booking steps navigation
    let currentStep = 1;

    // Check URL parameter for step
    const urlParams = new URLSearchParams(window.location.search);
    const requestedStep = urlParams.get('step');

    // If coming from detail page, start with step 2
    if (requestedStep && requestedStep === '2' && bookingDetails) {
        currentStep = 2;
    }

    const stepButtons = {
        1: document.getElementById('nextStep'),
        2: document.getElementById('prevStep')
    };

    const prevStepBtn = document.getElementById('prevStep');

    // Helper function to parse booking date from Indonesian locale format to 'YYYY-MM-DD'
    function parseBookingDate(dateStr) {
        // Handle Indonesian date format like "15/12/2025"
        if (dateStr.includes('/')) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                const day = parts[0].padStart(2, '0');
                const month = parts[1].padStart(2, '0');
                const year = parts[2];
                return `${year}-${month}-${day}`;
            }
        }

        // Fallback for other formats (like 'DD MMM YYYY')
        const months = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
            'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };

        const parts = dateStr.split(' ');
        if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const month = months[parts[1]];
            const year = parts[2];
            return `${year}-${month}-${day}`;
        }
        return dateStr; // fallback
    }

    // Function to mark booked time slots for the selected date
    function updateBookedTimeSlots() {
        const selectedDate = document.getElementById('scheduleDate').value;
        console.log('updateBookedTimeSlots called with date:', selectedDate);

        if (!selectedDate) {
            console.log('No date selected, showing all slots as available');
            // If no date selected, show all slots as available
            document.querySelectorAll('.time-slot').forEach(slot => {
                slot.classList.remove('booked', 'bg-danger', 'text-white');
                slot.style.backgroundColor = '';
                slot.style.color = '';
                slot.style.opacity = '';
                slot.removeEventListener('click', bookedSlotClickHandler);
                slot.addEventListener('click', timeSlotClickHandler);
            });
            return;
        }

        // Get all existing bookings
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        console.log('All bookings:', bookings);

        // Find bookings for the selected date and field
        const selectedField = document.getElementById('selectField');
        const fieldName = selectedField.options[selectedField.selectedIndex].text;
        console.log('Selected field:', fieldName);

        const bookedSlots = bookings.filter(booking => {
            // Convert booking date from Indonesian format to 'YYYY-MM-DD' for comparison
            let bookingDateStr = booking.date;
            const bookingDateISO = parseBookingDate(bookingDateStr);
            const selectedDateISO = selectedDate;

            console.log('Comparing:', bookingDateISO, 'with', selectedDateISO, 'for field:', booking.field.name);

            return bookingDateISO === selectedDateISO && booking.field.name === fieldName;
        });

        console.log('Booked slots found:', bookedSlots);

        // Reset all time slots
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('booked', 'bg-danger', 'text-white');
            slot.style.backgroundColor = '';
            slot.style.color = '';
            // Remove any existing specific booked click handlers
            slot.removeEventListener('click', bookedSlotClickHandler);
            // Reattach the default click handler
            slot.removeEventListener('click', timeSlotClickHandler);
            slot.addEventListener('click', timeSlotClickHandler);
        });

        // Mark booked slots with red color and disable selection
        bookedSlots.forEach(booking => {
            const timeSlot = document.querySelector(`.time-slot[data-time="${booking.time}"]`);
            if (timeSlot) {
                timeSlot.classList.add('booked', 'bg-danger', 'text-white');
                timeSlot.style.backgroundColor = '#dc3545'; // Red background
                timeSlot.style.color = 'white';
                timeSlot.style.opacity = '0.7';
                
                // Remove the default click handler and add one that shows it's booked
                timeSlot.removeEventListener('click', timeSlotClickHandler);
                timeSlot.addEventListener('click', bookedSlotClickHandler);
            }
        });
    }

    // Define the time slot click handler function for available slots
    function timeSlotClickHandler() {
        console.log('Time slot clicked:', this.dataset.time);
        if (!this.classList.contains('booked')) {
            // Remove selected class from all slots
            document.querySelectorAll('.time-slot').forEach(s => {
                s.classList.remove('selected');
            });

            // Add selected class to clicked slot
            this.classList.add('selected');

            // Update summary
            updateBookingSummary();
        } else {
            alert(`Waktu ${this.dataset.time} sudah dipesan oleh pengguna lain.`);
        }
    }
    
    // Define the click handler for booked slots
    function bookedSlotClickHandler() {
        alert(`Waktu ${this.dataset.time} sudah dipesan oleh pengguna lain.`);
    }

    // Show current step
    function showStep(step) {
        // Hide all steps
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all steps
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        document.getElementById(`step${step}`).classList.add('active');
        document.querySelectorAll('.step')[step-1].classList.add('active');

        // Update progress bar
        const progressWidth = (step - 1) * 50;
        document.querySelector('.progress-bar').style.width = `${progressWidth}%`;

        // Show/hide navigation buttons
        if (step === 1) {
            prevStepBtn.style.display = 'none';
        } else {
            prevStepBtn.style.display = 'inline-block';
        }

        if (step === 4) {
            document.getElementById('nextStep').textContent = 'Selesai';
        } else {
            document.getElementById('nextStep').textContent = 'Selanjutnya';
        }

        // Update booking summary
        updateBookingSummary();
    }

    // Go to next step
    document.getElementById('nextStep').addEventListener('click', function() {
        if (currentStep < 3) {
            // Validate current step before proceeding
            let isValid = true;

            if (currentStep === 1) {
                const selectedField = document.getElementById('selectField').value;
                const selectedTime = document.querySelector('.time-slot.selected');
                if (!selectedField) {
                    alert('Mohon pilih lapangan terlebih dahulu');
                    isValid = false;
                } else if (!selectedTime) {
                    alert('Mohon pilih jadwal terlebih dahulu');
                    isValid = false;
                }
            } else if (currentStep === 2) {
                // Validate booking details
                const bookingName = document.getElementById('bookingName').value;
                const bookingPhone = document.getElementById('bookingPhone').value;
                const bookingEmail = document.getElementById('bookingEmail').value;
                if (!bookingName || !bookingPhone || !bookingEmail) {
                    alert('Mohon lengkapi semua detail booking');
                    isValid = false;
                }
            }

            if (isValid) {
                currentStep++;
                showStep(currentStep);
            }
        } else {
            // Final step - complete booking
            // Check if payment method selected
            const selectedPaymentMethod = document.querySelector('.payment-option.selected');
            if (!selectedPaymentMethod) {
                alert('Mohon pilih metode pembayaran terlebih dahulu.');
                return;
            }

            // Generate unique booking ID
            const bookingId = 'BK' + Date.now().toString().slice(-6);

            // Get booking details
            const selectedField = document.getElementById('selectField');
            const scheduleDate = document.getElementById('scheduleDate');
            const selectedTime = document.querySelector('.time-slot.selected');
            const bookingDuration = document.getElementById('bookingDuration');
            const bookingName = document.getElementById('bookingName').value;
            const bookingPhone = document.getElementById('bookingPhone').value;
            const bookingEmail = document.getElementById('bookingEmail').value;
            const specialRequests = document.getElementById('specialRequests').value;

            // Calculate total
            const price = 150000; // Mini soccer price
            const duration = parseInt(bookingDuration.value);
            const total = price * duration;

            // Create booking record
            const bookingRecord = {
                id: bookingId,
                field: {
                    name: selectedField.options[selectedField.selectedIndex].text,
                    location: 'jln.A.H Nasution'
                },
                date: scheduleDate.value, // Store as YYYY-MM-DD format
                time: selectedTime ? selectedTime.dataset.time : '',
                duration: duration,
                customer: {
                    name: bookingName,
                    phone: bookingPhone,
                    email: bookingEmail
                },
                userId: localStorage.getItem('userEmail'), // Associate booking with user email
                userName: localStorage.getItem('userName'), // Store user name for reference
                specialRequests: specialRequests,
                total: total,
                status: 'pending',
                createdAt: new Date().toISOString(),
                paymentMethod: selectedPaymentMethod.textContent.trim()
            };

            // Save to localStorage
            let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings.push(bookingRecord);
            localStorage.setItem('bookings', JSON.stringify(bookings));

            // Create pending payment entry for owner confirmation
            const pendingPaymentRecord = {
                id: Date.now().toString(),
                bookingId: bookingId,
                userName: bookingName,
                userEmail: bookingEmail,
                userId: localStorage.getItem('userEmail'), // Associate with logged-in user
                paymentMethod: 'pending', // Will be set when user uploads proof
                amount: total,
                proofFile: null,
                status: 'pending',
                submittedAt: new Date().toISOString(),
                confirmedAt: null,
                rejectedAt: null,
                rejectionReason: null
            };

            let pendingPayments = JSON.parse(localStorage.getItem('pendingPayments')) || [];
            pendingPayments.push(pendingPaymentRecord);
            localStorage.setItem('pendingPayments', JSON.stringify(pendingPayments));

            // Clear the booking details from session storage after use
            sessionStorage.removeItem('bookingDetails');

            alert(`Booking berhasil dibuat dengan ID: ${bookingId}! Silakan lakukan pembayaran.`);
            // Redirect to payment page with booking ID
            window.location.href = `payment.html?bookingId=${bookingId}`;
        }
    });

    // Go to previous step
    prevStepBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Initialize
    showStep(currentStep);

    // If coming from detail page, populate the booking details
    if (bookingDetails && currentStep === 2) {
        populateBookingDetailsFromSession(bookingDetails);
    }

    // Auto-populate user details if user is logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === userEmail);

        if (user) {
            document.getElementById('bookingName').value = userName;
            document.getElementById('bookingEmail').value = userEmail;
            if (user.phone) {
                document.getElementById('bookingPhone').value = user.phone;
            }
        }
    }

    // Time slots functionality
    const timeSlotsContainer = document.getElementById('timeSlots');
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

    console.log('Time slots container found:', timeSlotsContainer);
    console.log('Creating time slots:', timeSlots.length);
    timeSlots.forEach(time => {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'col-md-3 col-sm-4 col-6';
        slotDiv.innerHTML = `
            <div class="time-slot" data-time="${time}">
                ${time}
            </div>
        `;
        if (timeSlotsContainer) {
            timeSlotsContainer.appendChild(slotDiv);
            console.log('Added time slot:', time);
        } else {
            console.error('Time slots container not found!');
        }
    });
    console.log('Total time slots created:', document.querySelectorAll('.time-slot').length);

    // Time slot selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', timeSlotClickHandler);
    });

    // Field selection - for mini soccer field
    document.getElementById('selectField').addEventListener('change', function() {
        const fieldName = this.options[this.selectedIndex].text;

        // Update booked slots when field changes
        updateBookingSummary();
        updateBookedTimeSlots();
    });

    // Booking date selection
    document.getElementById('scheduleDate').addEventListener('change', function() {
        console.log('Date changed to:', this.value);
        updateBookingSummary();
        updateBookedTimeSlots(); // Update booked slots when date changes
    });

    // Initialize booked time slots display when page loads
    updateBookedTimeSlots();

    // Update booking summary
    function updateBookingSummary() {
        console.log('updateBookingSummary called');
        const selectedField = document.getElementById('selectField');
        const selectedTime = document.querySelector('.time-slot.selected');
        const scheduleDate = document.getElementById('scheduleDate');
        const bookingDuration = document.getElementById('bookingDuration');

        console.log('selectedField:', selectedField);
        console.log('selectedTime:', selectedTime);
        console.log('scheduleDate:', scheduleDate);
        console.log('bookingDuration:', bookingDuration);

        if (selectedField && selectedField.value) {
            document.getElementById('summaryFieldName').textContent = selectedField.options[selectedField.selectedIndex].text;
        }

        if (scheduleDate.value) {
            document.getElementById('summaryDate').textContent = new Date(scheduleDate.value).toLocaleDateString('id-ID');
        }

        if (selectedTime) {
            const startTime = selectedTime.dataset.time;
            const duration = bookingDuration ? bookingDuration.value : 1;
            const endTime = calculateEndTime(startTime, parseInt(duration));
            document.getElementById('summaryTime').textContent = `${startTime} - ${endTime}`;
            console.log('Updated summaryTime:', `${startTime} - ${endTime}`);
        } else {
            document.getElementById('summaryTime').textContent = '-';
            console.log('No selected time, set summaryTime to -');
        }

        if (bookingDuration) {
            document.getElementById('summaryDuration').textContent = `${bookingDuration.value} jam`;
        }

        // Calculate total - using mini soccer price
        if (selectedField && selectedField.value && selectedTime) {
            const price = 150000; // Mini soccer price
            const duration = bookingDuration ? parseInt(bookingDuration.value) : 1;
            const total = price * duration;
            document.getElementById('summaryTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;

            // Update payment summary as well
            document.getElementById('paymentFieldName').textContent = selectedField.options[selectedField.selectedIndex].text;
            document.getElementById('paymentDate').textContent = scheduleDate.value ? new Date(scheduleDate.value).toLocaleDateString('id-ID') : '-';
            document.getElementById('paymentTime').textContent = selectedTime ? `${selectedTime.dataset.time} - ${calculateEndTime(selectedTime.dataset.time, duration)}` : '-';
            document.getElementById('paymentDuration').textContent = `${duration} jam`;
            document.getElementById('paymentHourlyRate').textContent = `Rp ${price.toLocaleString('id-ID')}`;
            document.getElementById('paymentTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;
        }
    }

    // Populate booking details from session storage
    function populateBookingDetailsFromSession(details) {
        // Set the field in the dropdown
        const selectField = document.getElementById('selectField');
        selectField.value = 'miniSoccer';

        // Set the date
        document.getElementById('scheduleDate').value = details.date;

        // Find the time slot element and mark it as selected
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
            if (slot.dataset.time === details.time) {
                slot.classList.add('selected');
            }
        });

        // Set the duration
        document.getElementById('bookingDuration').value = details.duration;

        // Update the summary
        updateBookingSummary();

        // Trigger update of booked time slots after setting date and field
        setTimeout(updateBookedTimeSlots, 100);
    }

    // Update booking summary
    function updateBookingSummary() {
        console.log('updateBookingSummary called');
        const selectedField = document.getElementById('selectField');
        const selectedTime = document.querySelector('.time-slot.selected');
        const scheduleDate = document.getElementById('scheduleDate');
        const bookingDuration = document.getElementById('bookingDuration');

        console.log('selectedField:', selectedField);
        console.log('selectedTime:', selectedTime);
        console.log('scheduleDate:', scheduleDate);
        console.log('bookingDuration:', bookingDuration);

        if (selectedField && selectedField.value) {
            document.getElementById('summaryFieldName').textContent = selectedField.options[selectedField.selectedIndex].text;
        }

        if (scheduleDate.value) {
            document.getElementById('summaryDate').textContent = new Date(scheduleDate.value).toLocaleDateString('id-ID');
        }

        if (selectedTime) {
            const startTime = selectedTime.dataset.time;
            const duration = bookingDuration ? bookingDuration.value : 1;
            const endTime = calculateEndTime(startTime, parseInt(duration));
            document.getElementById('summaryTime').textContent = `${startTime} - ${endTime}`;
            console.log('Updated summaryTime:', `${startTime} - ${endTime}`);
        } else {
            document.getElementById('summaryTime').textContent = '-';
            console.log('No selected time, set summaryTime to -');
        }

        if (bookingDuration) {
            document.getElementById('summaryDuration').textContent = `${bookingDuration.value} jam`;
        }

        // Calculate total - using mini soccer price
        if (selectedField && selectedField.value) {
            const price = 150000; // Mini soccer price
            const duration = bookingDuration ? parseInt(bookingDuration.value) : 1;
            const total = price * duration;
            document.getElementById('summaryTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;

            // Update payment summary as well
            document.getElementById('paymentFieldName').textContent = selectedField.options[selectedField.selectedIndex].text;
            document.getElementById('paymentDate').textContent = scheduleDate.value ? new Date(scheduleDate.value).toLocaleDateString('id-ID') : '-';
            document.getElementById('paymentTime').textContent = selectedTime ? `${selectedTime.dataset.time} - ${calculateEndTime(selectedTime.dataset.time, duration)}` : '-';
            document.getElementById('paymentDuration').textContent = `${duration} jam`;
            document.getElementById('paymentHourlyRate').textContent = `Rp ${price.toLocaleString('id-ID')}`;
            document.getElementById('paymentTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;
        }
    }

    // Calculate end time
    function calculateEndTime(startTime, duration) {
        const [hours, minutes] = startTime.split(':').map(Number);
        const start = new Date();
        start.setHours(hours, minutes, 0, 0);

        const end = new Date(start.getTime() + duration * 60 * 60 * 1000);
        return `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
    }

    // Payment method selection functionality
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            document.querySelectorAll('.payment-option').forEach(opt => {
                opt.classList.remove('selected');
                opt.classList.remove('border-success');
                opt.style.backgroundColor = '';
            });

            // Add selected class to clicked option
            this.classList.add('selected');
            this.classList.add('border-success');
            this.style.backgroundColor = '#f8f9fa';

            // Show account number based on selected method
            const paymentMethod = this.textContent.trim();
            showAccountNumber(paymentMethod);
        });
    });

    // Function to show account number based on payment method
    function showAccountNumber(paymentMethod) {
        let accountNumber = '';
        let methodTitle = '';

        switch(paymentMethod) {
            case 'Transfer Bank':
                accountNumber = '12345678';
                methodTitle = 'Transfer Bank';
                break;
            case 'E-Wallet':
                accountNumber = '12345678'; // Same account for demo purposes
                methodTitle = 'E-Wallet (OVO, DANA, LinkAja, GoPay)';
                break;
            case 'QRIS':
                accountNumber = 'QR1234567890'; // Example QR code
                methodTitle = 'QRIS';
                break;
            default:
                accountNumber = '';
                methodTitle = '';
        }

        // Update the payment info display
        const accountInfoDiv = document.getElementById('paymentAccountInfo');
        const methodSpan = document.getElementById('selectedMethod');
        const accountSpan = document.getElementById('accountNumber');
        
        if (accountNumber && methodSpan && accountSpan) {
            methodSpan.textContent = methodTitle;
            accountSpan.textContent = accountNumber;
            accountInfoDiv.classList.remove('d-none');
        } else {
            accountInfoDiv.classList.add('d-none');
        }
    }
});