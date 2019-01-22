

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


function updateDb(record) {
  db.collection('records').doc("current_record").set(record).then(() => {
    //console.log("Record set..")
  })
}
setInterval(() => {
  let record = {
    id: 1, 
    name: "Bedroom", 
    temp: (Math.random()*30 - Math.random()*20).toFixed(2),
    humidity: (Math.random()*60 - Math.random()*40).toFixed(2)
  }

  updateDb(record); 
}, 2000); 


function bedtest() {
  let data = {
    name: "Kitchenn", 
    temp: 23
  }

  //db.collection('current_records').doc().set(data);  
 
}

function pushData(data) {
  db.collection('current_records').doc(data.name).get().then((snapshot) => {
    if (snapshot.exists) {
      console.log("Exists"); 
      db.collection('current_records').doc(data.name).set(data)
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
  

/* 
TODO
- Add new sensors through API 
- Replace dummy database with real database
*/

// start the server
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
}); 
