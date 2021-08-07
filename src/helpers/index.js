export function addIfNotInArray(arr, item) {
  if (arr.includes(item)) return arr;
  arr.push(item);
  return arr;
}

export function removeFromArrayMutably(arr, item) {
  const itemIndex = arr.indexOf(item);
  if (itemIndex === -1) return arr;
  arr.splice(itemIndex, 1);
  return arr;
}
