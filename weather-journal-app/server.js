const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');

// app obj
const app = express();
const port = 4000;

// no need for body-parser pakage as these functions (urlencoded & json) are included within the express obj
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// OR
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// listening for the website folder
app.use(express.static('website'));

// initiating the server to listen on port 4000
const server = app.listen(port, () =>
  console.log(`Server is running on port: ${port}`)
);

let projectData = {};

app.get('/data', (req, res) => {
  res.send(projectData);
});

app.post('/data', (req, res) => {
  const enteredData = req.body;
  const transformData = {
    temperature: enteredData.temperature,
    date: enteredData.date,
    userResponse: enteredData.userResponse,
  };
  projectData = transformData;
  console.log(projectData);
  res.send(projectData);
});
