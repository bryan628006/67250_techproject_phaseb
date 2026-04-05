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
$(document).ready(function(){
    // When the "Read More" button is clicked
    $("#readMore").click(function(){
        $("#longIntro").show();  // Show the long introduction text
        $("#readLess").show();   // Show the "Read Less" button
        $(this).hide();         // Hide the "Read More" button (using 'this' for efficiency)
    });

    // When the "Read Less" button is clicked
    $("#readLess").click(function(){ 
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

/* =========================================
   Gallery / Slideshow
   Runs only on pages that contain .slide elements.
   - Prev/next buttons + dot indicators
   - Auto-advances every 4.5 seconds
   - Arrow-key keyboard support
   ========================================= */
document.addEventListener('DOMContentLoaded', function () {
    var slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return; /* Not on a gallery page */

    var dots = document.querySelectorAll('.dot');
    var currentIndex = 0;
    var autoTimer;

    /* Show the slide at the given index */
    function showSlide(index) {
        slides.forEach(function (s) { s.classList.remove('active'); });
        dots.forEach(function (d) { d.classList.remove('active'); });

        /* Wrap around at the ends */
        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add('active');
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    function nextSlide() { showSlide(currentIndex + 1); }
    function prevSlide() { showSlide(currentIndex - 1); }

    /* Restart the auto-advance timer after manual interaction */
    function resetTimer() {
        clearInterval(autoTimer);
        autoTimer = setInterval(nextSlide, 4500);
    }

    /* Wire up the previous / next buttons */
    var prevBtn = document.getElementById('galleryPrev');
    var nextBtn = document.getElementById('galleryNext');
    if (prevBtn) prevBtn.addEventListener('click', function () { prevSlide(); resetTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { nextSlide(); resetTimer(); });

    /* Wire up the dot buttons */
    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            showSlide(parseInt(this.getAttribute('data-index')));
            resetTimer();
        });
    });

    /* Arrow-key navigation (only when a gallery is on the page) */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft')  { prevSlide(); resetTimer(); }
        if (e.key === 'ArrowRight') { nextSlide(); resetTimer(); }
    });

    /* Kick off auto-advance */
    resetTimer();
});

/* =========================================
   Checkout Page: Price Calculation & Validation
   Runs only when #checkoutForm is present.
   ========================================= */
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('checkoutForm');
    if (!form) return; /* Not on the checkout page */

    var quantityInput   = document.getElementById('quantity');
    var totalDisplay    = document.getElementById('totalDisplay');
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

    /* Mark a field as invalid and show an error message */
    function showError(inputId, errorId, message) {
        var el  = document.getElementById(inputId);
        var err = document.getElementById(errorId);
        el.classList.add('error');
        err.textContent = message;
    }

    /* Clear the error state on a field */
    function clearError(inputId, errorId) {
        var el  = document.getElementById(inputId);
        var err = document.getElementById(errorId);
        el.classList.remove('error');
        err.textContent = '';
    }

    /* Validate everything and, if clean, redirect to confirmation */
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;

        /* Visit date — required */
        var dateVal = document.getElementById('visitDate').value;
        if (!dateVal) {
            showError('visitDate', 'visitDateError', 'Please select a visit date.');
            valid = false;
        } else {
            clearError('visitDate', 'visitDateError');
        }

        /* Ticket type — required */
        var typeEl  = document.getElementById('ticketType');
        var typeVal = typeEl.value;
        if (!typeVal) {
            showError('ticketType', 'ticketTypeError', 'Please select a ticket type.');
            valid = false;
        } else {
            clearError('ticketType', 'ticketTypeError');
        }

        /* Quantity 1–10 — required */
        var qtyVal = parseInt(document.getElementById('quantity').value);
        if (isNaN(qtyVal) || qtyVal < 1 || qtyVal > 10) {
            showError('quantity', 'quantityError', 'Please enter a whole number between 1 and 10.');
            valid = false;
        } else {
            clearError('quantity', 'quantityError');
        }

        /* Email — required and must match a basic email pattern */
        var emailVal = document.getElementById('email').value.trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
            showError('email', 'emailError', 'Email address is required.');
            valid = false;
        } else if (!emailRegex.test(emailVal)) {
            showError('email', 'emailError', 'Please enter a valid email address (e.g. you@example.com).');
            valid = false;
        } else {
            clearError('email', 'emailError');
        }

        /* Zip code — optional, but must be exactly 5 digits if provided */
        var zipVal = document.getElementById('zipCode').value.trim();
        if (zipVal && !/^\d{5}$/.test(zipVal)) {
            showError('zipCode', 'zipCodeError', 'Zip code must be exactly 5 digits (e.g. 15213).');
            valid = false;
        } else {
            clearError('zipCode', 'zipCodeError');
        }

        /* All fields valid — build URL parameters and redirect */
        if (valid) {
            var total     = qtyVal * PRICE_PER_TICKET;
            var typeLabel = typeEl.options[typeEl.selectedIndex].text;
            var params    = new URLSearchParams({
                type:  typeLabel,
                qty:   qtyVal,
                date:  dateVal,
                email: emailVal,
                total: total.toFixed(2)
            });
            window.location.href = 'confirmation.html?' + params.toString();
        }
    });
});

/* =========================================
   Confirmation Page: Read URL Parameters
   Runs only when #conf-total is present.
   ========================================= */
document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('conf-total')) return; /* Not the confirmation page */

    var params = new URLSearchParams(window.location.search);

    /* Format the date string as a readable day (avoids UTC offset issues) */
    var rawDate = params.get('date') || '';
    var formattedDate = '—';
    if (rawDate) {
        var parts = rawDate.split('-');
        var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        formattedDate = d.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    /* Populate each row in the order summary */
    document.getElementById('conf-date').textContent  = formattedDate;
    document.getElementById('conf-type').textContent  = params.get('type')  || '—';
    var qty = params.get('qty') || '1';
    document.getElementById('conf-qty').textContent   = qty + ' ticket' + (parseInt(qty) !== 1 ? 's' : '');
    document.getElementById('conf-email').textContent = params.get('email') || '—';
    document.getElementById('conf-total').textContent = '$' + parseFloat(params.get('total') || 0).toFixed(2);
});

/* =========================================
   jQuery: FAQ Accordion (explore.html)
   Slides each answer open/closed; closes
   other open items automatically.
   ========================================= */
$(document).ready(function () {
    $('.accordion-btn').on('click', function () {
        var $btn  = $(this);
        var $body = $btn.next('.accordion-body');

        /* Toggle this item */
        $btn.toggleClass('open');
        $body.slideToggle(240);

        /* Collapse all other items */
        $('.accordion-btn').not($btn).removeClass('open');
        $('.accordion-body').not($body).slideUp(240);
    });
});

/* =========================================
   Leaflet Map Initialization
   ========================================= */
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
