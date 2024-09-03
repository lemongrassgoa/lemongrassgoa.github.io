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
    setInterval(rainbowHeader, 25);
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
                toggleRow(tr[i], 1);
            }
            else if (txtValue1.toUpperCase().indexOf(filter) > -1) {
                toggleRow(tr[i], 1);
            }
            else if (txtValue2.toUpperCase().indexOf(filter) > -1) {
                toggleRow(tr[i], 1);
            }
            else {
                toggleRow(tr[i], 0);
                results--;
            }
        }
    }
    document.getElementById("search-results").innerHTML =  results + " song" + (results == 1 ? "" : "s");
    document.getElementById('yt_filter').checked = 0;
    document.getElementById("yt-checkbox-img").style.filter = "grayscale(0) drop-shadow(2px 2px 1px black)";
}

function yt_filter_click(){
    show_hide_yt();
}

function show_hide_yt(){
    document.getElementById("search").value = "";
    if(!yt_filter.checked){
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            setTimeout(toggleRow, 1, song_links[i].parentElement, 1);
            if(!song_links[i].classList.contains("yt_link")){
                setTimeout(toggleRow, 1, song_links[i].parentElement, 0);
            }
        }
        var song_links = document.getElementsByClassName("yt_link");
        document.getElementById("yt-checkbox-img").style.filter = "grayscale(1) drop-shadow(2px 2px 1px white)";
        document.getElementById("search-results").innerHTML = song_links.length + " video" + (song_links.length == 1 ? "" : "s");
    }
    else{
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            setTimeout(toggleRow, 1, song_links[i].parentElement, 1);
        }
        document.getElementById("yt-checkbox-img").style.filter = "grayscale(0) drop-shadow(2px 2px 1px black)";
        document.getElementById("search-results").innerHTML = song_links.length + " song" + (song_links.length == 1 ? "" : "s");
    }
}

function toggleRow(e, x){
    if(x){
        e.style.transform = "scaleY(1)";
        e.style.visibility = "";
        e.classList.remove("row-hide");
    }else{
        e.style.transform = "scaleY(0)";
        e.style.visibility = "collapse";
        e.classList.add("row-hide");
    }
    setTimeout(toggleRow_safari, x ? 1 : 200, e, x);
}

function toggleRow_safari(e, x){
    if(x){
        e.style.display = "";
    }else{
        e.style.display = "none";
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
    modal.style.display='none';
    stopAllYouTubeVideos();
    // console.log(document.getElementById("video_embed").src);
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        history.back();
        closeModal();
    }
}
document.addEventListener('keyup', (event) => {
    var name = event.key;
    var code = event.code;
    // Alert the key name and key code on keydown
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    if(code === "Escape")
        history.back();
        closeModal();
}, false);

var xx = 0;
function rainbowHeader(){
    let _hue = xx++, _sat = 100, _lum = 60;
    var e = document.getElementById('titlebar');
    e.style['font-weight'] = "bold";
    // e.style['background'] = 
        // "linear-gradient(     to right, hsl(" + 
         // _hue     %360 + ", 100%, 50%), hsl(" + 
        // (_hue+60 )%360 + ", 100%, 50%), hsl(" + 
        // (_hue+120)%360 + ", 100%, 50%), hsl(" + 
        // (_hue+180)%360 + ", 100%, 50%), hsl(" + 
        // (_hue+240)%360 + ", 100%, 50%), hsl(" + 
        // (_hue+300)%360 + ", 100%, 50%))";
    e.style['background'] = 
        "linear-gradient(     to bottom, hsl(" + 
         _hue    %360 + ", " + _sat + "%, " + _lum + "%), hsl(" + 
        (_hue+36)%360 + ", " + _sat + "%, " + _lum + "%), hsl(" + 
        (_hue+72)%360 + ", " + _sat + "%, " + _lum + "%))";
    e.style['color'] = "transparent";
    e.style['-webkit-background-clip'] = "text";
}
