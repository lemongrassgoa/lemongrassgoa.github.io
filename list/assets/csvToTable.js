const links_ = [
    // full vids
    ["Antonio's Song",           "JiX2QH73VpY", 0],
    ["Beautiful Tango",          "tLOTEd5d5IY", 0],
    ["Big Bang",                 "SxclfMiybFg", 0],
    ["Brown Eyed Girl",          "A6-7TkAp-NA", 0],
    ["Counting Stars",           "QLzInKcJEcg", 0],
    ["Does Your Mother Know",    "UaIfr62co04", 0],
    ["Flowers",                  "fJpvw_NO4qw", 0],
    ["Fly Me To The Moon",       "hgdjepk5hco", 0],
    ["If I Had A Hammer",        "ZxqRFqaa3NY", 0],
    ["Mamma Mia",                "P09oCbD8aJ8", 0],
    ["Norwegian Wood",           "iXiUKRlUfE4", 0],
    ["Perfect",                  "dSETYe7MeQ0", 0],
    ["Price Tag",                "xkuX-nmXRLw", 0],
    ["September",                "rNs2CHVC3KE", 0],
    ["Smooth Operator",          "nz85NleFjFs", 0],
    ["Snow",                     "R41hAQg_hXI", 0],
    ["Superman",                 "IJQls99Ut1s", 0],
    ["The Boxer",                "BdTnrxEp12E", 0],
    ["Wild World",               "7paD6uZtEoY", 0],
    ["You're Still The One",     "EiRWitLTZ-8", 0],
    // shorts
    ["A Thousand Miles",         "5ufhpSomAxE", 1],
    ["All About That Bass",      "6l3Ny8JpKc4", 1],
    ["Budapest",                 "JqvshMcDONY", 1],
    ["Country Roads",            "pHtKLxAnq8U", 1],
    ["Dancing In The Moonlight", "wT6s1rnQ7ck", 1],
    ["Instant Crush",            "cjedEvll0Yo", 1],
    ["Kiss Me",                  "_I2Pj_n49jY", 1],
    ["Make You Feel My Love",    "pSNBaXiuOfI", 1],
    ["New Shoes",                "yJfxQRy1HCU", 1],
    ["Rocket Man",               "qzWAF1x-FG0", 1],
    ["You're Beautiful",         "DndihO2WPGA", 1],
    ["Wish You Were Here",       "1qnsTsDFX2Y", 1],
    ["_","_"]
];

const the_array = [
    "Archies",
    "Avett Brothers",
    "Beatles",
    "Bee Gees",
    "Carpenters",
    "Cranberries",
    "Cure",
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
	                table += '<tr class id="_th">';
	            } else {
	                table += '<tr class="tr-hover">';
	            }
	            var rowCells = allRows[singleRow].split(',');
	            for(var rowCell = 0; rowCell < rowCells.length; rowCell++){
	                if(singleRow === 0){
                        if(rowCell === 0)                                // table HEADER section
                            // table += '<th id="title" class=" dir-u "> <input type="checkbox" id="yt_filter" /> <label for="yt_filter" id="yt_filter_label"  onclick="show_hide_yt()"><img class="yt-img-animate yt-img" id="yt-checkbox-img" style="" src="img/yt.png" /></label> <span id="sortTooltip">&lArr; Sort &rArr;</span>';
                            // table += '<th id="title" class=" dir-u "> <input type="checkbox" id="yt_filter" /> <label for="yt_filter" id="yt_filter_label"  onclick="show_hide_yt()"><img class="yt-img yt-checkbox-img" id="yt-checkbox-img" style="" src="img/yt_select.png" /></label>';
                            table += '<th id="title" class=" dir-u "> <input type="checkbox" id="yt_filter" /> <label for="yt_filter" id="yt_filter_label"  onclick="show_hide_yt()"> <img class="yt-img yt-checkbox-img" id="yt-checkbox-img" src="img/yt.svg" /><span id="yt_filter_label_1" style="font-size: 80%; font-weight: normal; color: #ffffff66; vertical-align: middle;">Video </span><!-- &#x1F50E;&#xFE0E; --></label>';
                        else if(rowCell === 1)
                            table += '<th id="artist" class="">';
                        else if(rowCell === 2)
                            table += '<th id="year" class="">';
                        if(rowCell < 3)
                            table += rowCells[rowCell];
	                    table += '</th>';
	                } else {                                            // table BODY section
                        if(rowCell === 0){
                            yt_link = -1;   // search for title matches in the list of videos
                            for(var i = 0; i < links_.length-1; i++){
                                if(rowCells[rowCell].search(links_[i][0]) != -1){
                                    yt_link = i;    // if found, store the index of the youtube link
                                }
                            }

                            table += '<td class="title' + (yt_link > -1 ? ' yt_link' : '') + '">';
                            
                            if(yt_link > -1){       // if a match was found, is it a full vid or short
                                // call the modal function with the correct index of the youtube array
                                // var link1 = '<a style="text-decoration: none;" target="_blank" href="https://youtu.be/'+links_[yt_link][1]+'">';

                                // var link1 = '<a style="text-decoration: none;" target="_blank" onclick="modalVideo(\''+links_[yt_link][1]+'\', this)">';
                                // var link2 = '<img class="yt-img" src="img/yt.svg" />';
                                // table += link1 + link2 + rowCells[rowCell] + '</a>'; // generate song name with video link

                                var link1 = '<a id="video' + yt_link + '" style="text-decoration: none;" target="_blank" onclick="modalVideo('+yt_link+', this)">';
                                var link2 = '';
                                if (links_[yt_link][2] < 1){
                                    link2 = '<img class="yt-img" src="img/yt.svg" />';
                                }else{
                                    link2 = '<img class="yt-img yt-short" src="img/yt_shorts.svg" style="padding-right: 0.4em;"/>';
                                }
                                table += link1 + link2 + rowCells[rowCell] + '</a>'; // generate song name with video link

                            }else{
                                table += rowCells[rowCell]; // song name, no link
                            }
                        }
                        else if (rowCell === 1){
                            table += '<td class="artist">';
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
                        if(rowCells[9]){
                            wip=1;
                        }
                        if(rowCell == 12 && !wip){
                            let _audioplayer = document.getElementById("audio");
                            let _t = document.createElement("source");
                            _t.setAttribute("src", "https://github.com/lemongrassgoa/audio/raw/main/mp3/" + rowCells[rowCell] + ".mp3");
                            _t.setAttribute("data-track-title", rowCells[0]);
                            _audioplayer.appendChild(_t);
                            // console.info(_audioplayer);
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
            var player = new AudioPlayer();
		}, function(error){
			console.error(error);
		});
	}
}());

var _url;
function modalVideo(n, e){
    _url = n;
    // console.log(e.childNodes[0]);
    e.childNodes[0].classList.add('yt-img-clicked');
    setTimeout(openModal, 100);
}

function openModal(){
    history.pushState({}, '', '#video' + _url);
    document.getElementsByClassName('yt-img-clicked')[0].classList.remove('yt-img-clicked');
    setTimeout(function(){
        document.getElementById('modal-video').style.display='block';
        document.getElementById("video_embed").src = "https://youtube.com/embed/" + links_[_url][1] + "/";
    }, 200);
}