const links_ = [
    // full vids
    ["Antonio's Song",              "JiX2QH73VpY", 0],
    ["Beautiful Tango",             "tLOTEd5d5IY", 0],
    ["Big Bang",                    "SxclfMiybFg", 0],
    ["Does Your Mother Know",       "UaIfr62co04", 0],
    ["Brown Eyed Girl",             "A6-7TkAp-NA", 0],
    ["Fly Me To The Moon",          "hgdjepk5hco", 0],
    ["Hey Soul Sister",             "5L9UUjnicmA", 0],
    ["If I Had A Hammer",           "5OXSHCDvq2M", 0],
    ["Norwegian Wood",              "iXiUKRlUfE4", 0],
    ["Smooth Operator",             "nz85NleFjFs", 0],
    ["Snow",                        "R41hAQg_hXI", 0],
    ["Superman",                    "IJQls99Ut1s", 0],
    ["The Boxer",                   "BdTnrxEp12E", 0],
    ["Zombie",                      "3a5HVi8I9As", 0],
    // shorts
    ["A Thousand Miles",            "5ufhpSomAxE", 1],
    ["All About That Bass",         "ENQJRNgJ0KU", 1],
    ["Budapest",                    "JqvshMcDONY", 1],
    ["Country Roads",               "pHtKLxAnq8U", 1],
    ["Dancing In The Moonlight",    "wT6s1rnQ7ck", 1],
    ["Instant Crush",               "cjedEvll0Yo", 1],
    ["Kiss Me",                     "_I2Pj_n49jY", 1],
    ["Make You Feel My Love",       "pSNBaXiuOfI", 1],
    ["New Shoes",                   "yJfxQRy1HCU", 1],
    ["Rocket Man",                  "qzWAF1x-FG0", 1],
    ["Wish You Were Here",          "1qnsTsDFX2Y", 1],
    ["_","_"]
];

const the_array = [
    "Archies",
    "Avett Brothers",
    "Beatles",
    "Bee Gees",
    "Carpenters",
    "Cranberries",
    "Doobie Brothers",
    "Eagles",
    "Everly Brothers",
    "Killers",
    "Mayries",
    "Monkees",
    "Moody Blues",
    "Penguins",
    "Plain White T's",
    "Red Hot Chili Peppers",
    "Rembrandts",
    "Steve Miller Band",
    "Verve",
    "Weeknd",
    "White Stripes",
    "_"
];

var yt_link, table_target;

(function(){

	// Constructor method
	this.CsvToTable = function(){
		this.csvFile = null;

		// Create options by extending defaults with the passed in arugments
    	if (arguments[0] && typeof arguments[0] === "object") {
      		this.options = arguments[0];
            table_target = this.options.target;
    	}

	}

	CsvToTable.prototype.run = function() {
		return buildTable.call(this);
	}

	function getCSV() {
		try{
			var csvfile = this.options.csvFile;
			return new Promise(function(resolve, reject) {
				var request = new XMLHttpRequest();
				request.open("GET", csvfile, true);
				request.onload = function() {
				    if (request.status == 200) {
				        resolve(request.response);
				    } else {
				        reject(Error(request.statusText));
				    }
				};

				request.onerror = function() {
				 	reject(Error('Error fetching data.'));
				};
				request.send();
			});
		}catch(err){
			console.error(err);
		}
	}

    function isNotEmpty(row) {
        return row !== "";
    }

    // polyfill `.filter()` for ECMAScript <5.1
    // `f` must be pure (not modify original array).
    if (!Array.prototype.filter) {
      Array.prototype.filter = function(f) {
        "use strict";
        var p = arguments[1];
        var o = Object(this);
        var len = o.length;
        for (var i = 0; i < len; i++) {
          if (i in o) {
              var v = o[i];
              f.call(p, v, i, o);
          }
        }

        return this;
      };
    }

	function buildTable() {     // build the table
		getCSV.call(this).then(function(response){
			var allRows = response.split(/\r?\n|\r/).filter(isNotEmpty);
	        var table = '<table class="w3-animate-opacity sortable" id="repertoirelist">';
	        for (var singleRow = 0; singleRow < allRows.length; singleRow++) { // iterate through all the rows
                var table_temp = table, wip = 0;
	            if (singleRow === 0) { // if first row, mark as header
	                table += '<thead class="tooltip-sort">';
	                table += '<tr>';
	            } else {
	                table += '<tr>';
	            }
	            var rowCells = allRows[singleRow].split(',');
	            for(var rowCell = 0; rowCell < rowCells.length; rowCell++){
	                if(singleRow === 0){
                        
                        if(rowCell === 0)
                            table += '<th class="title dir-u ">';
                        else if(rowCell === 1)
                            table += '<th class="artist">';
                        else if(rowCell === 2)
                            table += '<th class="year">';
                        else if(rowCell === 3)
                            table += '<th class="genre">';
                        if(rowCell < 4)
                            table += rowCells[rowCell];
	                    table += '</th>';
                        
	                } else {
                        if(rowCell === 0){
                            yt_link = -1;   // search for title matches in the list of videos
                            for(var i = 0; i < links_.length-1; i++){
                                if(rowCells[rowCell].search(links_[i][0]) != -1){
                                    yt_link = i;    // if found, store the index of the youtube link
                                }
                            }

                            table += '<td class="title' + (yt_link > -1 ? ' yt_link' : '') + '">';
                            table += '<i>';
                            
                            // table += rowCells[rowCell];
                            if(yt_link > -1){       // if a match was found, is it a full vid or short
                                // call the modal function with the correct index of the youtube array
                                var link1 = '<a style="text-decoration: none;" target="_blank" data-toggle="modal" data-target="#myModal" onclick="modalVideo('+yt_link+')">';
                                var link2 = '';
                                if (links_[yt_link][2] < 1){    // youtube logo on right, shorts logo on left
                                    link2 = '<img class="yt-img-animate yt-img" src="yt.svg" />';
                                }else{
                                    link2 = '<img class="yt-img-animate yt-short" src="ytshorts.png" />';
                                }
                                table += link1 + link2 + rowCells[rowCell] + '</a>'; // generate song name with video link
                            }else{
                                table += rowCells[rowCell]; // song name, no link
                            }
                            table += '</i>';
                        }
                        else if (rowCell === 1){
                            table += '<td class="artist">';
                        }
                        else if (rowCell === 2){
                            table += '<td class="year">';
                        }
                        else if (rowCell === 3){
                            table += '<td class="genre">';
                        }
                        if(rowCell > 0 && rowCell < 4){
                            for(var i = 0; i < the_array.length-1; i++){
                                if(rowCells[rowCell] == the_array[i])
                                    table += '<span class="the"></span>';
                            }
                            table += rowCells[rowCell];
                        }
	                    table += '</td>';
                        if(rowCells[9]){
                            wip=1;
                        }
	                }
	            }
	            if (singleRow === 0) {
	                table += '</tr>';
	                table += '</thead>';
	                table += '<tbody class="list">';
	            } else {
	                table += '</tr>';
	            }
                if(wip){
                    table = table_temp;
                    wip=0;
                }
	        }
	        table += '</tbody>';
	        table += '</table>';

            document.getElementById(table_target).innerHTML += table;
            
        
	}, function(error){
			console.error(error);
		});
	}
}());

