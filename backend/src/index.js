

//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define the Express app
const app = express();

// the database
const sensors = [{
  id: 1,
  name: "Bedroom", 
  temp: "24.5",
  humidity: "39"
},
{
  id: 2,
  name: "Outdoor", 
  temp: "-2.4",
  humidity: "65"
},
{
  id: 3,
  name: "Kitchen", 
  temp: "22.4",
  humidity: "45"
},
{
  id: 4,
  name: "Livingroom", 
  temp: "21.8",
  humidity: "34"
},
];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// retrieve all questions
app.get('/', (req, res) => {
  const sensors_map = sensors.map(s => ({
    id: s.id,
    name: s.name,
    temp: s.temp,
    humidity: s.humidity,
  }));
  res.send(sensors_map);
});

// get a specific question
app.get('/:id', (req, res) => {
  const sensor = sensors.filter(s => (s.id === parseInt(req.params.id)));
  if (sensor.length > 1) return res.status(500).send();
  if (sensor.length === 0) return res.status(404).send();
  res.send(sensor[0]);
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});