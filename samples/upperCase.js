export function upperCase(text){
	const re = />(.+?)</g;
	if(!re.test(text)){return text.toUpperCase()}
	return text.replace(re,replacer);
}
function replacer(match,p1){
	return '>' + p1.toUpperCase() + '<';
}