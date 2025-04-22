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