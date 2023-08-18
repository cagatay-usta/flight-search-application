interface AutoCompleteProps {
  id: string;
}

function AutoComplete({ id }: AutoCompleteProps) {
  return (
    <>
      <label htmlFor={id} className="absolute  left-[.4rem]">
        From
      </label>
      <input
        type="text"
        className="pt-6 pb-4 px-2 rounded-l-xl"
        placeholder="Country, city or airport"
        id={id}
      />
    </>
  );
}

export default AutoComplete;
