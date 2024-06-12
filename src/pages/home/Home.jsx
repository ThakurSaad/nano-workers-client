import Banner from "./Banner";
import Featured from "./Featured";
import HowItWorks from "./howItWorks/HowItWorks";

const Home = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-2 xl:px-0">
      <Banner />
      <Featured />
      <HowItWorks />
    </div>
  );
};

export default Home;
