module.exports = {
	'normal': {
		_meta: {
			'tab': {key: '\t', text: 'Tab', width: 1, classes: 'control'},
			'shift': {keySet: 'shifted', text: 'Shift', width: 2, classes: 'control'},
			'shiftr': {keySet: 'shifted', text: 'Shift', width: 1, classes: 'control'},
			'caps': {keySet: 'capsed', text: 'Caps lock', width: 1, classes: 'control'},
			'space': {key: ' ', text: 'Space', width: 2},
			'enter': {key: '\r\n', text: 'Enter', width: 2, classes: 'control'},
			'backspace': {func: 'backspace', classes: 'control backspace', width: 1},
			'accept': {func: 'accept', text: 'Close', classes: 'control featured'},
			'next': {func: 'next', text: 'Next', classes: 'control featured'}
		},

		default: [
			'` 1 2 3 4 5 6 7 8 9 0 - =',
			'q w e r t y u i o p [ ] \\',
			'a s d f g h j k l ; \' {enter}',
			'{shift} z x c v b n m , . /',
			'{space} {backspace} {next}'
		],
		shifted: [
			'~ ! @ # $ % ^ & * ( ) _ +',
			'Q W E R T Y U I O P { } |', // {tab}
			'A S D F G H J K L : \' {enter}', // {caps}
			'{shift} Z X C V B N M < > ?', // {shiftr}
			'{space} {backspace} {next}'
		],

		capsed: [
			'` 1 2 3 4 5 6 7 8 9 0 - =',
			'Q W E R T Y U I O P [ ] \\',
			'A S D F G H J K L ; \' {enter}',
			'{shift} Z X C V B N M , . / {backspace}',
			'{space} {backspace} {next}'
		]
	},

	'compact': {

		_meta: {
			'default': {keySet: 'default', text: 'abc', classes: 'control'},
			'alpha': {keySet: 'default', text: 'Abc', classes: 'control'},
			'shift': {keySet: 'shifted', text: 'ABC', classes: 'control'},
			'numbers': {keySet: 'numbers', text: '123', classes: 'control'},
			'space': {key: ' ', text: 'Space', width: 2},
			'backspace': {func: 'backspace', classes: 'control'},
			'accept': {func: 'accept', text: 'Close', classes: 'control featured'},
			'next': {func: 'next', text: 'Next', classes: 'featured'},
			'zero': {key: '0'}
		},

		default: [
			'q w e r t y u i o p',
			' a s d f g h j k l ',
			'{shift} z x c v b n m {backspace}',
			'{numbers} , {space} . {next}' // {accept}
		],

		shifted: [
			'Q W E R T Y U I O P',
			' A S D F G H J K L ',
			'{default} Z X C V B N M ',
			'{numbers} _ {space} {backspace} {next}'
		],

		numbers: [
			'1 2 3',
			'4 5 6',
			'7 8 9',
			'  {alpha} . {zero} {backspace} {next}'
		]
	},

	'numeric': {

		_meta: {
			'backspace': {func: 'backspace', classes: 'control'},
			'accept': {func: 'accept', text: 'Close', classes: 'control featured'},
			'next': {func: 'next', text: 'Next', classes: 'control featured'},
			'zero': {key: '0'}
		},

		default: [
			'1 2 3',
			'4 5 6',
			'7 8 9',
			'. {zero} {backspace} {next}'
		]
	}
};
