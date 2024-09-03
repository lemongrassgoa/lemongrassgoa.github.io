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
}

function toggleRow(e, x){
    if(x){
        // e.style.display = "";
        // e.style.opacity = "1";
        e.style.transform = "scaleY(1)";
        e.style.visibility = "";
        e.classList.remove("row-hide");
    }else{
        // e.style.display = "none";
        // e.style.opacity = "0";
        e.style.transform = "scaleY(0)";
        e.style.visibility = "collapse";
        e.classList.add("row-hide");
    }
}

// Get the modal
var modal = document.getElementById('modal-request');

function closeModal(){
    modal.style.display='none';
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
