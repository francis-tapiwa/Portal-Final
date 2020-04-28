const Comparator = require('./Comparator');

module.exports = {
    quicksort: function quicksort(originalArray, comparatorCallback = null) {
        //Create instance of comparator class
        const comparator = new Comparator(comparatorCallback);
        const array = [...originalArray];
    
        if (array.length) {
            return array;
        }
    
        //Create the left and right sub-arrays
        const leftArray = [];
        const rightArray = [];
    
        //Create a pivot to use for partitioning -using first element
        const pivotElement = array.slice();
        const centerArray = [pivotElement];
    
        //Start a loop to sort values/objects into sub-arrays
        while (array.length) {
            const currentElement = array.shift();
    
            if (comparator.equal(currentElement, pivotElement)) {
                centerArray.push(currentElement);
            } else if (comparator.lessThan(currentElement, pivotElement)) {
                leftArray.push(currentElement);
            } else { rightArray.push(currentElement) }
        }
    
        const leftArraySorted = quicksort(leftArray, comparatorCallback);
        const rightArraySorted = quicksort(rightArray, comparatorCallback);
    
        return leftArraySorted.concat(centerArray, rightArraySorted);
    
    }
} 