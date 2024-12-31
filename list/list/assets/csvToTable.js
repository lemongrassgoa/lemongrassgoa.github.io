const bpm_adjust = [
    ["Angels", 2],
    ["Bachelor Boy", 2],
    ["Bitter Sweet Symphony", 2],
    ["Blinding Lights", 2],
    ["Blowin' In The Wind", 2],
    ["Careless Whisper", 2],
    ["Don't Look Back In Anger", 2],
    ["Earth Angel", 3],
    ["Flightless Bird American Mouth", 3],
    ["Girls Just Want To Have Fun", 2],
    ["Heart Of Gold", 2],
    ["Hold You In My Arms", 3],
    ["Lost On You", 2],
    ["Mary Jane's Last Dance", 2],
    ["Never Going Back Again", 2],
    ["One", 2],
    ["One Of Us", 2],
    ["Que Sera Sera", 2],
    ["Piano Man", 2],
    ["Price Tag", 2],
    ["Rock 'n' Roll", 2],
    ["Something Stupid", 2],
    ["Son of a Preacher Man", 2],
    ["Superman (Scrubs theme)", 2],
    ["Sweet Dreams", 2],
    ["Tears in Heaven", 2],
    ["The Lazy Song", 2],
    ["Those Were The Days", 2],
    ["Time After Time", 2],
    ["Umbrella", 2],
    ["Vanilla Twilight", 2],
    ["Way Back Into Love", 2],
    ["We Are Young", 2],
    ["Wellerman (Sea Shanty)", 2],
    ["When You Say Nothing At All", 2],
    ["White Flag", 2],
    ["Wonderwall", 2],
    ["Yellow", 2],
    ["You've Got To Hide Your Love Away", 2],
    ["Zombie", 2],
    ["_", "_"]
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
    "Strokes",
    "Verve",
    "Weeknd",
    "White Stripes",
    "_"
];

var table_target, total = 0;

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
	        for (var singleRow = 0; singleRow < allRows.length; singleRow++) { // iterate through rows
                var table_temp = table, wip = 0;
	            if (singleRow === 0) { // header row
	                table += '<thead id="table-header">';
	                table += '<tr>';
	            } else {
	                table += '<tr>';
	            }
	            var rowCells = allRows[singleRow].split(',');
	            for(var rowCell = 0; rowCell < rowCells.length; rowCell++){ // iterate through columns
	                if(singleRow === 0){ // header row
                        if(rowCell < 9 && rowCell !== 3){
                            table += '<th style="" class="' + ((rowCell === 0) ? ' dir-u ' : '') + '">';
                            table += rowCells[rowCell];
                            table += '</th>';
                        }
                        /*  */
                        if(rowCell === 11){ // tags
                            table += '<th class="tags" style=" display: none;">';
                            table += rowCells[rowCell];
                            table += '</th>';
                        }
                        /*  */
	                } else {
                        if((rowCell < 9 && rowCell !== 3)){ // skip genre column
                            var wip_format = 'background-color: #000;';
                            if(rowCells[9]){
                                wip=1;
                            }
                            if(rowCell === 0){
                                var temp = "row" + singleRow;
                                if(!wip)
                                    table += '<style>#_'+temp+'::before{content: "'+(singleRow-total)+'"; transform: scale(1.5); padding-left: 0.2em; color: rgb(192 192 192 / 40%); float: right; text-shadow: none;}</style>';
                                
                                table += '<td id="_'+temp+'" class="title' + (rowCells[9] ? ' wip' : '') + '" style="' + (rowCells[9] ? wip_format : '') + '">';
                                // table += '<a class="songlink" style="text-decoration: none;" target="_blank" href="http://localhost:81/'+ rowCells[10] + '">';
                                table += '<a class="songlink" style="text-decoration: none;" target="_blank" href="txt/'+ rowCells[0] + '.txt" onclick="addSongCounter(\'_'+temp+'\');">';
                                table += rowCells[rowCell];
                                table += '</a>';
                            }
                            else {
                                table += '<td style="' + (rowCells[9] ? wip_format : '') + '">'; 
                                if(rowCell === 1){
                                    table += '<a href="https://open.spotify.com/track/' + rowCells[12] + '" target = "_blank"><img class="spotifylink" src="../img/spotify.png" /></a>';
                                    for(var i = 0; i < the_array.length-1; i++){
                                        if(rowCells[rowCell] == the_array[i])
                                            table += '<span class="the"></span>';
                                    }
                                }
                                if(rowCell === 4){
                                    for(var i = 0; i < bpm_adjust.length-1; i++){
                                        if(rowCells[0] == bpm_adjust[i][0]){
                                            rowCells[rowCell] = Math.round(rowCells[rowCell]/bpm_adjust[i][1]);
                                        }
                                    }
                                    // if(rowCells[rowCell] == 123)
                                        // table += rowCells[0];
                                }
                                
                                table += rowCells[rowCell];
                                if(rowCell === 1){
                                    if(getCookie(rowCells[0]) > 0){
                                        table += '<style>#_c'+temp+'::before{content: " (' + getCookie(rowCells[0]) + ')";</style>';
                                        table += '<span id="_c'+temp+'"></span>';
                                    }
                                }
                                table += '</td>';
                            }
                        }
                        /* */
                        if(rowCell === 11){
                            table += '<td class="tags" style="width: 1em; font-size: 70%; word-wrap: break-word; display: none;">';
                            table += rowCells[rowCell];
                            table += '</td>';
                        }
                        if(rowCell == 12){
                            // let _audioplayer = document.getElementById("audio");
                            // let _t = document.createElement("source");
                            // _t.setAttribute("src", "mp3/" + rowCells[rowCell] + ".mp3");
                            // _t.setAttribute("data-track-title", rowCells[0]);
                            // _audioplayer.appendChild(_t);
                            // console.info(_audioplayer);
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
