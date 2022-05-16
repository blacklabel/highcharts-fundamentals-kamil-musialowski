// Generate an array of random numbers
function randomData(maxVal, length) {
    const newArr = [];
    for (let i = 0; i < length; i++) {
        newArr.push(Math.round(Math.random() * maxVal));
    }
    return newArr;
}

const chart = Highcharts.chart('container', {

    plotOptions: {
        column: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    const dataMax = this.series.yAxis.dataMax;
                    if (this.y === dataMax) {
                        return 'max';
                    }
                },
            },
        },
    },

    chart: {
        type: 'column',
        polar: true,
    },

    title: {
        text: '',
    },

    xAxis: [
        {
            categories: ['Jan', 'Feb', 'Mar'],
        },
        // Second xAxis added to create another colored circle on a polar chart
        {
            opposite: true,
            lineColor: 'blue',
            lineWidth: 2,
            offset: 30,
        },
    ],

    series: [
        {
            name: 'Tokyo',
            data: randomData(10, 3),
        },
        {
            name: 'New York',
            data: randomData(10, 3),
        },
        {
            name: 'London',
            data: randomData(10, 3),
        },
        // Third circle created from a single marker
        {
            type: 'scatter',
            data: [0],
            marker: {
                enabled: true,
                radius: 155,
                fillColor: 'transparent',
                lineWidth: 3,
                lineColor: 'yellow',
            },
            showInLegend: false,
            enableMouseTracking: false,
        },
    ],
},

    function (chart) {
        const dataMax = chart.yAxis[0].dataMax;

        chart.yAxis[0].update({
            // Set yAxis.max to 2x 'y' max value
            max: dataMax * 2,

            // Create a plotLine with 'y' position 1.5x bigger than 'y' max value
            plotLines: [
                {
                    color: 'green',
                    width: 3,
                    dashStyle: 'Dash',
                    value: dataMax * 1.5,
                    zIndex: 100,
                },
            ],
            // Create a very thin plotBand that acts as a plotLine
            plotBands: [
                {
                    color: 'red',
                    from: dataMax * 1.87,
                    to: dataMax * 1.9,
                },
            ],

            tickPositioner: function () {
                // Return an original array of ticks + force to show 2x max 'y' value tick
                return [...this.tickPositions, dataMax * 2];
            },
        });
    }
);
