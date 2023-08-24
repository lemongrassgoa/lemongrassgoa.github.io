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
                        if(rowCell < 9 && rowCell !== 3){
                            table += '<th style="" class="' + ((rowCell === 0) ? ' dir-u ' : '') + '">';
                            table += rowCells[rowCell];
                            table += '</th>';
                        }
                        /*  * /
                        if(rowCell === 11){
                            table += '<th class="tags" style="">';
                            table += rowCells[rowCell];
                            table += '</th>';
                        }
                        /*  */
	                } else {
                        if(rowCell < 9 && rowCell !== 3){
                            var wip_format = 'background-color: #000;';
                            if(rowCell === 0){
                                table += '<td class="title' + (rowCells[9] ? ' wip' : '') + '" style="' + (rowCells[9] ? wip_format : '') + '">';
                                table += '<a class="songlink" style="text-decoration: none;" target="_blank" href="http://localhost:81/'+ rowCells[10] + '">';
                                table += rowCells[rowCell];
                                table += '</a>'
                            }
                            else {
                                table += '<td style="' + (rowCells[9] ? wip_format : '') + '">'; 
                                if(rowCell === 1){
                                    table += '<a href="https://open.spotify.com/track/' + rowCells[12] + '" target = "_blank"><img class="spotifylink" src="../img/spotify.png" /></a>';
                                }
                                for(var i = 0; i < the_array.length-1; i++){
                                    if(rowCells[rowCell] == the_array[i])
                                        table += '<span class="the"></span>';
                                }
                                
                                table += rowCells[rowCell];
                                
                                table += '</td>';
                            }
                        }
                        /* * /
                        if(rowCell === 11){
                            table += '<td class="tags" style="width: 1em; font-size: 70%; word-wrap: break-word;">';
                            table += rowCells[rowCell];
                            table += '</td>';
                        }
                        /* */
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
