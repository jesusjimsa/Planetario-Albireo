function showResponsiveMenu() {
    var menu = document.getElementById("nav_container");

    if (menu.style.display != "block") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function backToIndex() {
    window.location.href = 'index.html';
}

function toggleFaqItem(question) {
    const allAnswers = document.querySelectorAll(".faq-answer");
    const allArrows = document.querySelectorAll(".faq-question .arrow");

    // Cerrar todas las respuestas abiertas
    allAnswers.forEach(answer => {
        if (answer !== question.nextElementSibling) {
            answer.style.maxHeight = null;
        }
    });

    allArrows.forEach(arrow => {
        if (arrow !== question.querySelector(".arrow")) {
            arrow.textContent = "▶";
        }
    });

    // Alternar visibilidad de la respuesta actual
    const answer = question.nextElementSibling;
    const arrow = question.querySelector(".arrow");

    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        arrow.textContent = "▶";
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        arrow.textContent = "▼";
    }
}

// Mostrar el pop-up solo si no se ha aceptado previamente
// if (!localStorage.getItem('cookiesAccepted')) {
//     document.getElementById('cookie-popup').style.display = 'flex';
// }

// Get references to the banner and the button
const banner = document.getElementById('cookieConsentBanner');
const acceptButton = document.getElementById('acceptCookieButton');

// Function to hide the banner and set the consent flag in localStorage
function acceptCookies() {
    if (banner) {
        banner.style.display = 'none'; // Hide the banner
    }
    // Set a flag in localStorage indicating consent has been given
    localStorage.setItem('cookieConsentGiven', 'true');
    console.log("Cookie consent accepted and stored.");
}

// Add event listener to the accept button
if (acceptButton) {
    acceptButton.addEventListener('click', acceptCookies);
}

// Check if consent has already been given on page load
window.onload = function () {
    const consentGiven = localStorage.getItem('cookieConsentGiven');
    console.log("Checking cookie consent:", consentGiven);
    // If consent hasn't been given, show the banner by changing display style
    if (consentGiven !== 'true' && banner) {
        banner.style.display = 'flex'; // Show the banner using flex display
        console.log("Showing cookie banner.");
    } else if (banner) {
        // Ensure it remains hidden if consent was given
        banner.style.display = 'none';
        console.log("Cookie consent already given, banner remains hidden.");
    }
};

// const calendarGrid = document.getElementById('calendarGrid');
const currentMonthYearHeader = document.getElementById('currentMonthYear');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

let currentDate = new Date();

// Array of moon phase image URLs
const imageUrls = [
    'img/moon_phases/new_moon.png', // Phase 0: New Moon
    'img/moon_phases/waxing_crescent.png', // Phase 1: Waxing Crescent
    'img/moon_phases/first_quarter.png', // Phase 2: First Quarter
    'img/moon_phases/waxing_gibbous.png', // Phase 3: Waxing Gibbous
    'img/moon_phases/full_moon.png', // Phase 4: Full Moon
    'img/moon_phases/waning_gibbous.png', // Phase 5: Waning Gibbous
    'img/moon_phases/last_quarter.png', // Phase 6: Last Quarter
    'img/moon_phases/waning_crescent.png' // Phase 7: Waning Crescent
];

// Function to calculate moon phase for a given date
// Based on a simplified algorithm using the number of days since a known new moon
function calculateMoonPhase(date) {
    // Known new moon date: January 6, 2000 (Julian Day 2451549.5)
    // Using a simplified reference: Jan 6, 2000 12:00 UT
    const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 12, 0, 0)); // Month is 0-indexed

    // Calculate days since known new moon
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const daysSinceNewMoon = (date.getTime() - knownNewMoon.getTime()) / millisecondsPerDay;

    // Lunar cycle length (synodic period) is approximately 29.530588 days
    const lunarCycle = 29.530588;

    // Calculate the phase (0 = new moon, 0.5 = full moon, 1 = new moon)
    let phase = daysSinceNewMoon / lunarCycle;
    phase = phase - Math.floor(phase); // Get the fractional part

    return phase; // Returns a value between 0 and 1
}

// Function to get the image URL index for a given moon phase fraction
function getMoonPhaseImageIndex(phase) {
    // Map the phase fraction (0-1) to an index in the imageUrls array (0-7)
    // There are 8 images, so each phase covers 1/8th of the cycle (0.125)
    const index = Math.floor(phase * 8);
    // Ensure the index is within the bounds of the array
    return Math.min(index, 7);
}


// Function to render the calendar for the current month
function renderCalendar() {
    calendarGrid.innerHTML = ''; // Clear previous days

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-indexed

    // Set the header text
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    currentMonthYearHeader.textContent = `${monthNames[month]} ${year}`;

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Calculate the number of empty cells needed before the first day
    // If Monday is the first day of the week (1), Sunday is the last (0)
    // (firstDayOfMonth - 1 + 7) % 7 adjusts the start day to Monday
    const emptyCellsCount = (firstDayOfMonth - 1 + 7) % 7;


    // Add empty divs for the days before the 1st of the month
    for (let i = 0; i < emptyCellsCount; i++) {
        const emptyDay = document.createElement('div');
        // Add a class for styling empty cells if needed
        // emptyDay.classList.add('empty-day-cell');
        calendarGrid.appendChild(emptyDay);
    }

    // Add divs for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('moon-day-cell'); // Add the custom class for styling

        const date = new Date(year, month, day);
        const phase = calculateMoonPhase(date);
        const imageIndex = getMoonPhaseImageIndex(phase);
        const imageUrl = imageUrls[imageIndex];

        dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            <img src="${imageUrl}" alt="Moon Phase" class="moon-phase-image">
        `;

        calendarGrid.appendChild(dayElement);
    }
}

// Event listeners for navigation buttons
prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial render
renderCalendar();
