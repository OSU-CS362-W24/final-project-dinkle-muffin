const chartStorage = require('../chartStorage');

describe('chartStorage.js saveChart() tests', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        window.localStorage.clear();
    });
  
    test('saveChart saves a chart', () => {
        const chartData = { id: 'chart1', data: [1, 2, 3] };
        chartStorage.saveChart(chartData);
    
        const savedCharts = chartStorage.loadAllSavedCharts();
        expect(savedCharts.length).toBe(1);
        expect(savedCharts[0]).toEqual(chartData);
    });

    test('saveChart saves two charts', () => {
        const chartData1 = { id: 'chart1', data: [1, 2, 3] };
        chartStorage.saveChart(chartData1);

        const chartData2 = { id: 'chart2', data: [1, 2, 3] };
        chartStorage.saveChart(chartData2);
    
        const savedCharts = chartStorage.loadAllSavedCharts();
        expect(savedCharts.length).toBe(2);
        expect(savedCharts[0]).toEqual(chartData1);
        expect(savedCharts[1]).toEqual(chartData2);
    });

    test('updates an existing chart when a valid index is provided', () => {
        // First, add a chart to ensure there is something to update
        const initialChartData = { id: 'initialChart', data: [1, 2, 3] };
        chartStorage.saveChart(initialChartData);

        // Now, update the chart at index 0
        const updatedChartData = { id: 'updatedChart', data: [4, 5, 6] };
        chartStorage.saveChart(updatedChartData, 0);

        const savedCharts = chartStorage.loadAllSavedCharts();
        expect(savedCharts.length).toBe(1); // Still only one chart, but it's the updated one
        expect(savedCharts[0]).toEqual(updatedChartData);
    });
});