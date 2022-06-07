function showNode(link) {
    link.graphic.show();
    link.toNode.graphic.show().css({
        display: 'block'
    });
    link.toNode.dataLabel.show().css({
        display: 'block'
    });
}

function hideNode(link) {
    link.graphic.hide();
    link.toNode.graphic.hide().css({
        display: 'none'
    });
    link.toNode.dataLabel.hide().css({
        display: 'none'
    });
}

function handleClick(e) {
    const point = e.point;

    // Prevent from calling functions on nodes without children
    if (!point.linksFrom.length) return;

    if (point.linksHidden) {
        point.linksHidden = false;

        point.linksFrom.forEach(link => {
            hideNode(link);
        });

    } else {
        point.linksHidden = true;

        point.linksFrom.forEach(link => {
            showNode(link);
        });
    }
}

Highcharts.chart('container', {

    chart: {
        type: 'networkgraph',
        events: {
            load() {
                const chart = this;

                chart.series[0].points.forEach(point => {
                    hideNode(point);
                });
            }
        }
    },

    plotOptions: {
        networkgraph: {
            keys: ['from', 'to']
        },
        series: {
            marker: {
                radius: 30
            },
            dataLabels: {
                enabled: true,
                linkFormat: ''
            },
            point: {
                events: {
                    click(e) {
                        handleClick(e);
                    }
                }
            }
        }
    },

    series: [{
        data: [
            ['Parent', 'Child 1'],
            ['Parent', 'Child 2'],
            ['Parent', 'Child 3'],
            ['Parent', 'Child 4'],
            ['Child 1', 'Baby 1'],
            ['Child 1', 'Baby 2'],
            ['Child 1', 'Baby 3']
        ]
    }]

});
