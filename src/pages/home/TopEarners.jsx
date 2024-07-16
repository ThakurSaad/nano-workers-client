import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { PiCoinsFill } from "react-icons/pi";
import badge from "../../assets/home/badge.png";

import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MotionRight from "../../components/MotionRight";

const TopEarners = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch("workers.json")
      .then((res) => res.json())
      .then((data) => setWorkers(data));
  }, []);

  const topWorkers = workers.sort((a, b) => b.coin - a.coin).slice(0, 6);

  return (
    <section>
      <div className="text-center mt-10 md:mt-20 mb-10">
        <SectionTitle heading={"Workers of The Month"} />
      </div>
      <MotionRight>
        {" "}
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          keyboard={{
            enabled: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          navigation={true}
          modules={[Navigation, Keyboard, Autoplay]}
          className="mySwiper"
        >
          {topWorkers.map((worker) => (
            <SwiperSlide key={worker._id}>
              <div className="w-full rounded-lg border relative hover:shadow-lg duration-75">
                <img
                  className="absolute w-32 lg:w-28 xl:w-32 -left-3"
                  src={badge}
                  alt="badge"
                />
                <div className="flex justify-center">
                  <img
                    src={worker.photo_url}
                    alt="image"
                    className="rounded-lg rounded-b-none"
                  />
                </div>
                <div className="flex justify-between items-center px-2 mt-4">
                  <h4 className="font-semibold text-customOrange">
                    {worker.display_name}
                  </h4>
                  <div className="flex bg-orange-200 w-24 px-3 py-1 rounded-lg">
                    <p className="text-xl font-semibold">{worker.coin}</p>
                    <PiCoinsFill className="text-3xl ml-2" />
                  </div>
                </div>
                <p className="px-2 mb-4">4 Task Completed</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </MotionRight>
    </section>
  );
};

export default TopEarners;
