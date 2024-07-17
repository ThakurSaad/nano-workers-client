import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";

import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MotionYAxisDown from "../../components/MotionYAxisDown";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <section>
      <div className="text-center mt-10 md:mt-20 mb-10">
        <SectionTitle
          heading={"Testimonials"}
          subHeading={
            "Learn What Our Clients Say From 120+ Different Countries"
          }
        />
      </div>
      <MotionYAxisDown>
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          loop={true}
          keyboard={{
            enabled: true,
          }}
          navigation={true}
          modules={[Navigation, Keyboard, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <div>
                <div className="flex flex-col items-center">
                  <img
                    src={testimonial.photo_url}
                    alt="photo"
                    className="rounded-full w-32"
                  />
                  <h4 className="text-xl md:text-2xl font-semibold text-neutral-600 mt-6 mb-2">
                    {testimonial.name}
                  </h4>
                </div>
                <div className="text-center">
                  <p className="tracking-wider md:max-w-sm mx-auto">
                    {testimonial.quote}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </MotionYAxisDown>
    </section>
  );
};

export default Testimonials;
