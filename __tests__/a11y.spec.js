/***************************************************************************************************************************************************************
 *
 * a11y.js unit tests
 *
 * @file src/a11y.js
 *
 * Tested methods:
 * - A11yColor
 *
 **************************************************************************************************************************************************************/


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
const A11yColor = require( '../src/a11y' );


/***************************************************************************************************************************************************************
 * CheckColor
 **************************************************************************************************************************************************************/
test( 'A11yColor: should return accessible foreground color if color is valid', () => {
	expect( A11yColor( 'red', 'blue' ) ).toBe( '#FFA3A3' );
	expect( A11yColor( 'rebeccapurple', 'cornflowerblue' ) ).toBe( '#3D1F5C' );
	expect( A11yColor( '#111', '#f00' ) ).toBe( '#111111' );
	expect( A11yColor( '#1111', '#f000' ) ).toBe( '#111111' );
	expect( A11yColor( '#f00000', '#111111' ) ).toBe( '#FA0000' );
	expect( A11yColor( 'rgb( 0, 0, 0 )', 'rgb( 100, 0, 0 )' ) ).toBe( '#969696' );
	expect( A11yColor( 'rgba( 0, 0, 0, 1 )', 'rgba( 100, 100, 0, 1 )' ) ).toBe( '#DBDBDB' );
	expect( A11yColor( 'rgb( 100%, 0%, 0% )', 'rgb( 100%, 0%, 0% )' ) ).toBe( '#330000' );
	expect( A11yColor( 'rgba( 100%, 90%, 0%, 0.9 )', 'rgba( 0%, 5%, 0%, 0.9 )' ) ).toBe( '#FFE500' );
	expect( A11yColor( 'hsl( 120, 100%, 50% )', 'hsl( 60, 20%, 50% )' ) ).toBe( '#003800' );
	expect( A11yColor( 'hsla( 120, 100%, 50%, 0.9 )', 'hsla( 60, 20%, 50%, 0.9 )' ) ).toBe( '#003800' );
});


test( 'A11yColor: should take a ratio', () => {
	expect( A11yColor( 'red', 'blue', 'large' ) ).toBe( '#FF6666' );
	expect( A11yColor( 'red', 'blue', 'small' ) ).toBe( '#FFA3A3' );
	expect( () => A11yColor( 'red', 'blue', 'abc' ) ).toThrow();
});


test( 'A11yColor: should take a steps', () => {
	expect( A11yColor( 'red', 'blue', 'small', 3 ) ).toBe( '#FFA3A3' );
	expect( A11yColor( 'red', 'blue', 'small', 0.5 ) ).toBe( '#FFA3A3' );
	expect( () => A11yColor( 'red', 'blue', 'small', true ) ).toThrow();
	expect( () => A11yColor( 'red', 'blue', 'small', 0 ) ).toThrow();
	expect( () => A11yColor( 'red', 'blue', 'large', 20 ) ).toThrow();
	expect( () => A11yColor( 'red', 'blue', 'small', 100 ) ).toThrow();
});


test( 'A11yColor: should throw error if color is invalid', () => {
	expect( () => A11yColor( '#1', '#a' ) ).toThrow();
	expect( () => A11yColor( 'reeed', 'bluuu' ) ).toThrow();
	expect( () => A11yColor( '#11', '#aa' ) ).toThrow();
	expect( () => A11yColor( '#11111', '#aaaaa' ) ).toThrow();
	expect( () => A11yColor( '#1zxy', '#zzzz' ) ).toThrow();
	expect( () => A11yColor( 'rgba( 100%, 90%, 0%, 100% )', 'rgba( 100%, 90%, 0%, 10% )' ) ).toThrow();
	expect( () => A11yColor( 'hsla( 120, 100%, 50%, 100% )', 'hsla( 120, 100%, 50%, 40% )' ) ).toThrow();
});
