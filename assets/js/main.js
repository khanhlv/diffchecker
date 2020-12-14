function loadEdittor() {
	var editorOrigin = CodeMirror.fromTextArea(document.getElementById("original"), {
	  lineNumbers: true,
	  mode: "text/html",
	  matchBrackets: true
	});
	
	var editorChange = CodeMirror.fromTextArea(document.getElementById("changed"), {
	  lineNumbers: true,
	  mode: "text/html",
	  matchBrackets: true
	});
}

window.onload = function() {
	loadEdittor();
}



