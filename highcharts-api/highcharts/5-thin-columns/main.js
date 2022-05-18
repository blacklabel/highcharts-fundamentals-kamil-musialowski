// Generate an array of random numbers
function randomData(minVal, maxVal, length) {
    const newArr = [];
    for (let i = 0; i < length; i++) {
        newArr.push(Math.round(Math.random() * (maxVal - minVal)) + minVal);
    }
    return newArr;
}
// Create an array with specified amount of random series
function createSeriesArr(length) {
    const newArr = [];
    for (let i = 0; i < length; i++) {
        newArr.push({ data: randomData(50, 100, 5) });
    }
    return newArr;
}

const chart = Highcharts.chart('container', {

    chart: {
        type: 'column',
    },

    plotOptions: {
        series: {
            pointPadding: 0,
            borderWidth: 0,
            color: 'red'
        }
    },

    legend: {
        enabled: false,
    },

    xAxis: {
        categories: ['BANK 1', 'BANK 2', 'BANK 3', 'BANK 4', 'BANK 5'],
    },

    series: createSeriesArr(100),
})