function randomData(minVal, maxVal, length) {
    const newArr = [];
    for (let i = 0; i < length; i++) {
        newArr.push(Math.round(Math.random() * (maxVal - minVal)) + minVal);
    }
    return newArr;
}

function customLabelFormat(chart, tick, options) {
    const ticks = chart.xAxis[0].ticks;
    ticks[tick].label.css(options);
}

Highcharts.chart('container', {

    chart: {
        type: 'column'
    },

    plotOptions: {
        series: {
            point: {
                events: {
                    mouseOver() {
                        customLabelFormat(this.series.chart, this.x, { fontSize: 14, fontWeight: 700, color: 'red' });
                    },
                    mouseOut() {
                        customLabelFormat(this.series.chart, this.x, { fontSize: 11, fontWeight: 300, color: 'black' });
                    }
                }
            }
        }
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
            rotation: -65,
            y: 20
        }
    },

    series: [{
        name: 'Tokyo',
        data: randomData(1, 10, 12)
    }, {
        name: 'New York',
        data: randomData(1, 10, 12)
    }, {
        name: 'London',
        data: randomData(1, 10, 12)
    }, {
        name: 'Berlin',
        data: randomData(1, 10, 12)
    }]

});