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


// Sorted Arrs
let sortedArr1 = [
    {"x": 1, "y": 2},
    {"x": 2, "y": 4},
    {"x": 3, "y": 1}
]

//
// ACT & ASSERT SECTIONS
//
describe("Valid sort of array", function() {
    test("Testing arr1", function() {
        expect(sortPoints(unsortedArr1)).toEqual(sortedArr1);
    })
})
