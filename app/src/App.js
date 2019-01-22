import React, { Component } from 'react';
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


  render() {
    const sensors = this.state.data; 
    const sensorList = sensors.length ? (
        <div className="row">
        {sensors.map((sensor, index) => {
            return (
              <React.Fragment key={index}>
                  <Sensor sensor={sensor} sensor_class="normal" key={index} />
                  {(index+1) % 3 === 0 && index > 0 && !this.state.loading && <div className="w-100"></div>}
              </React.Fragment>
            )
        })}
      </div>
    ) : (!this.state.loading && <p>Ingen data..</p>)

    
    return (

      <div className="App">

      <div id="header">
            <p>Temperatur og Luftfuktighet</p>
        </div>

        <div className="container">
          {this.state.loading ? (
          <div className="text-center">
          <div className="spinner-border Top-margin" role="status"></div>
        </div>)
        : sensorList 
        }
        </div>
      </div>
    );
  }
}

export default App;
