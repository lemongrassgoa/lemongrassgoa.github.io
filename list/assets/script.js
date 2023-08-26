// Generate HTML table from CSV
var csvtotable = new CsvToTable({
    csvFile: '../list/Repertoire.csv',
    target: 'repertoire-list'
});
csvtotable.run();

function onload(){
    setTimeout(search, 500);
    setTimeout(function(){
        document.getElementById("search-results").style.opacity = "1";
        document.getElementById("repertoire-list").style.opacity = "1";
    }, 300);
}
  
function search(){
    // Declare variables
    var input, filter, table, tr, td0, td1, td2, i, txtValue0, txtValue1, txtValue2;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("repertoire-table");
    tr = table.getElementsByTagName("tr");
    
    var results = tr.length-1;

    // Loop through all table rows, and hide those that don't match the search query
    // searching title | artist | year
    for (i = 0; i < tr.length; i++) {
        td0 = tr[i].getElementsByTagName("td")[0];   // title
        td1 = tr[i].getElementsByTagName("td")[1];   // artist
        td2 = tr[i].getElementsByTagName("td")[2];   // year
        if (td0 || td1 || td2) {
            txtValue0 = td0.textContent || td0.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            if (txtValue0.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.filter = "opacity(1)";
                tr[i].style.visibility = "";
                // tr[i].style.display = "";
                tr[i].classList.remove("row-hide");
            }
            else if (txtValue1.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.filter = "opacity(1)";
                tr[i].style.visibility = "";
                // tr[i].style.display = "";
                tr[i].classList.remove("row-hide");
            }
            else if (txtValue2.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.filter = "opacity(1)";
                tr[i].style.visibility = "";
                // tr[i].style.display = "";
                tr[i].classList.remove("row-hide");
            }
            else {
                tr[i].style.filter = "opacity(0)";
                tr[i].style.visibility = "collapse";
                // tr[i].style.display = "none";
                tr[i].classList.add("row-hide");
                results--;
            }
        }
    }
    document.getElementById("search-results").innerHTML =  results + " song" + (results == 1 ? "" : "s");
    document.getElementById('yt_filter').checked = 0;
    // document.getElementById("yt-checkbox-img").style.filter = "grayscale(0)";
}

function artistSort(){
    const el = document.getElementById('artist');
    if (el) {
      el.click();
    }
}
function titleSort(){
    const el = document.getElementById('title');
    if (el) {
      el.click();
    }    
}
// setTimeout(artistSort, 1000);
// setTimeout(titleSort, 2000);

// yt_filter.addEventListener( 'change', () => {
    // show_hide_yt();
// });

function yt_filter_click(){
    // yt_filter.checked = !yt_filter.checked;
    show_hide_yt();
}

function show_hide_yt(){
    document.getElementById("search").value = "";
    if(!yt_filter.checked){
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.filter = "opacity(0)";
            song_links[i].parentElement.style.visibility = "collapse";
            // song_links[i].parentElement.style.display = "none";
            song_links[i].parentElement.classList.add("row-hide");
        }
        var song_links = document.getElementsByClassName("yt_link");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.filter = "opacity(1)";
            song_links[i].parentElement.style.visibility = "";
            // song_links[i].parentElement.style.display = "";
            song_links[i].parentElement.classList.remove("row-hide");
        }
        document.getElementById("yt-checkbox-img").style.filter = "grayscale(1) drop-shadow(2px 2px 1px white)";
        document.getElementById("search-results").innerHTML = song_links.length + " video" + (song_links.length == 1 ? "" : "s");
    }
    else{
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.filter = "opacity(1)";
            song_links[i].parentElement.style.visibility = "";
            // song_links[i].parentElement.style.display = "";
            song_links[i].parentElement.classList.remove("row-hide");
        }
        document.getElementById("yt-checkbox-img").style.filter = "grayscale(0) drop-shadow(2px 2px 1px black)";
        document.getElementById("search-results").innerHTML = song_links.length + " song" + (song_links.length == 1 ? "" : "s");
    }
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function urlQuery(){
    if(getQueryVariable("yt")){
        show_hide_yt();
    }
}

setTimeout(urlQuery, 1000);

var stopAllYouTubeVideos = () => { 
    var iframes = document.querySelectorAll('iframe');
    Array.prototype.forEach.call(iframes, iframe => { 
        iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'stopVideo'
        }), '*');
    });
}
stopAllYouTubeVideos();

// Get the modal
var modal = document.getElementById('modal-video');

function closeModal(){
    document.getElementById('modal-video').style.display='none';
    document.getElementsByClassName('yt-img-clicked')[0].classList.remove('yt-img-clicked');
    stopAllYouTubeVideos();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
document.addEventListener('keyup', (event) => {
  var name = event.key;
  var code = event.code;
  // Alert the key name and key code on keydown
  // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
  if(code === "Escape")
      closeModal();
}, false);
