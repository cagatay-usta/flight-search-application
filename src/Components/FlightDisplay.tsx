import { useSearchContext } from "../Contexts/SearchContext";
import { useMockFetch } from "../Modules/mockAPI";
import { sortFlightData } from "../Modules/utils";
import { useState } from "react";
import FlightCard from "./FlightCard";

function FlightDisplay() {
  const [sort, setSort] = useState("date");
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
        {match && <p className="text-sky-800 p-5 font-semibold">{match}</p>}
        <div className="selection-container flex gap-2 justify-end p-2">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" onChange={(e) => setSort(e.target.value)}>
            <option value="date">Departure Date</option>
            <option value="price">Price</option>
            <option value="duration">Flight duration</option>
            <option value="time">Departure Time</option>
          </select>
        </div>
        <div className="fligt-cards-container grid gap-3 p-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {sortFlightData(flightData, sort)?.map((flight) => {
            return <FlightCard flight={flight} />;
          })}
        </div>
      </div>
    </>
  );
}

export default FlightDisplay;
