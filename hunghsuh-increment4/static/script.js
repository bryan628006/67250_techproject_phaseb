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
