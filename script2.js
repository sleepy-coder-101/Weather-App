async function fetchWeather(location){
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=0942474c59ed495498e195813221506&q="+location+"&aqi=no");
    if(response.ok){
        const data = await response.json(); 
        displayWeather(data);
    }
    else{
        document.querySelector(".error-page").style.display = "flex";
        document.querySelector(".display-section").style.display = "none";
        document.querySelector(".welcome-page").style.display = "none";
    }
}

async function displayBackground(name, text){
    const imageURL = await fetch('https://api.unsplash.com/search/photos?page=1&query='+text+','+name+'&client_id=YXXwV6ctF9v3YPj6ZdE7dYEg_JSzlV0VgBl0DLXrGqA');
    const data = await imageURL.json();
    const num = Math.floor(Math.random()*(data.results.length));
    document.body.style.backgroundImage = `url(${data.results[num].urls.regular})`;
}

function displayWeather(data){
    document.querySelector(".display-section").style.display = "flex";
    document.querySelector(".welcome-page").style.display = "none";
    document.querySelector(".error-page").style.display = "none";
    
    const {name} = data.location;
    const {temp_c, humidity, feelslike_c, precip_mm, wind_kph, cloud, uv} = data.current;
    const {text, icon} = data.current.condition;
    
    displayBackground(name, text);

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".temp").innerText = temp_c+"°C";
    document.querySelector(".icon").src = icon;
    document.querySelector(".description").innerText = text;
    
    document.querySelector(".real-feel").innerText = "Real Feel: "+feelslike_c+"°C";
    document.querySelector(".precipitation").innerText = "Precipitation: "+precip_mm+" mm";
    document.querySelector(".humidity").innerText = "Humidity: "+humidity+"%";
    document.querySelector(".cloudy").innerText = "Cloud Cover: "+cloud+"%";
    document.querySelector(".wind-speed").innerText = "Wind Speed: "+wind_kph+" kmph";
    document.querySelector(".uv").innerText = "UV Index: "+uv+"%";
}


function searchWeather(){
    let location = document.getElementById("searched-location").value;
    fetchWeather(location);
}


document.querySelector("button").addEventListener("click", function(){
    searchWeather(); 
})

document.querySelector(".search-text").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        searchWeather(); 
    }
})