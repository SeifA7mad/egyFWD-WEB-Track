// Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=53f9205b25dcd994f69d550835e47081';

const checkInputValidaty = (inputValue) => {
  if (inputValue === '') {
    return false;
  }
  return true;
};

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', () => {
  // get the values from user inputs
  const inputedZipCode = document.getElementById('zip').value;
  const inputedFeelings = document.getElementById('feelings').value;

  // inputs Validation
  if (
    !checkInputValidaty(inputedZipCode) ||
    !checkInputValidaty(inputedFeelings)
  ) {
    alert('input fields must not be Empty');
    return;
  }

  if (isNaN(inputedZipCode) || inputedZipCode.length < 5) {
    alert('Zip code must be a valid');
    return;
  }

  // get the current date
  const currentDate = new Date().toLocaleDateString();

  // chain promises
  fetchWeatherData(baseUrl, apiKey, inputedZipCode).then((data) =>
    sendProjectData('/data', {
      temperature: data.main.temp,
      date: currentDate,
      userResponse: inputedFeelings,
    }).then(() => fetchProjectData())
  );
});

/* Function called by event listener */

/* Function to GET Web API Data*/
const fetchWeatherData = async (baseUrl, apiKey, zipCode) => {
  try {
    const response = await fetch(`${baseUrl}${zipCode}${apiKey}`);

    if (!response.ok) {
      alert('An error acquired: check the zip code entered');
      throw new Error('request failed');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

/* Function to POST data */
const sendProjectData = async (url = '/data', dataObj) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObj),
    });

    if (!response.ok) {
      throw new Error('request failed');
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

/* Function to GET Project Data */
const fetchProjectData = async (url = '/data') => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('request failed');
    }

    const data = await response.json();
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temperature;
    document.getElementById('content').innerHTML = data.userResponse;
    return data;
  } catch (err) {
    console.log(err);
  }
};
