import { useInView } from "framer-motion";
import { useRef } from "react";

const SectionTitle = ({ heading, subHeading }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className="mb-4"
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
    >
      {heading && (
        <h2 className="text-2xl md:text-4xl font-bold text-customOrange">
          {heading}
        </h2>
      )}
      {subHeading && (
        <h3 className="text-xl md:text-2xl font-semibold mt-4">{subHeading}</h3>
      )}
    </div>
  );
};

export default SectionTitle;
