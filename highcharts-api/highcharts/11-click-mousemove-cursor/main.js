Highcharts.chart('container', {

    series: [{ data: [10, 13, 21, 40, 50, 33, 65, 21, 22] }]

}, function (chart) {

    const chartContainer = chart.container,
        ren = chart.renderer,
        customMouseDot = ren.circle(-5, 0, 5).attr({ fill: 'blue' }).add()

    function moveMouseDot(event) {
        const x = event.chartX,
            y = event.chartY
        customMouseDot.attr({ x, y })
    }

    function addCustomDot(event) {
        const x = event.chartX,
            y = event.chartY
        ren.circle(x, y, 5).attr({ fill: 'blue' }).add()
    }

    chartContainer.addEventListener('mousemove', moveMouseDot)
    chartContainer.addEventListener('click', addCustomDot)
})

