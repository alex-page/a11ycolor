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

The function `A11yColor` function takes four parameters:

```js
A11yColor( $toMakeA11y, $background, $ratioKey = 'small' );
```

1. `toMakeA11y` - The color that is to be made accessible on the background
1. `background` - The background color to for the contrast
1. `ratioKey`   - The keyword 'small' ( 4.5 ) or 'large' ( 3.0 ) for the WCAG 2.1 contrast ratio


## Research

The minimum lightness between hexadecimal colour values can be worked from converting two values one step away from eachother and comparing HSL. For example `#646464` and `#636363` have a lightness of `39.21568627450981` and `38.82352941176471`. The difference between them is `0.39215686274`. This allows us to return a colour when the minimum and maximum is less than `0.39215686274`.

We then find the minimum lightness and maximum lightness. This allows us to reduce the area we do the binary search in. It also allows us to work out the direction of increased contrast. We can then use these to binary search.


## Release History

* v2.0.0 - Moving to binary search, removing steps, adding eslint
* v1.1.0 - Fixing bugs that caused the contrast to be off by 0.2
* v1.0.7 - Adding travis
* v1.0.6 - Minimizing the files
* v1.0.5 - Removing babel
* v1.0.4 - Updating documentation
* v1.0.3 - Making import work
* v1.0.2 - Removing unecessary NPM packages
* v1.0.1 - Adding readme
* v1.0.0 - First release
