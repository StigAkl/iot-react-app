import React from 'react'

const Statistics = (props) => {
    const {sensor} = props; 
    const { average_temp } = props; 
    return (
    
     <div className="statistics">
    <h4 className="location-title left">Statistikk</h4>
     { <ul className="statistics">
        <li className="title">Gjennomsnitlig temperatur i dag: <span className="stat-data">{average_temp}</span></li>
        </ul>
        /*
        <li className="title">Høyeste temperatur siste døgn: <span className="stat-data">{sensor.highest_24_hour}</span></li>
        <li className="title">Høyeste temperatur målt: <span className="stat-data">{sensor.highest_all_time}</span></li>
    </ul> 

    <ul className="statistics">
        <li className="title">Gjennomsnitlig Luftfuktighet - <span className="stat-data">{sensor.avegare_humidity}%</span></li>
        <li className="title">Høyeste Luftfuktighet siste 24 timer: <span className="stat-data">{sensor.average_humidity_24_hour}%</span></li>
        <li className="title">Høyeste Luftfuktighet målt: <span className="stat-data"> {sensor.highest_humidity_all_time}%</span></li>
    </ul>

    */}

    <ul className="statistics">
    <li>Ikke implementert enda</li>
    </ul>
</div> 

)
}

export default Statistics