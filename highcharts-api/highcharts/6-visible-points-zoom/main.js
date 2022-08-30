// Generate an array of random numbers
function generateRandomData(minVal, maxVal, length) {
    const newArr = [];
    for (let i = 0; i < length; i++) {
        newArr.push(Math.round(Math.random() * (maxVal - minVal)) + minVal)
    }
    return newArr;
}

function getVisiblePoints(points) {
    return points.filter(point => point.isInside);
}

function getMaxValue(points) {
    return Math.max(...points.map(point => point.y));
}

function getMaxValuePoints(chart) {
    const visiblePoints = getVisiblePoints(chart.series[0].data),
        maxY = getMaxValue(visiblePoints);

    return visiblePoints.filter(point => point.y === maxY);
}

Highcharts.chart('container', {

    plotOptions: {
        line: {
            dataLabels: {
                enabled: true,
                color: 'red',
                formatter() {
                    const visiblePoints = getVisiblePoints(this.series.data),
                        maxY = getMaxValue(visiblePoints),
                        chart = this.series.chart,
                        ren = chart.renderer,
                        x = chart.plotLeft,
                        y = chart.plotTop + 15;

                    // If a custom label exists - update it, else create a new one
                    if (!chart.customLabel) {
                        chart.customLabel = ren.text(`Visible points: ${visiblePoints.length}`, x, y).add().toFront();
                    } else {
                        chart.customLabel.attr({ text: `Visible points: ${visiblePoints.length}` });
                    }

                    // Return max value red labels
                    if (this.y === maxY) {
                        return this.y;
                    }
                }
            }
        }
    },

    chart: {
        zoomType: 'xy',
        animation: true, // Enables zoom animation on series with more than 100 points
        events: {
            load() {
                const chart = this;
                chart.xAxisPoints = [];
            },
            render() {
                const chart = this,
                    maxValuePoints = getMaxValuePoints(chart);

                // Destroy labels and reset an array at the beginning of a new render
                chart.xAxisPoints.forEach(point => point.destroy());
                chart.xAxisPoints.length = 0;

                // Render a red dot on the xAxis
                maxValuePoints.forEach(point => {
                    const x = chart.xAxis[0].toPixels(point.x),
                        y = chart.xAxis[0].height + chart.plotTop;

                    const xAxisPoint = chart.renderer.circle(x, y, 5)
                        .attr({
                            fill: 'red'
                        }).add();
                    chart.xAxisPoints.push(xAxisPoint);
                })
            }
        }
    },

    series: [{
        data: generateRandomData(1, 99, 100)
    }]
});