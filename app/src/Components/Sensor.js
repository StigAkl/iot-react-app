import React from 'react'; 
import Statistics from './Statistics'

const Sensor = (props) => {

    const {sensor} = props; 
    const { sensor_class } = props; 

    let className = sensor_class === "normal" ? "data-box normal" : (
        sensor_class === "cold" ? "data-box cold" : "data-box hot"
    ); 

    let barType = sensor_class === "normal" ? "bg-success" : (
        sensor_class === "cold" ? "bg-striped" : "bg-danger"
    ); 

    let bar_style = {
        width: sensor.humidity+"%"
    }

    console.log(barType)

    return (
        <React.Fragment>
        <div className="col-md-4">
            <div className={className}>
                <h4 className="location-title">{sensor.name}</h4>
                <hr/>
                <ul className="data">
                    <li className="temperature">{sensor.temp}&#8451;</li>
                    <li className="humidity"><i className="wi wi-humidity"></i> {sensor.humidity}%</li>
                </ul>
                    <div className="progress">
                        <div className={"progress-bar progress-bar-striped progress-bar-animated " + barType} style={bar_style}></div>
                    </div>
                    <br />


                <Statistics sensor={sensor} />
            </div>
        </div>
        </React.Fragment>

    )
}

export default Sensor