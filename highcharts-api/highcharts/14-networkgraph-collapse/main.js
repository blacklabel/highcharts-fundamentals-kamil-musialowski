function showNodeAndLink(link) {
    link.graphic.show();
    link.toNode.graphic.show().css({
        display: 'block'
    });
    link.toNode.dataLabel.show().css({
        display: 'block'
    });
}

function hideNodeAndLink(link) {
    link.graphic.hide();
    link.toNode.graphic.hide().css({
        display: 'none'
    });
    link.toNode.dataLabel.hide().css({
        display: 'none'
    });
}

function handleClick(e) {
    const clickedPoint = e.point;

    // Prevent from calling functions on nodes without children
    if (!clickedPoint.linksFrom.length) return;

    if (clickedPoint.linksHidden) {
        clickedPoint.linksHidden = false;

        function hideAllChildren(point) {
            point.linksFrom.forEach(link => {
                const point = link.toNode;

                hideNodeAndLink(link);

                if(point.linksFrom.length) {
                    hideAllChildren(point);
                }
            });
        }
        hideAllChildren(clickedPoint);

    } else {
        clickedPoint.linksHidden = true;

        clickedPoint.linksFrom.forEach(link => {
            showNodeAndLink(link);
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
                    hideNodeAndLink(point);
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
