import SectionTitle from "../../components/SectionTitle";
import bannerImage from "../../assets/home/banner.png";

const Banner = () => {
  return (
    <section>
      <div className="md:flex justify-center items-center md:mt-10">
        <div className="md:w-2/5">
          <h1 className="text-2xl md:text-5xl font-bold mb-4">
            Streamline Your Tasks{" "}
            <span className="text-customOrange">Effortlessly</span>
          </h1>
          <SectionTitle
            subHeading={"Plan, Track, and Execute with Precision"}
          />
          <p className="py-3">
            An intuitive platform designed to help you manage tasks, organize
            projects, and prioritize your workflow
          </p>
        </div>
        <div className="md:w-3/5">
          <img src={bannerImage} alt="banner" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
