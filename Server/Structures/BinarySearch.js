import Comparator from './Comparator';

export default function binarySearch(sortedArray, seekElement, comparatorCallback) {
  const comparator = new Comparator(comparatorCallback);

  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    if (comparator.equal(sortedArray[middleIndex], seekElement)) {
      return middleIndex;
    }

    if (comparator.lessThan(sortedArray[middleIndex], seekElement)) {
      // Go to the right half of the array.
      startIndex = middleIndex + 1;
    } else {
      // Go to the left half of the array.
      endIndex = middleIndex - 1;
    }
  }
  return -1;
}
