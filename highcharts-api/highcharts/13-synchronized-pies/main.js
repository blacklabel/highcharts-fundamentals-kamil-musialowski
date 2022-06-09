const data = [{
    name: 'Commerce',
    y: 5
}, {
    name: 'Engineering',
    y: 4
}, {
    name: 'Financial Services',
    y: 3
}, {
    name: 'Logistics, Aviation & Shipping',
    y: 2
}, {
    name: 'Seafood & Marine',
    y: 1
}, {
    name: 'Corporate Services & others',
    y: 6
}];

function hoverOn(hoveredPoint) {
    const chart = hoveredPoint.series.chart,
        allSeries = chart.series;

    allSeries.map(series => {
        // Choose all seriers other than the hovered one
        if (hoveredPoint.series.name === series.name) return;

        // Set hover state and display tooltip on the same point in other series
        series.points.map(point => {
            if (point.index === hoveredPoint.index) {
                point.setState('hover');

                chart.tooltips.map(tooltip => {
                    tooltip.refresh(point);
                });
            }
        });
    });
}

function hoverOff(hoveredPoint) {
    const chart = hoveredPoint.series.chart;

    chart.tooltips.map(tooltip => {
        tooltip.hide();
    });
}

Highcharts.chart('container', {

    chart: {
        type: 'pie',
        height: 700,
        events: {
            load() {
                const chart = this;
                chart.tooltips = chart.series.slice(1).map(() => {
                    return new Highcharts.Tooltip(chart, Highcharts.merge(chart.options.tooltip));
                });
            }
        }
    },

    legend: {
        enabled: true
    },

    plotOptions: {
        pie: {
            dataLabels: {
                enabled: false
            },
            point: {
                events: {
                    legendItemClick(e) {
                        e.preventDefault();

                        const allSeries = this.series.chart.series,
                            clickedPoint = e.target;

                        allSeries.map(series => {
                            // Choose corresponding points in each series
                            series.points.map(point => {
                                if (clickedPoint.name === point.name) {
                                    point.setVisible(!point.visible);
                                };
                            });
                        });

                    },
                    mouseOver() {
                        const point = this;
                        hoverOn(point);
                    },
                    mouseOut() {
                        const point = this;
                        hoverOff(point);
                    }
                }
            },
            tooltip: {
                followPointer: false,
            }
        },
    },

    series: [{
        center: ['25%', 200],
        data: data,
        size: 300,
        showInLegend: true
    }, {
        center: ['75%', 200],
        data: data,
        size: 300
    }]

});

