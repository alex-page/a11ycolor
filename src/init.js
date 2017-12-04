/***************************************************************************************************************************************************************
 *
 * init.js
 *
 * Init - Start the A11yColor function
 *
 **************************************************************************************************************************************************************/


'use strict';


// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
import { Log }       from './helper';
import { A11yColor } from './a11y';


// Check if the user is in verbose mode
if(process.argv.includes('-v') || process.argv.includes('--verbose')) {
	Log.verboseMode = true;
};


Log.welcome( `A11yColor - Generate the nearest accessible color` )


console.log( A11yColor( 'red', 'blue' ) );
console.log( A11yColor( 'white', 'black' ) );
