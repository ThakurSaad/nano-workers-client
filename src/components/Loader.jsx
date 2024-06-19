import { ClockLoader } from "react-spinners";

const Loader = ({ height }) => {
  return (
    <div className={`${height} flex items-center justify-center`}>
      <ClockLoader speedMultiplier={3} color="#d88531" />
    </div>
  );
};

export default Loader;
