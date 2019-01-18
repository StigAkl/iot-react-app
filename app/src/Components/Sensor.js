import React from 'react'; 

const Sensor = (props) => {

    const {sensor} = props; 

    return (
        <div className="col-md-4 Top-margin">
        <div className="sensor-box">
            <p>Name: {sensor.name}</p>
            <p>Temperature: {sensor.temp}</p>
            <p>Humidity: {sensor.humidity}</p>
        </div>
        </div>
    )
}

export default Sensor