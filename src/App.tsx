import FlightDisplay from "./Components/FlightDisplay";
import SearchBox from "./Components/SearchBox";
import {SearchContextProvider} from "./Contexts/SearchContext";

function App() {
  return (
    <>
      <SearchContextProvider>
        <main>
          <SearchBox />
          <FlightDisplay />
        </main>
      </SearchContextProvider>
    </>
  );
}

export default App;
