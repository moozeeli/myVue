"use strict";

function Set(arr) {
    var items = {};
    if (Array.isArray(arr)) {
        arr.forEach(function (item, index) {
            items[item] = item.toString();
        });
    }
    this.add = function (value) {
        if (!this.has(value)) {
            items[value] = value;
            return true;
        }
        return false;
    };

    this.remove = function (value) {
        if (this.has(value)) {
            delete items[value];
            return true;
        }
        return false;
    };

    this.has = function (value) {
        return items.hasOwnProperty(value);
    };

    this.clear = function () {
        items = {};
    };

    this.values = function () {
        return Object.keys(items);
    };
    this.size = function () {
        return Object.keys(items).length;
    };
    this.print = function () {
        console.log(Object.keys(items));
    };

    //  合并
    this.union = function name(otherSet) {
        var unionSet = new Set();
        var values = this.values();
        values.forEach(function (element) {
            unionSet.add(element);
        });

        values = otherSet.values();
        values.forEach(function (element) {
            unionSet.add(element);
        });

        return unionSet;
    };

    //  取交集
    this.intersection = function (otherSet) {
        var intersectiongSet = new Set();

        var values = this.values();
        values.forEach(function (item) {
            if (otherSet.has(item)) {
                intersectiongSet.add(item);
            }
        });
        return intersectiongSet;
    };
    this.difference = function (otherSet) {
        var differenceSet = new Set();
        var values = this.values();
        values.forEach(function (item) {
            if (!otherSet.has(item)) {
                differenceSet.add(item);
            }
        });
        return differenceSet;
    };
    // 判断是否是传入集合的子集
    this.isSubsetOf = function (otherSet) {
        var values = this.values();
        if (this.size() > otherSet.size()) {
            return false;
        } else {
            values.forEach(function (item) {
                if (!otherSet.has(item)) {
                    return false;
                }
            });
            return true;
        }
    };
}

module.exports = Set;