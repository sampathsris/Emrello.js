
(function () {
	'use strict';
	var API = 'https://api.trello.com/1/';
	var PREFIX = 'data-emrello-';
	var emrello = [];
	
	/**
	 * Gets the Trello API key which is embedded as an attribute
	 * of the script tag which loads Emrello.js
	 */
	function getKey() {
		// find the script element containing Emrello.js
		var emrelloScript = document.querySelector('script[' + PREFIX + 'key]');
		if (!emrelloScript) return false;
		
		// extract the key
		emrello.key = emrelloScript.getAttribute(PREFIX + 'key');
		if (!emrello.key) return false;
		
		return true;
	}
	
	/**
	 * Represents an embedded Trello object
	 */
	function Emrello(element) {
		var type, id, url;
		
		this.prototype = element;
		
		/**
		 * Lazily gets the type of the Emrello, which could be either card, list, or board.
		 */
		this.getType = function () {
			if (!type) getTypeImpl();
			return type;
		};
		
		/**
		 * Gets the type of the Emrello.
		 */
		function getTypeImpl() {
			type = element.getAttribute(PREFIX + 'type');
			
			if (type == 'c' || type == 'card' || type == null || type == '') {
				// card is identified by 'c' or 'card'
				// no value will be interpreted as 'card'
				type = 'card';
			} else if (type == 'l' || type == 'list') {
				// list is identified by 'l' or 'list'
				type = 'list';
			} else if (type == 'b' || type == 'board') {
				// board is identified by 'b' or 'board'
				type = 'board';
			}
		}
		
		/**
		 * Gets the object identifier of the Emrello.
		 */
		this.getId = function () {
			if (!id) {
				id = element.getAttribute(PREFIX + 'id');
			}
			
			return id;
		};
		
		/**
		 * Gets the Trello API URL of the Emrello.
		 */
		this.getUrl = function () {
			if (!url) {
				url = API + this.getType() + 's/' + this.getId() + '?key=' + emrello.key;
			}
			
			return url;
		};
		
		/**
		 * Causes the Emrello to update by retrieving latest JSON from Trello API
		 */
		this.update = function () {
			var em = this;
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					render.call(em, this.response);
				}
			};
			xhr.open('GET', this.getUrl(), true);
			xhr.responseType = 'json';
			xhr.send(null);
		};
		
		/**
		 * Renders the Emrello object in the DOM
		 */
		function render(data) {
		}
		
		return this;
	}
	
	if (!getKey()) return;
	
	// get embedded cards, lists, and boards
	var embeddings = document.querySelectorAll('div[' + PREFIX + 'id]');
	if (embeddings.length === 0) return;
	
	for (var i = 0; i < embeddings.length; i++) {
		emrello.push(new Emrello(embeddings[i]));
	}
	
	for (var j = 0; j < emrello.length; j++) {
		emrello[j].update();
	}
}());
