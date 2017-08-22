(function () {
	'use strict';

	var CommonChars = function() {
		this.i18n = {
			en: {
				copy: 'Copy',
				copySucceed: 'Successfully copied to clipboard',
				copyFailed: 'Could not copy character to clipboard',
			}
		};

		this.chars = [
			'–', '—', '^', '°', '●',
				'divider',
			'©', '®', '™',
				'divider',
			'α', 'β', 'γ', 'μ', 'π',
				'divider',
			'†', '±', 'Δ',
			 	'divider',
			// '↓', '↑', '…',
			// 	'divider',
			'á', 'é', 'í', 'ó', 'ú',
				'divider',
			'à', 'è', 'ì', 'ò', 'ù',
				'divider',
			'ä', 'ë', 'ï', 'ö', 'ü',
				'divider',
			'â', 'ê', 'î', 'ô', 'û',
			// 	'divider',
			// 'ã', 'æ', 'œ', 'õ',
				'divider',
			'ç', 'ñ', '¿', '¡', '€',
				'divider',
			'«', '»', '“', '„',
				'divider',
			'♠', '♣', '♥', '♦',
		];

		this.i18nTranslate();
		this.initialize();
		this.eventHandlers();
	}

	CommonChars.prototype.initialize = function() {
		var self = this;
		var $buttonsList = document.getElementById('buttons-list');
		var allChars = self.chars;

		for (var i = 0; i < allChars.length; i++) {
			var elemText = allChars[i];
			var char;

			if (elemText == 'divider') {
				// Create group divider
				char = document.createElement('hr');
				char.className = 'divider';
			}
			else if (elemText == 'separator') {
				// Create char divider
				char = document.createElement('div');
				char.appendChild( document.createTextNode('|') );
				char.className = 'separator';
			}
			else {
				// Create character
				char = document.createElement('button');
				char.appendChild( document.createTextNode(allChars[i]) );
				char.className = 'character';

				char.addEventListener('click', function () {
					var text = this.innerText;

					self.copyText(text);
					self.toastMessage( chrome.i18n.getMessage('txtSuccess') );
				});
			}

			$buttonsList.appendChild(char);
		}
	};

	CommonChars.prototype.eventHandlers = function() {
		var $body = document.getElementsByTagName('body')[0];
		var $btnHelp = document.getElementById('help');
		var $btnClose = document.getElementById('close');

		$btnHelp.addEventListener('click', function() {
			$body.className = 'help-open';
		});

		$btnClose.addEventListener('click', function() {
			$body.className = '';
		});
	}

	CommonChars.prototype.copyText = function(character) {
		var self = this;
		var textArea = document.createElement('textarea');

		textArea.id = 'text-copier';
		textArea.value = character;

		document.body.appendChild(textArea);

		textArea.select();

		try {
			var successful = document.execCommand('copy');
		} catch (err) {
			prompt( chrome.i18n.getMessage('txtFailed') );
		}

		document.body.removeChild(textArea);
	};

	CommonChars.prototype.toastMessage = function(message, type) {
		var $messages = document.getElementById('messages');

		$messages.innerText = message;
		$messages.className = 'visible';

		setTimeout(function() {
			$messages.className = '';
		}, 2000);
	};

	CommonChars.prototype.i18nTranslate = function() {
		var $objects = document.getElementsByTagName('*');

		for(var i = 0; i < $objects.length; i++) {
			if ($objects[i].dataset && $objects[i].dataset.translate) {
				$objects[i].innerHTML = chrome.i18n.getMessage($objects[i].dataset.translate);
			}
		}
	}

	if (window.CommonChars === undefined) {
		window.CommonChars = new CommonChars();
	}
})();
