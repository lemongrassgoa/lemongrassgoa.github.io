const links_ = [
    ["Antonio's Song", "https://www.youtube.com/watch?v=JiX2QH73VpY"],
    ["Beautiful Tango", "https://www.youtube.com/watch?v=tLOTEd5d5IY"],
    ["Big Bang", "https://www.youtube.com/watch?v=SxclfMiybFg"],
    ["Brown Eyed Girl", "https://www.youtube.com/watch?v=A6-7TkAp-NA"],
    ["Hey Soul Sister", "https://www.youtube.com/watch?v=5L9UUjnicmA"],
    ["Smooth Operator", "https://www.youtube.com/watch?v=nz85NleFjFs"],
    ["Superman", "https://www.youtube.com/watch?v=WK-rqcgoYIQ"],
    ["The Boxer", "https://www.youtube.com/watch?v=BdTnrxEp12E"],
    ["Zombie", "https://www.youtube.com/watch?v=3a5HVi8I9As"]
];


(function(){

	// Constructor method
	this.CsvToTable = function(){
		this.csvFile = null;

		// Create options by extending defaults with the passed in arugments
    	if (arguments[0] && typeof arguments[0] === "object") {
      		this.options = arguments[0];
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
	        var table = '<table class="w3-animate-opacity sortable" id="repertoirelist">';
	        for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
                var table_temp = table, wip = 0;
	            if (singleRow === 0) {
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
                        // else if(rowCell === 4)
                            // table += '<th class="energy">';
                        // else if(rowCell === 5)
                            // table += '<th class="dance">';
                        else
                            table += '<th style="display:none;">';

	                    table += rowCells[rowCell];
                     
	                    table += '</th>';
	                } else {
                        if(rowCell === 0){
                            var yt_link = -1;
                            for(var i = 0; i < links_.length; i++){
                                if(rowCells[rowCell].search(links_[i][0]) != -1){
                                    yt_link = i;
                                }
                            }

                            table += '<td class="title' + (yt_link > -1 ? ' yt_link' : '') + '">';
                            table += '<i>';
                            
                            table += rowCells[rowCell];
                            if(yt_link > -1){
                                table += ' <small><a style="text-decoration: none;" target="_blank" href="' + links_[yt_link][1] + '"> <img class="yt_link_img" style="float: left; padding-right: 5px;" src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" height="20" /> </a></small>&nbsp;';
                            }
                            table += '</i>';
                        }
                        else if (rowCell === 1){
                            table += '<td class="artist">';

                            table += rowCells[rowCell];
                        }
                        else if (rowCell === 2){
                            table += '<td class="year">';
                            
                            table += rowCells[rowCell];
                        }
                        else if (rowCell === 3){
                            table += '<td class="genre">';
                            
                            table += rowCells[rowCell];
                        }
                        // else if (rowCell === 4){
                            // table += '<td class="energy">';
                            
                            // table += rowCells[rowCell];
                        // }
                        // else if (rowCell === 5){
                            // table += '<td class="dance">';
                            
                            // table += rowCells[rowCell];
                        // }
                        else{
                            table += '<td style="display:none;">';
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

            document.getElementById("repertoire-list").innerHTML += table;
            
        
	}, function(error){
			console.error(error);
		});
	}
}());