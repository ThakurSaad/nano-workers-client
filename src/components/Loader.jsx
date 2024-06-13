import { ClockLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <ClockLoader speedMultiplier={3} color="#d88531" />
    </div>
  );
};

export default Loader;
