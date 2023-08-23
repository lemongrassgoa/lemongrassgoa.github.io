var csvtotable = new CsvToTable({
    csvFile: 'housewarming.csv' 
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
        td2 = tr[i].getElementsByTagName("td")[9];
        if (td0 || td1 || td2) {
            txtValue0 = td0.textContent || td0.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            if      (txtValue0.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else if (txtValue1.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else if (txtValue2.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
                results--;
            }
        }
    }
    document.getElementById("clear-search").innerHTML = results + " song" + (results == 1 ? "" : "s");
}

function clearSearch(){
    document.getElementById("search").value = "";
    search();
    document.getElementById('wip').checked = 0;
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
    if(wip.checked){
        document.getElementById("search").value = "";
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.display = "none";
        }
        var song_links = document.getElementsByClassName("wip");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.display = "";
        }
        document.getElementById("clear-search").innerHTML = song_links.length + " song" + (song_links.length == 1 ? "" : "s");
    }
    else{
        clearSearch();
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.display = "";
        }
        document.getElementById("clear-search").innerHTML = song_links.length + " song" + (song_links.length == 1 ? "" : "s");
    }
}

function title_clicked(element){
    var temp = element.parentElement.style.backgroundColor;
    if(temp == "")
        element.parentElement.style.backgroundColor = "#aaa";
    else
        element.parentElement.style.backgroundColor = "";
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