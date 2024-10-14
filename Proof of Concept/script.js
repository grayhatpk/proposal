// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initMoodTracker();
    const initialMoods = JSON.parse(localStorage.getItem('moods')) || [];
    updateChart(initialMoods);
});

// Initialize the Mood Tracker
function initMoodTracker() {
    document.getElementById('mood-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const mood = document.getElementById('mood').value;
        logMood(mood);
    });
}

// Function to log the mood entry
function logMood(mood) {
    let moods = JSON.parse(localStorage.getItem('moods')) || [];
    const today = new Date().toISOString().split('T')[0];
    
    // Prevent logging the mood multiple times in one day
    const alreadyLogged = moods.some(entry => entry.date === today);
    if (alreadyLogged) {
        alert('Mood for today is already logged.');
        return;
    }

    moods.push({ date: today, mood: mood });
    localStorage.setItem('moods', JSON.stringify(moods));
    updateChart(moods);
}

// Function to update the mood chart
function updateChart(moods) {
    const ctx = document.getElementById('mood-chart').getContext('2d');
    const dates = moods.map(entry => entry.date);
    const moodValues = moods.map(entry => entry.mood);

    // Destroy the previous chart if it exists
    if (window.moodChart) {
        window.moodChart.destroy();
    }

    window.moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Mood Over Time',
                data: moodValues.map(value => {
                    switch (value) {
                        case 'happy': return 5;
                        case 'excited': return 4;
                        case 'neutral': return 3;
                        case 'anxious': return 2;
                        case 'sad': return 1;
                        default: return 3;
                    }
                }),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            switch (value) {
                                case 1: return 'Sad';
                                case 2: return 'Anxious';
                                case 3: return 'Neutral';
                                case 4: return 'Excited';
                                case 5: return 'Happy';
                                default: return '';
                            }
                        }
                    }
                }
            }
        }
    });
}

// Mock user login function (assuming you want to handle user authentication)
function loginUser(username, password) {
    // Simulate login process
    if (username === "student" && password === "password") {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'dashboard.html'; // Redirect to the main dashboard
    } else {
        alert('Invalid credentials!');
    }
}

// Logout function
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html'; // Redirect to the login page
}

// Chatroom Functionality
function initChatroom() {
    const chatForm = document.getElementById('chat-form');
    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = document.getElementById('chat-message').value;
        addChatMessage(message);
    });
}

function addChatMessage(message) {
    let chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    chatMessages.push({ user: localStorage.getItem('loggedInUser'), message: message, timestamp: new Date().toLocaleString() });
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    updateChatDisplay();
}

function updateChatDisplay() {
    const chatBox = document.getElementById('chat-box');
    const chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    chatBox.innerHTML = chatMessages.map(msg => `<div class="chat-message"><strong>${msg.user}:</strong> ${msg.message} <span>${msg.timestamp}</span></div>`).join('');
}

// Mindfulness exercises - Placeholder
function startMindfulnessExercise() {
    alert("Starting mindfulness exercise... (Guided exercise would begin here)");
}

// Resource Section
function initResources() {
    const resources = [
        { title: "Understanding Anxiety", link: "resource-anxiety.html" },
        { title: "Meditation Techniques", link: "resource-meditation.html" },
        { title: "How to Handle Stress", link: "resource-stress.html" }
    ];
    
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = resources.map(resource => `<li><a href="${resource.link}">${resource.title}</a></li>`).join('');
}

// Booking Counseling Appointments
function bookAppointment(counselor, date) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push({ counselor: counselor, date: date, user: localStorage.getItem('loggedInUser') });
    localStorage.setItem('appointments', JSON.stringify(appointments));
    alert(`Appointment booked with ${counselor} on ${date}`);
    updateAppointmentDisplay();
}

function updateAppointmentDisplay() {
    const appointmentList = document.getElementById('appointment-list');
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointmentList.innerHTML = appointments.map(app => `<li>${app.date}: ${app.counselor}</li>`).join('');
}

// Initialize Counseling Booking
function initCounseling() {
    document.getElementById('appointment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const counselor = document.getElementById('counselor').value;
        const date = document.getElementById('appointment-date').value;
        bookAppointment(counselor, date);
    });
}
