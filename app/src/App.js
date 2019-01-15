import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Sensor from './Components/Sensor'
import NewSensor from './Components/NewSensor'

class App extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    axios.get("http://localhost:8081/").then(res => {
      this.setState({
        data: res.data
      })
    })
  }

  addSensor = (name) => {

    if (name === "" || name === undefined) {
      return; 
    }
    const id = this.state.data ? this.state.data[this.state.data.length-1].id +1 : 1;
    let temp = ((Math.random() * 30.0) - 10).toFixed(2);  
    let humidity = Math.floor(Math.random()*100); 

    let sensor = {
      name: name,
      id: id, 
      temp: temp, 
      humidity: humidity
    }

    let sensors = this.state.data; 
    sensors.push(sensor); 

    this.setState({
      data: sensors
    })
  }


  render() {

    const sensors = this.state.data; 
    const sensorList = sensors.length ? (
      <div className="container">
        
        <div className="row">
        {sensors.map((sensor, index) => {
            return (
              <React.Fragment key={sensor.id}>
                  <Sensor sensor={sensor} key={sensor.id} />
                  {(index+1) % 3 === 0 && index > 0 && <div className="w-100"></div>}
              </React.Fragment>
            )
        })}
        </div>
      </div>
    ) : (<p>Ingen data..</p>)
    return (
      <div className="App">
      <div className="container">

      {sensorList}

      <NewSensor addSensor={this.addSensor} />

      </div>
      </div>
    );
  }
}

export default App;
