const reSort = (input) => {
  let temp = [...input];
  let result = new Map;
  let iterator = 0;

  while (temp.length > 0) {
    const randomIndex = Math.floor(Math.random() * temp.length);
    const key = input[iterator];
    let val = temp.splice(randomIndex, 1)[0];

    if (key === val) {
      // console.warn('warn pos', input[iterator]);
      temp = [...input];
      result = new Map;
      iterator = 0;
      val = 0;
    }
    
    if (val) {
      result.set(key, val)
      iterator+=1;
    }
  }

  return result;
};

// change ids in object
// ADDRESSES.map((item) => ({...item, id: newIds.get(item.id)}))