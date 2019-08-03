/*
 * Test for @file index.js
 */

// Local dependencies
const test = require('ava');
const a11yColor = require('.');

/*
 * CheckColor
 */
test('a11yColor: should return accessible foreground color if color is valid', t => {
	t.is(a11yColor('red', 'blue'), '#FFA3A3');
	t.is(a11yColor('green', 'blue'), '#00DA00');
	t.is(a11yColor('#c0c0c0', '#c0c0c0'), '#4F4F4F');
	t.is(a11yColor('#646464', '#E0E0E0'), '#636363');
	t.is(a11yColor('#c1c1c1', '#767676'), '#FEFEFE');
	t.is(a11yColor('rebeccapurple', 'cornflowerblue'), '#3F1F5E');
	t.is(a11yColor('#111', '#f00'), '#111111');
	t.is(a11yColor('#1111', '#f000'), '#111111');
	t.is(a11yColor('#f00000', '#111111'), '#F90000');
	t.is(a11yColor('rgb( 0, 0, 0 )', 'rgb( 100, 0, 0 )'), '#959595');
	t.is(a11yColor('rgba( 0, 0, 0, 1 )', 'rgba( 100, 100, 0, 1 )'), '#DBDBDB');
	t.is(a11yColor('rgb( 100%, 0%, 0% )', 'rgb( 100%, 0%, 0% )'), '#370000');
	t.is(
		a11yColor('rgba( 100%, 90%, 0%, 0.9 )', 'rgba( 0%, 5%, 0%, 0.9 )'),
		'#FFE500'
	);
	t.is(a11yColor('hsl( 120, 100%, 50% )', 'hsl( 60, 20%, 50% )'), '#003800');
	t.is(
		a11yColor('hsla( 120, 100%, 50%, 0.9 )', 'hsla( 60, 20%, 50%, 0.9 )'),
		'#003800'
	);
});

test('a11yColor: should take a ratio', t => {
	t.is(a11yColor('red', 'blue', 'large'), '#FF6666');
	t.is(a11yColor('red', 'blue', 'small'), '#FFA3A3');
	t.throws(() => a11yColor('red', 'blue', 'abc'));
});

test('a11yColor: should throw error if color is invalid', t => {
	t.throws(() => a11yColor('transparent', '#a'));
	t.throws(() => a11yColor('red', '890u091u0u'));
	t.throws(() => a11yColor('9u10u09u', 'red'));
	t.throws(() => a11yColor('#1', '#a'));
	t.throws(() => a11yColor('reeed', 'bluuu'));
	t.throws(() => a11yColor('#11', '#aa'));
	t.throws(() => a11yColor('#11111', '#aaaaa'));
	t.throws(() => a11yColor('#1zxy', '#zzzz'));
	t.throws(() =>
		a11yColor('rgba( 100%, 90%, 0%, 100% )', 'rgba( 100%, 90%, 0%, 10% )')
	);
	t.throws(() =>
		a11yColor('hsla( 120, 100%, 50%, 100% )', 'hsla( 120, 100%, 50%, 40% )')
	);
});
