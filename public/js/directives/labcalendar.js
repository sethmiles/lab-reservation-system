angular.module('lrs').directive('labcalendar', function () {

    d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };

    var calendarObject = {

        init: function (scope, el, attrs) {
            this.scope = scope;
            this.el = el;
            this.attrs = attrs;
            this.data = labjson;

            this.landscape = true;

            if(this.landscape){
                this.width = 1000;
                this.height = 600;    
            } else {
                this.width = 300;
                this.height = 500;    
            }

            $(this.el).width(this.width);
            $(this.el).height(this.height);

            this.svg = d3.select(el[0]).append('svg')
                .attr('width', this.width)
                .attr('height', this.height);

            this.stations = this.svg.append('g').attr('class','stations');
            this.furniture = this.svg.append('g').attr('class','furniture');
            this.borders = this.svg.append('g').attr('class','borders');
            this.render();
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

            var paths = d3handle.selectAll("path")
                    .data(data)
                .enter().append('path')
                    .style('opacity', 0)
                    .attr('class', function (d) { return (d.className ? d.className : '') })
                    .attr('d', 'M 150 250 150 250 150 250 150 250 150 250')
                    .each(function(d){
                        if(d.station){
                            
                        }
                    })
                    .on("mouseover", function (d) {
                        if(d.station){
                            d3.select(this).moveToFront().transition().duration(200)
                                .attr('d', that.lineFn(that.extendEdges(d)));    
                        }
                        
                    })
                    .on("mouseout", function (d) {
                        if(d.station){
                            d3.select(this).transition().duration(200)
                                .attr('d', that.lineFn(d.edges));
                        }
                    });

            paths.transition().duration(2000)
                .style('opacity', 1)
                .attr('d', function (d) { 
                    return that.lineFn(d.edges);
                });

            
            // paths.exit().transition()
            //     .style('opacity',0)
            //     .remove();
        },

        extendEdges: function (d) {
            if(d.augmentedEdges){
                return d.augmentedEdges;
            }
            var edges = [];
            var newEdges = d.edges;
            edges.push({x: newEdges[0].x - 1, y:newEdges[0].y + 1});
            edges.push({x: newEdges[1].x - 1, y:newEdges[1].y - 1});
            edges.push({x: newEdges[2].x + 1, y:newEdges[2].y - 1});
            edges.push({x: newEdges[3].x + 1, y:newEdges[3].y + 1});
            edges.push({x: newEdges[0].x - 1, y:newEdges[0].y + 1});
            return edges;
        },

        setLine: function () {
            var that = this;
            this.lineFn = d3.svg.line()
                .x(function (d) {
                    return that.xScale(that.landscape ? d.y : d.x);
                })
                .y(function (d) { 
                    return that.yScale(that.landscape ? d.x : d.y);
                });
        },

        setScales: function () {
            var xDomain, yDomain, xRange, yRange;
            if(this.landscape){
                xRange = [this.width, 0];
                yRange = [this.height, 0];
                yDomain = [22, -1];
                xDomain = [30,-1];

            } else {
                xRange = [this.width, 0];
                yRange = [this.height, 0];
                xDomain = [22, -1];
                yDomain = [-1,30];
            }

            this.xScale = d3.scale.linear()
                .range(xRange)
                .domain(xDomain);

            this.yScale = d3.scale.linear()
                .range(yRange)
                .domain(yDomain);
        }
    }

    return {
        scope: {
            user: '=?'
        },

        restrict: 'E',

        // templateUrl
        // template: '<div></div>'

        link: function (scope, el, attrs) {
            calendarObject.init(scope, el, attrs);
        }
    };

});