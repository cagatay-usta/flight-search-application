import FlightDisplay from "../Components/FlightDisplay";
import SearchBox from "../Components/SearchBox";
import { useSearchContext } from "../Contexts/SearchContext";

function Home() {
  const { displayFlights } = useSearchContext();
  return (
    <main>
      <SearchBox />
      {displayFlights && <FlightDisplay />}
    </main>
  );
}

export default Home;
