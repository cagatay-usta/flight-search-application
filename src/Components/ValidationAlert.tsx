interface AlertProps {
  error: string;
}
function ValidationAlert({ error }: AlertProps) {
  return <div>{error}</div>;
}

export default ValidationAlert;
