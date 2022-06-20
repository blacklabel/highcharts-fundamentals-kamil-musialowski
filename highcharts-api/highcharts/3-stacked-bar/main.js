Highcharts.chart('container', {

    chart: {
        type: 'bar',
        spacingTop: 100,
        events: {
            load() {
                const chart = this;

                chart.customBtnArr = [];
                chart.customLabelArr = [];
            },
            render() {
                const chart = this;

                generateButtons(chart);
                addLabels(chart);
            }
        }
    },

    legend: {
        enabled: false
    },

    title: {
        text: ''
    },

    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },

    xAxis: {
        categories: ['Data', 'Emails', 'Duplicates', 'Support'],
        gridLineWidth: 1,
        lineWidth: 0
    },

    yAxis: {
        title: {
            text: 'Amount'
        },
        tickInterval: 50,
        stackLabels: {
            enabled: true,
            format: '{total}K',
            style: {
                fontSize: '14px'
            }
        },
        gridLineWidth: 0,
        maxPadding: 0.5
    },

    series: [
        {
            data: [25, 0, 20, 15]
        },
        {
            data: [100, 100, 50, 50]
        },
        {
            data: [25, 0, 20, 20]
        },
        {
            data: [100, 100, 60, 40]
        },
    ],
});

function generateButtons(chart) {
    const ren = chart.renderer,
        pointsArr = chart.series[0].points;

    if (chart.customBtnArr.length !== 0) {
        chart.customBtnArr.forEach(btn => btn.destroy());
        chart.customBtnArr.length = 0;
    }

    pointsArr.forEach(point => {
        const x = chart.plotWidth + chart.plotLeft;
        y = chart.plotHeight + chart.plotTop - point.plotX; // Get a bar width center 

        // Create and add a button with position 0, 0
        const btn = ren.button('How to fix', 0, 0, null, {
            stroke: 'blue',
            'stroke-width': 3,
            fill: 'transparent'
        }).add();

        // Position the button on yAxis and center it depending on its height
        btn.attr({
            x: x - btn.getBBox().width,
            y: y - btn.getBBox().height / 2
        });

        chart.customBtnArr.push(btn);
    })
}

function addLabels(chart) {
    const ren = chart.renderer;

    if (chart.customLabelArr.length !== 0) {
        chart.customLabelArr.forEach(btn => btn.destroy());
        chart.customLabelArr.length = 0;
    }

    function createLabel(text, x) {
        const label = ren.text(text, x, 80).css({
            color: 'black',
            fontSize: 20
        }).add();

        chart.customLabelArr.push(label);

        return label;
    }

    createLabel('Issue', 20);
    createLabel('Record Count', chart.plotLeft);
    const actionLabel = createLabel('Action', chart.plotWidth + chart.plotLeft);

    actionLabel.translate(-actionLabel.getBBox().width, 0);
}