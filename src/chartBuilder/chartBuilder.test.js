/**
 * @jest-environment jsdom
 */

// This file contains integration tests for behaviors coded in the chartBuilder.js file

require('@testing-library/jest-dom')

const fs = require("fs")
const domTesting = require('@testing-library/dom')
const userEvent = require("@testing-library/user-event").default

// These tests should work the same for the scatter, line, and bar pages since they implement the same behaviors
const PAGE_NAME = "line"
const CHART_BUILDER_PAGE_HTML_PATH = `${__dirname}/../${PAGE_NAME}/${PAGE_NAME}.html`
const CHART_BUILDER_PAGE_JS_PATH = `${__dirname}/../${PAGE_NAME}/${PAGE_NAME}.js`

function initDomFromFiles(htmlPath, jsPath) 
{
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
	jest.isolateModules(function() {
		require(jsPath)
	})
}

describe("add value button behavior", function() {
    test("Pair of XY input fields are added when add value button is clicked", async function() {
        // Arrange
        initDomFromFiles(CHART_BUILDER_PAGE_HTML_PATH, CHART_BUILDER_PAGE_JS_PATH)

        const addValueButton = domTesting.getByText(document, "+")

        // Act
        const user = userEvent.setup()
        await user.click(addValueButton)

        // Assert
        expect(domTesting.queryAllByLabelText(document, "X")).toHaveLength(2)
        expect(domTesting.queryAllByLabelText(document, "Y")).toHaveLength(2)
    })

    test("7 pairs of input fields are on page when add value button is clicked 6 times", async function() {
        // Arrange
        initDomFromFiles(CHART_BUILDER_PAGE_HTML_PATH, CHART_BUILDER_PAGE_JS_PATH)

        const addValueButton = domTesting.getByText(document, "+")

        // Act
        const user = userEvent.setup()
        await user.click(addValueButton)
        await user.click(addValueButton)
        await user.click(addValueButton)
        await user.click(addValueButton)
        await user.click(addValueButton)
        await user.click(addValueButton)

        // Assert
        expect(domTesting.queryAllByLabelText(document, "X")).toHaveLength(7)
        expect(domTesting.queryAllByLabelText(document, "Y")).toHaveLength(7)
    })

    test("Clicking add value button does not effect inputs of already existing input fields", async function() {
        // Arrange
        initDomFromFiles(CHART_BUILDER_PAGE_HTML_PATH, CHART_BUILDER_PAGE_JS_PATH)

        const addValueButton = domTesting.getByText(document, "+")
        let xInputs = domTesting.queryAllByLabelText(document, "X")
        let yInputs = domTesting.queryAllByLabelText(document, "Y")

        // Act
        const user = userEvent.setup()
        await user.type(xInputs[0], "0")
        await user.type(yInputs[0], "10")
        await user.click(addValueButton)
        xInputs = domTesting.queryAllByLabelText(document, "X")
        yInputs = domTesting.queryAllByLabelText(document, "Y")
        await user.type(xInputs[1], "1")
        await user.type(yInputs[1], "20")
        await user.click(addValueButton)

        // Assert
        expect(xInputs[0]).toHaveValue(0)
        expect(yInputs[0]).toHaveValue(10)
        expect(xInputs[1]).toHaveValue(1)
        expect(yInputs[1]).toHaveValue(20)
    })
})