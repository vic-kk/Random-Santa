const reSort = (input) => {
  const initIds = input.map(item => item.id_from)
  let temp = [...initIds];
  let newIds = new Map;
  let iterator = 0;

  while (temp.length > 0) {
    const randomIndex = Math.floor(Math.random() * temp.length);
    const key = initIds[iterator];
    let val = temp.splice(randomIndex, 1)[0];

    if (key === val) {
      // console.warn('warn pos', initIds[iterator]);
      temp = [...initIds];
      newIds = new Map;
      iterator = 0;
      val = 0;
    }
    
    if (val) {
      newIds.set(key, val)
      iterator+=1;
    }
  }

  const newSort = input.map((item) => ({
    id_from: newIds.get(item.id_from),
    gender: item.gender,
    wishes: item.wishes,
    ozon_address: item.ozon_address,
    wb_address: item.wb_address
  }))
  // return ({
  //   newIds: newIds,
  //   newSort: newSort,
  // });
  const result = new Map();
  return result.set('newSort', newSort).set('newIds', newIds);
};