
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
	        var table = '<table class="sortable" id="repertoirelist">';
	        for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
                var wip = 0;
	            if (singleRow === 0) {
	                table += '<thead class="tooltip-sort">';
	                table += '<tr>';
	            } else {
	                table += '<tr>';
	            }
	            var rowCells = allRows[singleRow].split(',');
	            for(var rowCell = 0; rowCell < rowCells.length; rowCell++){
	                if(singleRow === 0){
                        if(rowCell < 9){
                            table += '<th>';
                            table += rowCells[rowCell];
                            table += '</th>';
                        }
	                } else {
                        if(rowCell < 9){
                            if(rowCell === 0){
                                if(rowCells[9]) 
                                    table += '<td class="title" style="background-color: grey;">';
                                else
                                    table += '<td class="title">';
                                table += '<i><a style="text-decoration: none;" href="http://localhost:81/'+ rowCells[10] + '">';
                                
                                table += rowCells[rowCell];
                                
                                table += '</a></i>'
                            }
                            else {
                                if(rowCells[9]) 
                                    table += '<td style="background-color: grey;">'; 
                                else
                                    table += '<td>'; 
                                if(rowCells[9]) table += '<i style="background-color: grey;">';
                                
                                table += rowCells[rowCell];
                                
                                if(rowCells[9]) table += '</i>';
                                table += '</td>';
                            }
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
	        }
	        table += '</tbody>';
	        table += '</table>';

            document.getElementById("repertoire-list").innerHTML += table;
            
        
	}, function(error){
			console.error(error);
		});
	}
}());