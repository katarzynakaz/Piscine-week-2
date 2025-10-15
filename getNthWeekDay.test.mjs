import { getNthWeekday } from "./getNthWeekday.mjs";
import assert from "node:assert";
import test from "node:test";

test("returns 3rd Wednesday of November 2027", () => {
    const date = getNthWeekday(2027, 11, 3, 3);
    assert.equal(date.getDay(), 3);
    // the main goal of function is to ged day of month, rest checks just for validity
    assert.equal(date.getDate(), 17);
    // months ar counted starting from 0
    assert.equal(date.getMonth() + 1, 11);
    assert.equal(date.getFullYear(), 2027);
});

test("searched day is first day of month", () => {
    const date = getNthWeekday(2025, 9, 1, 1);
    assert.equal(date.getDay(), 1);
    assert.equal(date.getDate(), 1);
    assert.equal(date.getMonth() + 1, 9);
    assert.equal(date.getFullYear(), 2025);
});

test("searched day is not in this month", () => {
    const date = getNthWeekday(2025, 2, 4, 5);
    assert.equal(date.getDay(), 4);
    assert.equal(date.getDate(), 6);//date from next month
    //next month is 3, not 2 because February 2025 have not 5th Thursday
    assert.equal(date.getMonth() + 1, 3);
    assert.equal(date.getFullYear(), 2025);
});