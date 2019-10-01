/*
 * CheckColor  - Check the value is a valid color
 * A11yColor   - Find the nearest accessible color
 */

// Dependencies
const color = require('color');

/**
 * Check the value is a valid color
 *
 * @param  {string}  colorValue - The color to check if it's valid
 *
 * @return {boolean}       - True or false (if it is a color or not)
 */
const checkColor = colorValue => {
	if (colorValue === 'transparent') {
		return false;
	}

	color(colorValue);

	try {
		color(colorValue);
		return true;
	} catch (error) {
		return false;
	}
};

/**
 * Find the nearest accessible color
 *
 * @param  {string} toMakeA11y      - The color that is to be changed
 * @param  {string} background      - The background color to for the contrast
 * @param  {string} minimumContrast - The WCAG 2.1 contrast ratio
 *
 * @return {string}            - The closest hex color for `toMakeA11y` on `background`
 */
const a11yColor = (toMakeA11y, background, minimumContrast = 4.5) => {
	if (!checkColor(toMakeA11y) || !checkColor(background)) {
		throw new Error('Foreground and Background must be a valid CSS colour');
	}

	if (typeof minimumContrast !== 'number' && minimumContrast < 0 && minimumContrast > 21) {
		throw new Error(
			`Minimum contrast must be a number between 0 and 21. It was ${minimumContrast}`
		);
	}

	// Variables needed to check ratio
	const a11y = color(toMakeA11y);
	const bg = color(background);

	// Check the ratio straight away, if it passes return the value as hex
	if (a11y.contrast(bg) >= minimumContrast) {
		return a11y.hex();
	}

	// Ratio didn't pass so we need to find the nearest color
	const a11yHSL = a11y.hsl();
	const a11yLightness = a11yHSL.color[2];
	const minHexDiff = 100 / 255; // 255 Colors / 100% HSL

	const isBlackBgContrast = bg.contrast(color('#000')) >= minimumContrast;
	const isWhiteBgContrast = bg.contrast(color('#FFF')) >= minimumContrast;
	let minLightness = 0;
	let maxLightness = 100;
	let isDarkColor = false;

	// If black and white both pass on the background
	if (isBlackBgContrast && isWhiteBgContrast) {
		// Change the min lightness if the color is light
		if (a11yLightness >= 50) {
			minLightness = a11yLightness;
		} else {
			// Change the max lightness if the color is dark
			maxLightness = a11yLightness;
			isDarkColor = true;
		}
	} else if (isBlackBgContrast) {
		// If our colour passes contrast on black
		maxLightness = a11yLightness;
		isDarkColor = true;
	} else {
		// Colour doesn't meet contrast pass on black
		minLightness = a11yLightness;
	}

	// The colour to return
	let foundColor;

	// Binary search until we find the colour that meets contrast
	while (!foundColor) {
		const midLightness = (minLightness + maxLightness) / 2;
		const midA11y = color({
			h: a11y.hsl().color[0],
			s: a11y.hsl().color[1],
			l: midLightness
		});

		// The colour meets contrast
		if (color(midA11y.hex()).contrast(bg) >= minimumContrast) {
			// It is the minimal lightness range for one hexadecimal
			if (maxLightness - minLightness <= minHexDiff) {
				foundColor = midA11y.hex();
			} else if (isDarkColor) {
				// If it is going to be a dark color move the min to mid
				minLightness = midLightness;
			} else {
				// If it is going to be a light color move the max to mid
				maxLightness = midLightness;
			}
		} else if (isDarkColor) {
			// We do not meet minimum contrast if it is a dark color move max to mid
			maxLightness = midLightness;
		} else {
			// If it is a light color move min to mid
			minLightness = midLightness;
		}
	}

	return foundColor;
};

module.exports = a11yColor;
