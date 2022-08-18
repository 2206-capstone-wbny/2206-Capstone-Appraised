import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
  params: {location: 'United States'},
  headers: {
    'X-RapidAPI-Key': 'd88d020483msh24fcfdaac49ccccp1127d4jsn7805608789b0',
    'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});