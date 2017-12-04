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
import { Log }                              from './helper';
import { 
	CheckColor, 
	GetHsl, 
	GetHex, 
	GetContrast 
}  from './color';


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
export const A11yColor = (
	toMakeA11y, 
	background, 
	ratioKey = 'small', 
	steps = 0.1
) => {
	Log.verbose( `Running A11yColor()` );

	const ratios = {
		'large': 3,
		'small': 4.5,
	};

	if( !CheckColor( toMakeA11y ) || !CheckColor( background ) ) {
		reject( `Foreground and Background must be a valid CSS colour` );
	}

	if ( ratioKey != 'small' && ratioKey != 'large' ) {
		reject( `Only takes 'small' or 'large' for the ratio` );
	}

	if ( typeof steps !== 'number' ) {
		reject( `Steps must be a number` );
	}

	if ( steps >= 100 || steps < 0.1 ) {
		reject( `Only takes a number between 0.1 and 100 for the steps` );
	}

	const ratio = ratios[ ratioKey ];

	let currentRatio = GetContrast( toMakeA11y, background );

	let colorLighter = GetHsl( toMakeA11y );  // We have to scope those variables outside the loop
	let colorDarker  = GetHsl( toMakeA11y );  // so that we have access to them after the loop finished  
	let ratioLighter = currentRatio;          // doing it for all of them
	let ratioDarker  = currentRatio;          // just ever so slightly boring :)

	// Check the ratio straight away
	if ( currentRatio >= ratio ) {
		return GetHex( toMakeA11y );
	}

	let i = 1;
	while ( ( ratioLighter < ratio || ratioDarker < ratio ) && i < 101 ) {

		colorLighter.color[ 2 ] += 1; // then we lighten a new color
		colorDarker.color[ 2 ]  -= 1;  // and darken another

		ratioLighter = GetContrast( colorLighter, background ); // now we assign the new ratios; the loop will break
		ratioDarker  = GetContrast( colorDarker,  background ); // when one of these is beyond the defined ration

		i = i + steps; // iterate by increasing our step

		if ( ratioLighter >= ratio ) {
			return GetHex( colorLighter );
		}
		else if ( ratioDarker >= ratio ) {
			return GetHex( colorDarker );
		}
	}
}
