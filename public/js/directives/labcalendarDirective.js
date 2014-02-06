angular.module('lrs.system').directive('labcalendar', function () {

    var hash = {

        scope: {
            user: '=?'
        },

        restrict: 'E',

        // templateUrl
        // template: '<div></div>'

        link: function (scope, el, attrs) {
            
            this.scope = scope;
            this.el = el;
            this.attrs = attrs;
            this.init();
        },

        init: function () {
            this.data = labjson;

            this.width = 500;
            this.height = 800;

            this.svg = d3.select(el[0]).append('svg');

            this.stations = this.svg.append('g').attr('class','stations');
            this.furniture = this.svg.append('g').attr('class','furniture');
            this.borders = this.svg.append('g').attr('class','borders');


        },

        render: function () {
            var that = this;
            this.setScales();
            this.setLine();

            this.renderPaths(this.furniture, this.data.furniture);
            this.renderPaths(this.stations, this.data.stations);
            this.renderPaths(this.borders, this.data.room);
            
        },

        renderPaths: function (d3handle, data) {
            var that = this;

            paths = d3handle.selectAll("path")
                    .data(data)
                .enter().append('path')
                    .style('opacity', 0)
                    .attr('class', function (d) { return (d.class ? d.class : '') })
                    .attr('d', function (d) { 
                        return that.lineFn(d.edges);
                    });

            paths.transition().duration(2000)
                .style('opacity', 1)
                .attr('class', function (d) { return (d.class ? d.class : '') })
                .attr('d', function (d) { 
                    return lineFn(d.edges);
                });

            paths.exit().transition()
                .style('opacity',0)
                .remove();
        },

        setLine: function () {
            this.lineFn = d3.svg.line()
                .x(function (d) { 
                    return that.xScale(d.x) 
                })
                .y(function (d) { 
                    return that.yScale(d.y) 
                });
        },

        setScales: function () {
            this.xScale = d3.scale.linear()
                .range([this.width, 0])
                .domain([21, 0])

            this.yScale = d3.scale.linear()
                .range([this.height, 0])
                .domain([29,0])
        }

    }

    hash.link



    return 

});