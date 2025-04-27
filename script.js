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
window.onload = function() {
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
