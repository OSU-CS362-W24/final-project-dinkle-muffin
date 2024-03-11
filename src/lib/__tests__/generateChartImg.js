/**
 * @jest-environment node
 */

const generateChartImg = require('../generateChartImg');

//
// ARRANGE SECTION
//
arr1 = ["line", [{"x": 1, "y": 2}, {"x": 2, "y": 4}, {"x": 3, "y": 1}], "X-Axis", "Y-Axis", "Chart Title", "red"]


//
// ACT & ASSERT SECTIONS
//
describe("Valid chart image generation", function() {
    test("Check for valid Img Url", async function() {
        const imgUrl = await generateChartImg(arr1[0], arr1[1], arr1[2], arr1[3], arr1[4], arr1[5]);

        const blobUrlPattern = /^blob:/;

        // // Validate the URL format.
        expect(imgUrl).toMatch(blobUrlPattern);
    })
})