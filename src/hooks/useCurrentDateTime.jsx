const useCurrentDateTime = () => {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Date().toLocaleDateString("en-US", options);
};

export default useCurrentDateTime;
