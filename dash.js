
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    const menuLinks = document.querySelectorAll('.sidebar .menu a');
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.sidebar .menu a[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

const monthlySurgeriesCtx = document.getElementById('monthlySurgeriesChart').getContext('2d');
const revenueGrowthCtx = document.getElementById('revenueGrowthChart').getContext('2d');
const patientSatisfactionCtx = document.getElementById('patientSatisfactionChart').getContext('2d');

const monthlySurgeriesChart = new Chart(monthlySurgeriesCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Surgeries',
            data: [10, 30, 90, 60, 20, 70, 10, 80, 90, 108, 50, 120],
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 1,
        }]
        
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const revenueGrowthChart = new Chart(revenueGrowthCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Revenue',
            data: [18000, 72000, 36000, 27000, 45000, 36000, 81000, 63000, 72000, 90000, 60000, 65000],
            backgroundColor: 'rgba(255, 152, 0, 0.2)',
            borderColor: 'rgba(255, 152, 0, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const patientSatisfactionChart = new Chart(patientSatisfactionCtx, {
    type: 'pie',
    data: {
        labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
        datasets: [{
            label: 'Satisfaction',
            data: [60, 25, 10, 3, 2],
            backgroundColor: [
                'rgba(76, 175, 80, 0.6)',
                'rgba(255, 152, 0, 0.6)',
                'rgba(255, 235, 59, 0.6)',
                'rgba(244, 67, 54, 0.6)',
                'rgba(33, 33, 33, 0.6)'
            ],
            borderColor: [
                'rgba(76, 175, 80, 1)',
                'rgba(255, 152, 0, 1)',
                'rgba(255, 235, 59, 1)',
                'rgba(244, 67, 54, 1)',
                'rgba(33, 33, 33, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true
    }
});

// <!-- toggle -->

function toggleStatus() {
const toggleSwitch = document.querySelector('.toggle-switch');
const statusText = document.getElementById('toggleStatus');

// Toggle the active class on the switch
toggleSwitch.classList.toggle('active');

// Update the status text based on the toggle state
if (toggleSwitch.classList.contains('active')) {
statusText.textContent = 'Status: Check-Out';
} else {
statusText.textContent = 'Status: Check-In';
}
}
// profile
document.getElementById('updateProfileBtn').addEventListener('click', function () {
    document.getElementById('profileView').style.display = 'none';
    document.getElementById('updateSection').style.display = 'block';
});

document.getElementById('cancelUpdateBtn').addEventListener('click', function () {
    document.getElementById('updateSection').style.display = 'none';
    document.getElementById('profileView').style.display = 'block';
});

// Real-time Validation
const nameField = document.getElementById('updateName');
const emailField = document.getElementById('updateEmail');
const phoneField = document.getElementById('updatePhone');
const addressField = document.getElementById('updateAddress');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const addressError = document.getElementById('addressError');

nameField.addEventListener('input', () => {
    if (nameField.value.trim() === '') {
        nameError.textContent = 'Name cannot be empty.';
    } else if (!/^[a-zA-Z\s]+$/.test(nameField.value)) {
        nameError.textContent = 'Name must contain only letters and spaces.';
    } else {
        nameError.textContent = '';
    }
});

emailField.addEventListener('input', () => {
    if (emailField.value.trim() === '') {
        emailError.textContent = 'Email cannot be empty.';
    } else if (!/^\S+@\S+\.\S+$/.test(emailField.value)) {
        emailError.textContent = 'Enter a valid email address.';
    } else {
        emailError.textContent = '';
    }
});

phoneField.addEventListener('input', () => {
    if (phoneField.value.trim() === '') {
        phoneError.textContent = 'Phone number cannot be empty.';
    } else if (!/^\+?[0-9]{10,15}$/.test(phoneField.value)) {
        phoneError.textContent = 'Enter a valid phone number.';
    } else {
        phoneError.textContent = '';
    }
});

addressField.addEventListener('input', () => {
    if (addressField.value.trim() === '') {
        addressError.textContent = 'Address cannot be empty.';
    } else {
        addressError.textContent = '';
    }
});

// Submit Event
document.getElementById('updateForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Check for validation errors before submission
    if (
        nameError.textContent === '' &&
        emailError.textContent === '' &&
        phoneError.textContent === '' &&
        addressError.textContent === ''
    ) {
        // Get updated values
        const updatedName = nameField.value;
        const updatedEmail = emailField.value;
        const updatedPhone = phoneField.value;
        const updatedAddress = addressField.value;
        const updatedImg = document.getElementById('updateImg').files[0];

        // Update profile view
        document.getElementById('profileName').innerText = updatedName;
        document.getElementById('profileEmail').innerText = updatedEmail;
        document.getElementById('profilePhone').innerText = updatedPhone;
        document.getElementById('profileAddress').innerText = updatedAddress;

        if (updatedImg) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('profileImg').src = e.target.result;
            };
            reader.readAsDataURL(updatedImg);
        }

        // Hide the update section and show the profile view
        document.getElementById('updateSection').style.display = 'none';
        document.getElementById('profileView').style.display = 'block';
    } else {
        alert('Please fix the errors before submitting.');
    }
});
// </script>


// <!-- appointment -->

