/***************************************************************************************************************************************************************
 *
 * index.js unit tests
 *
 * @file index.js
 *
 * Tested methods:
 * - A11yColor
 * - CheckColor
 * - GetHsl
 * - GetHex
 * - GetContrast
 *
 **************************************************************************************************************************************************************/


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
import test from 'ava';
import A11yColor from '.';


/***************************************************************************************************************************************************************
 * CheckColor
 **************************************************************************************************************************************************************/
test( 'A11yColor: should return accessible foreground color if color is valid', t => {
	t.is( A11yColor( 'red', 'blue' ), '#FFA3A3' );
	t.is( A11yColor( 'rebeccapurple', 'cornflowerblue' ), '#3D1F5C' );
	t.is( A11yColor( '#111', '#f00' ), '#111111' );
	t.is( A11yColor( '#1111', '#f000' ), '#111111' );
	t.is( A11yColor( '#f00000', '#111111' ), '#FA0000' );
	t.is( A11yColor( 'rgb( 0, 0, 0 )', 'rgb( 100, 0, 0 )' ), '#969696' );
	t.is( A11yColor( 'rgba( 0, 0, 0, 1 )', 'rgba( 100, 100, 0, 1 )' ), '#DBDBDB' );
	t.is( A11yColor( 'rgb( 100%, 0%, 0% )', 'rgb( 100%, 0%, 0% )' ), '#330000' );
	t.is( A11yColor( 'rgba( 100%, 90%, 0%, 0.9 )', 'rgba( 0%, 5%, 0%, 0.9 )' ), '#FFE500' );
	t.is( A11yColor( 'hsl( 120, 100%, 50% )', 'hsl( 60, 20%, 50% )' ), '#003800' );
	t.is( A11yColor( 'hsla( 120, 100%, 50%, 0.9 )', 'hsla( 60, 20%, 50%, 0.9 )' ), '#003800' );
});


test( 'A11yColor: should take a ratio', t => {
	t.is( A11yColor( 'red', 'blue', 'large' ), '#FF6666' );
	t.is( A11yColor( 'red', 'blue', 'small' ), '#FFA3A3' );
	t.throws( () => A11yColor( 'red', 'blue', 'abc' ) );
});


test( 'A11yColor: should take a steps', t => {
	t.is( A11yColor( 'red', 'blue', 'small', 3 ), '#FFA3A3' );
	t.is( A11yColor( 'red', 'blue', 'small', 0.5 ), '#FFA3A3' );
	t.throws( () => A11yColor( 'red', 'blue', 'small', true ) );
	t.throws( () => A11yColor( 'red', 'blue', 'small', 0 ) );
	t.throws( () => A11yColor( 'red', 'blue', 'large', 20 ) );
	t.throws( () => A11yColor( 'red', 'blue', 'small', 100 ) );
});


test( 'A11yColor: should throw error if color is invalid', t => {
	t.throws( () => A11yColor( 'transparent', '#a' ) );
	t.throws( () => A11yColor( '#1', '#a' ) );
	t.throws( () => A11yColor( 'reeed', 'bluuu' ) );
	t.throws( () => A11yColor( '#11', '#aa' ) );
	t.throws( () => A11yColor( '#11111', '#aaaaa' ) );
	t.throws( () => A11yColor( '#1zxy', '#zzzz' ) );
	t.throws( () => A11yColor( 'rgba( 100%, 90%, 0%, 100% )', 'rgba( 100%, 90%, 0%, 10% )' ) );
	t.throws( () => A11yColor( 'hsla( 120, 100%, 50%, 100% )', 'hsla( 120, 100%, 50%, 40% )' ) );
});
