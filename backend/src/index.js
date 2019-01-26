

//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const admin = require('firebase-admin');
const serviceAccount = require('./adminsdk-key.json'); 

const PORT = process.env.PORT || 5000

let sensors = []; 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore(); 
db.settings({ timestampsInSnapshots: true })


function updateDb(record, res) {

  db.collection('current_records').doc(record.name).get().then((snapshot) => {
    if (snapshot.exists) {
      db.collection('current_records').doc(record.name).update(record)
      res.send("200 OK"); 
    } else {
      res.statusCode = 404; 
      res.send("404 not found")
    }
  })
}

// define the Express app
const app = express();

// enhance app security
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));



app.get('/', (req, res) => {
  db.collection('current_records').get().then((snapShot)=> {
    snapShot.docs.map(doc => {
      let sensor = doc.data(); 
      sensor.average_temperature = 50; 
      sensors.push(sensor)
    })

      res.send(sensors);
      
      sensors = []; 
  }) 


})


// retrieve all sensors
app.get('/current', (req, res) => {
  console.log(req); 
  let sensors = []
  db.collection('records').doc('current_record').get().then((doc) => {
   data = doc.data()
   sensors.push({
     "id": data.id,
     "name": data.name,
     "temp": data.temp,
     "humidity": data.humidity
   })

   res.send(sensors); 
  })
})

app.get('/api/put/:name/:temp/:humidity', (req, res) => {
  let temp = req.params.temp; 
  let name = firstToUppercase(req.params.name); 
  let humidity = req.params.humidity; 

  let object = {
    temp: temp, 
    name: name, 
    humidity: humidity, 
  }

  updateDb(object, res); 
})
  

/* 
TODO
- Add new sensors through API 
- Replace dummy database with real database
*/

// start the server
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
}); 

function firstToUppercase(name) {
  return name.charAt(0).toUpperCase()+ name.slice(1); 
}