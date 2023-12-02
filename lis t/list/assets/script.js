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
    var input, filter, table, tr, td0, td1, td2, td3, i, txtValue0, txtValue1, txtValue2, txtValue3;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("repertoire-table");
    tr = table.getElementsByTagName("tr");
    
    var results = tr.length-1;

    // Loop through all table rows, and hide those that don't match the search query
    // searching title | artist | year | tags
    for (i = 0; i < tr.length; i++) {
        td0 = tr[i].getElementsByTagName("td")[0];   // title
        td1 = tr[i].getElementsByTagName("td")[1];   // artist
        td2 = tr[i].getElementsByTagName("td")[2];   // year
        td3 = tr[i].getElementsByTagName("td")[8];   // tags
        if (td0 || td1 || td2 || td3) {
            txtValue0 = td0.textContent || td0.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            txtValue3 = td3.textContent || td2.innerText;
            if (txtValue0.toUpperCase().indexOf(filter) > -1) {
                toggleRow(tr[i], 1);
            }
            else if (txtValue1.toUpperCase().indexOf(filter) > -1) {
                toggleRow(tr[i], 1);
            }
            else if (txtValue2.toUpperCase().indexOf(filter) > -1) {
                toggleRow(tr[i], 1);
            }
            else if (txtValue3.toUpperCase().indexOf(filter) > -1) {
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
            song_links[i].parentElement.classList.add("row-hide");
        }
        var song_links = document.getElementsByClassName("wip");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.display = "";
            song_links[i].parentElement.classList.remove("row-hide");
        }
        document.getElementById("search-results").innerHTML = song_links.length + " song" + (song_links.length == 1 ? "" : "s");
    }
    else{
        var song_links = document.getElementsByClassName("title");
        for(var i = 0; i < song_links.length; i++){
            song_links[i].parentElement.style.display = "";
            song_links[i].parentElement.classList.remove("row-hide");
        }
        document.getElementById("search-results").innerHTML = song_links.length + " song" + (song_links.length == 1 ? "" : "s");
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    const daysToExpire = "expires=" + new Date(2147483647 * 1000).toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + daysToExpire;
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}