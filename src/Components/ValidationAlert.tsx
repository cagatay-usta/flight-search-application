interface AlertProps {
  error: string;
}
function ValidationAlert({ error }: AlertProps) {
  return <div className="border-2 border-red-400 p-2 bg-red-200 text-red-800 flex justify-center">{error}</div>;
}

export default ValidationAlert;
