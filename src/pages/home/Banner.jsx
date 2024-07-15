import SectionTitle from "../../components/SectionTitle";
import bannerBg from "../../assets/home/banner-bg.png";
import banner1 from "../../assets/home/banner-6.png";
import banner2 from "../../assets/home/banner-7.png";
import banner3 from "../../assets/home/banner-8.png";
import banner4 from "../../assets/home/banner-9.png";
import banner5 from "../../assets/home/banner-10.png";

import { motion } from "framer-motion";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    {
      _id: 1,
      title: "Streamline Your Tasks",
      titlePart: "Effortlessly",
      subHeading: "Plan, Track, and Execute with Precision",
      subTitle:
        "An intuitive platform designed to help you manage tasks, organize projects, and prioritize your workflow.",
      image: banner1,
    },
    {
      _id: 2,
      title: "Boost Your Productivity",
      titlePart: "Significantly",
      subHeading: "Maximize Efficiency with Smart Tools",
      subTitle:
        "Advanced features and integrations to ensure you stay on top of your deadlines and achieve your goals faster.",
      image: banner2,
    },
    {
      _id: 3,
      title: "Collaborate with Your",
      titlePart: "Team Seamlessly",
      subHeading: "Work Together, Achieve Together",
      subTitle:
        "Empower your team with real-time collaboration, shared workspaces, and seamless communication.",
      image: banner3,
    },
    {
      _id: 4,
      title: "Stay Organized",
      titlePart: "Easily",
      subHeading: "Everything You Need in One Place",
      subTitle:
        "A comprehensive dashboard to track your tasks, projects, and deadlines, all in one convenient location.",
      image: banner4,
    },
    {
      _id: 5,
      title: "Simplify Task",
      titlePart: "Management",
      subHeading: "Your Work, Simplified",
      subTitle:
        "User-friendly interface and powerful features to help you streamline your workflow and get more done.",
      image: banner5,
    },
  ];

  return (
    <section
      style={{
        backgroundImage: `url(${bannerBg})`,
        backgroundSize: "cover",
      }}
      className="md:h-[550px] lg:h-[750px] md:flex items-center"
    >
      <Swiper
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
        autoplay={{
          delay: 3500,
        }}
        modules={[Autoplay]}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide._id}>
            <Slide
              title={slide.title}
              titlePart={slide.titlePart}
              subHeading={slide.subHeading}
              subTitle={slide.subTitle}
              image={slide.image}
              isActive={index === activeIndex}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const Slide = ({ title, titlePart, subHeading, subTitle, image, isActive }) => {
  return (
    <div className="md:flex justify-center items-center mx-3 md:mx-10">
      <div className="md:w-1/2 text-white">
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={
            isActive ? { x: 0, opacity: 1 } : { x: "-100vw", opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 50, duration: 1 }}
        >
          <motion.h1
            className="text-3xl md:text-5xl xl:text-7xl font-bold pt-6 lg:pt-0"
            initial={{ x: "-100vw", opacity: 0 }}
            animate={
              isActive ? { x: 0, opacity: 1 } : { x: "-100vw", opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
          >
            {title} <span className="text-customOrange">{titlePart}</span>
          </motion.h1>
          <motion.div
            className="my-2 sm:my-4 lg:my-7"
            initial={{ x: "-100vw", opacity: 0 }}
            animate={
              isActive ? { x: 0, opacity: 1 } : { x: "-100vw", opacity: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 50,
              duration: 0.5,
              delay: 0.5,
            }}
          >
            <SectionTitle subHeading={subHeading} />
          </motion.div>
          <motion.p
            initial={{ x: "-100vw", opacity: 0 }}
            animate={
              isActive ? { x: 0, opacity: 1 } : { x: "-100vw", opacity: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 50,
              duration: 0.5,
              delay: 1,
            }}
          >
            {subTitle}
          </motion.p>
        </motion.div>
      </div>
      <div className="flex justify-center items-center md:w-1/2">
        <motion.img
          src={image}
          alt="banner"
          className="h-80 md:h-[400px] lg:h-[500px]"
          initial={{ y: "100vh", opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: "100vh", opacity: 0 }}
          transition={{ type: "spring", stiffness: 50, duration: 1 }}
        />
      </div>
    </div>
  );
};

export default Banner;
