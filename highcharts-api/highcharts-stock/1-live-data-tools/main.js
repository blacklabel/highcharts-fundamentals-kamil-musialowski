let liveData = [];

function getData() {
    const data = [],
        time = (new Date()).getTime();

    for (let i = -100; i <= 0; i += 1) {
        data.push([
            time + i * 1000,
            Math.round(Math.random() * 100)
        ]);
    }

    return data;
}

function startLiveData(chart) {
    const series = chart.series[0],
        x = (new Date()).getTime(),
        y = Math.round(Math.random() * 100);

    series.addPoint([x, y]);
}

function toggleLiveData(chart, index) {
    if (!liveData[index]) {
        liveData[index] = setInterval(() => {
            startLiveData(chart);
        }, 1000);
    } else {
        clearInterval(liveData[index]);
        liveData[index] = null;
    }
}

function updateSeriesOptions(chart, options) {
    chart.series[0].update(options);
}

Highcharts.stockChart('container', {

    chart: {
        events: {
            load() {
                const chart = this,
                    index = chart.index;

                liveData[index] = setInterval(() => {
                    startLiveData(chart);
                }, 1000);
            }
        }
    },

    yAxis: [{
        height: '50%'
    }, {
        top: '50%',
        height: '25%'
    }, {
        top: '70%',
        height: '25%'
    }],

    stockTools: {
        gui: {
            buttons: ['customLiveData', 'customOpeningList', 'indicators', 'separator', 'simpleShapes', 'lines', 'crookedLines', 'measure', 'advanced', 'toggleAnnotations', 'separator', 'verticalLabels', 'flags', 'separator', 'zoomChange', 'fullScreen', 'typeChange', 'separator', 'currentPriceIndicator', 'saveChart'],
            definitions: {
                customLiveData: {
                    className: 'live-data-btn-0'
                },
                customOpeningList: {
                    items: ['dataGrouping0', 'dataGrouping1'],
                    dataGrouping0: {
                        className: 'data-grouping-btn-0'
                    },
                    dataGrouping1: {
                        className: 'data-grouping-btn-1'
                    }
                }
            }
        }
    },

    navigation: {
        bindings: {
            customLiveData: {
                className: 'live-data-btn-0',
                init() {
                    const chart = this.chart,
                        index = chart.index;
                    toggleLiveData(chart, index);
                }
            },
            dataGrouping0: {
                className: 'data-grouping-btn-0',
                init() {
                    const chart = this.chart;
                    const options = {
                        dataGrouping: {
                            groupPixelWidth: 10
                        },
                        lineWidth: 5
                    }
                    updateSeriesOptions(chart, options);
                }
            },
            dataGrouping1: {
                className: 'data-grouping-btn-1',
                init() {
                    const chart = this.chart;
                    const options = {
                        dataGrouping: {
                            groupPixelWidth: 80,
                        },
                        lineWidth: 10
                    }
                    updateSeriesOptions(chart, options);
                }
            }
        }
    },

    series: [{
        name: 'Random data',
        id: 'data',
        data: getData(),
        dataGrouping: {
            enabled: true,
            groupPixelWidth: 100
        }
    }, {
        type: 'ema',
        linkedTo: 'data',
        yAxis: 1,
        period: 33,
        marker: {
            enabled: false
        }
    }, {
        type: 'rsi',
        linkedTo: 'data',
        period: 14,
        yAxis: 2,
        marker: {
            enabled: false
        }
    }]

});

Highcharts.stockChart('container2', {

    chart: {
        events: {
            load() {
                const chart = this,
                    index = chart.index;

                liveData[index] = setInterval(() => {
                    startLiveData(chart);
                }, 1000);
            }
        }
    },

    stockTools: {
        gui: {
            buttons: ['customLiveData', 'indicators', 'separator', 'simpleShapes', 'lines', 'crookedLines', 'measure', 'advanced', 'toggleAnnotations', 'separator', 'verticalLabels', 'flags', 'separator', 'zoomChange', 'fullScreen', 'typeChange', 'separator', 'currentPriceIndicator', 'saveChart'],
            definitions: {
                customLiveData: {
                    className: 'live-data-btn-1'
                }
            }
        }
    },

    navigation: {
        bindings: {
            customLiveData: {
                className: 'live-data-btn-1',
                init() {
                    const chart = this.chart,
                        index = chart.index;
                    toggleLiveData(chart, index);
                }
            }
        }
    },

    series: [{
        name: 'Random data',
        id: 'data',
        data: getData()
    }]

});