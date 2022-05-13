// generate an array of random numbers
function randomData(maxVal, length) {
    let newArr = [];
    for (let i = 0; i < length; i++) {
        newArr.push(Math.round(Math.random() * maxVal));
    }
    return newArr;
}

const chart = Highcharts.chart(
    "container",
    {
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    formatter: function displayMax() {
                        let dataMax = this.series.yAxis.dataMax;
                        if (this.y === dataMax) {
                            return "max";
                        }
                    },
                },
            },
        },

        chart: {
            type: "column",
            polar: true,
        },

        title: {
            text: "",
        },

        xAxis: [
            {
                categories: ["Jan", "Feb", "Mar"],
            },
            // second xAxis added to achieve another colored ring on a polar chart
            {
                opposite: true,
                lineColor: "blue",
                lineWidth: 2,
                offset: 30,
            },
        ],

        series: [
            {
                name: "Tokyo",
                data: randomData(10, 3),
            },
            {
                name: "New York",
                data: randomData(10, 3),
            },
            {
                name: "London",
                data: randomData(10, 3),
            },
            // third circle
            {
                type: "scatter",
                data: [0],
                marker: {
                    enabled: true,
                    radius: 155,
                    fillColor: "transparent",
                    lineWidth: 3,
                    lineColor: "yellow",
                },
                showInLegend: false,
                enableMouseTracking: false,
            },
        ],
    },

    function () {
        const dataMax = this.yAxis[0].dataMax;

        this.yAxis[0].update({
            // set yAxis.max to 2x 'y' max value
            max: dataMax * 2,

            // create a plotLine with 'y' position 1.5x bigger than 'y' max value
            plotLines: [
                {
                    color: "green",
                    width: 3,
                    dashStyle: "Dash",
                    value: dataMax * 1.5,
                    zIndex: 100,
                },
            ],
            // create a very thin plotBand that acts as a plotLine
            plotBands: [
                {
                    color: "red",
                    from: dataMax * 1.87,
                    to: dataMax * 1.9,
                },
            ],

            tickPositioner: function displayLastTick() {
                //return an original array of ticks + force to show 2x max 'y' value tick
                return [...this.tickPositions, dataMax * 2];
            },
        });
    }
);
