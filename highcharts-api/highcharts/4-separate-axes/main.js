const dummySeries = {
    data: Array(5).fill(100),
    color: 'lightblue',
    dataLabels: {
        enabled: false,
    },
    enableMouseTracking: false,
}

const chart = Highcharts.chart('container', {

    chart: {
        type: 'bar',
        spacingTop: 50,
    },

    title: {
        text: ""
    },

    plotOptions: {
        bar: {
            grouping: false,
            dataLabels: {
                enabled: true,
                inside: true,
                format: '{y}%'
            },
            color: 'red'
        },
    },

    legend: {
        enabled: false,
    },

    xAxis: {
        categories: ['Dep1', 'Dep2', 'Dep3', 'Dep4', 'Dep5'],
        left: '50%',
        lineWidth: 0,
    },

    yAxis: [{
        reversed: true,
        width: '40%',
        max: 100,
    }, {
        width: '40%',
        left: '55%',
        offset: 0,
        max: 100,
    }],

    series: [{
        ...dummySeries
    }, {
        data: [50, 36, 50, 40, 14],
        dataLabels: {
            align: 'right',
        }
    }, {
        ...dummySeries,
        yAxis: 1,
    }, {
        data: [32, 43, 55, 78, 12],
        yAxis: 1,
        dataLabels: {
            align: 'left'
        },
    }],
}, function (chart) {
    const ren = chart.renderer;

    ren.text('Managerial Position', chart.plotWidth * 0.25 - chart.plotLeft, chart.plotTop - 25).add();
    ren.text('Non-Managerial Position', chart.plotWidth * 0.75 - chart.plotLeft, chart.plotTop - 25).add();
})