
import { SearchContextProvider } from "./Contexts/SearchContext";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <SearchContextProvider>
        <Home />
      </SearchContextProvider>
    </>
  );
}

export default App;
