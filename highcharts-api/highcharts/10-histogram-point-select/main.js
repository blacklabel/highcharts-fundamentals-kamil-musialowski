Highcharts.chart('container', {

    plotOptions: {
        series: {
            states: {
                inactive: false
            },
        }
    },

    xAxis: [{
        alignTicks: false
    }, {
        alignTicks: false,
        opposite: true
    }],

    yAxis: [{
        title: {
            text: 'Values'
        }
    }, {
        title: {
            text: 'Values'
        },
        opposite: true
    }],

    series: [{
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 1,
        point: {
            events: {
                click() {
                    const point = this,
                        x1 = point.options.x,
                        x2 = point.options.x2,
                        scatterPointsArr = Highcharts.charts[0].series[1].data;

                    // Deselect all points
                    scatterPointsArr[0].select(false, false)

                    scatterPointsArr.forEach((point) => {
                        if (x1 <= point.y && x2 >= point.y) {
                            point.select(true, true)
                        }
                    })
                }
            }
        }

    }, {
        type: 'scatter',
        data: [3, 4, 5, 3, 2, 3, 2, 3, 4, 5, 3, 6, 3, 2, 4, 5, 5, 6, 6, 1, 6, 6, 2, 1, 3, 5, 6]
    }]
})