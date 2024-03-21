/**
 * @jest-environment jsdom
 */

// This file contains integration tests for behaviors coded in the chartBuilder.js file

require('@testing-library/jest-dom')

const fs = require("fs")
const domTesting = require('@testing-library/dom')
const userEvent = require("@testing-library/user-event").default

jest.mock("../lib/generateChartImg.js")
const generateChartImgSpy = require("../lib/generateChartImg.js")

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

describe("Add value button behavior", function() {
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
        const clearChartButton = domTesting.getByText(document, "Clear chart data")
        const firstXInput = domTesting.getByLabelText(document, "X")
        const firstYInput = domTesting.getByLabelText(document, "Y")

        // Act
        const user = userEvent.setup()
        await user.type(firstXInput, "0")
        await user.type(firstYInput, "10")
        await user.click(addValueButton)
        const secondXInput = domTesting.queryAllByLabelText(document, "X")[1]
        const secondYInput = domTesting.queryAllByLabelText(document, "Y")[1]
        await user.type(secondXInput, "1")
        await user.type(secondYInput, "20")
        await user.click(addValueButton)

        // Assert
        expect(firstXInput).toHaveValue(0)
        expect(firstYInput).toHaveValue(10)
        expect(secondXInput).toHaveValue(1)
        expect(secondYInput).toHaveValue(20)

        window.localStorage.clear() // required because data that has been input is saved between page refreshes
    })
})

describe("Alert behavior", function() {
    test("Alert on clicking generate chart button with no labels", async function() {
        // Arrange
        initDomFromFiles(CHART_BUILDER_PAGE_HTML_PATH, CHART_BUILDER_PAGE_JS_PATH)

        const generateChartButton = domTesting.getByText(document, "Generate chart")
        const xInput = domTesting.getByLabelText(document, "X")
        const yInput = domTesting.getByLabelText(document, "Y")

        const spy = jest.spyOn(window, "alert")

        spy.mockImplementation(function() {
            // intentionally left empty -- needed to supress error
        })

        // Act
        const user = userEvent.setup()
        await user.type(xInput, "0")
        await user.type(yInput, "10")
        await user.click(generateChartButton)

        // Assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("Error: Must specify a label for both X and Y!")

        spy.mockRestore()
        window.localStorage.clear()
    })

    test("Alert on clicking generate chart button with no Y label", async function() {
        // Arrange
        initDomFromFiles(CHART_BUILDER_PAGE_HTML_PATH, CHART_BUILDER_PAGE_JS_PATH)

        const generateChartButton = domTesting.getByText(document, "Generate chart")
        const xLabel = domTesting.getByLabelText(document, "X label")
        const xInput = domTesting.getByLabelText(document, "X")
        const yInput = domTesting.getByLabelText(document, "Y")

        const spy = jest.spyOn(window, "alert")

        spy.mockImplementation(function() {
            // intentionally left empty -- needed to supress error
        })

        // Act
        const user = userEvent.setup()
        await user.type(xLabel, "a")
        await user.type(xInput, "0")
        await user.type(yInput, "10")
        await user.click(generateChartButton)

        // Assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("Error: Must specify a label for both X and Y!")

        spy.mockRestore()
        window.localStorage.clear()
    })

    test("Alert on clicking generate chart button with no X label", async function() {
        // Arrange
        initDomFromFiles(CHART_BUILDER_PAGE_HTML_PATH, CHART_BUILDER_PAGE_JS_PATH)

        const generateChartButton = domTesting.getByText(document, "Generate chart")
        const yLabel = domTesting.getByLabelText(document, "Y label")
        const xInput = domTesting.getByLabelText(document, "X")
        const yInput = domTesting.getByLabelText(document, "Y")

        const spy = jest.spyOn(window, "alert")

        spy.mockImplementation(function() {
            // intentionally left empty -- needed to supress error
        })

        // Act
        const user = userEvent.setup()
        await user.type(yLabel, "b")
        await user.type(xInput, "0")
        await user.type(yInput, "10")
        await user.click(generateChartButton)

        // Assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("Error: Must specify a label for both X and Y!")

        spy.mockRestore()
        window.localStorage.clear()
    })

    test("Alert on clicking generate chart button with no values", async function() {
        // Arrange
        initDomFromFiles(CHART_BUILDER_PAGE_HTML_PATH, CHART_BUILDER_PAGE_JS_PATH)

        const generateChartButton = domTesting.getByText(document, "Generate chart")
        const xLabel = domTesting.getByLabelText(document, "X label")
        const yLabel = domTesting.getByLabelText(document, "Y label")

        const spy = jest.spyOn(window, "alert")

        spy.mockImplementation(function() {
            // intentionally left empty -- needed to supress error
        })

        // Act
        const user = userEvent.setup()
        await user.type(xLabel, "a")
        await user.type(yLabel, "b")
        await user.click(generateChartButton)

        // Assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("Error: No data specified!")

        spy.mockRestore()
        window.localStorage.clear()
    })

    test("Alert on clicking generate chart button with no inputs of any kind", async function() {
        // Arrange
        initDomFromFiles(CHART_BUILDER_PAGE_HTML_PATH, CHART_BUILDER_PAGE_JS_PATH)

        const generateChartButton = domTesting.getByText(document, "Generate chart")

        const spy = jest.spyOn(window, "alert")

        spy.mockImplementation(function() {
            // intentionally left empty -- needed to supress error
        })

        // Act
        const user = userEvent.setup()
        await user.click(generateChartButton)

        // Assert
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("Error: No data specified!")

        spy.mockRestore()
        window.localStorage.clear()
    })
})

