
/**
 * Emrello.js
 *
 * Embed Trello cards, lists, and even boards on your web page with periodic updates.
 */
(function () {
	'use strict';
	
	/**
	 * API endpoint
	 */
	var API = 'https://api.trello.com/1/';
	
	/**
	 * Arguments for each API type
	 */
	var API_ARGS = {
		'card': {
			'members': 'true'
		},
		'list': {
			'cards': 'open'
		},
		'board': {}
	};
	
	/**
	 * Prefix on custom attributes in Emrello objects
	 */
	var PREFIX = 'data-emrello-';
	
	/**
	 * Styles used on Emrello's
	 */
	var STYLES = {
		'card': {
			'overflow': 'auto',
			'padding': '6px 8px 4px',
			'margin': '0px',
			'position': 'relative',
			'display': 'inline-block',
			'cursor': 'pointer',
			'color': '#4d4d4d',
			'backgroundColor': '#fff',
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
			'margin': '0 4px 2px 0',
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
		},
		'list': {
			'margin': '0 5px',
			'backgroundColor': '#e2e4e6',
			'border': '1px solid #ccc',
			'borderRadius': '3px',
			'boxSizing': 'border-box',
			'display': 'inline-block',
			'maxHeight': '600px',
			'width': '270px',
			'maxWidth': '270px',
			'padding': '4px 4px 8px 4px'
		},
		'list-header': {
			'padding': '8px 12px',
			'position': 'relative',
			'minHeight': '19px',
			'display': 'block',
			'lineHeight': '18px',
			'textAlign': 'left',
			'color': '#4d4d4d'
		},
		'list-header-title': {
			'cursor': 'pointer',
			'display': 'inline',
			'fontSize': '15px',
			'fontWeight': 'bold',
			'lineHeight': '18px',
			'margin': '0',
			'minHeight': '19px',
			'minWidth': '30px',
			'overflow': 'hidden',
			'textOverflow': 'ellipsis',
			'wordWrap': 'break-word'
		}
	};
	
	/**
	 * Emrello templates
	 */
	var TEM_LABEL = {
		'type': 'span',
		'styles': [ 'label' ],
		'attributes': {
			'title': function (label) {
				return getLabelTitle(label);
			}
		},
		'content': function (label) {
			return document.createTextNode(getLabelTitle(label));
		},
		'postCreation': function(label) {
			setDomStyles(this, STYLES['label-' + label.color]);
		}
	};
	var TEM_LABEL_GROUP = {
		'type': 'div',
		'styles': [ 'labels' ],
		'content': function (card) {
			var labels = [];
			
			card.labels.forEach(function (curr, ix, arr) {
				labels.push(renderTemplate(TEM_LABEL, curr));
			});
			
			return labels;
		}
	};
	var TEM_CARD_TITLE = {
		'type': 'a',
		'styles': [ 'card-title' ],
		'attributes': {
			'href': function (card) {
				return card.shortUrl;
			},
			'target': '_blank'
		},
		'content': function (card) {
			return document.createTextNode(card.name);
		}
	};
	var TEM_BADGE = {
		'type': 'div',
		'styles': [ 'badge' ],
		'attributes': {
			'title': function (badge) {
				switch(badge.type) {
				case 'description': return 'This card has a description';
				case 'comments': return 'Comments';
				case 'attachments': return 'Attachments';
				case 'checklist': return 'Checklist items';
				case 'votes': return 'Votes';
				case 'due':
					var now = Date.now();
					if (badge.dueDate > now) {
						return 'This card is due later';
					} else {
						return 'This card is past due';
					}
				}
			}
		},
		'content': [
			{
				'type': 'span',
				'styles': [ 'badge-text' ],
				'content': function (badge) {
					var text;
					
					switch(badge.type) {
					case 'description': text = '='; break;
					case 'comments': text = '% ' + badge.count; break;
					case 'attachments': text = '@ ' + badge.count; break;
					case 'checklist': text = '# ' + badge.checked + '/' + badge.total; break;
					case 'votes': text = '^ ' + badge.count + ' vote' + (badge.count > 1 ? 's' : ''); break;
					case 'due': text = getShortDateString(badge.dueDate); break;
					}
					
					return document.createTextNode(text);
				}
			}
		]
	};
	var TEM_BADGE_GROUP = {
		'type': 'div',
		'styles': [ 'badges' ],
		'content': function (card) {
			var b = card.badges;
			var badges = [];
			
			if (b.description) {
				badges.push(renderTemplate(TEM_BADGE, { 'type': 'description' }));
			}
			
			if (b.comments > 0) {
				badges.push(renderTemplate(TEM_BADGE, { 'type': 'comments', 'count': b.comments }));
			}
			
			if (b.attachments > 0) {
				badges.push(renderTemplate(TEM_BADGE, { 'type': 'attachments', 'count': b.attachments }));
			}
			
			if (b.checkItems > 0) {
				badges.push(renderTemplate(TEM_BADGE, { 'type': 'checklist', 'total': b.checkItems, 'checked': b.checkItemsChecked }));
			}
			
			if (b.votes > 0) {
				badges.push(renderTemplate(TEM_BADGE, { 'type': 'votes', 'count': b.votes }));
			}
			
			if (b.due) {
				badges.push(renderTemplate(TEM_BADGE, { 'type': 'due', 'dueDate': new Date(b.due) }));
			}
			
			return badges;
		}
	};
	var TEM_MEMBER = {
		'type': 'div',
		'styles': [ 'member' ],
		'attributes': {
			'title': function (member) {
				return member.fullName + ' (' + member.username + ')';
			}
		},
		'content': function (member) {
			return document.createTextNode(member.initials);
		}
	};
	var TEM_MEMBER_GROUP = {
		'type': 'div',
		'styles': [ 'members' ],
		'content': function (card) {
			var members = [];
			
			card.members.forEach(function (member, ix, arr) {
				members.push(renderTemplate(TEM_MEMBER, member));
			});
			
			return members;
		}
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
	var TEM_LIST_HEADER = {
		'type': 'div',
		'styles': [ 'list-header' ],
		'content': [
			{
				'type': 'h2',
				'styles': [ 'list-header-title' ],
				'content': function (list) {
					return document.createTextNode(list.name);
				}
			}
		]
	};
	var TEM_LIST = {
		'type': 'div',
		'styles': [ 'list' ],
		'content': function (list) {
			var children = [];
			children.push(renderTemplate(TEM_LIST_HEADER, list));
			
			list.cards.forEach(function (card, ix, arr) {
				card.members = [];
				children.push(renderTemplate(TEM_CARD, card));
			});
			
			return children;
		}
	};
	var TEM_DUMMY = {
		'type': 'span',
		'styles': [],
		'content': function () {
			return document.createTextNode('Rendering dummy template');
		}
	}
	
	/**
	 * Root template belonging to each Emrello type
	 */
	var TEMPLATE_TYPES = {
		'card': TEM_CARD,
		'list': TEM_LIST,
		'board': TEM_DUMMY
	};
	
	/**
	 * Holds the list of Emrello's
	 */
	var emrello = [];
	
	/**
	 * Renders a given template using a given data object
	 * and returns the newly created element/node, which
	 * can be inserted into DOM by the caller.
	 */
	function renderTemplate(template, data) {
		var elem = document.createElement(template['type']);
		
		doIfPropertyExists(template, 'content', function (content) {
			var contentType = typeof content;
			var innerContent = [];
			
			if (contentType === 'string') {
				innerContent.push(document.createTextNode(content));
			} else if (contentType === 'object' && Array.isArray(content)) {
				content.forEach(function (curr, ix, arr) {
					innerContent.push(renderTemplate(curr, data));
				});
			} else if (contentType === 'function') {
				innerContent = content(data) || [];
			}
			
			if (!Array.isArray(innerContent)) {
				innerContent = [ innerContent ];
			}
			
			innerContent.forEach(function (curr, ix, arr) {
				elem.appendChild(curr);
			});
		});
		
		doIfPropertyExists(template, 'attributes', function (attrObj) {
			for (var attr in attrObj) {
				setDomAttribute(elem, attr, attrObj[attr], data);
			}
		});
		
		doIfPropertyExists(template, 'styles', function (styleNames) {
			styleNames.forEach(function (curr, ix, arr) {
				setDomStyles(elem, STYLES[curr]);
			});
		});
		
		doIfPropertyExists(template, 'postCreation', function (postCreation) {
			postCreation.call(elem, data);
		});
		
		return elem;
	}
	
	/**
	 * Executes a callback if a property of a give object
	 * exists. Value of the property is passed to the callback
	 * as its argument.
	 */
	function doIfPropertyExists(obj, prop, callback) {
		if (obj.hasOwnProperty(prop)) {
			callback(obj[prop]);
		}
	}
	
	/**
	 * Sets attributes fetched from a template to a DOM element
	 */
	function setDomAttribute(element, attribute, valueGetter, data) {
		if (valueGetter == null) return;
		
		var valueType = typeof valueGetter;
		var attrValue;
		
		if (valueType === 'string') {
			attrValue = valueGetter;
		} else if (valueType === 'function') {
			attrValue = valueGetter(data);
		}
		
		element.setAttribute(attribute, attrValue);
	}
	
	/**
	 * Sets styles fetched from a template to a DOM element
	 */
	function setDomStyles(element, stylesheet) {
		for (var attr in stylesheet) {
			element.style[attr] = stylesheet[attr];
		}
	}
	
	/**
	 * Determines the mouseover text (title) of a label
	 */
	function getLabelTitle(label) {
		var title = label.name;
		
		if (!title) {
			title = label.color + ' label (default)';
		}
		
		return title;
	}
	
	/**
	 * Formats due dates of cards to suit the UI
	 */
	function getShortDateString(date) {
		var month;
		
		switch (date.getMonth()) {
			case  0: month = 'Jan'; break;
			case  1: month = 'Feb'; break;
			case  2: month = 'Mar'; break;
			case  3: month = 'Apr'; break;
			case  4: month = 'May'; break;
			case  5: month = 'Jun'; break;
			case  6: month = 'Jul'; break;
			case  7: month = 'Aug'; break;
			case  8: month = 'Sep'; break;
			case  9: month = 'Oct'; break;
			case 10: month = 'Nov'; break;
			case 11: month = 'Dec'; break;
			default: month = 'Err'; break;
		}
		
		return month + ' ' + date.getDate();
	}
	
	/**
	 * Creates an object that supports CORS
	 */
	function createCORSRequest(method, url){
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr){
			// XHR has 'withCredentials' property only if it supports CORS
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != 'undefined'){ // if IE use XDR
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			xhr = null;
		}
		return xhr;
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
				var type = this.getType();
				var args = API_ARGS[type];
				url = API + type + 's/' + this.getId() + '?key=' + emrello.key;
				
				for (var arg in args) {
					url += '&' + arg + '=' + args[arg];
				}
			}
			
			return url;
		};
		
		/**
		 * Causes the Emrello to update by retrieving latest JSON from Trello API
		 */
		this.update = function () {
			var em = this;
			var xhr = createCORSRequest('GET', this.getUrl());
			
			if (!xhr) return;
			
			xhr.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					var data = this.response;
					
					if (typeof data === 'string') {
						data = JSON.parse(this.response);
					}
					
					render.call(em, data);
				}
			};
			
			xhr.responseType = 'json';
			xhr.send(null);
		};
		
		/**
		 * Renders the Emrello object in the DOM
		 */
		function render(data) {
			var template = TEMPLATE_TYPES[this.getType()];
			this.prototype.style.textAlign = 'center';
			this.prototype.style.fontFamily = '"Helvetica Neue", Arial, Helvetica, sans-serif';
			this.prototype.style.padding = '10px';
			this.prototype.appendChild(renderTemplate(template, data));
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
