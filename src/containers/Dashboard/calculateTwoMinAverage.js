const lastTwoMinAverage = lists => {
  if (lists.length < 7) {
    return -1;
  } else {
    const firstMinute = lists[lists.length - 1];
    const secondMinute = lists[lists.length - 7];
    return (Object.values(firstMinute)[0] + Object.values(secondMinute)[0]) / 2;
  }
};

export default lastTwoMinAverage;
