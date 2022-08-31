function toggleNodeAndLinkVisibility(link, setVisibility) {
    const display = setVisibility ? 'block' : 'none',
        visibility = setVisibility ? 'visible' : 'hidden';

    link.graphic.css({ visibility, display });
    link.toNode.graphic.css({ visibility, display });
    link.toNode.dataLabel.css({ visibility, display });
}

function hideAllChildren(point) {
    point.linksFrom.forEach(link => {
        const point = link.toNode;

        toggleNodeAndLinkVisibility(link, false);

        if(point.linksFrom.length) {
            hideAllChildren(point);
        }
    });
}

function handleClick(e) {
    const clickedPoint = e.point;

    // Prevent from calling functions on nodes without children
    if (!clickedPoint.linksFrom.length) return;

    if (clickedPoint.linksHidden) {
        clickedPoint.linksHidden = false;

        hideAllChildren(clickedPoint);
    } else {
        clickedPoint.linksHidden = true;

        clickedPoint.linksFrom.forEach(link => {
            toggleNodeAndLinkVisibility(link, true);
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
                    toggleNodeAndLinkVisibility(point, false);
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
