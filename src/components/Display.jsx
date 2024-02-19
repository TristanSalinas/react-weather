import { useEffect, useState } from "react";
import "/src/styles/display.css";

const week = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

function Day(props) {
  return (
    <div onClick={props.handleClick} className="day">
      <h2>{props.name}</h2>
      <img src={props.infos.averageCondition.iconPath} />
      <p>{props.infos.averageCondition.text}</p>
    </div>
  );
}

function Hours(props) {
  return (
    <div className="hours">
      {props.data.map((hour, index) => {
        return (
          <div key={index} className="hour">
            <img className="hour-icon" src={hour.iconPath} />
            <p>{hour.temp}°</p>
            <p>{hour.time}</p>
          </div>
        );
      })}
    </div>
  );
}

function dateToDayOfTheWeek(date) {
  return week[date.getDay()];
}

export default function Display(props) {
  const [currDay, setCurrDay] = useState(0);

  const selectorOffset = [
    { left: 0 + "%" },
    { left: 33.3 + "%" },
    { left: 66.6 + "%" },
  ];

  return (
    <div>
      <h1>
        {props.forecast.location.name}, {props.forecast.location.region}{" "}
      </h1>
      <div className="card">
        <div className="days">
          <div className="selector" style={selectorOffset[currDay]}></div>
          <Day
            handleClick={() => {
              setCurrDay(0);
            }}
            name={dateToDayOfTheWeek(props.forecast.days[0].date)}
            infos={props.forecast.days[0]}
          />
          <Day
            handleClick={() => {
              setCurrDay(1);
            }}
            name={dateToDayOfTheWeek(props.forecast.days[1].date)}
            infos={props.forecast.days[1]}
          />
          <Day
            handleClick={() => {
              setCurrDay(2);
            }}
            name={dateToDayOfTheWeek(props.forecast.days[2].date)}
            infos={props.forecast.days[2]}
          />
        </div>
        <Hours data={props.forecast.days[currDay].hours} />
      </div>
    </div>
  );
}
