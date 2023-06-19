export const generateIndex = (
  index,
  lenArr,
  increment = false,
  decrement = false
) => {
  let newIndex;
  if (increment) newIndex = index += 1;
  if (decrement) newIndex = index -= 1;

  if (newIndex > lenArr - 1) return 0;
  else if (newIndex < 0) return lenArr - 1;
  return newIndex;
};
