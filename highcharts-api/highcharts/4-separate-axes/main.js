const dummySeries = {
    data: Array(5).fill(100),
    color: 'lightblue',
    dataLabels: {
        enabled: false
    },
    enableMouseTracking: false
}

function addChartTitles(chart) {
    const ren = chart.renderer;

    if (chart.customAxisTitle.length !== 0) {
        chart.customAxisTitle.forEach(btn => btn.destroy());
        chart.customAxisTitle.length = 0;
    }

    const firstTitle = ren.text(
        'Managerial Position',
        0,
        chart.plotTop - 25
    ).add();

    const secondTitle = ren.text(
        'Non-Managerial Position',
        0,
        chart.plotTop - 25
    ).add();

    chart.customAxisTitle.push(firstTitle, secondTitle);

    // Center axis titles on their own charts
    chart.customAxisTitle.forEach((title, i) => {
        const { len, left } = chart.yAxis[i];

        title.attr({
            x: left + (len / 2) - title.getBBox().width / 2
        });
    });
}

Highcharts.chart('container', {

    chart: {
        type: 'bar',
        spacingTop: 50,
        events: {
            load() {
                const chart = this;
                chart.customAxisTitle = [];
            },
            render() {
                const chart = this,
                    ticks = chart.xAxis[0].ticks;

                addChartTitles(chart);

                // Center xAxis labels
                for (const i in ticks) {
                    if (i < 0) return;
                    const label = ticks[i].label,
                        x = label.attr('x');
                    label.attr({ x: x - label.getBBox().width / 2 });
                }
            }
        }
    },

    title: {
        text: ''
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
        enabled: false
    },

    xAxis: {
        categories: ['Dep1', 'Dep2', 'Dep3', 'Dep4', 'Dep5'],
        left: '50%',
        lineWidth: 0,
        labels: {
            align: 'left',
            x: 0
        }
    },

    yAxis: [{
        reversed: true,
        width: '40%',
        max: 100
    }, {
        width: '40%',
        left: '60%',
        offset: 0,
        max: 100
    }],

    series: [{
        ...dummySeries
    }, {
        data: [50, 36, 50, 40, 14],
        dataLabels: {
            align: 'right'
        }
    }, {
        ...dummySeries,
        yAxis: 1
    }, {
        data: [32, 43, 55, 78, 12],
        yAxis: 1,
        dataLabels: {
            align: 'left'
        }
    }]

});