describe("Clear chart button behavior", function() {
    test("All data cleared on clicking clear chart data button", async function() {
        // Arrange
        initDomFromFiles(CHART_BUILDER_PAGE_HTML_PATH, CHART_BUILDER_PAGE_JS_PATH)

        const clearChartButton = domTesting.getByText(document, "Clear chart data")
        const xLabel = domTesting.getByLabelText(document, "X label")
        const yLabel = domTesting.getByLabelText(document, "Y label")
        let xInput = domTesting.getByLabelText(document, "X")
        let yInput = domTesting.getByLabelText(document, "Y")
        const addValueButton = domTesting.getByText(document, "+")
        const chartTitle = domTesting.getByLabelText(document, "Chart title")
        const chartColor = domTesting.getByLabelText(document, "Chart color")

        // Act
        const user = userEvent.setup()

        await user.type(chartTitle, "THE BEST CHART EVER ZOMG :O")

        await user.type(xLabel, "a")
        await user.type(yLabel, "b")

        await user.type(xInput, "0")
        await user.type(yInput, "10")
        await user.click(addValueButton)
        await user.click(addValueButton)

        domTesting.fireEvent.input(chartColor, {target: {value: "#000000"}})

        await user.click(clearChartButton)

        // Assert
        expect(chartTitle).not.toHaveValue()

        expect(xLabel).not.toHaveValue()
        expect(yLabel).not.toHaveValue()

        // assertions will fail unless we get these elements again because in memory they are array elements that are removed and re-added
        xInput = domTesting.getByLabelText(document, "X")
        yInput = domTesting.getByLabelText(document, "Y")
        expect(xInput).not.toHaveValue()
        expect(yInput).not.toHaveValue()

        expect(domTesting.queryAllByLabelText(document, "X")).toHaveLength(1)
        expect(domTesting.queryAllByLabelText(document, "Y")).toHaveLength(1)
        expect(chartColor).toHaveValue("#ff4500")
        
        window.localStorage.clear()
    })
})

describe("Generate chart button behavior", function() {
    test("All data sent correctly to image generator on clicking generate chart button", async function() {
        // Arrange
        initDomFromFiles(CHART_BUILDER_PAGE_HTML_PATH, CHART_BUILDER_PAGE_JS_PATH)

        const generateChartButton = domTesting.getByText(document, "Generate chart")
        const xLabel = domTesting.getByLabelText(document, "X label")
        const yLabel = domTesting.getByLabelText(document, "Y label")
        const xInput = domTesting.getByLabelText(document, "X")
        const yInput = domTesting.getByLabelText(document, "Y")
        const chartTitle = domTesting.getByLabelText(document, "Chart title")
        const chartColor = domTesting.getByLabelText(document, "Chart color")
        
        generateChartImgSpy.mockImplementation(function() {
            return "http://placekitten.com/480/480"
        })

        // Act
        const user = userEvent.setup()

        await user.type(chartTitle, "The Title")

        await user.type(xLabel, "a")
        await user.type(yLabel, "b")

        await user.type(xInput, "0")
        await user.type(yInput, "10")

        domTesting.fireEvent.input(chartColor, {target: {value: "#000000"}})

        await user.click(generateChartButton)

        // Assert
        expect(generateChartImgSpy).toHaveBeenCalledTimes(1)
        expect(generateChartImgSpy).toHaveBeenCalledWith(`${PAGE_NAME}`, [{x: "0", y: "10"}], "a", "b", "The Title", "#000000")

        generateChartImgSpy.mockRestore()
        window.localStorage.clear()
    })
})