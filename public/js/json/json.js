var labjson = {

    room: {
        name:'TNRB W328',
        edges: [
            {x:0, y:0},
            {x:19, y:0},
            {x:19, y:2},
            {x:21, y:2},
            {x:21, y:16},
            {x:19, y:20},
            {x:19, y:29},
            {x:0, y:29},
            {x:0, y:0}
        ]
    },

    furniture: [
        {
            name:'Main Desk',
            className: 'main-desk',
            edges: [
                {x:11, y:26},
                {x:19, y:26},
                {x:19, y:27},
                {x:11, y:27}
            ]
        },
        {
            name:'Side Desk',
            className: 'side-desk',
            edges: [
                {x:18, y:27},
                {x:19, y:27},
                {x:19, y:28},
                {x:18, y:28}
            ]
        },
        {
            name:'Cabinet',
            className: 'cabinet',
            edges: [
                {x:0, y:27},
                {x:4, y:27},
                {x:4, y:28},
                {x:0, y:28},
            ]
        },
        {
            name:'Desk 1',
            className: 'desk',
            edges: [
                {x:5, y:5},
                {x:9, y:5},
                {x:9, y:10},
                {x:5, y:10},
            ]
        },
        {
            name:'Desk 2',
            className: 'desk',
            edges: [
                {x:5, y:12},
                {x:9, y:12},
                {x:9, y:17},
                {x:5, y:17},
            ]
        },
        {
            name:'Desk 3',
            className: 'desk',
            edges: [
                {x:5, y:19},
                {x:9, y:19},
                {x:9, y:24},
                {x:5, y:24}
            ]
        },
        {
            name:'Desk 4',
            className: 'desk',
            edges: [
                {x:11, y:5},
                {x:15, y:5},
                {x:15, y:10},
                {x:11, y:10},
            ]
        },
        {
            name:'Desk 5',
            className: 'desk',
            edges: [
                {x:11, y:12},
                {x:15, y:12},
                {x:15, y:17},
                {x:11, y:17},
            ]
        },
        {
            name:'Desk 6',
            className: 'desk',
            edges: [
                {x:11, y:19},
                {x:15, y:19},
                {x:15, y:24},
                {x:11, y:24},
            ]
        }
    ],

    stations: [
        {
            name:'Station 01',
            className: 'station',
            station: true,
            edges: [
                {x:17, y:25},
                {x:17, y:23},
                {x:19, y:23},
                {x:19, y:25},
                {x:17, y:25}
            ]
        },
        {
            name:'Station 02',
            className: 'station',
            station: true,
            edges: [
                {x:17, y:23},
                {x:17, y:21},
                {x:19, y:21},
                {x:19, y:23},
                {x:17, y:23}
            ]
        },
        {
            name:'Station 03',
            className: 'station',
            station: true,
            edges: [
                {x:17, y:20},
                {x:18, y:18},
                {x:20, y:19},
                {x:19, y:21},
                {x:17, y:20}
            ],
            augmentedEdges: [
                {x:16.5, y:22},
                {x:16.5, y:18},
                {x:20.5, y:18},
                {x:20.5, y:22},
                {x:16.5, y:22}
            ]
        },
        {
            name:'Station 04',
            className: 'station',
            station: true,
            edges: [
                {x:18, y:18},
                {x:19, y:16},
                {x:21, y:17},
                {x:20, y:19},
                {x:18, y:18}
            ],
            augmentedEdges: [
                {x:17.5, y:19.5},
                {x:17.5, y:15.5},
                {x:21.5, y:15.5},
                {x:21.5, y:19.5},
                {x:17.5, y:19.5}
            ]
        },
        {
            name:'Station 05',
            className: 'station',
            station: true,
            edges: [
                {x:19, y:16},
                {x:19, y:14},
                {x:21, y:14},
                {x:21, y:16},
                {x:19, y:16}
            ]
        },
        {
            name:'Station 06',
            className: 'station',
            station: true,
            edges: [
                {x:19, y:14},
                {x:19, y:12},
                {x:21, y:12},
                {x:21, y:14},
                {x:19, y:14}
            ]
        },
        {
            name:'Station 07',
            className: 'station',
            station: true,
            edges: [
                {x:19, y:12},
                {x:19, y:10},
                {x:21, y:10},
                {x:21, y:12},
                {x:19, y:12}
            ]
        },
        {
            name:'Station 08',
            className: 'station',
            station: true,
            edges: [
                {x:19, y:10},
                {x:19, y:8},
                {x:21, y:8},
                {x:21, y:10},
                {x:19, y:10}
            ]
        },
        {
            name:'Station 09',
            className: 'station',
            station: true,
            edges: [
                {x:19, y:8},
                {x:19, y:6},
                {x:21, y:6},
                {x:21, y:8},
                {x:19, y:8}
            ]
        },
        {
            name:'Station 10',
            className: 'station',
            station: true,
            edges: [
                {x:19, y:6},
                {x:19, y:4},
                {x:21, y:4},
                {x:21, y:6},
                {x:19, y:6}
            ]
        },
        {
            name:'Station 11',
            className: 'station',
            station: true,
            edges: [
                {x:19, y:4},
                {x:19, y:2},
                {x:21, y:2},
                {x:21, y:4},
                {x:19, y:4}
            ]
        },
        {
            name:'Station 12',
            className: 'station',
            station: true,
            edges: [
                {x:17, y:2},
                {x:17, y:0},
                {x:19, y:0},
                {x:19, y:2},
                {x:17, y:2}
            ]
        },
        {
            name:'Station 13',
            className: 'station',
            station: true,
            edges: [
                {x:15, y:2},
                {x:15, y:0},
                {x:17, y:0},
                {x:17, y:2},
                {x:15, y:2}
            ]
        },
        {
            name:'Station 14',
            className: 'station',
            station: true,
            edges: [
                {x:13, y:2},
                {x:13, y:0},
                {x:15, y:0},
                {x:15, y:2},
                {x:13, y:2}
            ]
        },
        {
            name:'Station 15',
            className: 'station',
            station: true,
            edges: [
                {x:11, y:2},
                {x:11, y:0},
                {x:13, y:0},
                {x:13, y:2},
                {x:11, y:2}
            ]
        },
        {
            name:'Station 16',
            className: 'station',
            station: true,
            edges: [
                {x:9, y:2},
                {x:9, y:0},
                {x:11, y:0},
                {x:11, y:2},
                {x:9, y:2}
            ]
        },
        {
            name:'Station 17',
            className: 'station',
            station: true,
            edges: [
                {x:7, y:2},
                {x:7, y:0},
                {x:9, y:0},
                {x:9, y:2},
                {x:7, y:2}
            ]
        },
        {
            name:'Station 18',
            className: 'station',
            station: true,
            edges: [
                {x:5, y:2},
                {x:5, y:0},
                {x:7, y:0},
                {x:7, y:2},
                {x:5, y:2}
            ]
        },
        {
            name:'Station 19',
            className: 'station',
            station: true,
            edges: [
                {x:3, y:2},
                {x:3, y:0},
                {x:5, y:0},
                {x:5, y:2},
                {x:3, y:2}
            ]
        },
        {
            name:'Station 20',
            className: 'station',
            station: true,
            edges: [
                {x:0, y:5},
                {x:0, y:3},
                {x:2, y:3},
                {x:2, y:5},
                {x:0, y:5}
            ]
        },
        {
            name:'Station 21',
            className: 'station',
            station: true,
            edges: [
                {x:0, y:7},
                {x:0, y:5},
                {x:2, y:5},
                {x:2, y:7},
                {x:0, y:7}
            ]
        },
        {
            name:'Station 22',
            className: 'station',
            station: true,
            edges: [
                {x:0, y:9},
                {x:0, y:7},
                {x:2, y:7},
                {x:2, y:9},
                {x:0, y:9}
            ]
        },
        {
            name:'Station 23',
            className: 'station',
            station: true,
            edges: [
                {x:0, y:11},
                {x:0, y:9},
                {x:2, y:9},
                {x:2, y:11},
                {x:0, y:11}
            ]
        },
        {
            name:'Station 24',
            className: 'station',
            station: true,
            edges: [
                {x:0, y:13},
                {x:0, y:11},
                {x:2, y:11},
                {x:2, y:13},
                {x:0, y:13}
            ]
        },
        {
            name:'Station 25',
            className: 'station',
            station: true,
            edges: [
                {x:0, y:15},
                {x:0, y:13},
                {x:2, y:13},
                {x:2, y:15},
                {x:0, y:15}
            ]
        },
        {
            name:'Station 26',
            className: 'station',
            station: true,
            edges: [
                {x:0, y:17},
                {x:0, y:15},
                {x:2, y:15},
                {x:2, y:17},
                {x:0, y:17}
            ]
        },
        {
            name:'Station 27',
            className: 'station',
            station: true,
            edges: [
                {x:0, y:19},
                {x:0, y:17},
                {x:2, y:17},
                {x:2, y:19},
                {x:0, y:19}
            ]
        },
        {
            name:'Station 28',
            station: true,
            className: 'station',
            edges: [
                {x:0, y:21},
                {x:0, y:19},
                {x:2, y:19},
                {x:2, y:21},
                {x:0, y:21}
            ]
        },
        {
            name:'Station 29',
            className: 'station',
            station: true,
            edges: [
                {x:0, y:23},
                {x:0, y:21},
                {x:2, y:21},
                {x:2, y:23},
                {x:0, y:23}
            ]
        },
        {
            name:'Station 30',
            className: 'station',
            station: true,
            edges: [
                {x:0, y:25},
                {x:0, y:23},
                {x:2, y:23},
                {x:2, y:25},
                {x:0, y:25}
            ]
        }
    ]
}