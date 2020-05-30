/** code modified from

* https://github.com/wcoder/text-colorizer.js

* © 2015 Yauheni Pakala | MIT

**/

function getRandomColor() {
		return Math.floor(Math.random() * 16777215).toString(16);
	}
	
function getRandomFontSize(min, max) {
	return min + Math.round(Math.random() * (max - min + 1));
}
    
export function textColorizer(text, isByWord, maxFontSize, minFontSize) {
	isByWord = isByWord || false;
	maxFontSize = maxFontSize || 48;
	minFontSize = minFontSize || 10;
	
	var spacer = isByWord ? ' ' : '',
		words = text.split(spacer),
		result = '',
		i = words.length;
	
	for (; i--;) {
		if (words[i] === ' ') {
			result = ' ' + result;
		} else {
			result = '<span style="color:#' + getRandomColor() +
					 ';font-size:' + getRandomFontSize(minFontSize, maxFontSize) +
					 'px">' + words[i] +
					 '</span>' + spacer + result;
		}
	}
	
	return result;
}