function getRandomData(minVal, maxVal, length) {
    const newArr = [];

    for (let i = 0; i < length; i++) {
        newArr.push(Math.round(Math.random() * (maxVal - minVal)) + minVal);
    }
    return newArr;
}

Highcharts.chart('container', {

    chart: {
        type: 'packedbubble',
        height: '80%',
        events: {
            load() {
                const chart = this,
                    allPoints = [];

                // Get all points and push them into new array
                chart.series.forEach(series => {
                    series.data.forEach(data => {
                        allPoints.push(data);
                    });
                });

                setInterval(() => {
                    // Select a random point
                    const randomIndex = getRandomData(0, allPoints.length - 1, 1).pop(),
                        // In order to make this function work, randomPoint.index has to be smaller than the length of an array that we're trying to push it in // Core bug?
                        randomPoint = allPoints[randomIndex],
                        moveToSeries = randomPoint.series.index === 0 ? 1 : 0;

                    randomPoint.update({
                        color: chart.series[moveToSeries].color,
                        series: chart.series[moveToSeries]
                    });
                }, 3000);
            }
        }
    },

    plotOptions: {
        packedbubble: {
            layoutAlgorithm: {
                splitSeries: true,
                dragBetweenSeries: true,
                parentNodeLimit: true,
                gravitationalConstant: 0.05
            }
        }
    },

    title: {
        text: ''
    },

    series: [{
        data: getRandomData(1, 10, 20)
    }, {
        data: getRandomData(1, 10, 20)
    }]

});