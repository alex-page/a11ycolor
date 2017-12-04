/***************************************************************************************************************************************************************
 *
 * Helper functions for use across the system
 *
 * Style - Returning ansi escape color codes
 * Log   - A logging object for logging prettiness
 *
 **************************************************************************************************************************************************************/

'use strict';

/**
 * Style - Returning ansi escape color codes
 * Credit to: https://github.com/chalk/ansi-styles
 *
 * @type {Object}
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Style = exports.Style = {

	/**
  * Parse ansi code while making sure we can nest colors
  *
  * @param   {string} text  - The text to be enclosed with an ansi escape string
  * @param   {string} start - The color start code, defaults to the standard color reset code 39m
  * @param   {string} end   - The color end code
  *
  * @returns {string}       - The escaped text
  */
	parse: function parse(text, start) {
		var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '39m';

		if (text !== undefined) {
			var replace = new RegExp('\\u001b\\[' + end, 'g'); // find any resets so we can nest styles

			return '\x1B[' + start + text.toString().replace(replace, '\x1B[' + start) + '\x1B[' + end;
		} else {
			return '';
		}
	},

	/**
  * Style a string with ansi escape codes
  *
  * @param   {string} text - The string to be wrapped
  *
  * @returns {string}      - The string with opening and closing ansi escape color codes
  */
	black: function black(text) {
		return Style.parse(text, '30m');
	},
	red: function red(text) {
		return Style.parse(text, '31m');
	},
	green: function green(text) {
		return Style.parse(text, '32m');
	},
	yellow: function yellow(text) {
		return Style.parse(text, '33m');
	},
	blue: function blue(text) {
		return Style.parse(text, '34m');
	},
	magenta: function magenta(text) {
		return Style.parse(text, '35m');
	},
	cyan: function cyan(text) {
		return Style.parse(text, '36m');
	},
	white: function white(text) {
		return Style.parse(text, '37m');
	},
	gray: function gray(text) {
		return Style.parse(text, '90m');
	},
	bold: function bold(text) {
		return Style.parse(text, '1m', '22m');
	}

};

/**
 * A logging object for logging prettiness
 *
 * @type {Object}
 */
var Log = exports.Log = {
	verboseMode: false, // verbose flag


	/**
  * Log a message
  *
  * @param  {string}  text - The text you want to log
  */
	message: function message(text) {
		console.log(new Date().toJSON().slice(0, 19) + ' : ' + text);
	},

	/**
  * Log a welcome message
  *
  * @param  {string} text - The text you want to log
  */
	welcome: function welcome(text) {
		console.info(' \uD83C\uDF08\uD83C\uDF08\uD83C\uDF08        ' + Style.bold('' + text));
	},

	/**
  * Log an error
  *
  * @param  {string} text - The text you want to log with the error
  */
	error: function error(text) {
		console.error(' \uD83C\uDF08 \uD83C\uDF08        ' + Style.red('ERROR:   ' + text));
	},

	/**
  * Log some information
  *
  * @param  {string}  text - The text you want to log
  */
	info: function info(text) {
		console.info(' \uD83D\uDD14 \uD83C\uDF08        INFO:    ' + text);
	},

	/**
  * Log success
  *
  * @param  {string}  text - The text you want to log
  */
	ok: function ok(text) {
		console.info(' \u2714 \uD83C\uDF08        ' + Style.green('OK:      ' + text));
	},

	/**
  * Log the final message
  *
  * @param  {string}  text - The text you want to log
  */
	done: function done(text) {
		console.info(' \uD83D\uDE80 \uD83C\uDF08        ' + Style.green(Style.bold(text)));
	},

	/**
  * Log a verbose message
  *
  * @param  {string}  text - The text you want to log
  */
	verbose: function verbose(text) {
		if (Log.verboseMode) {
			console.info(' \uD83D\uDE4A \uD83C\uDF08        ' + Style.gray('VERBOSE: ' + text));
		}
	},

	/**
  * Add some space to the output
  */
	space: function space() {
		console.log('\n');
	}
};