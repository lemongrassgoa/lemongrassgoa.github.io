const links_ = [
    // full vids
    ["Antonio's Song",        "https://www.youtube.com/embed/JiX2QH73VpY", 0],
    ["Beautiful Tango",       "https://www.youtube.com/embed/tLOTEd5d5IY", 0],
    ["Big Bang",              "https://www.youtube.com/embed/SxclfMiybFg", 0],
    ["Does Your Mother Know", "https://www.youtube.com/embed/UaIfr62co04", 0],
    ["Brown Eyed Girl",       "https://www.youtube.com/embed/A6-7TkAp-NA", 0],
    ["Fly Me To The Moon",    "https://www.youtube.com/embed/hgdjepk5hco", 0],
    ["Hey Soul Sister",       "https://www.youtube.com/embed/5L9UUjnicmA", 0],
    ["If I Had A Hammer",     "https://www.youtube.com/embed/5OXSHCDvq2M", 0],
    ["Norwegian Wood",        "https://www.youtube.com/embed/iXiUKRlUfE4", 0],
    ["Smooth Operator",       "https://www.youtube.com/embed/nz85NleFjFs", 0],
    ["Snow",                  "https://www.youtube.com/embed/R41hAQg_hXI", 0],
    ["Superman",              "https://www.youtube.com/embed/IJQls99Ut1s", 0],
    ["The Boxer",             "https://www.youtube.com/embed/BdTnrxEp12E", 0],
    ["Zombie",                "https://www.youtube.com/embed/3a5HVi8I9As", 0],
    // shorts
    ["A Thousand Miles",      "https://www.youtube.com/embed/5ufhpSomAxE", 1],
    ["Budapest",              "https://www.youtube.com/embed/JqvshMcDONY", 1],
    ["Instant Crush",         "https://www.youtube.com/embed/cjedEvll0Yo", 1],
    ["Kiss Me",               "https://www.youtube.com/embed/_I2Pj_n49jY", 1],
    ["Wish You Were Here",    "https://www.youtube.com/embed/1qnsTsDFX2Y", 1],
    ["_","_"]
];

var yt_link;

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
                        else if(rowCell === 11)
                            table += '<th class="tags" style="display:none;">';
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
                            yt_link = -1;
                            for(var i = 0; i < links_.length-1; i++){
                                if(rowCells[rowCell].search(links_[i][0]) != -1){
                                    yt_link = i;
                                }
                            }

                            table += '<td class="title' + (yt_link > -1 ? ' yt_link' : '') + '">';
                            table += '<i>';
                            
                            // table += rowCells[rowCell];
                            if(yt_link > -1){
                                if (links_[yt_link][2] < 1){
                                    table += '<a style="text-decoration: none;" target="_blank" data-toggle="modal" data-target="#myModal" onclick="modalVideo('+yt_link+')"> <img class="yt_link_img" style="float: right; padding-left: 5px;" src="yt.svg" height="20" />' + rowCells[rowCell] + '</a>';
                                }else{
                                    table += '<a style="text-decoration: none;" target="_blank" data-toggle="modal" data-target="#myModal" onclick="modalVideo('+yt_link+')"> <img class="yt_link_img" style="float: left; padding-right: 5px;" src="ytshorts.png" height="20" />' + rowCells[rowCell] + '</a>';
                                }
                            }else{
                                table += rowCells[rowCell];
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
                        else if (rowCell === 11){
                            table += '<td class="tags" style="display:none;">';
                            
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

function modalVideo(_index){
    document.getElementById("video_embed").src = links_[_index][1] + "?enablejsapi=1";
}

var stopAllYouTubeVideos = () => { 
    var iframes = document.querySelectorAll('iframe');
    Array.prototype.forEach.call(iframes, iframe => { 
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', 
        func: 'stopVideo' }), '*');
    });
}
stopAllYouTubeVideos();