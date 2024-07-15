import Banner from "./Banner";
import Featured from "./Featured";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import TopEarners from "./TopEarners";

const Home = () => {
  return (
    <section className="max-w-screen-2xl mx-auto">
      <Banner />
      <div className="max-w-screen-xl mx-auto px-2 xl:px-0">
        <Featured />
        <HowItWorks />
        <TopEarners />
        <Testimonials />
      </div>
    </section>
  );
};

export default Home;
