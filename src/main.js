import { getWeatherByCity } from './apiService.js';

const viewElems = {};


const getDOMElem = id => {
	return document.getElementById(id);
}

const connectHTMLElements = () => {
	viewElems.weatherSectionMain = getDOMElem('weather-section-main');
	viewElems.weatherSearchContainer = getDOMElem('weather-search-container');
	viewElems.weatherSearchForecastWrapper = getDOMElem('weather-search-forecast-wrapper');

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
	viewElems.weatherSearchBtnReturn.addEventListener('click', switchView);
}

const initialzeApp = () => {
	connectHTMLElements();
	setUpListeners();
}

const onEnterSubmit = event => {
	console.log(event)
	if(event.key === 'Enter') {
		fadeInOut();
		let cityQuery = viewElems.searchInput.value;
		getWeatherByCity(cityQuery).then(data => {
			console.log(data);
			switchView();
			fadeInOut();
		});
	} 
};

const onClickSubmit = () => { 
	let cityQuery = viewElems.searchInput.value;
	getWeatherByCity(cityQuery).then(data => {
		console.log(data);
		switchView();
	});
};

const fadeInOut = () => {
	if(viewElems.weatherSectionMain.style.opacity === '1' || viewElems.weatherSectionMain.style.opacity === '') {
		viewElems.weatherSectionMain.style.opacity = '0'
	} else 
		viewElems.weatherSectionMain.style.opacity = '1'
}

const switchView = () => {
	if(viewElems.weatherSearchContainer.style.display !== 'none') {
		viewElems.weatherSearchContainer.style.display = 'none';
		viewElems.weatherSearchForecastWrapper.style.display = 'block';
	} else {
		viewElems.weatherSearchForecastWrapper.style.display = 'none';
		viewElems.weatherSearchContainer.style.display = 'flex';
	}
}

const returnToSearch = () => {
	fadeInOut();

	setTimeout(() => {
		switchView();
		fadeInOut();
	}, 500);
	

}

document.addEventListener('DOMContentLoaded', initialzeApp)


