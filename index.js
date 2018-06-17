/**
 *
 * index.js
 *
 * A11yColor - Find the nearest accessible color
 * CheckColor  - Check the value is a valid color
 * GetHsl      - Return the HSL value for a color
 * GetHex      - Return the Hex value for a color
 * GetContrast - Get the contrast between two colors
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
	const bgLightness = bg.hsl().color[ 2 ];
	const minHexDiff = 0.39215686274;
	let minLightness = 0;
	let maxLightness = 100;


	// If our colour passes contrast on the background colours lightness
	if( bg.contrast( Color({
		h: a11yHSL.color[ 0 ],
		s: a11yHSL.color[ 1 ],
		l: bgLightness,
	}) ) >= ratio ) {
		minLightness = a11yLightness;
		maxLightness = bgLightness;
	}
	// If our colour passes contrast on black
	else if( bg.contrast( Color( '#000' ) ) >= ratio ) {
		maxLightness = a11yLightness > bgLightness
			? bgLightness
			: a11yLightness;
	}
	// Colour doesn't meet contrast pass on black
	else {
		minLightness = a11yLightness > bgLightness
			? a11yLightness
			: bgLightness;
	}

	// If the minimum lightness is 100 then we need to move in a positive direction
	const direction = minLightness !== 0;

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

		// If we meet contrast
		if( Color( midA11y.hex() ).contrast( bg ) > ratio ) {
			// The colour is in the minimal lightness range for one hexadecimal
			if(	maxLightness - minLightness < minHexDiff ) {
				foundColor = midA11y.hex();
			}

			if( direction ) {
				maxLightness = midLightness;
			}
			else {
				minLightness = midLightness;
			}
		}
		// We don't meet contrast
		else if( direction ) {
			minLightness = midLightness;
		}
		else {
			maxLightness = midLightness;
		}
	}

	return foundColor;
};

module.exports = A11yColor;
