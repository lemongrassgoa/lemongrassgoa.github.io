
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
	        var table = '<table class=" sortable" id="repertoirelist">';
	        for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
                var wip = 0;
	            if (singleRow === 0) {
	                table += '<thead class="tooltip-sort">';
	            }
                table += '<tr class="row_select">';
                    
	            var rowCells = allRows[singleRow].split(',');
	            for(var rowCell = 0; rowCell < rowCells.length; rowCell++){
	                if(singleRow === 0){
                        if(rowCell < 9){
                            table += '<th style="" class="' + ((rowCell === 0) ? ' dir-u ' : '') + '">';
                            table += rowCells[rowCell];
                            table += '</th>';
                        }
                        if(rowCell === 11){
                            table += '<th class="tags">';
                            table += rowCells[rowCell];
                            table += '</th>';
                        }
	                } else {
                        if(rowCell < 9){
                            var wip_format = 'background-color: #000;';
                            if(rowCell === 0){
                                table += '<td class="title' + (rowCells[9] ? ' wip' : '') + '" style="' + (rowCells[9] ? wip_format : '') + '" onclick="title_clicked(this);">';

                                table += '<i><a style="text-decoration: none;" target="_blank" href="http://localhost:81/'+ rowCells[10] + '">';
                                table += rowCells[rowCell];
                                table += '</a></i>'
                            }
                            else {
                                table += '<td style="' + (rowCells[9] ? wip_format : '') + '">'; 
                                
                                table += rowCells[rowCell];
                                
                                table += '</td>';
                            }
                        }
                        if(rowCell === 11){
                            table += '<td class="tags" style="width: 5em; font-size: 80%; word-wrap: break-word;">';
                            table += rowCells[rowCell];
                            table += '</td>';
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
            
            // for(var i = 0; i < 3; i++){
                // table += '<tr>';
                // table += '<td colspan="8"></td>';
                // table += '</tr>';
            // }
	        var table2 = '<br /><br /><table style="width: 70%; text-align: center;">';
            table2 += '<tr> <td colspan="2"> HINDI SONGS </td> </tr>';
            table2 += '<tr> <td colspan="2"><br /> </td> </tr>';
            // table2 += '<tr> <td style="width: 25%;"> NAME </td> <td> LINK </td> </tr>';
            table2 += '<tr> <td> Allah Ke Bande </td> </tr>';
            table2 += '<tr> <td> Bang Bang </td> </tr>';
            table2 += '<tr> <td> Darling </td> </tr>';
            table2 += '<tr> <td> Dekha Hai Aise Bhi </td> </tr>';
            table2 += '<tr> <td> Dilko Tumse Pyar Hua </td> </tr>';
            table2 += '<tr> <td> Dooba Dooba </td> </tr>';
            table2 += '<tr> <td> Gulabi Aankhen </td> </tr>';
            table2 += '<tr> <td> Iktara </td> </tr>';
            table2 += '<tr> <td> Kabira </td> </tr>';
            table2 += '<tr> <td> Kahin To </td> </tr>';
            table2 += '<tr> <td> Kaisi Paheli Zindagani </td> </tr>';
            table2 += '<tr> <td> Khaabon Ke Parinday </td> </tr>';
            table2 += '<tr> <td> Kyon </td> </tr>';
            table2 += '<tr> <td> Main Kya Karoon </td> </tr>';
            table2 += '<tr> <td> Oh Sanam </td> </tr>';
            table2 += '<tr> <td> Pani Da Rang Male </td> </tr>';
            table2 += '<tr> <td> Pyaar Ke Pal </td> </tr>';
            table2 += '<tr> <td> Shaam </td> </tr>';
            table2 += '<tr> <td> Sooraj Ki Baahon Mein </td> </tr>';
            table2 += '<tr> <td> Tum Ho Toh </td> </tr>';
            table2 += '<tr> <td> Yaaron Dosti </td> </tr>';
            table2 += '<tr> <td> Ye Tumhari Meri Baatein </td> </tr>';
            table2 += '</table>';

            document.getElementById("repertoire-list").innerHTML += table + table2;
            
        
	}, function(error){
			console.error(error);
		});
	}
}());