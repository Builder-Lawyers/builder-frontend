const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 4 }, { value: 5 }],
    },
    {
      value: 3,
      children: [{ value: 6 }, { value: 7 }],
    },
  ],
};

function treeWayRecursion(arg) {
  let result = [];

  const wrapper = (secArg) => {
    if (Array.isArray(secArg)) {
      secArg.forEach((elem) => {
        wrapper(elem);
      });
    } else if (typeof secArg === "object" && secArg !== null) {
      for (let key in secArg) {
        wrapper(secArg[key]);
      }
    } else {
      result.push(secArg);
    }
  };

  wrapper(arg);

  return result;
}

console.warn(treeWayRecursion(tree));
