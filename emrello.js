
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
	 * Prefix on Emrello specific CSS rules
	 */
	var CSS_PREFIX = 'emrello-css-';
	
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
			{ 'name': 'background-color', 'value': '#fff' },
			{ 'name': 'font-size', 'value': '14px' },
			{ 'name': 'line-height', 'value': '18px' },
			{ 'name': 'border', 'value': '1px solid #ccc' },
			{ 'name': 'border-radius', 'value': '4px' },
			{ 'name': 'max-width', 'value': '234px' },
			{ 'name': 'width', 'value': 'auto' },
			{ 'name': 'text-align', 'value': 'left' }
		],
		'labels': [
			{ 'name': 'margin', 'value': '2px 0' },
			{ 'name': 'overflow', 'value': 'auto' },
			{ 'name': 'position', 'value': 'relative' }
		],
		'label': [
			{ 'name': 'float', 'value': 'left' },
			{ 'name': 'height', 'value': '8px' },
			{ 'name': 'margin', 'value': '0 3px 3px 0' },
			{ 'name': 'padding', 'value': '0' },
			{ 'name': 'width', 'value': '18%' },
			{ 'name': 'line-height', 'value': '100px' },
			{ 'name': 'border-radius', 'value': '3px' },
			{ 'name': 'display', 'value': 'block' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'position', 'value': 'relative' }
		],
		'label-green': [
			{ 'name': 'color', 'value': '#61bd4f' },
			{ 'name': 'background-color', 'value': '#61bd4f' }
		],
		'label-yellow': [
			{ 'name': 'color', 'value': '#f2d600' },
			{ 'name': 'background-color', 'value': '#f2d600' }
		],
		'label-orange': [
			{ 'name': 'color', 'value': '#ffab4a' },
			{ 'name': 'background-color', 'value': '#ffab4a' }
		],
		'label-red': [
			{ 'name': 'color', 'value': '#eb5a46' },
			{ 'name': 'background-color', 'value': '#eb5a46' }
		],
		'label-purple': [
			{ 'name': 'color', 'value': '#c377e0' },
			{ 'name': 'background-color', 'value': '#c377e0' }
		],
		'label-blue': [
			{ 'name': 'color', 'value': '#0079bf' },
			{ 'name': 'background-color', 'value': '#0079bf' }
		],
		'label-sky': [
			{ 'name': 'color', 'value': '#00c2e0' },
			{ 'name': 'background-color', 'value': '#00c2e0' }
		],
		'label-lime': [
			{ 'name': 'color', 'value': '#51e898' },
			{ 'name': 'background-color', 'value': '#51e898' }
		],
		'label-pink': [
			{ 'name': 'color', 'value': '#ff80ce' },
			{ 'name': 'background-color', 'value': '#ff80ce' }
		],
		'label-black': [
			{ 'name': 'color', 'value': '#4d4d4d' },
			{ 'name': 'background-color', 'value': '#4d4d4d' }
		],
		'card-title': [
			{ 'name': 'color', 'value': '#4d4d4d' },
			{ 'name': 'clear', 'value': 'both' },
			{ 'name': 'display', 'value': 'block' },
			{ 'name': 'font-weight', 'value': '400' },
			{ 'name': 'margin', 'value': '0 0 4px' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'text-decoration', 'value': 'none' },
			{ 'name': 'word-wrap', 'value': 'break-word' },
			{ 'name': 'background-color', 'value': 'transparent' }
		],
		'badges': [
			{ 'name': 'float', 'value': 'left' },
			{ 'name': 'padding-bottom', 'value': '2px' }
		],
		'badge': [
			{ 'name': 'color', 'value': '#8c8c8c' },
			{ 'name': 'display', 'value': 'inline-block' },
			{ 'name': 'height', 'value': '18px' },
			{ 'name': 'margin', 'value': '0 4px 4px 0' },
			{ 'name': 'position', 'value': 'relative' },
			{ 'name': 'text-decoration', 'value': 'none' },
			{ 'name': 'vertical-align', 'value': 'top' },
			{ 'name': 'background-color', 'value': '#f5f5f5' },
			{ 'name': 'border-radius', 'value': '2px' },
			{ 'name': 'padding', 'value': '1px' }
		],
		'badge-text': [
			{ 'name': 'height', 'value': '18px' },
			{ 'name': 'font-size', 'value': '12px' },
			{ 'name': 'line-height', 'value': '18px' },
			{ 'name': 'width', 'value': '18px' },
			{ 'name': 'text-align', 'value': 'center' },
			{ 'name': 'vertical-align', 'value': 'top' },
			{ 'name': 'padding-left', 'value': '2px' },
			{ 'name': 'text-decoration', 'value': 'none' }
		],
		'badge-icon': [
			{ 'name': 'height', 'value': '18px' },
			{ 'name': 'width', 'value': '18px' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'font-size', 'value': '12px' },
			{ 'name': 'font-family', 'value': '\'Emrello-Icons\'' },
			{ 'name': 'line-height', 'value': '18px' },
			{ 'name': 'text-align', 'value': 'center' },
			{ 'name': 'vertical-align', 'value': 'top' },
			{ 'name': 'padding', 'value': '2px' },
			{ 'name': 'text-decoration', 'value': 'none' }
		],
		'members': [
			{ 'name': 'float', 'value': 'right' },
			{ 'name': 'margin', 'value': '2px -8px -4px 0px' }
		],
		'member': [
			{ 'name': 'float', 'value': 'right' },
			{ 'name': 'background-color', 'value': '#d6dadc' },
			{ 'name': 'border-radius', 'value': '3px' },
			{ 'name': 'color', 'value': '#a9a9a9' },
			{ 'name': 'cursor', 'value': 'pointer' },
			{ 'name': 'display', 'value': 'block' },
			{ 'name': 'height', 'value': '30px' },
			{ 'name': 'width', 'value': '30px' },
			{ 'name': 'margin', 'value': '0 4px 4px 0' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'position', 'value': 'relative' },
			{ 'name': 'text-decoration', 'value': 'none' },
			{ 'name': 'line-height', 'value': '30px' },
			{ 'name': 'font-weight', 'value': 'bold' },
			{ 'name': 'font-size', 'value': '18px' },
			{ 'name': 'text-align', 'value': 'center' }
		],
		'list': [
			{ 'name': 'margin', 'value': '5px' },
			{ 'name': 'background-color', 'value': '#e2e4e6' },
			{ 'name': 'border', 'value': '1px solid #ccc' },
			{ 'name': 'border-radius', 'value': '3px' },
			{ 'name': 'display', 'value': 'inline-block' },
			{ 'name': 'max-height', 'value': '470px' },
			{ 'name': 'width', 'value': 'auto' },
			{ 'name': 'min-width', 'value': '252px' },
			{ 'name': 'padding', 'value': '4px 4px 0px 4px' }
		],
		'list-header': [
			{ 'name': 'padding', 'value': '8px 4px' },
			{ 'name': 'position', 'value': 'relative' },
			{ 'name': 'min-height', 'value': '19px' },
			{ 'name': 'display', 'value': 'block' },
			{ 'name': 'line-height', 'value': '18px' },
			{ 'name': 'text-align', 'value': 'left' }
		],
		'list-header-title': [
			{ 'name': 'cursor', 'value': 'pointer' },
			{ 'name': 'display', 'value': 'inline' },
			{ 'name': 'font-size', 'value': '15px' },
			{ 'name': 'font-weight', 'value': 'bold' },
			{ 'name': 'line-height', 'value': '18px' },
			{ 'name': 'margin', 'value': '0' },
			{ 'name': 'min-height', 'value': '19px' },
			{ 'name': 'min-width', 'value': '30px' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'text-overflow', 'value': 'ellipsis' },
			{ 'name': 'word-wrap', 'value': 'break-word' },
			{ 'name': 'color', 'value': '#4d4d4d' }
		],
		'card-list': [
			{ 'name': 'overflow-y', 'value': 'auto' },
			{ 'name': 'overflow-x', 'value': 'visible' },
			{ 'name': 'max-height', 'value': '410px' }
		],
		'board-wrapper': [
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'border-radius', 'value': '6px' }
		],
		'board-header': [
			{ 'name': 'height', 'value': 'auto' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'padding', 'value': '10px 8px' }
		],
		'board-title': [
			{ 'name': 'cursor', 'value': 'pointer' },
			{ 'name': 'font-size', 'value': '18px' },
			{ 'name': 'font-weight', 'value': '700' },
			{ 'name': 'line-height', 'value': '30px' },
			{ 'name': 'padding-left', 'value': '4px' },
			{ 'name': 'text-decoration', 'value': 'none' },
			{ 'name': 'float', 'value': 'left' },
			{ 'name': 'height', 'value': '30px' },
			{ 'name': 'overflow', 'value': 'hidden' },
			{ 'name': 'text-overflow', 'value': 'ellipsis' },
			{ 'name': 'background-color', 'value': 'transparent' },
			{ 'name': 'color', 'value': '#fff' }
		],
		'board-visibility': [
			{ 'name': 'font-size', 'value': '12px' },
			{ 'name': 'float', 'value': 'left' },
			{ 'name': 'height', 'value': '30px' },
			{ 'name': 'line-height', 'value': '30px' },
			{ 'name': 'margin-left', 'value': '30px' },
			{ 'name': 'color', 'value': '#fff' }
		],
		'board-canvas': [
			{ 'name': 'max-height', 'value': '470px' },
			{ 'name': 'padding-bottom', 'value': '10px' },
			{ 'name': 'overflow-x', 'value': 'auto' },
			{ 'name': 'overflow-y', 'value': 'hidden' }
		],
		'list-container': [
			{ 'name': 'padding', 'value': '0 5px' },
			{ 'name': 'display', 'value': 'inline-flex' },
			{ 'name': 'display', 'value': '-ms-flexbox' },
			{ 'name': 'position', 'value': 'relative' },
			{ 'name': 'float', 'value': 'left' }
		],
		'list-wrap': [
			{ 'name': 'position', 'value': 'relative' },
			{ 'name': 'float', 'value': 'left' }
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
				
				if (labels.length > 0 && labels.length % 5 === 0) {
					labels[ix].style.marginRight = '0';
				}
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
				'styles': [ 'badge-icon' ],
				'content': function (badge) {
					var icon;
					switch(badge.type) {
					case 'description': icon = '\ue604'; break;
					case 'comments': icon = '\ue601'; break;
					case 'attachments': icon = '\ue603'; break;
					case 'checklist': icon = '\ue608'; break;
					case 'votes': icon = '\ue602'; break;
					case 'due': icon = '\ue600'; break;
					}
					
					return document.createTextNode(icon);
				}
			},
			{
				'type': 'span',
				'styles': [ 'badge-text' ],
				'content': function (badge) {
					var text = '';
					
					switch(badge.type) {
					case 'comments': text = badge.count; break;
					case 'attachments': text = badge.count; break;
					case 'checklist': text = badge.checked + '/' + badge.total; break;
					case 'votes': text = badge.count + ' vote' + (badge.count > 1 ? 's' : ''); break;
					case 'due': text = getShortDateString(badge.dueDate); break;
					}
					
					return document.createTextNode(text);
				}
			}
		]
	};
	var TEM_BADGE_ICON = {
		'type': 'span',
		'styles': [ 'badge-icon' ],
		'content': function (icon) {
			return icon;
		}
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
				'type': 'span',
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
					'name': 'background-color',
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
				elem.className += CSS_PREFIX + curr;
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
		var now = new Date();
		var year = now.getFullYear() != date.getFullYear() ? ', ' + date.getFullYear() : '';
		
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
		
		return month + ' ' + date.getDate() + year;
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

		insertCssRules();
		
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
	
	/**
	 * Insert global CSS rules
	 */
	function insertCssRules() {
		var totalStyles = 0;
		
		// Thanks to http://davidwalsh.name/add-rules-stylesheets
		// create a new stylesheet and insert into the document
		// all our styles are going to be added to this stylesheet
		var sheet = (function() {
			var style = document.createElement("style");
			style.appendChild(document.createTextNode("")); // WebKit hack
			document.head.appendChild(style);

			return style.styleSheet || style.sheet;
		})();
		
		/**
		 * Insert a single CSS rule to a stylesheet
		 */
		function addCssRule(selector, rules) {
			if('insertRule' in sheet) {
				var x = sheet.insertRule(selector + "{" + rules + "}", totalStyles++);
			} else if('addRule' in sheet) {
				sheet.addRule(selector, rules);
			}
		}
	
		// insert the icon font
		addCssRule('@font-face',
			'font-family: \'Emrello-Icons\';' +
			'src: url(data:application/x-font-ttf;charset=utf-8;' +
			'base64,AAEAAAALAIAAAwAwT1MvMg8SAv8AAAC8AAAAYGNtYXAa' +
			'VsyPAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZhD2CsAAAAF' +
			'4AAAHEGhlYWQGsaDxAAAIiAAAADZoaGVhB8IDzgAACMAAAAAkaG' +
			'10eCoAAH4AAAjkAAAANGxvY2EH+gk4AAAJGAAAABxtYXhwAB8As' +
			'wAACTQAAAAgbmFtZaNkHlEAAAlUAAABznBvc3QAAwAAAAALJAAA' +
			'ACAAAwPNAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAA' +
			'AAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADmCAPA/8AAQA' +
			'PAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADA' +
			'AAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg5gj//f//AAAA' +
			'AAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwA' +
			'BAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAA' +
			'AAAQAAAAAAAAAAAAIAADc5AQAAAAADAAD/wAQAA8AABQAaAC8AA' +
			'CUnETMVFwMiDgIVFB4CMzI+AjU0LgIjESIuAjU0PgIzMh4CFRQO' +
			'AiMCk9OAre1qu4tQUIu7amq7i1BQi7tqUItpPDxpi1BQi2k8PGm' +
			'LUNPSARvlrgKTUIu7amq7i1BQi7tqaruLUPyAPGmLUFCLaTw8aY' +
			'tQUItpPAAAAAIAAP/ABAADgAAzAFgAAAEiBgcOAQcOARUUFhceA' +
			'RceARceARc+ATc+ATM6ARceATMyNjc+ATc+ATU0JicuAScuASM1' +
			'MTIeAhUUDgIjIiYnDgMHNT4BNTQmJy4DNTQ+AjMCAClPJiM+GjI' +
			'1ERARMx8XHQQCAQEFCwYSLxkECAQQIBApTyYjPhoyNTUyGj4jJk' +
			'8paruLUFCLu2oUKBQpWl1gMDNNAQEsRjEbUIu7agMADQ0MIhUpZ' +
			'DYeOxsdMxQPLhsJEgkECgYSEwECAg0NDCIVKWQ2NmQpFSIMDQ2A' +
			'QXGYVlaYcUEDAikzHQoCGxpXNAcPBxxIUlwxVphxQQAAAAADAAD' +
			'/wAQAA8AAFAApAC8AABMUHgIzMj4CNTQuAiMiDgIVIRQOAiMiLg' +
			'I1ND4CMzIeAhUHNwkBFzcAUIu7amq7i1BQi7tqaruLUAOgQXGYV' +
			'laYcUFBcZhWVphxQd1a/uP+41rDAcBqu4tQUIu7amq7i1BQi7tq' +
			'VphxQUFxmFZWmHFBQXGYVp1aAR7+4lrCAAABAH4AHgNdA30ASAA' +
			'AAScBBhQXFjI3AT4BNCYnLgEiBgcBBjAxDgEUFhceATI2NzgBNz' +
			'EBJwEGMDEOASImJy4BNDY3OAE3MQE2MhcWFAcBBiInJjQ3AQKaQ' +
			'f67KCgocygBhiEiIiEiVVhUIv5nAS8vLy8vdnt2LwEBF0H+6QEi' +
			'VFhUISIhISIBAZkocikoKP56DScNDQ0BRQJ5Qf67KHIpKCgBhiJ' +
			'UWFUiISIiIf5nAS92e3YvLy8vLwEBF0H+6QEiISEiIVRYVCIBAZ' +
			'koKClyKP56DQ0OJg0BRQAABQAAAAAEAAOAAAMABwALAA8AEwAAE' +
			'yEVIRUhFSEVIRUhFSEVIRUhFSEABAD8AAQA/AAEAPwABAD8AAQA' +
			'/AADgIBAgECAQIBAgAAAAAIAAP/AAoADgAAaACUAAAEjNTQmKwE' +
			'iBh0BIyIGFREUFjMhMjY1ETQmIyU0NjsBMhYdASE1AlAQcU+AT3' +
			'EQFBwcFAIgFBwcFP5wJhqAGib/AAIAwE9xcU/AHBT+IBQcHBQB4' +
			'BQcwBomJhrAwAAAAAADAAAAAAQAA0AAGgAlAD4AAAEhNTQmIyEi' +
			'Bh0BISIGFREUFjMhMjY1ETQmIyU4ATEhOAExFSE1ASMVFAYrASI' +
			'mPQEhFRQGKwEiJj0BIzUhFQPA/wAmGv8AGib/ABomJhoDgBomJh' +
			'r9wAEA/wACQIATDUANE/6AEw1ADROAA4ACwEAaJiYaQCYa/cAaJ' +
			'iYaAkAaJkBAQP7AYA0TEw1gYA0TEw1gQEAAAAARAAD/wAPAA4AA' +
			'FAAdACYALQA5AEUATABVAFwAaAB0AHsAhACPAJoApQCwAAABIg4' +
			'CFRQeAjMyPgI1NC4CIwE+ATczDgEHIwEOAQcjPgE3MyEeARcjNT' +
			'MnNR4BFx4BFx4BFyMnPgE3PgE3FSM+ATcXFSM+ATczAS4BJzMeA' +
			'RcjNzMVIy4BJxcVLgEnLgEnLgEnMxcOAQcOAQc1Mw4BByc1Mw4B' +
			'ByM3LgEnMx4BFyM3Iy4BJx4BFx4BFyU+ATcOAQcjPgE3AzMeARc' +
			'uAScuAScFDgEHPgE3Mw4BBwHgY6+DS0uDr2Njr4NLS4OvYwEQBg' +
			'gBgAMPDXD94AYIAYADDw1wAd4HCQG/rq4LFgoUJhALEwibtRAmF' +
			'AoWC5sIEwt1vwEJB67+oA0PA4ABCAZwob+uBwkBvwsWChQmEAsT' +
			'CJu1ECYUChYLmwgTC3W/AQkHrv8BCAZwDQ8DgEBgDiYYIDoZEB0' +
			'M/XsZOiAYJg5gDB0QOWAOJhggOhkQHQwChRk6IBgmDmAMHRADgE' +
			'uDr2Njr4NLS4OvY2Ovg0v9gB5BISFAHwFAHkEhIUAfH0AhgEC7A' +
			'wsHDisbEikXUhsrDgcLA7sXKRKSgCFAH/7AH0AhIUEegIAfQCHA' +
			'uwMLBw4rGxIpF1IbKw4HCwO7FykSkoAhQB/AIUEeH0AhwCxNHg8' +
			'pGRAjE0YZKQ8eTSwTIxD9+ixNHg8pGRAjE0YZKQ8eTSwTIxAAAg' +
			'AA/8AEAAPAABAAFwAAASEiBhURFBYzITI2NRE0JiMBJzcXARcBA' +
			'4D9ADVLSzUDADVLSzX+QO1akwEzWv5zA8BLNf0ANUtLNQMANUv8' +
			'5e5akgEyWv5yAAEAAAABAAABkJnJXw889QALBAAAAAAA0ckuOgA' +
			'AAADRyS46AAD/wAQAA8AAAAAIAAIAAAAAAAAAAQAAA8D/wAAABA' +
			'AAAAAABAAAAQAAAAAAAAAAAAAAAAAAAA0EAAAAAAAAAAAAAAACA' +
			'AAABAAAAAQAAAAEAAAABAAAfgQAAAAEAAAABAAAAAQAAAAEAAAA' +
			'AAAAAAAKABQAHgBkAOQBLAGaAcAB+AJMA1wDiAABAAAADQCxABE' +
			'AAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEADQ' +
			'AAAAEAAAAAAAIABwCWAAEAAAAAAAMADQBIAAEAAAAAAAQADQCrA' +
			'AEAAAAAAAUACwAnAAEAAAAAAAYADQBvAAEAAAAAAAoAGgDSAAMA' +
			'AQQJAAEAGgANAAMAAQQJAAIADgCdAAMAAQQJAAMAGgBVAAMAAQQ' +
			'JAAQAGgC4AAMAAQQJAAUAFgAyAAMAAQQJAAYAGgB8AAMAAQQJAA' +
			'oANADsRW1yZWxsby1JY29ucwBFAG0AcgBlAGwAbABvAC0ASQBjA' +
			'G8AbgBzVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAw' +
			'RW1yZWxsby1JY29ucwBFAG0AcgBlAGwAbABvAC0ASQBjAG8AbgB' +
			'zRW1yZWxsby1JY29ucwBFAG0AcgBlAGwAbABvAC0ASQBjAG8Abg' +
			'BzUmVndWxhcgBSAGUAZwB1AGwAYQByRW1yZWxsby1JY29ucwBFA' +
			'G0AcgBlAGwAbABvAC0ASQBjAG8AbgBzRm9udCBnZW5lcmF0ZWQg' +
			'YnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQB' +
			'kACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format(\'truetype\');' +
			'font-weight: normal;' +
			'font-style: normal;');
		
		// insert emrello-css-* classes
		for (var style in STYLES) {
			var ruleSet = STYLES[style];
			var rules = '';
			var selector = '.' + CSS_PREFIX + style;
			
			ruleSet.forEach(function (rule, ix, arr) {
				rules += rule.name + ':' + rule.value + ';';
			});
			
			addCssRule(selector, rules);
		}
	}
	
	/********* entry point *********/
	init();
}());
