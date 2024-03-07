const sortPoints = require('../sortPoints');

//
// ARRANGE SECTION
//

// Unsorted Arrs
let unsortedArr1 = [
    {"x": 1, "y": 2},
    {"x": 3, "y": 1},
    {"x": 2, "y": 4}
]

let unsortedArr2 = [
    {"x": 1, "y": 2},
    {"x": 6, "y": 10},
    {"x": 3, "y": 12}
]

// Sorted Arrs
let sortedArr1 = [
    {"x": 1, "y": 2},
    {"x": 2, "y": 4},
    {"x": 3, "y": 1}
]

let sortedArr2 = [
    {"x": 1, "y": 2},
    {"x": 3, "y": 12},
    {"x": 6, "y": 10}
]

//
// ACT & ASSERT SECTIONS
//
describe("Valid sort of array", function() {
    test("Testing arr1", function() {
        expect(sortPoints(unsortedArr1)).toEqual(sortedArr1);
    })
    test("Testing arr2", function() {
        expect(sortPoints(unsortedArr2)).toEqual(sortedArr2);
    })
})
