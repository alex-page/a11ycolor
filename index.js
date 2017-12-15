/***************************************************************************************************************************************************************
*
* index.js
*
* A11yColor - Find the nearest accessible color
* CheckColor  - Check the value is a valid color
* GetHsl      - Return the HSL value for a color
* GetHex      - Return the Hex value for a color
* GetContrast - Get the contrast between two colors
*
**************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const Color = require( 'color' );


/**
 * CheckColor - Check the value is a valid color
 *
 * @param  {string}  color - The color to check if it's valid
 *
 * @return {boolean}       - True or false (if it is a color or not)
 */
const CheckColor = ( color ) => {
	if( color === 'transparent' ) {
		return false;
	}
	try {
		Color( color );
		return true;
	}
	catch( error ) {
		return false;
	}
}


/**
 * A11yColor - Find the nearest accessible color
 *
 * @param  {string} toMakeA11y - The color that is to be changed
 * @param  {string} background - The background color to for the contrast
 * @param  {string} ratioKey   - The keyword 'small' or 'large' to set the WCAG 2.1 contrast ration or 3.0 or 4.5
 * @param  {number} steps      - The step size our function is searching for a new color in. The bigger the number the faster the process the rougher the found color.
 *
 * @return {string}            - The closest hexadecimal color for `toMakeA11y` on `background` to meet contrast requirements
 */
const A11yColor = ( toMakeA11y, background, ratioKey = 'small', steps = 0.1 ) => {

	const ratios = {
		'large': 3,
		'small': 4.5,
	};

	if( !CheckColor( toMakeA11y ) || !CheckColor( background ) ) {
		throw new Error( `Foreground and Background must be a valid CSS colour` );
	}

	if ( ratioKey != 'small' && ratioKey != 'large' ) {
		throw new Error( `Only takes 'small' or 'large' for the ratio` );
	}

	if ( typeof steps !== 'number' ) {
		throw new Error( `Steps must be a number` );
	}

	if ( steps >= 100 || steps < 0.1 ) {
		throw new Error( `Only takes a number between 0.1 and 100 for the steps` );
	}

	const ratio      = ratios[ ratioKey ];                                   // Get the ratio from the ratios object
	let currentRatio = Color( toMakeA11y ).contrast( Color( background ) );  // Get the current contrast

	// Check the ratio straight away, if it passes return the value as hex
	if ( currentRatio >= ratio ) {
		return Color( toMakeA11y ).hex();
	}

	// Set the initial variables
	let ratioLighter = currentRatio;          // doing it for all of them
	let ratioDarker  = currentRatio;          // just ever so slightly boring :)

	// Iterate until we find a valid color
	let i = 0;
	while ( ( ratioLighter < ratio || ratioDarker < ratio ) && i < 100 ) {

		let colorLighter = Color( toMakeA11y ).hsl();
		let colorDarker  = Color( toMakeA11y ).hsl();

		i = i + steps;                 // iterate by increasing our step

		colorLighter.color[ 2 ] += i;  // then we lighten a new color
		colorDarker.color[ 2 ]  -= i;  // and darken another

		// Reset the HSL so we only compare the hex values
		colorLighter = Color( colorLighter ).hex();
		colorDarker =  Color( colorDarker ).hex();

		ratioLighter = Color( colorLighter ).contrast( Color( background ) ); // now we assign the new ratios; the loop will break
		ratioDarker  = Color( colorDarker ).contrast( Color( background ) );  // when one of these is beyond the defined ration

		// Only return if the ratio is accessible
		if ( ratioLighter >= ratio ) {
			return Color( colorLighter ).hex();
		}
		else if ( ratioDarker >= ratio ) {
			return Color( colorDarker ).hex();
		}
	}

	throw new Error( 'Color cannot be found with current settings' );
}

module.exports = A11yColor;
