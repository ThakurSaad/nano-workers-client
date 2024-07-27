// arrayOfObject = an array of object
// propertyKeyStr = a specific property-key(string) of an object inside the array
// iterates over the array and returns sum of all the values that matches the key.

const useSumFunction = () => {
  return function sumFunction(arrayOfObject, propertyKeyStr) {
    return arrayOfObject.reduce((total, object) => {
      return total + object[propertyKeyStr];
    }, 0);
  };
};

export default useSumFunction;
