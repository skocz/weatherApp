// underscore var should be only be used in this file
const _getDOMElem = id => {
	return document.getElementById(id);
} 
export const mapListToDOMElements = listOfId => {
	const _viewElems = {};

	for (const id of listOfId) {

		_viewElems[id] = _getDOMElem(id);
		console.log(_viewElems);
	}

	return _viewElems;
}
