🌈 A11yColor   [![Build Status](https://travis-ci.org/alex-page/a11ycolor.svg?branch=master)](https://travis-ci.org/alex-page/a11ycolor)
==============

> Generate the nearest accessible color.


## Install

```console
$ npm install a11ycolor
```

## Usage

```js
const A11yColor = require( 'a11ycolor' );

A11yColor( red, blue ); // This returns #FFA3A3
```


## Parameters

The function `A11yColor` function takes three parameters:

```js
A11yColor( $toMakeA11y, $background, $ratioKey = 'small' );
```

1. `toMakeA11y` - The color that is to be made accessible on the background
1. `background` - The background color to for the contrast
1. `ratioKey`   - The keyword 'small' ( 4.5 ) or 'large' ( 3.0 ) for the WCAG 2.1 contrast ratio


## Release History

* v2.0.2 - Replace travis with GitHub actions
* v2.0.1 - Updating readme, fixing bug when white and black passes
* v2.0.0 - Binary search, removing steps, adding eslint
* v1.1.0 - Fixing bugs that caused the contrast to be off by 0.2
* v1.0.7 - Adding travis
* v1.0.6 - Minimizing the files
* v1.0.5 - Removing babel
* v1.0.4 - Updating documentation
* v1.0.3 - Making import work
* v1.0.2 - Removing unecessary NPM packages
* v1.0.1 - Adding readme
* v1.0.0 - First release
