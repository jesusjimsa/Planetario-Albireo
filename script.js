function showResponsiveMenu(){
	var menu = document.getElementById("nav_container");

    if (menu.style.display != "block") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function backToIndex(){
	window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('myVideo');
    
    // Function to detect iPhone
    function isIPhone() {
        return /iPhone/i.test(navigator.userAgent);
    }
    
    // If not iPhone, set autoplay
    if (!isIPhone()) {
        video.setAttribute('autoplay', '');
    }
});
