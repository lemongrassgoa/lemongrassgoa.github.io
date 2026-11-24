var csvtotable = new CsvToTable({
    csvFile: '../../list/Repertoire.csv' 
});
csvtotable.run();

function search(){
    // Declare variables
    var input, filter, unfilter, table, tr, td0, td1, td2, td3, i, txtValue0, txtValue1, txtValue2, txtValue3;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    unfilter = (filter.charAt(0) === '-' ? true : false); // use '-' to trigger show/hide
    if(unfilter) filter = filter.substr(1);     // ignore '-'
    table = document.getElementById("repertoirelist");
    tr = table.getElementsByTagName("tr");
    
    var results = unfilter ? 0 : tr.length-1;

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td0 = tr[i].getElementsByTagName("td")[0];
        td1 = tr[i].getElementsByTagName("td")[1];
        td2 = tr[i].getElementsByTagName("td")[2];
        td3 = tr[i].getElementsByTagName("td")[9];
        if (td0 || td1 || td3) {
            txtValue0 = td0.textContent || td0.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            txtValue3 = td3.textContent || td3.innerText;
            if(unfilter){   // if 'unfilter' hide search matches
                if      (txtValue0.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "none";
                } else if (txtValue1.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "none";
                } else if (txtValue2.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "none";
                } else if (txtValue3.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "none";
                } else {
                    tr[i].style.display = "";
                    results++;
                }
            }else{      // else hide non-matches
                if      (txtValue0.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "";
                } else if (txtValue1.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "";
                } else if (txtValue2.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "";
                } else if (txtValue3.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display= "none";
                    results--;
                }
            }
        }
    }
    document.getElementById("clear-search").innerHTML =  results + " song" + (results == 1 ? "" : "s");
}

function clearSearch(){
    document.getElementById("search").value = "";
    search();
    document.getElementById('wip').checked = 0;
    // document.getElementsByClassName('init dir-u')[0].click();
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
            song_links[i].parentElement.style.opacity = "0";
            song_links[i].parentElement.style.visibility = "collapse";
        }
        var song_links = document.getElementsByClassName("wip");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.opacity = "";
            song_links[i].parentElement.style.visibility = "";
        }
        document.getElementById("clear-search").innerHTML = song_links.length + " song" + (song_links.length == 1 ? "" : "s");
    }
    else{
        clearSearch();
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.opacity = "";
            song_links[i].parentElement.style.visibility = "";
        }
        document.getElementById("clear-search").innerHTML = song_links.length + " song" + (song_links.length == 1 ? "" : "s");
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