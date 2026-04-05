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
    ActiveNav(); // Call ActiveNav when the page loads
}

function ActiveNav() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav_bar a');

    // Iterate over each link
    navLinks.forEach(link => {
        // Check if the link's href matches the current window location
        if (window.location.href === link.href) {
            // Add the 'active' class to highlight the current page
            link.classList.add("active");
        }
    });
}

greeting(hour);

// jQuery Toggle for index.html
$(document).ready(function () {
    // When the "Read More" button is clicked
    $("#readMore").click(function () {
        $("#longIntro").show();  // Show the long introduction text
        $("#readLess").show();   // Show the "Read Less" button
        $(this).hide();         // Hide the "Read More" button (using 'this' for efficiency)
    });

    // When the "Read Less" button is clicked
    $("#readLess").click(function () {
        $("#longIntro").hide(); // Hide the long introduction text
        $(this).hide();         // Hide the "Read Less" button itself
        $("#readMore").show();  // Show the "Read More" button  
    });
});

// Function to reveal the hidden ticket purchase form
function showForm() {
    // Find the form by its ID
    var form = document.getElementById("purchaseForm");

    // Change its style to make it visible
    form.style.display = "block";

    form.scrollIntoView({ behavior: 'smooth' });
}

// Function to handle the form submission alert
function paymentAlert() {
    alert("Redirecting to payment system.");
}

// Function to toggle the hamburger menu open and closed
function toggleNav() {
    // Get the navbar by its ID
    var nav = document.getElementById("mainNav");

    // Add the "responsive" class if it's not there, or remove it if it is
    nav.classList.toggle("responsive");
}

/* Checkout Page: Price Calculation & Validation
   Runs only when #checkoutForm is present. */
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('checkoutForm');
    if (!form) return; /* Not on the checkout page */

    var quantityInput = document.getElementById('quantity');
    var totalDisplay = document.getElementById('totalDisplay');
    var PRICE_PER_TICKET = 18; /* All ticket types cost $18 */

    /* Set today as the minimum selectable date */
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('visitDate').setAttribute('min', today);

    /* Recalculate and display the running total */
    function updateTotal() {
        var qty = parseInt(quantityInput.value);
        if (isNaN(qty) || qty < 1) qty = 1;
        if (qty > 10) qty = 10;
        totalDisplay.textContent = 'Total: $' + (qty * PRICE_PER_TICKET).toFixed(2);
    }

    /* Keep the total in sync as the user types */
    quantityInput.addEventListener('input', updateTotal);
    updateTotal(); /* Show the initial total on page load */

    /* Build URL parameters and redirect */
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var dateVal = document.getElementById('visitDate').value;
        var typeEl = document.getElementById('ticketType');
        var qtyVal = parseInt(document.getElementById('quantity').value);
        var emailVal = document.getElementById('email').value.trim();

        var total = qtyVal * PRICE_PER_TICKET;
        var typeLabel = typeEl.options[typeEl.selectedIndex].text;

        var dateParam = "date=" + encodeURIComponent(dateVal);
        var typeParam = "type=" + encodeURIComponent(typeLabel);
        var qtyParam = "qty=" + encodeURIComponent(qtyVal);
        var emailParam = "email=" + encodeURIComponent(emailVal);
        var totalParam = "total=" + encodeURIComponent(total.toFixed(2));

        var queryString = "?" + typeParam + "&" + qtyParam + "&" + dateParam + "&" + emailParam + "&" + totalParam;

        window.location.href = "confirmation.html" + queryString;
    });
});

/* Confirmation Page: Read URL Parameters
   Runs only when #conf-total is present. */
document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('conf-total')) return; /* Not the confirmation page */

    var queryString = window.location.search;

    // Remove the "?" mark at the beginning
    queryString = queryString.substring(1);

    // Split the parameters by "&"
    var parameters = queryString.split("&");

    // Create variables to store the values
    var dateVal = "";
    var typeVal = "";
    var qtyVal = "1";
    var emailVal = "";
    var totalVal = "0.00";

    // Loop through each parameter to find the values
    for (var i = 0; i < parameters.length; i++) {
        var pair = parameters[i].split("=");
        var key = pair[0];
        var value = decodeURIComponent(pair[1] || "");

        if (key === "date") {
            dateVal = value;
        } else if (key === "type") {
            typeVal = value;
        } else if (key === "qty") {
            qtyVal = value;
        } else if (key === "email") {
            emailVal = value;
        } else if (key === "total") {
            totalVal = value;
        }
    }

    // Display the values on the confirmation page
    document.getElementById('conf-date').textContent = dateVal;
    document.getElementById('conf-type').textContent = typeVal;

    if (qtyVal === "1") {
        document.getElementById('conf-qty').textContent = qtyVal + " ticket";
    } else {
        document.getElementById('conf-qty').textContent = qtyVal + " tickets";
    }

    document.getElementById('conf-email').textContent = emailVal;
    document.getElementById('conf-total').textContent = "$" + totalVal;
});

/* jQuery: FAQ Accordion (explore.html)
   Slides each answer open/closed; closes
   other open items automatically. */
$(document).ready(function () {
    $('.accordion-btn').on('click', function () {
        var $btn = $(this);
        var $body = $btn.next('.accordion-body');

        /* Toggle this item */
        $btn.toggleClass('open');
        $body.slideToggle(240);

        /* Collapse all other items */
        $('.accordion-btn').not($btn).removeClass('open');
        $('.accordion-body').not($body).slideUp(240);
    });
});

/* Leaflet Map Initialization */
document.addEventListener('DOMContentLoaded', function () {
    // Only initialize the map if the map container exists on the current page
    if (document.getElementById('map')) {
        // Set coordinates for MonoMuse (example location: MoMA in NYC)
        var lat = 40.7614;
        var lng = -73.9776;
        var zoom = 15;

        // Initialize the map, using 'map' as the div ID
        var map = L.map('map').setView([lat, lng], zoom);

        // Add the OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker for the museum location
        var marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup("<b>MonoMuse</b><br>Art meets technology.").openPopup();
    }
});
