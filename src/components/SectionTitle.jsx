const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mb-4">
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
