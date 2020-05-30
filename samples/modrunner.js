/** modrunner code calls module property/method in browser environment **/
var myText = "The quick brown fox jumps over the lazy dog.";
var control = document.getElementById('control');
//var buttonArr = Array.prototype.slice.call(control.children );//cast HTMLNodeCollection to Array type
var buttonCollection = control.children;
var outputEle = document.getElementById("output");
outputEle.innerHTML = myText;
control.addEventListener('click',clickHandler);

function clickHandler(event){
	const i = [...buttonCollection].indexOf(event.target);	
	switch(i){
		case 0: 
			outputEle.innerHTML = myText;
			break;
		case 1:
			let text = outputEle.textContent;
			outputEle.innerHTML = shout.textColorizer(text,true,30,90);
			break;
		case 2:
			outputEle.innerHTML = amplified.repeat(outputEle.innerHTML);
			break;	
		case 3:
			outputEle.innerHTML = upperCase(outputEle.innerHTML);
	}
	
}

