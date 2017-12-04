/***************************************************************************************************************************************************************
 *
 * helper.js unit tests
 *
 * @file src/helper.js
 *
 * Tested methods:
 * - Log
 * - Style
 *
 **************************************************************************************************************************************************************/


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
import { Log, Style } from '../src/helper';


/***************************************************************************************************************************************************************
 * Log
 *
 * Log.message
 * Log.space
 * Log.info
 * Log.welcome
 * Log.ok
 * Log.done
 * Log.verbose
 * Log.verbose
 * Log.error
 **************************************************************************************************************************************************************/
test( 'Log.message: should be formatted correctly', () => {
	console.log = jest.fn();

	Log.message(`message test`);
	Log.message(`message test 2`);

	expect( console.log.mock.calls.length ).toBe( 2 );
	expect( console.log.mock.calls[0][0] ).toContain(`message test`);
	expect( console.log.mock.calls[1][0] ).toContain(`message test 2`);
});


test( 'Log.welcome: should be formatted correctly', () => {
	console.info = jest.fn();

	Log.welcome(`welcome test`);
	Log.welcome(`welcome test 2`);

	expect( console.info.mock.calls.length ).toBe( 2 );
	expect( console.info.mock.calls[0][0] ).toBe(` 🌈🌈🌈        \u001B[1mwelcome test\u001b[22m`);
	expect( console.info.mock.calls[1][0] ).toBe(` 🌈🌈🌈        \u001B[1mwelcome test 2\u001b[22m`);
});


test( 'Log.error: should be formatted correctly', () => {
	console.error = jest.fn();

	Log.error(`error test`);
	Log.error(`error test 2`);

	expect( console.error.mock.calls.length ).toBe( 2 );
	expect( console.error.mock.calls[0][0] ).toBe(` 🌈 🌈        \u001B[31mERROR:   error test\u001b[39m`);
	expect( console.error.mock.calls[1][0] ).toBe(` 🌈 🌈        \u001B[31mERROR:   error test 2\u001b[39m`);
});


test( 'Log.info: should be formatted correctly', () => {
	console.info = jest.fn();

	Log.info(`info test`);
	Log.info(`info test 2`);

	expect( console.info.mock.calls.length ).toBe( 2 );
	expect( console.info.mock.calls[0][0] ).toBe(` 🔔 🌈        INFO:    info test`);
	expect( console.info.mock.calls[1][0] ).toBe(` 🔔 🌈        INFO:    info test 2`);
});


test( 'Log.ok: should be formatted correctly', () => {
	console.info = jest.fn();

	Log.ok(`ok test`);
	Log.ok(`ok test 2`);

	expect( console.info.mock.calls.length ).toBe( 2 );
	expect( console.info.mock.calls[0][0] ).toBe(` ✔ 🌈        \u001B[32mOK:      ok test\u001b[39m`);
	expect( console.info.mock.calls[1][0] ).toBe(` ✔ 🌈        \u001B[32mOK:      ok test 2\u001b[39m`);
});


test( 'Log.done: should be formatted correctly', () => {
	console.info = jest.fn();

	Log.done(`done test`);
	Log.done(`done test 2`);

	expect( console.info.mock.calls.length ).toBe( 2 );
	expect( console.info.mock.calls[0][0] ).toBe(` 🚀 🌈        \u001B[32m\u001B[1mdone test\u001B[22m\u001b[39m`);
	expect( console.info.mock.calls[1][0] ).toBe(` 🚀 🌈        \u001B[32m\u001B[1mdone test 2\u001B[22m\u001b[39m`);
});


test( 'Log.verbose: should not print if verboseMode is false', () => {
	console.info = jest.fn();

	Log.verbose(`verbose test fail`);
	Log.verbose(`verbose test 2 fail`);
	expect( console.info.mock.calls.length ).toBe( 0 );
});


test( 'Log.verbose: should should be formatted correctly', () => {
	console.info = jest.fn();

	Log.verboseMode = true;
	Log.verbose(`verbose test`);
	Log.verbose(`verbose test 2`);

	expect( console.info.mock.calls.length ).toBe( 2 );
	expect( console.info.mock.calls[1][0] ).toBe(` 🙊 🌈        \u001B[90mVERBOSE: verbose test 2\u001b[39m`);
	expect( console.info.mock.calls[0][0] ).toBe(` 🙊 🌈        \u001B[90mVERBOSE: verbose test\u001b[39m`);
});


test( 'Log.space: should should be formatted correctly', () => {
	console.log = jest.fn();

	Log.space(`space test`);
	Log.space(`space test 2`);

	expect( console.log.mock.calls.length ).toBe( 2 );
	expect( console.log.mock.calls[0][0] ).toBe(`\n`);
	expect( console.log.mock.calls[1][0] ).toBe(`\n`);
});


/***************************************************************************************************************************************************************
 * Style
 *
 * Style.parse
 * Style.parse
 * Style.parse
 * Style.[color|bold]
 * Style.[color] nesting
 **************************************************************************************************************************************************************/
test( 'Style.parse - undefined argument should return empty string', () => {
	expect( Style.parse( undefined ) ).toBe('');
});


test( 'Style.parse - start and end ansi code is correctly added', () => {
	expect( Style.parse( 'TEST', '666m', '777m' ) ).toBe('\u001B[666mTEST\u001b[777m');
});


test( 'Style.parse - start and end ansi code can be nested', () => {
	expect( Style.parse( `TEST ${ Style.parse( 'SUBTEST', '666m', '777m' ) } STRING`, '666m', '777m' ) )
		.toBe('\u001B[666mTEST \u001B[666mSUBTEST\u001B[666m STRING\u001b[777m');
});


test( 'Style: function should return correct string and colour', () => {
	expect( Style.black('test black') ).toBe('\u001B[30mtest black\u001b[39m');
	expect( Style.red('test red') ).toBe('\u001B[31mtest red\u001b[39m');
	expect( Style.green('test green') ).toBe('\u001B[32mtest green\u001b[39m');
	expect( Style.yellow('test yellow') ).toBe('\u001B[33mtest yellow\u001b[39m');
	expect( Style.blue('test blue') ).toBe('\u001B[34mtest blue\u001b[39m');
	expect( Style.magenta('test magenta') ).toBe('\u001B[35mtest magenta\u001b[39m');
	expect( Style.cyan('test cyan') ).toBe('\u001B[36mtest cyan\u001b[39m');
	expect( Style.white('test white') ).toBe('\u001B[37mtest white\u001b[39m');
	expect( Style.gray('test gray') ).toBe('\u001B[90mtest gray\u001b[39m');
	expect( Style.bold('test bold') ).toBe('\u001B[1mtest bold\u001b[22m');
});


test('should be able to combine multiple strings of varying colours', () => {
	const test = Style.yellow(`yellow text ${ Style.green(`green text ${ Style.red(`red text`) } green text`) } yellow text`);

	expect( test ).toBe('\u001B[33myellow text \u001B[32mgreen text \u001B[31mred text\u001B[32m green text\u001B[33m yellow text\u001b[39m');
});
