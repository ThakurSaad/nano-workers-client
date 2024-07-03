const useSumFunction = () => {
  return function sumFunction(arrayOfObject, propertyKeyStr) {
    return arrayOfObject.reduce((total, object) => {
      return total + object[propertyKeyStr];
    }, 0);
  };
};

export default useSumFunction;
