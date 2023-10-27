import { MY_API_KEY } from './config.js';
let covidData;

(function onLoad()
{
    setButtonFunctions();
    getCovidData();
})();

function setButtonFunctions()
{
    document.getElementById('countries').onchange = function() {
        const selectedValue = document.getElementById('countries').value;
        const countryData = covidData.filter(c => c.country == selectedValue)[0];

        // display data
        const activeCases = document.getElementById('activeCases');
        const newCases = document.getElementById('newCases');
        const recoveredCases = document.getElementById('recoveredCases');
        const totalCases = document.getElementById('totalCases');
        const totalDeaths = document.getElementById('totalDeaths');
        const totalTests = document.getElementById('totalTests');
        const lastUpdated = document.getElementById('lastUpdated');

        //active cases
        (countryData.cases.active) ? activeCases.innerHTML = countryData.cases.active : activeCases.innerHTML = '0';
        //new cases
        (countryData.cases.new) ? newCases.innerHTML = countryData.cases.new : newCases.innerHTML = '0';
        //recoveres cases
        (countryData.cases.recovered) ? recoveredCases.innerHTML = countryData.cases.recovered : recoveredCases.innerHTML = '0';
        //total cases
        (countryData.cases.total) ? totalCases.innerHTML = countryData.cases.total : totalCases.innerHTML = '0';
        //total death
        (countryData.deaths.total) ? totalDeaths.innerHTML = countryData.deaths.total : totalDeaths.innerHTML = '0';
        //total tests
        (countryData.tests.total) ? totalTests.innerHTML = countryData.tests.total : totalTests.innerHTML = '0';
        lastUpdated.innerHTML = 'Last Updated: ' + countryData.day;
    };
}

// COVID 19 Data
async function getCovidData()
{
    await fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("COVID 19 API object:");
        console.log(response);
        console.log("\n");

        // add all countries to select option
        response.response.forEach(c => {
            const option = document.createElement('option');
            option.innerHTML = c.country;
            document.getElementById('countries').appendChild(option);
        })

        // save covid data to global variable
        covidData = response.response;
    })
    .catch(err => {
        console.log(err);
    });
}