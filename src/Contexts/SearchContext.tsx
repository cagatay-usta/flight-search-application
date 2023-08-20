/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { SearchParams } from "../Modules/mockAPI";
import { dateToString } from "../Modules/utils";

type SearchProviderProps = {
  children: ReactNode;
};

type Destination = {
  from: string;
  to: string;
};

type Dates = {
  depart: Date | undefined;
  return?: Date | undefined;
};

type ValidationError = {
  emptyFrom: boolean;
  emptyTo: boolean;
  departBigger: boolean;
  samePort: boolean;
};

type SearchContext = {
  oneWay: boolean;
  setOneWay: React.Dispatch<React.SetStateAction<boolean>>;
  destination: Destination;
  dates: Dates;
  handleDestination: (destination: string, label: string) => void;
  handleDates: (date: Date | undefined, label: string) => void;
  displayFlights: boolean;
  searchParams: SearchParams;
  handleSearchParams: () => void;
  validationAlert: ValidationError;
  errorMessage: string;
};

const SearchContext = createContext({} as SearchContext);

export function useSearchContext() {
  return useContext(SearchContext);
}

export function SearchContextProvider({ children }: SearchProviderProps) {
  const [destination, setDestination] = useState<Destination>({
    from: "",
    to: "",
  });

  function handleDestination(destination: string, label: string) {
    setDestination((prevState) => {
      return { ...prevState, [label]: destination };
    });
    if (label === "from") {
      setValidationAlert((prevState) => {
        return { ...prevState, emptyFrom: false };
      });
    }
    if (label === "to") {
      setValidationAlert((prevState) => {
        return { ...prevState, emptyTo: false };
      });
    }
  }

  const [dates, setDates] = useState<Dates>({
    depart: new Date(),
    return: new Date(),
  });
  const [oneWay, setOneWay] = useState(false);

  function handleDates(date: Date | undefined, label: string) {
    setDates((prevState) => {
      return { ...prevState, [label]: date };
    });
  }

  const [displayFlights, setDisplayFlights] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "",
    to: "",
    depart: "",
  });

  const [validationAlert, setValidationAlert] = useState<ValidationError>({
    emptyFrom: false,
    emptyTo: false,
    departBigger: false,
    samePort: false,
  });

  function handleSearchParams() {
    if (!destination.from) {
      setValidationAlert((prevState) => {
        return { ...prevState, emptyFrom: true };
      });
      return;
    }
    setValidationAlert((prevState) => {
      return { ...prevState, emptyFrom: false };
    });
    if (!destination.to) {
      setValidationAlert((prevState) => {
        return { ...prevState, emptyTo: true };
      });
      return;
    }
    setValidationAlert((prevState) => {
      return { ...prevState, emptyTo: false };
    });
    if (!dates.depart) {
      return;
    }
    if (destination.from === destination.to) {
      setValidationAlert((prevState) => {
        return { ...prevState, samePort: true };
      });
      return;
    }
    setValidationAlert((prevState) => {
      return { ...prevState, samePort: false };
    });
    if (!oneWay && dates.return && dates.return.getTime() < dates.depart.getTime()) {
      setValidationAlert((prevState) => {
        return { ...prevState, departBigger: true };
      });
      return;
    }
    setValidationAlert((prevState) => {
      return { ...prevState, departBigger: false };
    });

    const depart = dateToString(dates.depart);
    setSearchParams({
      from: destination.from,
      to: destination.to,
      depart: depart,
    });

    setDisplayFlights(true);
  }

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let updatedError = "";
    if (validationAlert.emptyFrom) {
      updatedError = "Please select a valid departure destination.";
    } else if (validationAlert.emptyTo) {
      updatedError = "Please select a valid arrival destination.";
    } else if (validationAlert.departBigger) {
      updatedError = "Departure date cannot be later than return date.";
    } else if (validationAlert.samePort) {
      updatedError = "Departure and arrival airports cannot be the same.";
    }
    setErrorMessage(updatedError);
  }, [validationAlert]);

  return (
    <SearchContext.Provider
      value={{
        oneWay,
        setOneWay,
        destination,
        handleDestination,
        dates,
        handleDates,
        displayFlights,
        searchParams,
        handleSearchParams,
        validationAlert,
        errorMessage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
