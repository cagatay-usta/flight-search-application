import SearchBox from "./Components/SearchBox";
import {SearchContextProvider} from "./Contexts/SearchContext";

function App() {
  return (
    <>
      <SearchContextProvider>
        <main>
          <SearchBox />
        </main>
      </SearchContextProvider>
    </>
  );
}

export default App;
