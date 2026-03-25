function showResponsiveMenu() {
    var menu = document.getElementById('nav_container');
    if (menu) {
        menu.classList.toggle('open');
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

// -- Moon Phase Calendar (observacion.html only) --
(function () {
    var calendarGrid = document.getElementById('calendarGrid');
    var currentMonthYearHeader = document.getElementById('currentMonthYear');
    var prevMonthButton = document.getElementById('prevMonth');
    var nextMonthButton = document.getElementById('nextMonth');
    var todayButton = document.getElementById('todayMonth');

    if (!calendarGrid || !currentMonthYearHeader || !prevMonthButton || !nextMonthButton) {
        return; // Not on observacion.html
    }

    var currentDate = new Date();

    var imageUrls = [
        'img/moon_phases/new_moon.png',
        'img/moon_phases/waxing_crescent.png',
        'img/moon_phases/first_quarter.png',
        'img/moon_phases/waxing_gibbous.png',
        'img/moon_phases/full_moon.png',
        'img/moon_phases/waning_gibbous.png',
        'img/moon_phases/last_quarter.png',
        'img/moon_phases/waning_crescent.png'
    ];

    function calculateMoonPhase(date) {
        var knownNewMoon = new Date(Date.UTC(2000, 0, 6, 12, 0, 0));
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        var daysSinceNewMoon = (date.getTime() - knownNewMoon.getTime()) / millisecondsPerDay;
        var lunarCycle = 29.530588;
        var phase = daysSinceNewMoon / lunarCycle;
        phase = phase - Math.floor(phase);
        return phase;
    }

    function getMoonPhaseImageIndex(phase) {
        return Math.min(Math.floor(phase * 8), 7);
    }

    function renderCalendar() {
        while (calendarGrid.firstChild) {
            calendarGrid.removeChild(calendarGrid.firstChild);
        }

        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        currentMonthYearHeader.textContent = monthNames[month] + ' ' + year;

        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var firstDayOfMonth = new Date(year, month, 1).getDay();
        var emptyCellsCount = (firstDayOfMonth - 1 + 7) % 7;

        for (var i = 0; i < emptyCellsCount; i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        var today = new Date();
        var todayDay   = today.getDate();
        var todayMonth = today.getMonth();
        var todayYear  = today.getFullYear();

        for (var day = 1; day <= daysInMonth; day++) {
            var dayElement = document.createElement('div');
            dayElement.classList.add('moon-day-cell');

            if (day === todayDay && month === todayMonth && year === todayYear) {
                dayElement.classList.add('moon-day-today');
            }

            var date = new Date(year, month, day);
            var phase = calculateMoonPhase(date);
            var imageIndex = getMoonPhaseImageIndex(phase);

            var dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = String(day);

            var img = document.createElement('img');
            img.src = imageUrls[imageIndex];
            img.alt = 'Fase lunar';
            img.className = 'moon-phase-image';

            dayElement.appendChild(dayNumber);
            dayElement.appendChild(img);
            calendarGrid.appendChild(dayElement);
        }
    }

    prevMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    if (todayButton) {
        todayButton.addEventListener('click', function () {
            currentDate = new Date();
            renderCalendar();
        });
    }

    renderCalendar();
}());

// -- Scroll Reveal Animations --
(function () {
    var revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length || !window.IntersectionObserver) { return; }

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) { observer.observe(el); });
}());
