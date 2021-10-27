'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App{
    #map;
    #mapEvent;

    constructor(){
        this._getPosition();
        form.addEventListener('submit',this._newWorkout.bind(this));
        inputType.addEventListener('change',this._toggleElevationField);
        // this._showForm().bind(this);
        // this._toggleElevationField();
        // this._newWorkout();

    }
    
    _getPosition(){
        //Geo Location API
        navigator.geolocation.getCurrentPosition(this._loadPosition.bind(this), function(){
            alert('Could not get your Location.');
        })
    }
    _loadPosition(position){
        const latitude=position.coords.latitude;
        const longitude=position.coords.longitude;
        console.log(`https://www.google.co.in/maps/@ ${latitude}, ${longitude}`);
        this.#map = L.map('map').setView([latitude,longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        this.#map.on('click',this._showForm.bind(this));
    }
    _showForm(mapE){
        // this.#map.on('click',function(mapE){
            this.#mapEvent=mapE;
            form.classList.remove('hidden');
            inputDistance.focus();
        // });
    }
    _toggleElevationField(){
        // Changing Cadence type after changing workout type.
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    _newWorkout(e){
        // handling Event after submitting form.
            e.preventDefault();
            inputDistance.value=inputCadence.value=inputDuration.value='';
            const {lat,lng}=this.#mapEvent.latlng;
            L.marker([lat,lng])
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth:250,
                    minWidth:100,
                    autoClose:false,
                    closeOnClick:false,
                    className:'running-popup',
                })
            )
            .setPopupContent('WorkOut')
            .openPopup();
        }
}

const app=new App();
