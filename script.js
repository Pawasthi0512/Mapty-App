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

//Geo Location API
navigator.geolocation.getCurrentPosition(function(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    console.log(`https://www.google.co.in/maps/@ ${latitude}, ${longitude}`);
    var map = L.map('map').setView([latitude,longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click',function(mapEvent){
        form.classList.remove('hidden');
        inputDistance.focus();
        // handling Event after submitting form.
        form.addEventListener('submit',function(e){
            e.preventDefault();
            inputDistance.value=inputCadence.value=inputDuration.value='';
            const {lat,lng}=mapEvent.latlng;
            L.marker([lat,lng])
            .addTo(map)
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
        })
        // Changing Cadence type after changing workout type.
        inputType.addEventListener('change',function(){
            inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        })
    });
},
function(){
    alert('Could not get your Location.');
})
// console.log(firstName);
