angular.module('lrs').directive('labmap', function () {

    d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };

    var map = {

        init: function (scope, el, attrs) {
            this.scope = scope;
            this.el = el;
            this.attrs = attrs;
            this.data = scope.data;

            this.svg = d3.select(el[0]).append('svg')

            this.setWidthAndHeight();
                
            this.stations = this.svg.append('g').attr('class','stations');
            this.furniture = this.svg.append('g').attr('class','furniture');
            this.borders = this.svg.append('g').attr('class','borders');
            this.setBindings();
        },

        setWidthAndHeight: function () {

            this.height = $(window).height() - 100;
            this.width = $('.container').width();
            
            this.svg
                .attr('width', this.width)
                .attr('height', this.height);

            $(this.el).width(this.width);
            $(this.el).height(this.height);

            if(this.width < 600) {
                this.landscape = false;
            } else {
                this.landscape = true;
            }

        },

        setBindings: function () {
            this.getRandomD = _.bind(this.getRandomD, this);
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
                    .data(data, function (d) { 
                        return d.name; 
                    })

            paths.enter().append('path')
                .style('opacity', 0)
                .attr('d', this.getRandomD)
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
                })
                .on('click', function (d) {
                    that.scope.onClick({ item: d });
                })

            paths.transition().duration(1500)
                .style('opacity', 1)
                .attr('d', function (d) { 
                    return that.lineFn(d.edges);
                })
                .attr('class', function (d) { 
                    if(d.station){
                        if(d.isPowered){
                            if(d.isLoggedIn){
                                return d.className + ' in-use';
                            } else {
                                return d.className + ' free';
                            }
                        } else {
                            return d.className + ' off';
                        }
                        return d.className ? d.className : '';
                    } else {
                        return d.className ? d.className : '';    
                    }
                });

        },

        getRandomD: function (d) {
            var d = ['M']
            var x = this.getRandomIntBetween(0, this.width);
            var y = this.getRandomIntBetween(0, this.height);
            for(var i = 0; i < 5; i++){
                d.push(x);
                d.push(y);
            }
            return d.join(' ');
        },

        getRandomIntBetween: function (min, max) {
            return (Math.random() * max + min);
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

        setData: function (data) {
            if(this.lineFn){
                this.renderPaths(this.stations, data);
            } else {
                this.render();
            }
            
        },

        setScales: function () {
            var xDomain, yDomain, xRange, yRange;
            if(this.landscape){
                xRange = [this.width, 0];
                yRange = [this.height, 0];
                yDomain = [-1, 22];
                xDomain = [-1, 30];

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
        },

        onWindowResize: function () {
            this.setWidthAndHeight();
            this.render();
        }
    }

    return {
        scope: {
            user: '=?',
            data: '=',
            onClick: '&' // bi directional binding
        },

        restrict: 'E',

        link: function (scope, el, attrs) {
            // Browser onresize event
            window.onresize = function() {
                scope.$apply();
            };

             // Watch for resize event
            scope.$watch(function() {
                return angular.element(window)[0].innerWidth;
            }, function() {
                map.onWindowResize();
            });

            // watch for data changes and re-render
            scope.$watch(function() {
                return scope.$parent.d3Data;
            }, function(newVals, oldVals) {
                if(newVals){
                    _.each(labjson.stations, function (station) {
                        var serverData = _.find(newVals, function (serverStation) { return serverStation.name == station.name; });
                        _.extend(station, serverData);
                    })
                    map.data = labjson;
                    map.render();
                }
            }, true);

            map.init(scope, el, attrs);
        }
    };

});