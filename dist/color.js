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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetContrast = exports.GetHex = exports.GetHsl = exports.CheckColor = undefined;

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CheckColor - Check the value is a valid color
 *
 * @param  {string}  color - The color to check if it's valid
 *
 * @return {boolean}       - True or false (if it is a color or not)
 */
var CheckColor = exports.CheckColor = function CheckColor(color) {
  if (color === 'transparent') {
    return false;
  }
  try {
    (0, _color2.default)(color);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * GetHsl - Return the HSL value for a color
 *
 * @param  {string} color - The color to be converted to HSL
 *
 * @return {object}       - The Color module HSL object
 */
var GetHsl = exports.GetHsl = function GetHsl(color) {
  var hsl = void 0;
  try {
    hsl = (0, _color2.default)(color).hsl();
    return hsl;
  } catch (error) {
    throw error;
  }
};

/**
 * GetHex - Return the Hex value for a color
 *
 * @param  {string} color - The color to be converted to Hex
 *
 * @return {string}       - The Color module Hex object
 */
var GetHex = exports.GetHex = function GetHex(color) {
  var hex = void 0;
  try {
    hex = (0, _color2.default)(color).hex();
    return hex;
  } catch (error) {
    throw error;
  }
};

/**
 * GetContrast - Get the contrast between two colors
 *
 * @param  {string} foreground - The foreground color
 * @param  {string} background - The background color
 *
 * @return {number}            - The contrast ratio of the foreground on the background
 */
var GetContrast = exports.GetContrast = function GetContrast(foreground, background) {
  var contrast = void 0;
  try {
    contrast = (0, _color2.default)(foreground).contrast((0, _color2.default)(background));
    return contrast;
  } catch (error) {
    throw error;
  }
};