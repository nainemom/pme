var textbox = document.getElementById('textbox');
var output = document.getElementById('output');
var preview = document.getElementById('preview');

if( localStorage.md == null )
	localStorage.md = loadFile('test.md');
textbox.value = localStorage.md;

textbox.addEventListener('keyup', doIt);
textbox.addEventListener('click', doIt);
window.addEventListener('resize', doIt);
doIt();

function doIt(firstInit){
	if( typeof firstInit == 'undefined' )
		firstInit = true;
	else
		firstInit = false;
	var scrollTop = window.scrollTop;
	if( !firstInit ) localStorage.md = textbox.value;
	preview.innerHTML = marked( textbox.value );
	textbox.style.height = 0;
	textbox.style.height = textbox.scrollHeight + 'px';
	if( output.offsetHeight > textbox.offsetHeight )
		textbox.style.height = output.offsetHeight + 'px';
	window.scrollTop = scrollTop;
}
function loadFile(file){
	var ret;
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', file, false);
	httpRequest.onreadystatechange = function() {
		ret = httpRequest.responseText;
	}
	httpRequest.send();
	return ret;
}
