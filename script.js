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