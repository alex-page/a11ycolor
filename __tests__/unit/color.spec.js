/***************************************************************************************************************************************************************
 *
 * color.js unit tests
 *
 * @file src/color.js
 *
 * Tested methods:
 * - CheckColor
 * - GetHsl
 * - GetHex
 * - GetContrast
 *
 **************************************************************************************************************************************************************/


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
import { CheckColor, GetHsl, GetHex, GetContrast }  from '../../src/color';


/***************************************************************************************************************************************************************
 * CheckColor
 **************************************************************************************************************************************************************/
test( 'CheckColor: should return true if color is valid', () => {
	expect( CheckColor( 'red' ) ).toBe( true );
	expect( CheckColor( 'rebeccapurple' ) ).toBe( true );
	expect( CheckColor( '#111' ) ).toBe( true );
	expect( CheckColor( '#1111' ) ).toBe( true );
	expect( CheckColor( '#f00000' ) ).toBe( true );
	expect( CheckColor( 'rgb( 0, 0, 0 )' ) ).toBe( true );
	expect( CheckColor( 'rgba( 0, 0, 0, 1 )' ) ).toBe( true );
	expect( CheckColor( 'rgb( 100%, 0%, 0% )' ) ).toBe( true );
	expect( CheckColor( 'rgba( 100%, 90%, 0%, 0.9 )' ) ).toBe( true );
	expect( CheckColor( 'hsl( 120, 100%, 50% )' ) ).toBe( true );
	expect( CheckColor( 'hsla( 120, 100%, 50%, 0.9 )' ) ).toBe( true );
});


test( 'CheckColor: should return false if color is invalid', () => {
	expect( CheckColor( 'transparent' ) ).toBe( false );
	expect( CheckColor( 'reeed' ) ).toBe( false );
	expect( CheckColor( '#1' ) ).toBe( false );
	expect( CheckColor( '#11' ) ).toBe( false );
	expect( CheckColor( '#11111' ) ).toBe( false );
	expect( CheckColor( '#1zxy' ) ).toBe( false );
	expect( CheckColor( 'rgba( 100%, 90%, 0%, 100% )' ) ).toBe( false );
	expect( CheckColor( 'hsla( 120, 100%, 50%, 100% )' ) ).toBe( false );
});


/***************************************************************************************************************************************************************
 * GetHSL
 **************************************************************************************************************************************************************/
test( 'GetHsl: should return HSL if color is valid', () => {
	expect( GetHsl( 'red' ).color ).toEqual( [ 0, 100, 50 ] );
	expect( GetHsl( 'rebeccapurple' ).color ).toEqual( [ 270, 49.99999999999999, 40 ] );
	expect( GetHsl( '#111' ).color ).toEqual( [ 0, 0, 6.666666666666667 ] );
	expect( GetHsl( '#1111' ).color ).toEqual( [ 0, 0, 6.666666666666667 ] );
	expect( GetHsl( '#f00000' ).color ).toEqual( [ 0, 100, 47.05882352941176 ] );
	expect( GetHsl( 'rgb( 0, 0, 0 )' ).color ).toEqual( [ 0, 0, 0 ] );
	expect( GetHsl( 'rgba( 0, 0, 0, 1 )' ).color ).toEqual( [ 0, 0, 0 ] );
	expect( GetHsl( 'rgb( 100%, 0%, 0% )' ).color ).toEqual( [ 0, 100, 50 ] );
	expect( GetHsl( 'rgba( 100%, 90%, 0%, 0.9 )' ).color ).toEqual( [ 53.882352941176464, 100, 50 ] );
	expect( GetHsl( 'hsl( 120, 100%, 50% )' ).color ).toEqual( [ 120, 100, 50 ] );
	expect( GetHsl( 'hsla( 120, 100%, 50%, 0.9 )' ).color ).toEqual( [ 120, 100, 50 ] );
});

test( 'GetHsl: should throw error if color is invalid', () => {
	expect( () => GetHsl( '#1' ) ).toThrow();
	expect( () => GetHsl( 'reeed' ) ).toThrow();
	expect( () => GetHsl( '#11' ) ).toThrow();
	expect( () => GetHsl( '#11111' ) ).toThrow();
	expect( () => GetHsl( '#1zxy' ) ).toThrow();
	expect( () => GetHsl( 'rgba( 100%, 90%, 0%, 100% )' ) ).toThrow();
	expect( () => GetHsl( 'hsla( 120, 100%, 50%, 100% )' ) ).toThrow();
});


