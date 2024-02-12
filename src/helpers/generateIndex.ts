export const generateIndex = (
  index: number,
  lenArr: number,
  increment: boolean = false,
  decrement: boolean = false
): number => {
  let newIndex: number = 0;
  if (increment) newIndex = index += 1;
  if (decrement) newIndex = index -= 1;

  if (newIndex > lenArr - 1) return 0;
  else if (newIndex < 0) return lenArr - 1;
  return newIndex;
};
