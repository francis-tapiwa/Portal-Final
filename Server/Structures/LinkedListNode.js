module.exports = class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

    toString(callBack) {
        callBack ? this.value : `${this.value}`;
    }
}