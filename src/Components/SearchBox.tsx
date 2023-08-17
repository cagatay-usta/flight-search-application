import DatePicker from "./DatePicker"

function SearchBox() {
  return (
    <>
      <div className="search-box-container flex">
        <div className="input-container">
          <label htmlFor="from">From</label>
          <input type="text" placeholder="Country, city or airport" id="from"/>
        </div>
        <div className="input-container">
          <label htmlFor="to">To</label>
          <input type="text" placeholder="Country, city or airport" id="to"/>
        </div>
        <div className="input-container">
          <p>Depart</p>
          <DatePicker/>
        </div>
      </div>
    </>
  )
}

export default SearchBox