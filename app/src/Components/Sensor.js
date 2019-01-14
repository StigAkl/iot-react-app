import React from 'react'; 

const Sensor = (props) => {

    const {sensor} = props; 
    console.log(sensor)
    return (
        <div className="col-md-4 Top-margin">
            <p>Name: {sensor.name}</p>
            <p>Temperature: {sensor.temp}</p>
            <p>Humidity: {sensor.humidity}</p>
        </div>
    )
}

export default Sensor