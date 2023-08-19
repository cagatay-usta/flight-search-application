import FlightDisplay from "../Components/FlightDisplay";
import SearchBox from "../Components/SearchBox";
import ValidationAlert from "../Components/ValidationAlert";
import { useSearchContext } from "../Contexts/SearchContext";

function Home() {
  const { displayFlights, errorMessage } = useSearchContext();
  return (
    <main>
      <SearchBox />
      {errorMessage && <ValidationAlert error={errorMessage} />}
      {displayFlights && <FlightDisplay />}
    </main>
  );
}

export default Home;
