import Banner from "./Banner";
import Blogs from "./Blogs";
import FAQ from "./FAQ";
import Featured from "./Featured";
import HowItWorks from "./HowItWorks";
import Partners from "./Partners";
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
        <Partners />
        <Testimonials />
        <Blogs />
        <FAQ />
      </div>
    </section>
  );
};

export default Home;
