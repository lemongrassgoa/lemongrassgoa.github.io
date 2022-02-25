// var url="https://docs.google.com/forms/d/e/1FAIpQLSe3F4cYKwqj41kLHsW_SQRp-AeeLZGUlbCRDQlyvVgBN0EhCg/viewform?usp=pp_url&entry.1323424921=Sort+by+%F0%9D%90%92%F0%9D%90%A8%F0%9D%90%A7%F0%9D%90%A0+%F0%9D%90%AD%F0%9D%90%A2%F0%9D%90%AD%F0%9D%90%A5%F0%9D%90%9E&entry.1953223907=A+Thousand+Miles+-+Vanessa+Carlton"
// var url="https://docs.google.com/forms/d/e/1FAIpQLSe3F4cYKwqj41kLHsW_SQRp-AeeLZGUlbCRDQlyvVgBN0EhCg/viewform?usp=pp_url&entry.1323424921=Sort+by+%F0%9D%90%92%F0%9D%90%A8%F0%9D%90%A7%F0%9D%90%A0+%F0%9D%90%AD%F0%9D%90%A2%F0%9D%90%AD%F0%9D%90%A5%F0%9D%90%9E&entry.1953223907=Africa+-+Toto"
(function(){
var formlink = "https://docs.google.com/forms/d/e/1FAIpQLSe3F4cYKwqj41kLHsW_SQRp-AeeLZGUlbCRDQlyvVgBN0EhCg/viewform?usp=pp_url&entry.2134839446="

var titles = [];
var artists = [];
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
	            if (singleRow === 0) {
	                table += '<thead class="tooltip-sort">';
	                table += '<tr>';
	            } else {
	                table += '<tr>';
	            }
	            var rowCells = allRows[singleRow].split(',');
                var title = "", artist = "";
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
                        else
                            table += '<th>';
	                    table += rowCells[rowCell];
	                    table += '</th>';
	                } else {
                        if(rowCell === 0){
                            table += '<td class="title">';
                            table += '<i><a target="_blank" id="form'+ singleRow + '">';
                            titles.push(rowCells[rowCell]);
                            
                            table += rowCells[rowCell];
                            
                            table += '</a></i>'
                        }
                        else if (rowCell === 1){
                            table += '<td class="artist">';
                            artists.push(rowCells[rowCell]);
                            
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
                        else{
                            table += '<td>';
                            table += rowCells[rowCell];
                        }
	                    table += '</td>';
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
            
        for(var i = 0; i < artists.length; i++){
            var form_id = "form" + (i+1);
            document.getElementById(form_id).href = formlink + titles[i] + ' - ' + artists[i];
            if(i === 0)
                document.getElementById(form_id).className = "tooltip-request";
        }
        
	}, function(error){
			console.error(error);
		});
	}
}());