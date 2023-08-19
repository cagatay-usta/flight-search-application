import { useSearchContext } from "../Contexts/SearchContext";
import { useMockFetch } from "../Modules/mockAPI";
import { formatTime, usd } from "../Modules/utils";

function FlightDisplay() {
  const { searchParams } = useSearchContext();

  const { flightData, error, loading, match } = useMockFetch(
    "https://api.flightsearch.com/flights",
    searchParams
  );
  if (error) return <p>Network Error</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <div>
        {match && <p>{match}</p>}
        {flightData?.map((flight) => {
          return (
            <ul key={flight.id} className="border border-slate-700">
              <li>Airline: {flight.airline}</li>
              <li>From: {flight.departure_airport}</li>
              <li>To: {flight.arrival_airport}</li>
              <li>Departure Date: {flight.departure_date}</li>
              <li>Departure Time: {flight.departure_time}</li>
              <li>Flight Duration: {formatTime(flight.duration)}</li>
              <li>Price: {usd.format(flight.price)}</li>
            </ul>
          );
        })}
      </div>
    </>
  );
}

export default FlightDisplay;
