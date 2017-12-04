/***************************************************************************************************************************************************************
 *
 * color.js
 *
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
import Color from 'color';


/**
 * CheckColor - Check the value is a valid color
 *
 * @param  {string}  color - The color to check if it's valid
 *
 * @return {boolean}       - True or false (if it is a color or not)
 */
export const CheckColor = ( color ) => {
	try {
		Color( color );
		return true;
	}
	catch( error ) {
		return false;
	}
}


/**
 * GetHsl - Return the HSL value for a color
 *
 * @param  {string} color - The color to be converted to HSL
 *
 * @return {object}       - The Color module HSL object
 */
export const GetHsl = ( color ) => {
	let hsl;
	try {
		hsl = Color( color ).hsl();
		return hsl;
	}
	catch( error ) {
		throw error;
	}
}


/**
 * GetHex - Return the Hex value for a color
 *
 * @param  {string} color - The color to be converted to Hex
 *
 * @return {string}       - The Color module Hex object
 */
export const GetHex = ( color ) => {
	let hex;
	try {
		hex = Color( color ).hex();
		return hex;
	}
	catch( error ) {
		throw error;
	}
}


/**
 * GetContrast - Get the contrast between two colors
 *
 * @param  {string} foreground - The foreground color
 * @param  {string} background - The background color
 *
 * @return {number}            - The contrast ratio of the foreground on the background
 */
export const GetContrast = ( foreground, background ) => {
	let contrast;
	try {
		contrast = Color( foreground ).contrast( Color( background ) );
		return contrast;
	}
	catch( error ) {
		throw error;
	}
}
