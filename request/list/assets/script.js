// Generate HTML table from CSV
var csvtotable = new CsvToTable({
    csvFile: '../../list/Repertoire.csv',
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
}

const wip_filter = document.getElementById('wip');

wip_filter.addEventListener( 'change', () => {
    show_hide_wip();
});

function wip_filter_click(){
    wip_filter.checked = !wip_filter.checked;
    show_hide_wip();
}

function show_hide_wip(){
    document.getElementById("search").value = "";
    if(wip.checked){
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.display = "none";
        }
        var song_links = document.getElementsByClassName("wip");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.display = "";
        }
        document.getElementById("search-results").innerHTML = song_links.length + " song" + (song_links.length == 1 ? "" : "s");
    }
    else{
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.display = "";
        }
        document.getElementById("search-results").innerHTML = song_links.length + " song" + (song_links.length == 1 ? "" : "s");
    }
}


