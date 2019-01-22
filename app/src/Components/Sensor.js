import React from 'react'; 

const Sensor = (props) => {

    const {sensor} = props; 
    const { sensor_class } = props; 
 
 

    let className = sensor_class === "normal" ? "data-box normal" : (
        sensor_class === "cold" ? "data-box cold" : "data-box hot"
    ); 

    let bar_style = {
        width: sensor.humidity+"%"
    }
    return (
        <React.Fragment>
        <div className="col-md-4">
            <div className={className}>
                <h4 className="location-title">{sensor.name}</h4>
                <hr/>
                <ul className="data">
                    <li className="temperature">{sensor.temp}&#8451;</li>
                    <li className="humidity"><i className="wi wi-humidity"></i>{sensor.humidity}%</li>
                </ul>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-danger progress-bar-animated" style={bar_style}></div>
                    </div>


                <div className="statistics">
                    <h4 className="location-title left">Statistikk</h4>
                    <ul className="statistics">
                        <li className="title">Gjennomsnitlig temperatur: <span className="stat-data">{sensor.average_temperature}</span></li>
                        <li className="title">Høyeste temperatur siste døgn: <span className="stat-data">{sensor.highest_24_hour}</span></li>
                        <li className="title">Høyeste temperatur målt: <span className="stat-data">{sensor.highest_all_time}</span></li>
                    </ul>

                    <ul className="statistics">
                        <li className="title">Gjennomsnitlig Luftfuktighet - <span className="stat-data">{sensor.avegare_humidity}%</span></li>
                        <li className="title">Høyeste Luftfuktighet siste 24 timer: <span className="stat-data">{sensor.average_humidity_24_hour}%</span></li>
                        <li className="title">Høyeste Luftfuktighet målt: <span className="stat-data"> {sensor.highest_humidity_all_time}%</span></li>
                    </ul>

                    <ul className="statistics">
                    </ul>
                </div>
            </div>
        </div>
        </React.Fragment>

    )
}

export default Sensor