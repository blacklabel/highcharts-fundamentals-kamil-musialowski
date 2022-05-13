const chart = Highcharts.chart('container', {
    chart: {
        type: 'bar',
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
});
