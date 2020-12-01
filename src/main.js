const viewElems = {};


const getDOMElem = id => {
	return document.getElementById(id);
}

const connectHTMLElements = () => {
	viewElems.weatherSectionMain = getDOMElem('weather-section-main');
	viewElems.weatherSearchContainer = getDOMElem('weather-search-container');
	viewElems.weatherSearchForecastWrapper = getDOMElem('weather-search__forecast-wrapper');

	viewElems.searchInput = getDOMElem('weather-search-input');
	viewElems.searchButton = getDOMElem('weather-search-button');
	viewElems.weatherSearchCityWrapper = getDOMElem('weather-search-city-wrapper');

	viewElems.weatherSearchCity = getDOMElem('weather-search-city');
	viewElems.weatherSearchIcon = getDOMElem('weather-search-icon');

	viewElems.weatherCurrentTemp = getDOMElem('weather-current-temp');
	viewElems.weatherMaxTemp = getDOMElem('weather-max-temp');
	viewElems.weatherMinTemp = getDOMElem('weather-min-temp');

	viewElems.weatherSearchBtnReturn = getDOMElem('weather-search-btn-return');	

}

const setUpListeners = () => {
	viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
	viewElems.searchButton.addEventListener('click', onClickSubmit);

}

cont initialzeApp = () => {
	connectHTMLElements();
	setUpListeners();
}

const onEnterSubmit = () => { }
const onClickSubmit = () => { }

document.addEventListener('DOMContentLoaded', initializeApp)