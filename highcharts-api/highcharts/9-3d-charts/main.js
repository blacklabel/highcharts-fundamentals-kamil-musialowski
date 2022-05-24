Highcharts.chart('container', {

    chart: {
        type: 'scatter3d',
        backgroundColor: 'black',
        options3d: {
            enabled: true,
            alpha: 10,
            beta: 50,
            depth: 450,
            viewDistance: 5,
        },
    },

    plotOptions: {
        series: {
            planeProjection: {
                enabled: true,
                byPoint: true,
            },
            lineProjection: {
                enabled: true,
                colorByPoint: true
            },
        }
    },

    title: {
        text: ''
    },

    legend: {
        enabled: false,
    },

    yAxis: {
        min: 0,
        max: 10,
    },

    xAxis: {
        min: 0,
        max: 10,
    },

    zAxis: {
        min: 0,
        max: 10,
        showFirstLabel: false,
    },

    series: [{
        data: [{
            // Sun
            x: 5,
            y: 5,
            z: 5,
            color: 'yellow',
            marker: {
                radius: 20,
                fillColor: {
                    linearGradient: {
                        cx: 0.5,
                        cy: 0.3,
                        r: 0.7
                    },
                    stops: [
                        [0, ' #f9d71c'],
                        [1, Highcharts.Color('#fcf2b6').get('rgb')]
                    ]
                }
            }
        }, {
            // Earth
            x: 7,
            y: 5,
            z: 5,
            color: "blue",
            marker: {
                radius: 12,
                fillColor: {
                    linearGradient: {
                        cx: 0.5,
                        cy: 0.3,
                        r: 0.7
                    },
                    stops: [
                        [0, ' #287AB8'],
                        [1, Highcharts.Color('#94BDDC').get('rgb')]
                    ]
                }
            }
        }, {
            // Moon
            x: 7.5,
            y: 5,
            z: 5,
            color: 'gray',
            marker: {
                radius: 7,
                fillColor: {
                    linearGradient: {
                        cx: 0.5,
                        cy: 0.3,
                        r: 0.7
                    },
                    stops: [
                        [0, '#d4d5ce'],
                        [1, Highcharts.Color('#fff').get('rgb')]
                    ]
                }
            }
        }]
    }]
}, function (chart) {
    const series = chart.series[0],
        cos = Math.cos,
        sin = Math.sin,
        PI = Math.PI,
        sun = series.data[0],
        point = series.data[1],
        point2 = series.data[2];
    let i = 1;

    setInterval(() => {
        // Sun
        let x = sun.x,
            y = sun.y,
            z = sun.z;

        // Earth
        x += 1 * cos(i * 2 * PI / 60);
        z += 2 * sin(i * 2 * PI / 60);
        point.update([x, y, z]);

        // Moon
        x += 0.5 * cos(i * 2 * PI / 30);
        z += 0.5 * sin(i * 2 * PI / 30);
        point2.update([x, y, z]);

        chart.redraw(false);

        i++;
    }, 32);
});