/***************************************************************************************************************************************************************
 * GetHex
 **************************************************************************************************************************************************************/
test( 'GetHex: should return Hex if color is valid', () => {
	expect( GetHex( 'red' ) ).toBe( '#FF0000' );
	expect( GetHex( 'rebeccapurple' ) ).toBe( '#663399' );
	expect( GetHex( '#111' ) ).toBe( '#111111' );
	expect( GetHex( '#1111' ) ).toBe( '#111111' );
	expect( GetHex( '#f00000' ) ).toBe( '#F00000' );
	expect( GetHex( 'rgb( 0, 0, 0 )' ) ).toBe( '#000000' );
	expect( GetHex( 'rgba( 0, 0, 0, 1 )' ) ).toBe( '#000000' );
	expect( GetHex( 'rgb( 100%, 0%, 0% )' ) ).toBe( '#FF0000' );
	expect( GetHex( 'rgba( 100%, 90%, 0%, 0.9 )' ) ).toBe( '#FFE500' );
	expect( GetHex( 'hsl( 120, 100%, 50% )' ) ).toBe( '#00FF00' );
	expect( GetHex( 'hsla( 120, 100%, 50%, 0.9 )' ) ).toBe( '#00FF00' );
});

test( 'GetHex: should throw error if color is invalid', () => {
	expect( () => GetHex( '#1' ) ).toThrow();
	expect( () => GetHex( 'reeed' ) ).toThrow();
	expect( () => GetHex( '#11' ) ).toThrow();
	expect( () => GetHex( '#11111' ) ).toThrow();
	expect( () => GetHex( '#1zxy' ) ).toThrow();
	expect( () => GetHex( 'rgba( 100%, 90%, 0%, 100% )' ) ).toThrow();
	expect( () => GetHex( 'hsla( 120, 100%, 50%, 100% )' ) ).toThrow();
});


/***************************************************************************************************************************************************************
 * GetContrast
 **************************************************************************************************************************************************************/
test( 'GetContrast: should return Hex if color is valid', () => {
	expect( GetContrast( 'red', 'blue' ) ).toBe( 2.148936170212766 );
	expect( GetContrast( 'rebeccapurple', 'cornflowerblue' ) ).toBe( 2.8272236199273584 );
	expect( GetContrast( '#111', '#f00' ) ).toBe( 4.722563627907282 );
	expect( GetContrast( '#1111', '#f000' ) ).toBe( 4.722563627907282 );
	expect( GetContrast( '#f00000', '#111111' ) ).toBe( 4.230752498454998 );
	expect( GetContrast( 'rgb( 0, 0, 0 )', 'rgb( 100, 0, 0 )' ) ).toBe( 1.541865017212373 );
	expect( GetContrast( 'rgba( 0, 0, 0, 1 )', 'rgba( 100, 100, 0, 1 )' ) ).toBe( 3.3647335981638737 );
	expect( GetContrast( 'rgb( 100%, 0%, 0% )', 'rgb( 100%, 0%, 0% )' ) ).toBe( 1 );
	expect( GetContrast( 'rgba( 100%, 90%, 0%, 0.9 )', 'rgba( 0%, 5%, 0%, 0.9 )' ) ).toBe( 15.563727733314128 );
	expect( GetContrast( 'hsl( 120, 100%, 50% )', 'hsl( 60, 20%, 50% )' ) ).toBe( 2.154638424744439 );
	expect( GetContrast( 'hsla( 120, 100%, 50%, 0.9 )', 'hsla( 60, 20%, 50%, 0.9 )' ) ).toBe( 2.154638424744439 );
});

test( 'GetContrast: should throw error if color is invalid', () => {
	expect( () => GetContrast( '#1', '#a' ) ).toThrow();
	expect( () => GetContrast( 'reeed', 'bluuu' ) ).toThrow();
	expect( () => GetContrast( '#11', '#aa' ) ).toThrow();
	expect( () => GetContrast( '#11111', '#aaaaa' ) ).toThrow();
	expect( () => GetContrast( '#1zxy', '#zzzz' ) ).toThrow();
	expect( () => GetContrast( 'rgba( 100%, 90%, 0%, 100% )', 'rgba( 100%, 90%, 0%, 10% )' ) ).toThrow();
	expect( () => GetContrast( 'hsla( 120, 100%, 50%, 100% )', 'hsla( 120, 100%, 50%, 40% )' ) ).toThrow();
});
