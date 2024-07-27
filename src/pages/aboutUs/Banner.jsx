import banner1 from "../../assets/aboutUs/banner-1.png";
import banner2 from "../../assets/aboutUs/banner-2.png";
import banner3 from "../../assets/aboutUs/banner-3.png";
import banner4 from "../../assets/aboutUs/banner-4.png";
import banner5 from "../../assets/aboutUs/banner-5.png";

import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import MotionYAxisDown from "../../components/MotionYAxisDown";

const Banner = () => {
  const slidesText = [
    {
      _id: "64bda8e28b6f1c5e7b1f4a21",
      heading: "Who We Are",
      subHeading:
        "Nano Workers is dedicated to revolutionizing micro-tasking and providing unparalleled earning opportunities.",
    },
    {
      _id: "64bda8e28b6f1c5e7b1f4a22",
      heading: "Our Mission",
      subHeading:
        "Our mission is to create a reliable platform that empowers users through efficient task management and rewarding experiences.",
    },
    {
      _id: "64bda8e28b6f1c5e7b1f4a23",
      heading: "What We Do",
      subHeading:
        "We provide a seamless micro-tasking platform that connects task creators with workers for mutual benefit and success.",
    },
    {
      _id: "64bda8e28b6f1c5e7b1f4a24",
      heading: "Our Values",
      subHeading:
        "At Nano Workers, we prioritize integrity, innovation, and inclusivity in everything we do.",
    },
    {
      _id: "64bda8e28b6f1c5e7b1f4a25",
      heading: "Our Vision",
      subHeading:
        "We envision a world where micro-tasking is a key driver of economic growth and individual empowerment.",
    },
  ];

  const slidesImage = [
    {
      _id: "64bda8e28b6f1c5e7b1f4a14",
      image: banner1,
    },
    {
      _id: "64bda8e28b6f1c5e7b1f4a13",
      image: banner2,
    },
    {
      _id: "64bda8e28b6f1c5e7b1f4a12",
      image: banner3,
    },
    {
      _id: "64bda8e28b6f1c5e7b1f4a15",
      image: banner4,
    },
    {
      _id: "64bda8e28b6f1c5e7b1f4a16",
      image: banner5,
    },
  ];

  return (
    <MotionYAxisDown>
      <section className="md:h-[550px] lg:h-[750px] flex flex-col md:flex md:flex-row justify-center items-center">
        <div className="w-full overflow-hidden max-w-2xl mt-6 md:mt-0">
          <Swiper
            className="mySwiper"
            loop={true}
            autoplay={{
              delay: 3000,
            }}
            modules={[Autoplay]}
          >
            {slidesText.map((slide) => (
              <SwiperSlide key={slide._id}>
                <h2 className="text-2xl md:text-4xl font-bold text-customOrange">
                  {slide.heading}
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold mt-4">
                  {slide.subHeading}
                </h3>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full overflow-hidden max-w-lg">
          <Swiper
            className="mySwiper"
            spaceBetween={30}
            loop={true}
            effect={"fade"}
            autoplay={{
              delay: 3000,
            }}
            modules={[EffectFade, Autoplay]}
          >
            {slidesImage.map((slide) => (
              <SwiperSlide key={slide._id}>
                <img src={slide.image} alt="image" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </MotionYAxisDown>
  );
};

export default Banner;
