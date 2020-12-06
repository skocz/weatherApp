import { getWeatherByCity } from './apiService.js';
import { mapListToDOMElements } from './DOMActions.js';

class WeatherApp {
	constructor () {
		this.viewElems = {};
		this.initialiseApp();
	};

	initialiseApp = () => {
		this.connectDOMElements();
		this.setUpListeners();
	};
	//this is a class's method that's why it isn't preceded with 'const'
	connectDOMElements = () => {
		//in order to use map you have to put all IDs in array: Array.from() 
		const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
		console.log(listOfIds);
		this.viewElems = mapListToDOMElements(listOfIds);
		console.log(this.viewElems)
		let today = new Date();
		let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		this.viewElems.today.innerText = date;
	};

	setUpListeners = () => {
		this.viewElems.weatherSearchInput.addEventListener('keydown', this.handleSubmit);
		this.viewElems.weatherSearchBtn.addEventListener('click', this.handleSubmit);
		this.viewElems.returnToWeatherSearchBtn.addEventListener('click', this.returnToSearch);
	};

	handleSubmit = () => {
		if(event.type === 'click' || event.key === 'Enter') {
			this.fadeInOut();
			let cityQuery = this.viewElems.weatherSearchInput.value;
			getWeatherByCity(cityQuery).then(data => {
				this.displayWeatherData(data);
				this.viewElems.weatherSearchInput.style.borderColor = 'black';
				this.viewElems.weatherSearchInput.value = '';
			}).catch(() => {
				this.fadeInOut();
				this.viewElems.weatherSearchInput.style.borderColor = 'red';
				this.viewElems.weatherSearchErrorMessage.innerText = `This place doesn\'t exist`;
			})
		};
	};

	fadeInOut = () => {
		if(this.viewElems.weatherSectionMain.style.opacity === '1' || this.viewElems.weatherSectionMain.style.opacity === '') {
			this.viewElems.weatherSectionMain.style.opacity = '0';
		} else 
			this.viewElems.weatherSectionMain.style.opacity = '1';
	};

	switchView = () => {
		if(this.viewElems.weatherSearchContainer.style.display !== 'none') {
			this.viewElems.weatherSearchContainer.style.display = 'none';
			this.viewElems.weatherSearchForecastContainer.style.display = 'block';
		} else {
			this.viewElems.weatherSearchForecastContainer.style.display = 'none';
			this.viewElems.weatherSearchContainer.style.display = 'flex';
		}
	};

	returnToSearch = () => {
		this.fadeInOut();

		setTimeout(() => {
			this.switchView();
			this.fadeInOut();
		}, 500);

	};

	displayWeatherData = data => {
		this.switchView();
		this.fadeInOut();

		const weather = data.consolidated_weather[0];
		console.log(weather);
		console.log(data);

		this.viewElems.weatherSearchCity.innerText = data.title;
		this.viewElems.weatherSearchIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
		this.viewElems.weatherSearchIcon.alt = weather.weather_state_name;

		const currTemp = weather.the_temp.toFixed(2);
		const maxTemp =  weather.max_temp.toFixed(2);
		const minTemp =  weather.min_temp.toFixed(2);

		this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currTemp}`;
		this.viewElems.weatherMaxTemp.innerText =  `Max temperature: ${maxTemp}`;
		this.viewElems.weatherMinTemp.innerText =  `Min temperature: ${minTemp}`;

	}

}

document.addEventListener('DOMContentLoaded', new WeatherApp());
