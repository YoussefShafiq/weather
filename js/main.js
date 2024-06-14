let searchInput = document.getElementById('CountrySearch')
let country = document.getElementById('country')
let CurrentDeg = document.getElementById('todayC')
let CurrentConditionIcon = document.getElementById('conditionicon')
let currentCondition = document.getElementById('condition')
let info = document.getElementById('info')

searchInput.addEventListener('input', function () {
    getcountry = searchInput.value
    getWeather(getcountry)
})

let getcountry = 'cairo'

async function getWeather(country) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1f039acad4d9499b854172033241206&q=${country}&days=3&aqi=no&alerts=no`)
    let result = await data.json()
    displayToday(result.location.name, result.current.temp_c, result.current.condition, result.current.humidity, result.current.wind_kph, result.current.wind_dir, result.forecast.forecastday[0].date)
    displayDay2(result.forecast.forecastday[1].day.maxtemp_c, result.forecast.forecastday[1].day.mintemp_c, result.forecast.forecastday[1].day.condition, result.forecast.forecastday[1].date)
    displayDay3(result.forecast.forecastday[2].day.maxtemp_c, result.forecast.forecastday[2].day.mintemp_c, result.forecast.forecastday[2].day.condition, result.forecast.forecastday[2].date)

}

getWeather(getcountry)

function displayToday(newcountry, newDeg, newCondition, newHumadity, newWind, newDiraction, date) {
    document.getElementById('todayName').innerHTML = getDayName(`${date}`)
    document.getElementById('Date').innerHTML = formatDate(`${date}`)
    country.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${newcountry} `
    CurrentDeg.innerHTML = `${newDeg} ْC`
    CurrentConditionIcon.innerHTML = `<img src="${newCondition.icon}" style="width:150%" alt="">`
    currentCondition.innerHTML = `${newCondition.text}`
    info.innerHTML = `<i class="fa-solid fa-droplet"></i> ${newHumadity}%<i class="fa-solid fa-wind ps-5"></i> ${newWind}km/h <i
                            class="fa-regular fa-compass ps-5"></i> ${newDiraction}`
}

function displayDay2(maxDeg, minDeg, condition, date) {
    document.getElementById('day2Name').innerHTML = getDayName(`${date}`)
    document.getElementById('day2conditionIcon').innerHTML = `<img src="${condition.icon}" class="w-25" alt="">`
    document.getElementById('day2maxC').innerHTML = `${maxDeg} ْ C`
    document.getElementById('day2minC').innerHTML = `${minDeg} ْ C`
    document.getElementById('day2condition').innerHTML = `${condition.text}`
}

function displayDay3(maxDeg, minDeg, condition, date) {
    document.getElementById('day3Name').innerHTML = getDayName(`${date}`)
    document.getElementById('day3conditionIcon').innerHTML = `<img src="${condition.icon}" class="w-25" alt="">`
    document.getElementById('day3maxC').innerHTML = `${maxDeg} ْ C`
    document.getElementById('day3minC').innerHTML = `${minDeg} ْ C`
    document.getElementById('day3condition').innerHTML = `${condition.text}`
}


function getDayName(dateString) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayNumber = new Date(dateString).getDay();
    return weekdays[dayNumber];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];

    return `${day}${month}`;
}



