var formlink = 'https://docs.google.com/forms/d/e/1FAIpQLSe3F4cYKwqj41kLHsW_SQRp-AeeLZGUlbCRDQlyvVgBN0EhCg/viewform?embedded=true&usp=pp_url&entry.2134839446=';
var formlink1 = '%0A%0AFrom:+%0ATo:+';
var titles = [];
var artists = [];

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

var table_target, total=0;

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
	                table += '<tr class id="_th">';
	            } else {
	                table += '<tr class="tr-hover">';
	            }
	            var rowCells = allRows[singleRow].split(',');
	            for(var rowCell = 0; rowCell < rowCells.length; rowCell++){
	                if(singleRow === 0){
                        if(rowCell === 0){
                            table += '<style>#_form::after{ content: "#"; transform: scale(1.2); padding-left: 0.3em; color: rgb(192 192 192 / 40%) !important; float: right; text-shadow: none; }</style>';
                            table += '<th class=" dir-u "><span id="_form"></span>';
                        }
                        else if(rowCell === 1)
                            table += '<th class="artist">';
                        else if(rowCell === 2)
                            table += '<th class="year">';
                        if(rowCell < 3)
                            table += rowCells[rowCell];
	                    table += '</th>';
	                } else {
                        if(rowCell === 0){
                            var temp = "form" + singleRow;
                            table += '<style>#_'+temp+'::after{content: "'+(singleRow-total)+'";}</style>';
                            table += '<td class="title serial-number" id="_'+temp+'">';
                            table += '<a id="'+ temp + '" target="_blank" onclick="modalForm('+ (singleRow-1) + ');">';
                            titles.push(rowCells[rowCell]);
                            
                            table += rowCells[rowCell];
                            
                            table += '</a>'
                            table += '<img class="tr-hover request-indicator" src="img/hand_left.svg" />';
                        }
                        else if (rowCell === 1){
                            table += '<td class="artist">';
                            
                            var temp = "";
                            for(var i = 0; i < the_array.length-1; i++){
                                if(rowCells[rowCell] == the_array[i])
                                    temp = "The ";
                            }
                            artists.push(temp + rowCells[rowCell]);
                        }
                        else if (rowCell === 2){
                            table += '<td class="year">';
                        }
                        if(rowCell > 0 && rowCell < 3){
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
	                table += '<tbody>';
	            } else {
	                table += '</tr>';
	            }
                if(wip){
                    table = table_temp;
                    wip=0;
                    total++;
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

function modalForm(n){
    document.getElementById('modal-request').style.display='block';
    document.getElementById("form_embed").src = formlink + titles[n] + ' - ' + artists[n] + formlink1;
    history.pushState({}, '', '#form' + (n+1));
}
