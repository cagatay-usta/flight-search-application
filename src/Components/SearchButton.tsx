import { useSearchContext } from "../Contexts/SearchContext";

function SearchButton() {
  const { handleSearchParams } = useSearchContext();
  return (
    <button
      type="button"
      className="rounded-r-lg p-6 px-7 min-w-[205px] bg-sky-600 text-white font-semibold hover:bg-sky-400 active:bg-sky-300 flex-grow"
      onClick={() => handleSearchParams()}
    >
      Search
    </button>
  );
}

export default SearchButton;
