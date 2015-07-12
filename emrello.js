
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
		'board': {
			'cards': 'open',
			'lists': 'open'
		}
	};
	
	/**
	 * Prefix on custom attributes in Emrello objects
	 */
	var PREFIX = 'data-emrello-';
	
	/**
	 * Styles used on Emrello's
	 */
	var STYLES = {
		'card': [
			{ 'name': 'overflow', 'value': 'auto' },
			{ 'name': 'padding', 'value': '6px 8px 4px' },
			{ 'name': 'margin', 'value': '0 0 4px 0' },
			{ 'name': 'position', 'value': 'relative' },
			{ 'name': 'display', 'value': 'block' },
			{ 'name': 'cursor', 'value': 'pointer' },
			{ 'name': 'color', 'value': '#4d4d4d' },
			{ 'name': 'backgroundColor', 'value': '#fff' },
			{ 'name': 'fontSize', 'value': '14px' },
			{ 'name': 'lineHeight', 'value': '18px' },
			{ 'name': 'border', 'value': '1px solid #ccc' },
			{ 'name': 'borderRadius', 'value': '4px' },
			{ 'name': 'maxWidth', 'value': '214px' },
			{ 'name': 'width', 'value': 'auto' },
			{ 'name': 'textAlign', 'value': 'left' }
		],
		'labels': [
			{ 'name': 'margin', 'value': '2px 0' },
			{ 'name': 'overflow', 'value': 'auto' },
			{ 'name': 'position', 'value': 'relative' }
		],
		'label': [
			{ 'name': 'cssFloat', 'value': 'left' },
			{ 'name': 'height', 'value': '8px' },
			{ 'name': 'margin', 'value': '0 3px 3px 0' },
			{ 'name': 'padding', 'value': '0' },
			{ 'name': 'width', 'value': '18%' },
			{ 'name': 'lineHeight', 'value': '100px' },
			{ 'name': 'borderRadius', 'value': '3px' },
			{ 'name': 'display', 'value': 'block' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'position', 'value': 'relative' }
		],
		'label-green': [
			{ 'name': 'color', 'value': '#61bd4f' },
			{ 'name': 'backgroundColor', 'value': '#61bd4f' }
		],
		'label-yellow': [
			{ 'name': 'color', 'value': '#f2d600' },
			{ 'name': 'backgroundColor', 'value': '#f2d600' }
		],
		'label-orange': [
			{ 'name': 'color', 'value': '#ffab4a' },
			{ 'name': 'backgroundColor', 'value': '#ffab4a' }
		],
		'label-red': [
			{ 'name': 'color', 'value': '#eb5a46' },
			{ 'name': 'backgroundColor', 'value': '#eb5a46' }
		],
		'label-purple': [
			{ 'name': 'color', 'value': '#c377e0' },
			{ 'name': 'backgroundColor', 'value': '#c377e0' }
		],
		'label-blue': [
			{ 'name': 'color', 'value': '#0079bf' },
			{ 'name': 'backgroundColor', 'value': '#0079bf' }
		],
		'label-sky': [
			{ 'name': 'color', 'value': '#00c2e0' },
			{ 'name': 'backgroundColor', 'value': '#00c2e0' }
		],
		'label-lime': [
			{ 'name': 'color', 'value': '#51e898' },
			{ 'name': 'backgroundColor', 'value': '#51e898' }
		],
		'label-pink': [
			{ 'name': 'color', 'value': '#ff80ce' },
			{ 'name': 'backgroundColor', 'value': '#ff80ce' }
		],
		'label-black': [
			{ 'name': 'color', 'value': '#4d4d4d' },
			{ 'name': 'backgroundColor', 'value': '#4d4d4d' }
		],
		'card-title': [
			{ 'name': 'color', 'value': '#4d4d4d' },
			{ 'name': 'clear', 'value': 'both' },
			{ 'name': 'display', 'value': 'block' },
			{ 'name': 'fontWeight', 'value': '400' },
			{ 'name': 'margin', 'value': '0 0 4px' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'textDecoration', 'value': 'none' },
			{ 'name': 'wordWrap', 'value': 'break-word' },
			{ 'name': 'backgroundColor', 'value': 'transparent' }
		],
		'badges': [
			{ 'name': 'cssFloat', 'value': 'left' },
			{ 'name': 'paddingBottom', 'value': '2px' }
		],
		'badge': [
			{ 'name': 'color', 'value': '#8c8c8c' },
			{ 'name': 'display', 'value': 'inline-block' },
			{ 'name': 'height', 'value': '14px' },
			{ 'name': 'margin', 'value': '0 4px 2px 0' },
			{ 'name': 'position', 'value': 'relative' },
			{ 'name': 'textDecoration', 'value': 'none' },
			{ 'name': 'verticalAlign', 'value': 'top' },
			{ 'name': 'backgroundColor', 'value': '#eee' },
			{ 'name': 'border', 'value': '1px solid #ddd' },
			{ 'name': 'borderRadius', 'value': '2px' },
			{ 'name': 'padding', 'value': '0 4px' }
		],
		'badge-text': [
			{ 'name': 'height', 'value': '14px' },
			{ 'name': 'fontSize', 'value': '11px' },
			{ 'name': 'lineHeight', 'value': '14px' },
			{ 'name': 'width', 'value': '16px' },
			{ 'name': 'textAlign', 'value': 'center' },
			{ 'name': 'verticalAlign', 'value': 'top' },
			{ 'name': 'textDecoration', 'value': 'none' }
		],
		'members': [
			{ 'name': 'cssFloat', 'value': 'right' },
			{ 'name': 'margin', 'value': '2px -8px -4px 0px' }
		],
		'member': [
			{ 'name': 'cssFloat', 'value': 'right' },
			{ 'name': 'backgroundColor', 'value': '#d6dadc' },
			{ 'name': 'borderRadius', 'value': '3px' },
			{ 'name': 'color', 'value': '#a9a9a9' },
			{ 'name': 'cursor', 'value': 'pointer' },
			{ 'name': 'display', 'value': 'block' },
			{ 'name': 'height', 'value': '30px' },
			{ 'name': 'width', 'value': '30px' },
			{ 'name': 'margin', 'value': '0 4px 4px 0' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'position', 'value': 'relative' },
			{ 'name': 'textDecoration', 'value': 'none' },
			{ 'name': 'lineHeight', 'value': '30px' },
			{ 'name': 'fontWeight', 'value': 'bold' },
			{ 'name': 'fontSize', 'value': '18px' },
			{ 'name': 'textAlign', 'value': 'center' }
		],
		'list': [
			{ 'name': 'margin', 'value': '5px' },
			{ 'name': 'backgroundColor', 'value': '#e2e4e6' },
			{ 'name': 'border', 'value': '1px solid #ccc' },
			{ 'name': 'borderRadius', 'value': '3px' },
			{ 'name': 'display', 'value': 'inline-block' },
			{ 'name': 'maxHeight', 'value': '450px' },
			{ 'name': 'width', 'value': 'auto' },
			{ 'name': 'minWidth', 'value': '232px' },
			{ 'name': 'padding', 'value': '4px 4px 0px 4px' }
		],
		'list-header': [
			{ 'name': 'padding', 'value': '8px 4px' },
			{ 'name': 'position', 'value': 'relative' },
			{ 'name': 'minHeight', 'value': '19px' },
			{ 'name': 'display', 'value': 'block' },
			{ 'name': 'lineHeight', 'value': '18px' },
			{ 'name': 'textAlign', 'value': 'left' }
		],
		'list-header-title': [
			{ 'name': 'cursor', 'value': 'pointer' },
			{ 'name': 'display', 'value': 'inline' },
			{ 'name': 'fontSize', 'value': '15px' },
			{ 'name': 'fontWeight', 'value': 'bold' },
			{ 'name': 'lineHeight', 'value': '18px' },
			{ 'name': 'margin', 'value': '0' },
			{ 'name': 'minHeight', 'value': '19px' },
			{ 'name': 'minWidth', 'value': '30px' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'textOverflow', 'value': 'ellipsis' },
			{ 'name': 'wordWrap', 'value': 'break-word' },
			{ 'name': 'color', 'value': '#4d4d4d' }
		],
		'card-list': [
			{ 'name': 'overflowY', 'value': 'auto' },
			{ 'name': 'overflowX', 'value': 'visible' },
			{ 'name': 'maxHeight', 'value': '410px' }
		],
		'board-wrapper': [
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'borderRadius', 'value': '6px' }
		],
		'board-header': [
			{ 'name': 'height', 'value': 'auto' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'padding', 'value': '10px 8px' }
		],
		'board-title': [
			{ 'name': 'cursor', 'value': 'pointer' },
			{ 'name': 'fontSize', 'value': '18px' },
			{ 'name': 'fontWeight', 'value': '700' },
			{ 'name': 'lineHeight', 'value': '30px' },
			{ 'name': 'paddingLeft', 'value': '4px' },
			{ 'name': 'textDecoration', 'value': 'none' },
			{ 'name': 'cssFloat', 'value': 'left' },
			{ 'name': 'height', 'value': '30px' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'textOverflow', 'value': 'ellipsis' },
			{ 'name': 'backgroundColor', 'value': 'transparent' },
			{ 'name': 'color', 'value': '#fff' }
		],
		'board-visibility': [
			{ 'name': 'fontSize', 'value': '12px' },
			{ 'name': 'cssFloat', 'value': 'left' },
			{ 'name': 'height', 'value': '30px' },
			{ 'name': 'lineHeight', 'value': '30px' },
			{ 'name': 'marginLeft', 'value': '30px' },
			{ 'name': 'color', 'value': '#fff' }
		],
		'board-canvas': [
			{ 'name': 'maxHeight', 'value': '470px' },
			{ 'name': 'paddingBottom', 'value': '10px' },
			{ 'name': 'overflowX', 'value': 'auto' },
			{ 'name': 'overflowY', 'value': 'hidden' }
		],
		'list-container': [
			{ 'name': 'padding', 'value': '0 5px' },
			{ 'name': 'display', 'value': 'inline-flex' },
			{ 'name': 'display', 'value': '-ms-flexbox' },
			{ 'name': 'position', 'value': 'relative' },
			{ 'name': 'cssFloat', 'value': 'left' }
		],
		'list-wrap': [
			{ 'name': 'position', 'value': 'relative' },
			{ 'name': 'cssFloat', 'value': 'left' }
		]
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
		'content': [
			TEM_LIST_HEADER,
			{
				'type': 'div',
				'styles': [ 'card-list' ],
				'content': function (list) {
					var children = [];
					
					list.cards.forEach(function (card, ix, arr) {
						card.members = [];
						children.push(renderTemplate(TEM_CARD, card));
					});
					
					return children;
				}
			}
		]
	};
	var TEM_LIST_WRAP = {
		'type': 'div',
		'styles': [ 'list-wrap' ],
		'content': [
			TEM_LIST
		]
	};
	var TEM_BOARD = {
		'type': 'div',
		'styles': [ 'board-wrapper' ],
		'content': [
			{
				'type': 'div',
				'styles': [ 'board-header' ],
				'content': [
					{
						'type': 'a',
						'styles': [ 'board-title' ],
						'attributes': {
							'href': function (board) {
								return board.shortUrl;
							},
							'target': '_blank'
						},
						'content': function (board) {
							return document.createTextNode(board.name);
						}
					},
					{
						'type': 'span',
						'styles': [ 'board-visibility' ],
						'content': function (board) {
							var level = board.prefs.permissionLevel;
							level = level.charAt(0).toUpperCase() + level.slice(1);
							return document.createTextNode(level);
						}
					}
				]
			},
			{
				'type': 'div',
				'styles': [ 'board-canvas' ],
				'content': [
					{
						'type': 'div',
						'styles': [ 'list-container' ],
 						'content': function (board) {
							var children = [];
							
							board.lists.forEach(function (list, ix, arr) {
								list.cards = [];
								
								board.cards.forEach(function (card, ix2, arr2) {
									if (card.idList == list.id) {
										list.cards.push(card);
									}
								});
								
								var listNode = renderTemplate(TEM_LIST_WRAP, list);
								
								listNode.style.position = 'relative';
								listNode.style.cssFloat = 'left';
								listNode.style.top = '0';
								
								children.push(listNode);
							});
							
							return children;
						}
					}
				]
			}
		],
		'postCreation': function(board) {
			var styles = [];
			
			if (board.prefs.backgroundColor) {
				styles.push({
					'name': 'backgroundColor',
					'value': board.prefs.backgroundColor
				});
			}
			
			if (board.prefs.backgroundImage) {
				styles.push({
					'name': 'backgroundImage',
					'value': 'url("' + board.prefs.backgroundImage + '")'
				});
			}
			
			setDomStyles(this, styles);
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
		'board': TEM_BOARD
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
		if (!stylesheet.forEach) {
			console.log('aha!');
		}
		
		stylesheet.forEach(function (cssProperty, ix, arr) {
			element.style[cssProperty.name] = cssProperty.value;
		});
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
			var elem = renderTemplate(template, data);
			
			if (this.getType() == 'card') {
				elem.style.display = 'inline-block';
			}
			
			this.prototype.style.textAlign = 'center';
			this.prototype.style.fontFamily = '"Helvetica Neue", Arial, Helvetica, sans-serif';
			this.prototype.style.padding = '10px';
			this.prototype.appendChild(elem);
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
