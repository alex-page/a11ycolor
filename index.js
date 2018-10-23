/**
 *
 * index.js
 *
 * CheckColor  - Check the value is a valid color
 * A11yColor   - Find the nearest accessible color
 *
 */


// ----------------
// Dependencies
// ----------------
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
};


/**
 * A11yColor - Find the nearest accessible color
 *
 * @param  {string} toMakeA11y - The color that is to be changed
 * @param  {string} background - The background color to for the contrast
 * @param  {string} ratioKey   - The keyword 'small' or 'large' to set the WCAG 2.1 contrast ration or 3.0 or 4.5
 *
 * @return {string}            - The closest hex color for `toMakeA11y` on `background`
 */
const A11yColor = ( toMakeA11y, background, ratioKey = 'small' ) => {
	const ratios = {
		large: 3,
		small: 4.5,
	};

	if( !CheckColor( toMakeA11y ) || !CheckColor( background ) ) {
		throw new Error( 'Foreground and Background must be a valid CSS colour' );
	}

	if( ratioKey !== 'small' && ratioKey !== 'large' ) {
		throw new Error( 'Only takes "small" or "large" for the ratio' );
	}

	// Variables needed to check ratio
	const ratio = ratios[ ratioKey ];
	const a11y = Color( toMakeA11y );
	const bg = Color( background );

	// Check the ratio straight away, if it passes return the value as hex
	if( a11y.contrast( bg ) >= ratio ) {
		return a11y.hex();
	}


	// Ratio didn't pass so we need to find the nearest color
	const a11yHSL = a11y.hsl();
	const a11yLightness = a11yHSL.color[ 2 ];
	const minHexDiff = 100 / 255; // 255 Colors / 100% HSL

	const isBlackBgContrast = bg.contrast( Color( '#000' ) ) >= ratio;
	const isWhiteBgContrast = bg.contrast( Color( '#FFF' ) ) >= ratio;
	let minLightness = 0;
	let maxLightness = 100;
	let isDarkColor = false;

	// If black and white both pass on the background
	if( isBlackBgContrast && isWhiteBgContrast ) {
		// Change the min lightness if the color is light
		if( a11yLightness >= 50 ) {
			minLightness = a11yLightness;
		}
		// Change the max lightness if the color is dark
		else {
			maxLightness = a11yLightness;
			isDarkColor = true;
		}
	}
	// If our colour passes contrast on black
	else if( isBlackBgContrast ) {
		maxLightness = a11yLightness;
		isDarkColor = true;
	}
	// Colour doesn't meet contrast pass on black
	else {
		minLightness = a11yLightness;
	}

	// The colour to return
	let foundColor;

	// Binary search until we find the colour that meets contrast
	while( !foundColor ) {
		const midLightness = ( minLightness + maxLightness ) / 2;
		const midA11y = Color({
			h: a11y.hsl().color[ 0 ],
			s: a11y.hsl().color[ 1 ],
			l: midLightness,
		});


		// The colour meets contrast
		if( Color( midA11y.hex() ).contrast( bg ) >= ratio ) {
			// It is the minimal lightness range for one hexadecimal
			if( maxLightness - minLightness <= minHexDiff ) {
				foundColor = midA11y.hex();
			}
			// If it is going to be a dark color move the min to mid
			else if( isDarkColor ) {
				minLightness = midLightness;
			}
			// If it is going to be a light color move the max to mid
			else {
				maxLightness = midLightness;
			}
		}
		// We do not meet minimum contrast if it is a dark color move max to mid
		else if( isDarkColor ) {
			maxLightness = midLightness;
		}
		// If it is a light color move min to mid
		else {
			minLightness = midLightness;
		}
	}

	return foundColor;
};

module.exports = A11yColor;
