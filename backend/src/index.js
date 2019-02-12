

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

const db = admin.firestore(); 
db.settings({ timestampsInSnapshots: true })


function updateDb(record, res) {

  let time = new Date();  
  record.time=time;
  console.log(record);
  record.today = new Date().setHours(0,0,0,0);
  db.collection('current_records').doc(record.name).get().then((snapshot) => {
    if (snapshot.exists) {
      db.collection('current_records').doc(record.name).update(record)
      db.collection('records').doc().set(record);
      res.statusCode = 200; 
      res.send("200 OK"); 
    }
    else {
      res.statusCode = 404; ;
      res.send("404 not found");
    }
  })
}



app.get('/', (req, res) => {
  db.collection('current_records').get().then((snapShot)=> {
    snapShot.docs.map(doc => {
      let sensor = doc.data(); 
      sensor.time=sensor.time.toDate(); 
      sensors.push(sensor)
    })
      res.send(sensors);
      
      sensors = []; 
  }).catch(err => {
    console.log(err);
  })


})


//Get average temperature
app.get('/api/average/temp/', (req, res) => {
  db.collection('current_records').get().then((snapShot)=> {
    
    let recordsRef = db.collection('records'); 
    average_temps = [];
    recordsRef.get().then(records => {
      
      snapShot.docs.map(doc => {
        let sum = 0; 
        let count = 0; 
        let data = doc.data(); 
        let avg_temp = {
          id: data.id,
          name: data.name,
          average_temperature: 0
        } 

        records.docs.map(rec => {
          let rec_data = rec.data(); 
          if(rec_data.name === data.name && rec_data.today === new Date().setHours(0,0,0,0)){
            sum += parseFloat(rec_data.temp); 
            count+=1; 
          }
        })

        avg_temp.average_temperature=(sum/count).toFixed(2); 
        average_temps.push(avg_temp)
      })

      res.send(average_temps);

    })

  }).catch(err => {
    console.log(err);
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