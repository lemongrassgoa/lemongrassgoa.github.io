var csvtotable = new CsvToTable({
    csvFile: 'Repertoire.csv' 
});
csvtotable.run();

function search(){
    // Declare variables
    var input, filter, table, tr, td0, td1, i, txtValue0, txtValue1;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("repertoirelist");
    tr = table.getElementsByTagName("tr");
    
    var results = tr.length-1;

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td0 = tr[i].getElementsByTagName("td")[0];
        td1 = tr[i].getElementsByTagName("td")[1];
        if (td0 || td1) {
            txtValue0 = td0.textContent || td0.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            if (txtValue0.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else if (txtValue1.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
                results--;
            }
        }
    }
    document.getElementById("clear-search").innerHTML = results + " song" + (results == 1 ? "" : "s");
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
            song_links[i].parentElement.style.display = "none";
        }
        var song_links = document.getElementsByClassName("yt_link");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.display = "";
        }
        document.getElementById("clear-search").innerHTML = song_links.length + " video" + (song_links.length == 1 ? "" : "s");
    }
    else{
        clearSearch();
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.display = "";
        }
        document.getElementById("clear-search").innerHTML = song_links.length-1 + " song" + (song_links.length == 1 ? "" : "s");
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