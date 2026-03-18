var now = new Date();
var hour = now.getHours();

function greeting(h) {
    var greetingElement = document.getElementById("greeting");

    if (greetingElement) {
        if (h < 5 || h >= 20) {
            greetingElement.innerHTML = "Good night";
        } else if (h < 12) {
            greetingElement.innerHTML = "Good morning";
        } else if (h < 18) {
            greetingElement.innerHTML = "Good afternoon";
        } else {
            greetingElement.innerHTML = "Good evening";
        }
    }
}

function addYear() {
    var year = new Date().getFullYear();
    document.getElementById("copyYear").innerHTML = year;
}

greeting(hour);
