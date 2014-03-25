var base_url = 'http://api.wordnik.com:80/v4/word.json/';
var word = 'cheese';
var defaults = '/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=';
var key = '203244f19af80824ef24f94c375174bb9b09e6b5a50a5e66f';

document.getElementById('compare').addEventListener('click', function() {
	var thisTxt = document.getElementById('this').value;
	var thatTxt = document.getElementById('that').value;
	if(thisTxt.length > 0 && thatTxt.length > 0) {
		var thatDef, thisDef;
		get(thatTxt, function(result) {
			document.getElementById('thatDef').innerHTML = result[0].text;
			get(thisTxt, function(result) {
				document.getElementById('thisDef').innerHTML = result[0].text;
			});	
		});	
	}else{
		alert('Comparison: a consideration or estimate of the similarities or dissimilarities between two things or people.');
	}
});

function get(word, callback) {
	var req = new XMLHttpRequest();	
	req.onreadystatechange = function (data) {
		if (req.readyState==4 && req.status==200) {
	  		var result = JSON.parse(data.target.response);
	  		if(result.length > 0) {
	  			callback(result);
	  		}
	  		else
	  			callback(null);
	  	}
	};
	var url = base_url + word + defaults + key;
	req.open('GET', url);
	req.send();
}
