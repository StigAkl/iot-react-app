import React, { Component } from 'react';
import axios from 'axios'
import Sensor from './Components/Sensor'

class App extends Component {

  state = {
    loading: true, 
    data: [],
    average_temp: []
  }

  componentDidMount() {
 
    this.setData(); 
    this.fetchAverageTemps(); 

    setInterval(() => {

      this.setData(); 
      this.fetchAverageTemps(); 

    }, 1000*60*2)
  }

  setData() {

    let localhost = "http://localhost:5000/"
    let heroku_host = "https://limitless-mesa-30279.herokuapp.com"
    axios.get(heroku_host).then(res => {
      this.setState({
        data: res.data,
        loading: false
      })
    }).catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  fetchAverageTemps(data) {
    console.log("fetching..")
    let endpoint = "https://limitless-mesa-30279.herokuapp.com/api/average/temp/";
      axios.get(endpoint).then(res => {
         this.setState({
           average_temp: res.data
         })

         console.log(this.state)
      })
}

  render() {
    let themes = ['normal', 'cold', 'hot']; 

    const sensors = this.state.data; 
    const sensorList = sensors.length ? (
        <div className="row">
        {sensors.map((sensor, index) => {
            return (
              <React.Fragment key={index}>
                  <Sensor sensor={sensor} average_temp={this.state.average_temp} sensor_class={themes[index % (themes.length)]} key={index} />
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

        <div className="container-fluid">
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
