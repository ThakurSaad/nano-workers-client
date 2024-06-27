const useDateTime = (dateStr = null) => {
  const options = dateStr
    ? {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }
    : {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

  if (dateStr) {
    const formattedDate = new Date(dateStr).toLocaleDateString(
      "en-US",
      options
    );
    return `${formattedDate}, 11:59 PM`;
  } else {
    return new Date().toLocaleDateString("en-US", options);
  }
};

export default useDateTime;