// <script>
// Function to handle the cancel button click (removes the appointment)
function cancelAppointment(appointmentId) {
    const appointmentItem = document.getElementById(appointmentId);

    // Remove the appointment from the list
    appointmentItem.remove();

    // Check if there are any appointments left
    const remainingAppointments = document.querySelectorAll('.appointment-item');

    if (remainingAppointments.length === 0) {
        // If no appointments left, show the "No appointments left" message
        document.getElementById('noAppointmentsMessage').style.display = 'block';
    }
}

// Function to handle the edit button click
function editAppointment(appointmentId) {
    const appointmentItem = document.getElementById(appointmentId);

    // Get current appointment details
    const patientName = appointmentItem.querySelector('.appointment-info span').innerText;
    const appointmentDate = appointmentItem.querySelector('.appointment-date').innerText;
    const appointmentTime = appointmentItem.querySelector('.appointment-time').innerText;

    // Set values in the edit form
    document.getElementById('patientName').value = patientName;
    document.getElementById('appointmentDate').value = appointmentDate;
    document.getElementById('appointmentTime').value = appointmentTime;

    // Set the appointmentId in the form for identification
    document.getElementById('editAppointmentForm').setAttribute('data-appointment-id', appointmentId);

    // Show the edit appointment form and hide the appointment list
    document.getElementById('editAppointmentSection').style.display = 'block';
    document.getElementById('appointmentList').style.display = 'none';

    // Disable Edit and Cancel buttons in the original item
    appointmentItem.querySelector('.edit-btn').disabled = true;
    appointmentItem.querySelector('.cancel-btn').disabled = true;
}

// Function to handle canceling the edit form (returns to the original list)
function cancelEdit() {
    document.getElementById('editAppointmentSection').style.display = 'none';
    document.getElementById('appointmentList').style.display = 'block';

    // Re-enable Edit and Cancel buttons for the appointment items
    const appointmentItems = document.querySelectorAll('.appointment-item');
    appointmentItems.forEach(item => {
        item.querySelector('.edit-btn').disabled = false;
        item.querySelector('.cancel-btn').disabled = false;
    });
}

// Function to handle form submission (saving updated appointment)
document.getElementById('editAppointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get updated values from the form
    const updatedDate = document.getElementById('appointmentDate').value;
    const updatedTime = document.getElementById('appointmentTime').value;

    // Get the appointmentId from the form
    const appointmentId = document.getElementById('editAppointmentForm').getAttribute('data-appointment-id');

    // Find the appointment item in the list and update it
    const appointmentItem = document.getElementById(appointmentId);
    appointmentItem.querySelector('.appointment-date').innerText = updatedDate;
    appointmentItem.querySelector('.appointment-time').innerText = updatedTime;

    // Hide the edit form and return to the appointment list
    document.getElementById('editAppointmentSection').style.display = 'none';
    document.getElementById('appointmentList').style.display = 'block';

    // Re-enable Edit and Cancel buttons for all items
    const appointmentItems = document.querySelectorAll('.appointment-item');
    appointmentItems.forEach(item => {
        item.querySelector('.edit-btn').disabled = false;
        item.querySelector('.cancel-btn').disabled = false;
    });
});

// </script>

// <!-- notifications -->

// <script>
// Function to clear an individual notification
function clearNotification(notificationId) {
    const notificationItem = document.getElementById(notificationId);
    notificationItem.style.display = 'none'; // Hide the notification
    checkNotifications(); // Check if any notifications are left
}

// Function to clear all notifications
function clearAllNotifications() {
    const notifications = document.querySelectorAll('.notification-item');
    notifications.forEach(notification => {
        notification.style.display = 'none'; // Hide each notification
    });
    checkNotifications(); // Check if any notifications are left
}

// Function to check if any notifications are left
function checkNotifications() {
    const remainingNotifications = document.querySelectorAll('.notification-item');
    const noNotificationsMessage = document.getElementById('noNotificationsMessage');
    const clearAllButton = document.getElementById('clearAllBtn');

    // Only count notifications that are still visible (not hidden)
    const visibleNotifications = Array.from(remainingNotifications).filter(notification => notification.style.display !== 'none');

    if (visibleNotifications.length === 0) {
        noNotificationsMessage.style.display = 'block'; // Show "No notifications to see" message
        clearAllButton.style.display = 'none'; // Hide Clear All button
    } else {
        noNotificationsMessage.style.display = 'none'; // Hide the "No notifications" message
        clearAllButton.style.display = 'block'; // Show Clear All button
    }
}

// Initialize check for notifications on page load
window.onload = checkNotifications;

// </script>

// <!-- live time -->

// <script>
// Function to display live time
function displayTime() {
    const liveTime = document.getElementById('liveTime');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    liveTime.innerText = `${hours}:${minutes}:${seconds}`;
}

// Update live time every second
setInterval(displayTime, 1000);

// Initial call to display time
displayTime();
// </script>

// <!-- logout -->

// <script>
document.getElementById('confirmLogout').addEventListener('click', function () {
    // Redirect to index.html
    window.location.href = 'logout.html';
});

document.getElementById('cancelLogout').addEventListener('click', function () {
    // Do nothing; the user stays on the same page
    console.log('Logout canceled');
});
