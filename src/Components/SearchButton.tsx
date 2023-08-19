import { useSearchContext } from "../Contexts/SearchContext";

function SearchButton() {
  const { handleFlightDisplay } = useSearchContext();
  return (
    <button
      type="button"
      className="rounded-r-lg p-[1.275rem] px-7 bg-sky-600 text-white font-semibold hover:bg-sky-400 active:bg-sky-300 flex-grow"
      onClick={() => handleFlightDisplay()}
    >
      Search
    </button>
  );
}

export default SearchButton;
