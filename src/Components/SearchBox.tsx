import DatePicker from "./DatePicker";
import AutoComplete from "./AutoComplete";
import { useSearchContext } from "../Contexts/SearchContext";
import OneWayBox from "./OneWayBox";
import SearchButton from "./SearchButton";

function SearchBox() {
  const { oneWay } = useSearchContext();
  return (
    <>
      <div className="flex justify-center bg-sky-900">
        <div className="search-box-container flex flex-wrap justify-center w-4/5 gap-1  text-gray-600 p-16 items-center">
          <AutoComplete id="from" />
          <AutoComplete id="to" />
          <OneWayBox />
          <DatePicker label="Depart" />
          <DatePicker label="Return" oneWay={oneWay} />
          <SearchButton />
        </div>
      </div>
    </>
  );
}

export default SearchBox;
