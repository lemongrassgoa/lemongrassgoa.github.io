// Generate HTML table from CSV
var csvtotable = new CsvToTable({
    csvFile: 'Repertoire.csv',
    target: 'repertoire-list'
});
csvtotable.run();

function onload(){
    setTimeout(search, 500);
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
                // tr[i].style.opacity = "";
                // tr[i].style.visibility = "";
                tr[i].style.display = "";
            }
            else if (txtValue1.toUpperCase().indexOf(filter) > -1) {
                // tr[i].style.opacity = "";
                // tr[i].style.visibility = "";
                tr[i].style.display = "";
            }
            else if (txtValue2.toUpperCase().indexOf(filter) > -1) {
                // tr[i].style.opacity = "";
                // tr[i].style.visibility = "";
                tr[i].style.display = "";
            }
            else {
                // tr[i].style.opacity = "0";
                // tr[i].style.visibility = "collapse";
                tr[i].style.display = "none";
                results--;
            }
        }
    }
    document.getElementById("search-results").innerHTML =  results + " song" + (results == 1 ? "" : "s");
    document.getElementById('yt_filter').checked = 0;
    document.getElementById("yt-checkbox-img").style.filter = "drop-shadow(1px 1px 1px cyan) invert(1)";
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
            // song_links[i].parentElement.style.opacity = "0";
            // song_links[i].parentElement.style.visibility = "collapse";
            song_links[i].parentElement.style.display = "none";
        }
        var song_links = document.getElementsByClassName("yt_link");
        for(var i = 0; i < song_links.length; i++){
            // song_links[i].parentElement.style.opacity = "";
            // song_links[i].parentElement.style.visibility = "";
            song_links[i].parentElement.style.display = "";
        }
        document.getElementById("yt-checkbox-img").style.filter = "drop-shadow(1px 1px 1px red) invert(0)";
        document.getElementById("search-results").innerHTML = song_links.length + " video" + (song_links.length == 1 ? "" : "s");
    }
    else{
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            // song_links[i].parentElement.style.opacity = "";
            // song_links[i].parentElement.style.visibility = "";
            song_links[i].parentElement.style.display = "";
        }
        document.getElementById("yt-checkbox-img").style.filter = " drop-shadow(1px 1px 1px cyan) invert(1)";
        document.getElementById("search-results").innerHTML = song_links.length + " song" + (song_links.length == 1 ? "" : "s");
    }
}

function show_yt_modal(_index, element){
    console.log(element.parentElement.parentElement);
    var em = element.parentElement.parentElement;
    // document.getElementById("yt-modal").show();
    // document.getElementById("video_embed").src = "https://www.youtube.com/embed/" + links_[_index][1] + "?enablejsapi=1";
}

var stopAllYouTubeVideos = () => { 
    var iframes = document.querySelectorAll('iframe');
    Array.prototype.forEach.call(iframes, iframe => { 
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', 
        func: 'stopVideo' }), '*');
    });
}
stopAllYouTubeVideos();
