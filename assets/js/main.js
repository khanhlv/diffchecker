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

function findDiff() {
	var valueOriginal = editorOrigin.getValue();
	var valueChanged = editorChange.getValue();
	
	var listOriginal = valueOriginal.split('\n');
	var listChanged = valueChanged.split('\n');

	var lengthOriginal = listOriginal.length;
	var lengthChanged = listChanged.length;
	
	var lengthAll = lengthOriginal > lengthChanged ? lengthOriginal : lengthChanged;
	
	var resutl = [];
	for (var i = 0; i < lengthAll; i++) {
		if (listOriginal[i] !== listChanged[i]) {
			var diff = {
				index: i,
				valueOriginal: listOriginal[i] == undefined ? '' : listOriginal[i],
				valueChanged: listChanged[i] == undefined ? '' : listChanged[i],
				charAtList: [],
				wordList: []
			}
			
			// Check charAt
			var lengthOriginaCharAt = diff.valueOriginal.length;
			var lengthChangedCharAt = diff.valueChanged.length;
			var lengthCharAt = lengthOriginaCharAt > lengthChangedCharAt ? lengthOriginaCharAt : lengthChangedCharAt;
			
			var listCharAt = [];
			for (var j = 0; j < lengthCharAt; j++) {
				if (diff.valueOriginal.charAt(j) !== diff.valueChanged.charAt(j)) {
					listCharAt.push({
						index: j,
						valueOrigin: diff.valueOriginal.charAt(j),
						valueChanged: diff.valueChanged.charAt(j)
					})
				}
			}
			diff.charAtList = listCharAt;
			
			// Check Word
			var listWordOriginal = diff.valueOriginal.split(' ');
			var listWordChanged = diff.valueChanged.split(' ');
			
			var lengthWordOriginal = listWordOriginal.length;
			var lengthWordChanged = listWordChanged.length;
			
			var lengthWord = lengthWordOriginal > lengthWordChanged ? lengthWordOriginal : lengthWordChanged;
			
			var listWord = [];
			for (var k = 0; k < lengthWord; k++) {
				if (listWordOriginal[k] !== listWordChanged[k]) {
					listWord.push({
						index: k,
						valueOrigin: listWordOriginal[k] == undefined ? '' : listWordOriginal[k],
						valueChanged: listWordChanged[k] == undefined ? '' : listWordChanged[k]
					})
				}
			}
			diff.wordList = listWord;
			
			resutl.push(diff);
		}
	}
	
	console.log(resutl);
	
	modifyData(lengthAll, listOriginal, listChanged);
	
	showDiff(resutl);
	
	
	//codeListOriginal.forEach(function(item) {
	//	item.parentNode.setAttribute('class', 'diff-line-remove')
	//});
	
	
	//codeListChanged.forEach(function(item) {
	//	item.classList.add("diff-line-insert")
	//});
}

function showDiff(resutl) {
	var codeListOriginal = document.querySelector('.form-orginal').querySelector('.CodeMirror-code').querySelectorAll('.CodeMirror-line');
	var codeListChanged = document.querySelector('.form-changed').querySelector('.CodeMirror-code').querySelectorAll('.CodeMirror-line');
	
	var lengthResult = resutl.length;
	
	for (var f = 0; f < lengthResult; f++) {
		var index = resutl[f].index;
		
		if (codeListOriginal[index]) {
			codeListOriginal[index].parentNode.setAttribute('class', 'diff-line-remove');
		}
		
		if (codeListChanged[index]) {
			codeListChanged[index].parentNode.setAttribute('class', 'diff-line-insert');
		}
	}
}

function clearDiff() {
	editorOrigin.setValue('');
	editorChange.setValue('');
}

function modifyData(lengthAll, listOriginal, listChanged) {
	var dataOriginal = '';
	var dataChanged = '';
	
	for (var i = 0; i < lengthAll; i++) {
		dataOriginal += (i == 0 ? '' : '\n') + (listOriginal[i] == undefined ? '' : listOriginal[i]);
		dataChanged += (i == 0 ? '' : '\n') + (listChanged[i] == undefined ? '' : listChanged[i]);
	}
	
	editorOrigin.setValue(dataOriginal);
	editorChange.setValue(dataChanged);
}
