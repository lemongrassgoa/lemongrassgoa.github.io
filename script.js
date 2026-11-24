// Automatic Slideshow - change image every 4 seconds
var myIndex = 0;
// carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if(x.length > 1){
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";  
        }
        myIndex++;
        if (myIndex > x.length) {
            myIndex = 1;
        }
            x[myIndex-1].style.display = "block";  
        setTimeout(carousel, 4000);
    } else {
        x[0].style.display = "block";
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function menuToggle() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var d = new Date();
var yy = d.getFullYear();
var mm = d.getMonth() + 1;
var dd = d.getDate();
var yymmdd = "day-" + yy + (mm<10 ? "0": "") + mm + (dd<10 ? "0": "") + dd;
console.log(yymmdd);

document.getElementById('today').innerHTML = "Today: " + d.toDateString();

function bodyLoad(){
    document.getElementById('banner').style.opacity = '1';
    document.getElementById('banner').style.filter = 'blur(0px)';
}
