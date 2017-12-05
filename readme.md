🌈 A11yColor
==============

> Generate the nearest accessible color.

## Install

```console
$ npm install a11ycolor
```

## Usage

```js
import A11yColor from 'a11ycolor';

A11yColor( red, blue ); // This returns #FFA3A3
```

this will ouput: `#ffa3a3`


## Parameters

The function `A11yColor` function takes four parameters:

```js
A11yColor( $toMakeA11y, $background, $ratioKey = 'small', steps = 0.1 );
```

1. `toMakeA11y` - The color that is to be made accessible on the background
1. `background` - The background color to for the contrast
1. `ratioKey`   - The keyword 'small' or 'large' to set the WCAG 2.1 contrast ration or 3.0 or 4.5
1. `steps`      - The step size our function is searching for a new color in. The bigger the number the faster the process the rougher the found color.


## Release History

* v1.0.0 - First release
