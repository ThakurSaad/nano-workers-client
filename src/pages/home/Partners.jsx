import partner1 from "../../assets/home/partner-1.png";
import partner4 from "../../assets/home/partner-4.png";
import partner5 from "../../assets/home/partner-5.png";
import partner9 from "../../assets/home/partner-9.png";
import partner10 from "../../assets/home/partner-10.png";
import partner11 from "../../assets/home/partner-11.png";
import partner12 from "../../assets/home/partner-12.png";
import partner13 from "../../assets/home/partner-13.png";
import partner14 from "../../assets/home/partner-14.png";
import partner15 from "../../assets/home/partner-15.png";
import partner16 from "../../assets/home/partner-16.png";
import partner17 from "../../assets/home/partner-17.png";
import partner18 from "../../assets/home/partner-18.png";
import partner19 from "../../assets/home/partner-19.png";
import partner20 from "../../assets/home/partner-20.png";
import SectionTitle from "../../components/SectionTitle";

const Partners = () => {
  const partners = [
    partner1,
    partner4,
    partner5,
    partner9,
    partner10,
    partner11,
    partner12,
    partner13,
    partner14,
    partner15,
    partner16,
    partner17,
    partner18,
    partner19,
    partner20,
  ];
  return (
    <section>
      <div className="text-center mt-10 md:mt-20 mb-10">
        <SectionTitle
          heading={"Our Trusted Partners"}
          subHeading={
            "Building Success Together with Leading Industry Partners"
          }
        />
      </div>
      <div className="grid justify-items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {partners.map((partner, index) => (
          <img
            key={index}
            src={partner}
            alt="image"
            className="rounded-full w-40 h-40"
          />
        ))}
      </div>
    </section>
  );
};

export default Partners;
