const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div>
      {heading && (
        <h2 className="text-2xl md:text-4xl font-bold text-customOrange">
          {heading}
        </h2>
      )}
      <h3 className="text-xl md:text-2xl font-semibold my-4">{subHeading}</h3>
    </div>
  );
};

export default SectionTitle;
