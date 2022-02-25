const apiKey = "8adbd06ab54a8c5bba4efc3909876f5b";
let api;
const units = "metric"
inputField = document.querySelector("input");
locationBtn = document.querySelector("button");
message = document.querySelector(".messages");
wIcon = document.querySelector("wImage");


inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        callApi(inputField.value);
    }
});

function callApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    fetchData();
};

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        alert("Your browser doesn't support geolocation, Try searching your setting your name");
    }
});

function onSuccess(position){
    const {latitude,longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`
    fetchData();
};

function onError(error){
    message.innerText = error.message;
    message.classList.add("error");
};

function fetchData(){
    message.innerText = "Fetching weather data";
    message.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
};

function weatherDetails(info){
    if(info.cod == "404")
    {
        message.classList.replace("pending","error");
        message.innerText = `${inputField.value} isn't a city`;
    }else{
        message.classList.remove("pending","error");
        message.innerText = "message";

        const city = info.name;
        const country = info.sys.country;
        const {description,id,icon} = info.weather[0];
        const {feels_like,humidity,temp} = info.main;
        console.log(icon);
        

        document.querySelector(".content").innerText = "Temperature: "+Math.round(temp)+'°C';
        document.querySelector(".content").innerText += '\n'+description;
        document.querySelector(".content").innerText += '\n'+`${city},${country}`;
        document.querySelector(".content").innerText += '\n'+"Feels like "+Math.round(feels_like)+'°C';
        document.querySelector(".content").innerText += '\n'+"Humidity: "+humidity+'%';
        let source = `/assets/${icon}.png`;
        console.log(source);
        wIcon.src = `/assets/${icon}.png`;
        console.log(info);
    }
};
