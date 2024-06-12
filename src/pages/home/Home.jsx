import Banner from "./Banner";
import Featured from "./Featured";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import TopEarners from "./TopEarners";

const Home = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-2 xl:px-0">
      <Banner />
      <Featured />
      <HowItWorks />
      <TopEarners />
      <Testimonials/>
    </div>
  );
};

export default Home;
