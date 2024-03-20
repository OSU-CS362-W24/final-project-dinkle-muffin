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