/***************************************************************************************************************************************************************
 *
 * a11y.js
 *
 * A11yColor - Find the nearest accessible color
 *
 **************************************************************************************************************************************************************/

'use strict';

// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.A11yColor = undefined;

var _helper = require('./helper');

var _color = require('./color');

/**
 * A11yColor - Find the nearest accessible color
 * 
 * @param  {string} toMakeA11y - The color that is to be changed
 * @param  {string} background - The background color to for the contrast
 * @param  {string} ratioKey   - The keyword 'small' or 'large' to set the WCAG 2.1 contrast ration or 3.0 or 4.5
 * @param  {number} steps      - The step size our function is searching for a new color in. The bigger the number the faster the process the rougher the found color.
 * 
 * @return {string}            - The closest color to `toMakeA11y` on the `background` that is accessible
 */
var A11yColor = exports.A11yColor = function A11yColor(toMakeA11y, background) {
	var ratioKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'small';
	var steps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.1;

	_helper.Log.verbose('Running A11yColor()');

	var ratios = {
		'large': 3,
		'small': 4.5
	};

	if (!(0, _color.CheckColor)(toMakeA11y) || !(0, _color.CheckColor)(background)) {
		reject('Foreground and Background must be a valid CSS colour');
	}

	if (ratioKey != 'small' && ratioKey != 'large') {
		reject('Only takes \'small\' or \'large\' for the ratio');
	}

	if (typeof steps !== 'number') {
		reject('Steps must be a number');
	}

	if (steps >= 100 || steps < 0.1) {
		reject('Only takes a number between 0.1 and 100 for the steps');
	}

	var ratio = ratios[ratioKey];

	var currentRatio = (0, _color.GetContrast)(toMakeA11y, background);

	var colorLighter = (0, _color.GetHsl)(toMakeA11y); // We have to scope those variables outside the loop
	var colorDarker = (0, _color.GetHsl)(toMakeA11y); // so that we have access to them after the loop finished  
	var ratioLighter = currentRatio; // doing it for all of them
	var ratioDarker = currentRatio; // just ever so slightly boring :)

	// Check the ratio straight away
	if (currentRatio >= ratio) {
		return (0, _color.GetHex)(toMakeA11y);
	}

	var i = 1;
	while ((ratioLighter < ratio || ratioDarker < ratio) && i < 101) {

		colorLighter.color[2] += 1; // then we lighten a new color
		colorDarker.color[2] -= 1; // and darken another

		ratioLighter = (0, _color.GetContrast)(colorLighter, background); // now we assign the new ratios; the loop will break
		ratioDarker = (0, _color.GetContrast)(colorDarker, background); // when one of these is beyond the defined ration

		i = i + steps; // iterate by increasing our step

		if (ratioLighter >= ratio) {
			return (0, _color.GetHex)(colorLighter);
		} else if (ratioDarker >= ratio) {
			return (0, _color.GetHex)(colorDarker);
		}
	}
};