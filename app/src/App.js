import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Sensor from './Components/Sensor'
import NewSensor from './Components/NewSensor'

class App extends Component {

  state = {
    loading: true, 
    data: []
  }

  componentDidMount() {
 
    this.setData(); 
    
    setInterval(() => {

      this.setData(); 

    }, 2000000)
  }

  setData() {
    axios.get("https://limitless-mesa-30279.herokuapp.com/current").then(res => {
      console.log(res.data.data);
      this.setState({
        loading: false,
        data: res.data
      })
    }).catch(error => {
      this.setState({
        loading: false
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

    console.log("KAKE:" + this.state.data); 
    const sensors = this.state.data; 
    const sensorList = sensors.length ? (
        <div className="row">
        {sensors.map((sensor, index) => {
            return (
              <React.Fragment key={index}>
                  <Sensor sensor={sensor} loading={this.state.loading} key={index} />
                  {(index+1) % 3 === 0 && index > 0 && !this.state.loading && <div className="w-100"></div>}
              </React.Fragment>
            )
        })}
      </div>
    ) : (!this.state.loading && <p>Ingen data..</p>)

    
    return (

      <div className="App">
        <div className="container">
          {this.state.loading ? (
          <div className="text-center">
          <div className="spinner-border Top-margin" role="status">
          </div>
        </div>)
        : (<p>{sensorList}</p>)}
            <NewSensor addSensor={this.addSensor} />
        </div>
      </div>
    );
  }
}

export default App;
