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
            }
        }
    }
}

function clearSearch(){
    document.getElementById("search").value = "";
    search();
}