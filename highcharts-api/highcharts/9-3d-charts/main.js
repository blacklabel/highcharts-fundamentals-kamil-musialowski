Highcharts.chart('container', {

    chart: {
        options3d: {
            enabled: true,
            alpha: 10,
            depth: 50,
            viewDistance: 50
        },
        height: '80%'
    },

    plotOptions: {
        series: {
            width: '80%',
            height: '45%',
            enableMouseTracking: false
        }
    },

    series: [{
        type: 'funnel3d',
        data: [15654, 4064, 1987, 976, 846],
        center: ["50%", "75%"]
    }, {
        type: 'pyramid3d',
        data: [15654, 4064, 1987, 976, 846],
        center: ["50%", "30%"]
    }]
});