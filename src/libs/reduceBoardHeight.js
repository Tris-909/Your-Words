export const reduceBoardHeight = (limit, notes, headings, images) => {
  console.log("params", limit, notes, headings, images);
  const returnValue = {
    result: true,
    message: "",
  };

  notes.forEach((item) => {
    if (item.y > limit) {
      returnValue.result = false;
      returnValue.message = "There are notes on the zone you want to delete";
      return returnValue;
    }
  });

  headings.forEach((item) => {
    if (item.y > limit) {
      returnValue.result = false;
      returnValue.message = "There are headings on the zone you want to delete";
      return returnValue;
    }
  });

  images.forEach((item) => {
    if (item.y > limit) {
      returnValue.result = false;
      returnValue.message = "There are images on the zone you want to delete";
      return returnValue;
    }
  });

  return returnValue;
};
