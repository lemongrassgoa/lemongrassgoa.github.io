var csvtotable = new CsvToTable({
    csvFile: '../list/Repertoire.csv',
    target: 'repertoire-list'
});
csvtotable.run();

function search(){
    // Declare variables
    var input, filter, table, tr, td0, td1, td2, i, txtValue0, txtValue1, txtValue2;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("repertoirelist");
    tr = table.getElementsByTagName("tr");
    
    var results = tr.length-1;

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td0 = tr[i].getElementsByTagName("td")[0];
        td1 = tr[i].getElementsByTagName("td")[1];
        td2 = tr[i].getElementsByTagName("td")[2];
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
    document.getElementById("clear-search").innerHTML =  results + " song" + (results == 1 ? "" : "s");
    document.getElementById('yt_filter').checked = 0;
}

function clearSearch(){
    document.getElementById("search").value = "";
    search();
    document.getElementById('yt_filter').checked = 0;
}

const yt_filter = document.getElementById('yt_filter');

yt_filter.addEventListener( 'change', () => {
    show_hide_yt();
});

function yt_filter_click(){
    yt_filter.checked = !yt_filter.checked;
    show_hide_yt();
}

function show_hide_yt(){
    if(yt_filter.checked){
        document.getElementById("search").value = "";
        var song_links = document.getElementsByClassName("title");
        for(var i = 1; i < song_links.length; i++){
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
        document.getElementById("clear-search").innerHTML = song_links.length + " video" + (song_links.length == 1 ? "" : "s");
    }
    else{
        clearSearch();
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            // song_links[i].parentElement.style.opacity = "";
            // song_links[i].parentElement.style.visibility = "";
            song_links[i].parentElement.style.display = "";
        }
        document.getElementById("clear-search").innerHTML = song_links.length-1 + " song" + (song_links.length == 1 ? "" : "s");
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
        yt_filter_click();
    }else{
        // setTimeout(yt_filter_click, 500);
        // setTimeout(yt_filter_click, 1000);
    }
}

setTimeout(urlQuery, 1000);

function modalVideo(_index){
    document.getElementById("video_embed").src = "https://www.youtube.com/embed/" + links_[_index][1] + "?enablejsapi=1";
}

var stopAllYouTubeVideos = () => { 
    var iframes = document.querySelectorAll('iframe');
    Array.prototype.forEach.call(iframes, iframe => { 
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', 
        func: 'stopVideo' }), '*');
    });
}
stopAllYouTubeVideos();

function openTab(option){
    console.log(option);
    if(option == 1){
        document.getElementById("hindi-list").style.display = "";
        document.getElementById("repertoire-list").style.display = "none";
        document.getElementById("classical-list").style.display = "none";
        document.getElementById("tab1").classList.replace("w3-gray", "w3-white");
        document.getElementById("tab2").classList.replace("w3-white", "w3-gray");
        document.getElementById("tab3").classList.replace("w3-white", "w3-gray");
    }
    else if(option == 2){
        document.getElementById("hindi-list").style.display = "none";
        document.getElementById("repertoire-list").style.display = "";
        document.getElementById("classical-list").style.display = "none";
        document.getElementById("tab1").classList.replace("w3-white", "w3-gray");
        document.getElementById("tab2").classList.replace("w3-gray", "w3-white");
        document.getElementById("tab3").classList.replace("w3-white", "w3-gray");
    }
    else if(option == 3){
        document.getElementById("hindi-list").style.display = "none";
        document.getElementById("repertoire-list").style.display = "none";
        document.getElementById("classical-list").style.display = "";
        document.getElementById("tab1").classList.replace("w3-white", "w3-gray");
        document.getElementById("tab2").classList.replace("w3-white", "w3-gray");
        document.getElementById("tab3").classList.replace("w3-gray", "w3-white");
    }
}

// THE //
// Archies
// Avett Brothers
// Beatles
// Carpenters
// Cranberries
// Doobie Brothers
// Everly Brothers
// Killers
// Mayries
// Monkees
// Rembrandts
// White Stripes