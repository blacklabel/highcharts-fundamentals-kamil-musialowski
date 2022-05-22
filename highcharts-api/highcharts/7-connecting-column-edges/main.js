function randomData(minVal, maxVal, length) {
    const newArr = [];
    for (let i = 0; i < length; i++) {
        newArr.push(Math.round(Math.random() * (maxVal - minVal)) + minVal)
    }
    return newArr;
}

function drawLine(chart, points, attr) {
    return chart.renderer.path(['M', points.x1, points.y1, 'L', points.x2, points.y2])
        .attr({
            'stroke-width': attr.strokeWidth,
            stroke: attr.color,
            zIndex: 3
        })
        .add();
}

function renderLines(chart) {
    const linesArr = [];

    chart.series.forEach(series => {
        const pointsArr = series.points;

        if (!series.visible) return;

        // Execute drawLine function on every point except the last one
        for (let i = 0; i < pointsArr.length - 1; i++) {
            const point1 = pointsArr[i],
                point2 = pointsArr[i + 1],
                strokeWidth = 2;

            linesArr.push(drawLine(chart, {
                x1: chart.plotLeft + point1.shapeArgs.x + point1.pointWidth - 1,
                y1: chart.plotTop + point1.plotY + strokeWidth,
                x2: chart.plotLeft + point2.shapeArgs.x + 1,
                y2: chart.plotTop + point2.plotY + strokeWidth,
            }, {
                color: series.color,
                strokeWidth
            }));
        }
    });

    return linesArr;
}

Highcharts.chart('container', {
    chart: {
        type: 'column',
        events: {
            render() {
                const chart = this;

                // Destroy all columnLines and draw new ones on each render
                if (chart.customColumnLines) {
                    chart.customColumnLines.forEach(line => line.destroy());
                    chart.customColumnLines.length = 0;
                }
                chart.customColumnLines = renderLines(chart);
            }
        }
    },

    series: [{
        data: randomData(1, 20, 6)
    }, {
        data: randomData(1, 20, 6)
    }, {
        data: randomData(1, 20, 6)
    }]
})
