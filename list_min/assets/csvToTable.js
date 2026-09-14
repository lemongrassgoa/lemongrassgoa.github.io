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

var table_target;
var yt_link;

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

	function buildTable() {
		getCSV.call(this).then(function(response){
			var allRows = response.split(/\r?\n|\r/).filter(isNotEmpty);
	        var table = '<table id="repertoire-table" class="sortable asc ">';
	        for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
                var table_temp = table, wip = 0;
	            if (singleRow === 0) {
	                table += '<thead id="table-header">';
	                table += '<tr>';
	            } else {
	                table += '<tr>';
	            }
	            var rowCells = allRows[singleRow].split(',');
	            for(var rowCell = 0; rowCell < rowCells.length; rowCell++){
	                if(singleRow === 0){
                        if(rowCell === 0)                                // table HEADER section
                            table += '<th id="title" class=" dir-u ">';
                        else if(rowCell === 1)
                            table += '<th id="artist" class="">';
                        else if(rowCell === 2)
                            table += '<th id="year" class="">';
                        if(rowCell < 3)
                            table += rowCells[rowCell];
	                    table += '</th>';
	                } else {                                            // table BODY section
                        if(rowCell === 0){
                            table += '<td class="artist">';
                        }
                        else if (rowCell === 1){
                            table += '<td class="artist">';
                        }
                        else if (rowCell === 2){
                            table += '<td class="year">';
                        }
                        if(rowCell < 3){
                            for(var i = 0; i < the_array.length-1; i++){
                                if(rowCells[rowCell] == the_array[i])
                                    table += '<span class="the"></span>';
                            }
                            table += rowCells[rowCell];
                        }
                        if(rowCells[9]){
                            wip=1;
                        }
	                    table += '</td>';
	                }
	            }
	            if (singleRow === 0) {
	                table += '</tr>';
	                table += '</thead>';
	                table += '<tbody>';
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
