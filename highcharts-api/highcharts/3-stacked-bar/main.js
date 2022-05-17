const chart = Highcharts.chart('container', {

    chart: {
        type: 'bar',
        spacingTop: 100,
    },

    legend: {
        enabled: false,
    },

    title: {
        text: '',
    },

    plotOptions: {
        series: {
            stacking: 'normal',
        },
    },

    xAxis: {
        categories: ['Data', 'Emails', 'Duplicates', 'Support'],
        gridLineWidth: 1,
        lineWidth: 0,
    },

    yAxis: {
        title: {
            text: 'Amount',
        },
        tickInterval: 50,
        stackLabels: {
            enabled: true,
            format: '{total}K',
            style: {
                fontSize: '14px',
            },
        },
        softMax: 400,
        gridLineWidth: 0,
    },

    series: [
        {
            data: [25, 0, 20, 15],
        },
        {
            data: [100, 100, 50, 50],
        },
        {
            data: [25, 0, 20, 20],
        },
        {
            data: [100, 100, 60, 40],
        },
    ],
}, function (chart) {
    const ren = chart.renderer;
    generateButtons(chart, ren);
    addLabels(chart, ren);
});

function generateButtons(chart, ren) {
    const pointsArr = chart.series[0].points;

    pointsArr.forEach(point => {
        const x = chart.yAxis[0].toPixels(350),
            y = chart.plotHeight + chart.plotTop - point.plotX; // Get a bar width center 
        // Create and add a button with position 0, 0
        const btn = ren.button('How to fix', 0, 0, null, {
            // Theme settings
            stroke: 'blue',
            'stroke-width': 3,
            fill: 'transparent',
        }).add();
        // Position the button on yAxis and center it depending on its height
        btn.attr({
            x: x,
            y: y - btn.getBBox().height / 2,
        });
    })
}

function addLabels(chart, ren) {
    const x = chart.yAxis[0].toPixels(350);

    function createLabel(text, x, y = 80) {
        ren.text(text, x, y).css({
            color: 'black',
            fontSize: 20
        }).add()
    }

    createLabel('Issue', 20);
    createLabel('Record Count', 120);
    createLabel('Action', x);
}

