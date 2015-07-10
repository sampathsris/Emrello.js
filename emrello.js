
(function () {
	'use strict';
	var API = 'https://api.trello.com/1/';
	var PREFIX = 'data-emrello-';
	
	/**
	 * Styles used on Emrello's
	 */
	var STYLES = {
		'card': {
			'overflow': 'auto',
			'padding': '6px 8px 4px',
			'position': 'relative',
			'display': 'inline-block',
			'cursor': 'pointer',
			'color': '#4d4d4d',
			'fontFamily': '"Helvetica Neue", Arial, Helvetica, sans-serif',
			'fontSize': '14px',
			'lineHeight': '18px',
			'border': '1px solid #ccc',
			'borderRadius': '4px',
			'width': '244px',
			'textAlign': 'left'
		},
		'labels': {
			'margin': '2px 0',
			'overflow': 'auto',
			'position': 'relative'
		},
		'label': {
			'cssFloat': 'left',
			'height': '8px',
			'margin': '0 3px 3px 0',
			'padding': '0',
			'width': '42px',
			'lineHeight': '100px',
			'borderRadius': '3px',
			'display': 'block',
			'overflow': 'hidden',
			'position': 'relative'
		},
		'label-green': {
			'color': '#61bd4f',
			'backgroundColor': '#61bd4f'
		},
		'label-yellow': {
			'color': '#f2d600',
			'backgroundColor': '#f2d600'
		},
		'label-orange': {
			'color': '#ffab4a',
			'backgroundColor': '#ffab4a'
		},
		'label-red': {
			'color': '#eb5a46',
			'backgroundColor': '#eb5a46'
		},
		'label-purple': {
			'color': '#c377e0',
			'backgroundColor': '#c377e0'
		},
		'label-blue': {
			'color': '#0079bf',
			'backgroundColor': '#0079bf'
		},
		'label-sky': {
			'color': '#00c2e0',
			'backgroundColor': '#00c2e0'
		},
		'label-lime': {
			'color': '#51e898',
			'backgroundColor': '#51e898'
		},
		'label-pink': {
			'color': '#ff80ce',
			'backgroundColor': '#ff80ce'
		},
		'label-black': {
			'color': '#4d4d4d',
			'backgroundColor': '#4d4d4d'
		},
		'card-title': {
			'color': '#4d4d4d',
			'clear': 'both',
			'display': 'block',
			'fontWeight': '400',
			'margin': '0 0 4px',
			'overflow': 'hidden',
			'textDecoration': 'none',
			'wordWrap': 'break-word',
			'backgroundColor': 'transparent'
		},
		'badges': {
			'cssFloat': 'left',
			'paddingBottom': '2px'
		},
		'badge': {
			'color': '#8c8c8c',
			'display': 'inline-block',
			'height': '18px',
			'margin': '0 0 4px 0',
			'position': 'relative',
			'textDecoration': 'none',
			'verticalAlign': 'top',
			'backgroundColor': '#eee',
			'borderRadius': '2px',
			'padding': '0 4px 0 4px'
		},
		'badge-text': {
			'height': '18px',
			'fontSize': '12px',
			'lineHeight': '18px',
			'width': '18px',
			'textAlign': 'center',
			'textDecoration': 'none'
		},
		'members': {
			'cssFloat': 'right',
			'margin': '2px -8px -4px 0px',
		},
		'member': {
			'cssFloat': 'right',
			'backgroundColor': '#d6dadc',
			'borderRadius': '3px',
			'color': '#a9a9a9',
			'cursor': 'pointer',
			'display': 'block',
			'height': '30px',
			'width': '30px',
			'margin': '0 4px 4px 0',
			'overflow': 'hidden',
			'position': 'relative',
			'textDecoration': 'none',
			'lineHeight': '30px',
			'fontWeight': 'bold',
			'fontSize': '18px',
			'textAlign': 'center'
		}
	};
	
	/**
	 * Emrello templates
	 */
	var TEM_LABEL = {
		'type': 'span',
		'styles': [ 'label' ],
		'attributes': {
			'title': function () {}
		},
		'content': function () {}
	};
	var TEM_LABEL_GROUP = {
		'type': 'div',
		'styles': [ 'labels' ],
		'content': function () {}
	};
	var TEM_CARD_TITLE = {
		'type': 'a',
		'styles': [ 'card-title' ],
		'attributes': {
			'href': function () {},
			'target': '_blank'
		},
		'content': function () {}
	};
	var TEM_BADGE = {
		'type': 'div',
		'styles': [ 'badge' ],
		'attributes': {
			'title': function () {}
		},
		'content': [
			{
				'type': 'span',
				'styles': [ 'badge-text' ],
				'content': function () {}
			}
		]
	};
	var TEM_BADGE_GROUP = {
		'type': 'div',
		'styles': [ 'badges' ],
		'content': function () {}
	};
	var TEM_MEMBER = {
		'type': 'div',
		'styles': [ 'member' ],
		'attributes': {
			'title': function () {}
		},
		'content': function () {}
	};
	var TEM_MEMBER_GROUP = {
		'type': 'div',
		'styles': [ 'members' ],
		'content': function () {}
	};
	var TEM_CARD = {
		'type': 'div',
		'styles': [ 'card' ],
		'content': [
			TEM_LABEL_GROUP,
			TEM_CARD_TITLE,
			TEM_BADGE_GROUP,
			TEM_MEMBER_GROUP
		]
	};
	var TEM_DUMMY = {
		'type': 'span',
		'styles': [],
		'content': function () {}
	}
	
	/**
	 * Root template belonging to each Emrello type
	 */
	var TEMPLATE_TYPES = {
		'card': TEM_CARD,
		'list': TEM_DUMMY,
		'board': TEM_DUMMY
	};
	
	/**
	 * Holds the list of Emrello's
	 */
	var emrello = [];
	
	/**
	 * Renders a given template inside a given parent element
	 * using a given data object
	 */
	function renderTemplate(parent, template, data) {
		parent.innerHTML = 'Rendering template';
	}
	
	/**
	 * Represents an embedded Trello object
	 */
	function Emrello(element) {
		var type, id, url, interval;
		
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
		 * Gets the update interval of the Emrello.
		 */
		this.getInterval = function() {
			// lazily get the attribute value
			if (!interval) {
				interval = element.getAttribute(PREFIX + 'update-interval');
			}
			
			// if attribute is not specified, deault to 30 seconds
			if (!interval) interval = 30;
		}
		
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
			var template = TEMPLATE_TYPES[this.getType()];
			renderTemplate(this.prototype, template, data);
		}
		
		return this;
	}
	
	/**
	 * Initialization
	 */
	function init() {
		// find the script element containing Emrello.js
		var emrelloScript = document.querySelector('script[' + PREFIX + 'key]');
		if (!emrelloScript) return;
		
		// extract the key
		emrello.key = emrelloScript.getAttribute(PREFIX + 'key');
		if (!emrello.key) return;

		// get embedded cards, lists, and boards
		var embeddings = document.querySelectorAll('div[' + PREFIX + 'id]');
		if (embeddings.length === 0) return;
		
		// create a decorated object with the DOM element
		for (var i = 0; i < embeddings.length; i++) {
			emrello.push(new Emrello(embeddings[i]));
		}
		
		for (var j = 0; j < emrello.length; j++) {
			emrello[j].update();
		}
	}
	
	/********* entry point *********/
	init();
}());
