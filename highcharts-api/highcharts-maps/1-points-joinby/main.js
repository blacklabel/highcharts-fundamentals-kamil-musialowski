Highcharts.mapChart('container', {

    chart: {
        map: 'custom/world'
    },

    series: [{
        data: [
            ['POL', 100],
            ['USA', 90],
            ['PER', 50],
            ['TZA', 40],
            ['AUS', 1]
        ],
        keys: ['iso-a3'],
        joinBy: ['iso-a3']
    }, {
        type: 'mapbubble',
        data: [
            ['pe', 40],
            ['dk', 20],
            ['gd', 15],
            ['br', 30]
        ]
    }]

});