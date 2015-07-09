
(function () {
	'use strict';
	var API = 'https://api.trello.com/1/';
	
	// find the script element containing Emrello.js
	var emrelloScript = document.querySelector('script[data-emrello-key]');
	if (!emrelloScript) return;
	
	// extract the key
	var key = emrelloScript.getAttribute('data-emrello-key');
	if (!key) return;
	
	// get embedded cards, lists, and boards
	var embeddings = document.querySelectorAll('div[data-emrello-type]');
	if (embeddings.length === 0) return;
	
	embeddings:
	for (var i = 0; i < embeddings.length; i++) {
		var type = embeddings[i].getAttribute('data-emrello-type');
		var id = embeddings[i].getAttribute('data-emrello-id');
		if (!type) type = 'card';
		var component;
		
		type:
		switch (type) {
			case 'card':
			case 'c':
				component = 'cards';
				break type;
			case 'list':
			case 'l':
				component = 'lists';
				break type;
			case 'board':
			case 'b':
				component = 'boards';
				break type;
			default:
				console.log('unknown type: ' + type);
				continue embeddings;
		}
		
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.log(type + ': ' + id);
				console.log(JSON.parse(xhr.responseText));
			}
		};
		xhr.open('GET', API + component + '/' + id + '?key=' + key, true);
		xhr.send(null);
	}
}());
