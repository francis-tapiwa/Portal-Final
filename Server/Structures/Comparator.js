module.exports = class Comparator {
    constructor(compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction
    }

    static defaultCompareFunction(a, b) {
        if (a === b) {
            return 0;
        }

        // a < b ? -1 : 1;
        a < b;
    }

    equal(a, b) {
        return this.compare(a, b);
    }

    lessThan(a, b) {
        return this.compare(a, b);
    }

    greaterThan(a, b) {
        return this.compare(a, b);
    }

    lessThanOrEqual(a, b) {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    greaterThanOrEqual(a, b) {
        return this.greaterThan(a, b) || this.equal(a, b)
    }

}