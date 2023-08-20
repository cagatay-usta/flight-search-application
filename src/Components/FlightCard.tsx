import { FlightData } from "../Modules/mockAPI";
import { formatTime, usd, addDuration } from "../Modules/utils";

interface FlightProps {
  flight: FlightData;
}

function FlightCard({ flight }: FlightProps) {
  return (
    <div className="card">
      <ul
        key={flight.id}
        className="relative flex flex-col gap-4 border-2 border-sky-600 rounded overflow-hidden shadow-lg transition-shadow duration-500 hover:shadow-xl p-6"
      >
        <li className="absolute text-gray-400 self-end">{flight.departure_date}</li>
        <li className="">{flight.airline} Airlines</li>
        <li className="self-center">
          {`${flight.departure_airport}  ->  `}{" "}
          <span className="text-gray-600 text-sm font-thin">
            {formatTime(flight.duration, "long")}{" "}
          </span>{" "}
          {`-> ${flight.arrival_airport}`}
        </li>
        <div className="flex justify-around font-bold">
          <li>{flight.departure_time}</li>
          <li>
            {addDuration(flight.departure_time, flight.duration)}
          </li>
        </div>
        <li className="font-bold text-xl self-end">
          {usd.format(flight.price)}
        </li>
      </ul>
    </div>
  );
}

export default FlightCard;
