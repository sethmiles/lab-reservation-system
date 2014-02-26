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
            this.text = this.svg.append('g').attr('class', 'text');

            this.stationLeftRightPadding = 5;
            this.stationTopBottomPadding = 5;

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
            this.getRandomTranslate = _.bind(this.getRandomTranslate, this);
        },

        render: function () {
            if(!this.data){
                return;
            }
            var that = this;
            this.setScales();
            this.setLine();

            this.renderPaths(this.furniture, this.data.furniture);
            this.renderStations(this.stations, this.data.stations);
            this.renderPaths(this.borders, this.data.room);

            // this.renderText(this.text, this.data.stations);
        },

        setStatusText: function (d, el) {
            var text = 'Unknown'
                if(d.isPowered){
                    if(d.isLoggedIn){
                        text = 'Logged On';
                    } else {
                        text = 'Free';
                    }
                } else {
                    text = 'Shut Off';
                }
                $(el).text(text);
        },

        setMemoryText: function (d, el) {
            $(el).text('CPU: ' + d.memoryUsage + '%');
        },

        setStationName: function (d, el) {
            $(el).text(d.name);
        },

        renderStations: function (d3handle, data) {
            var that = this;

            var g = d3handle.selectAll("g")
                .data(data, function (d) { return d.name; })
              .enter().append("g")
                .attr("transform", this.getRandomTranslate)
                .style('opacity', 0);

            g.transition()
                .duration(1500)
                .attr("transform", "translate(0, 0)")
                .style('opacity', 1);

            g.append("path")
                .attr('d', function (d) { 
                    return that.lineFn(d.edges);
                })
                .on("mouseover", function (d) {
                    if(d.station){
                        $(this).parent().attr('class', $(this).parent().attr('class') + ' active')
                        var thisG = $(this).parent();
                        d3.select(thisG[0]).moveToFront();
                        d3.select(this).transition().duration(200)
                            .attr('d', that.lineFn(that.extendEdges(d)));

                        d3.select(thisG.find('text')[0])
                            .attr('x', function (d) { 
                                that.setStationName(d, this);
                                var x = that.getTextPosition(true, d, true);
                                return x - (this.getBBox().width / 2);
                            })
                            .transition()
                            .duration(200)
                            .attr('x', function (d) { 
                                var x = that.getTextPosition(true, d, true);
                                return x - (this.getBBox().width / 2);
                            })
                            .attr('y', function () {
                                var y = that.getTopTextPosition(false, d); 
                                return y + this.getBBox().height; + that.stationTopBottomPadding
                            })

                        d3.select(thisG[0]).append("text")
                            .attr('x', function (d) { 
                                that.setStatusText(d, this)
                                var x = that.getTextPosition(true, d);
                                return x - (this.getBBox().width / 2);
                            })
                            .attr('y', function (d) { 
                                that.setStatusText(d, this)
                                var y = that.getTextPosition(false, d);
                                return y + (this.getBBox().height / 2) - 4;
                            })
                            .attr('class', 'status')
                            .style('opacity', 0)
                            .transition()
                            .duration(200)
                            .attr('x', function (d) {
                                var x = that.getTextPosition(true, d, true);
                                return x - (this.getBBox().width / 2);
                            })
                            .attr('y', function () {
                                var y = that.getBottomTextPosition(false, d);
                                return y - that.stationTopBottomPadding;
                            })
                            .style('opacity', 1)

                        d3.select(thisG[0]).append("text")
                            .attr('x', function (d) { 
                                that.setMemoryText(d, this);
                                var x = that.getTextPosition(true, d);
                                return x - (this.getBBox().width / 2);
                            })
                            .attr('y', function (d) { 
                                that.setMemoryText(d, this);
                                var y = that.getTextPosition(false, d);
                                return y + (this.getBBox().height / 2) - 4;
                            })
                            .style('opacity', 0)
                            .attr('class', 'cpu')
                            .transition()
                            .duration(200)
                            .attr('x', function () {
                                var x = that.getTextPosition(true, d, true);
                                return x - (this.getBBox().width / 2);
                            })
                            .attr('y', function () {
                                var y = that.getMiddleTextPosition(false, d);
                                return y + (this.getBBox().height / 2) - 4;
                            })
                            .style('opacity', 1)
                    }
                    
                })
                .on("mouseout", function (d) {
                    if(d.station){
                        // Removes active class
                        $(this).parent().attr('class', $(this).parent().attr('class').replace('active',''));

                        // Re animates the box to its normal size
                        d3.select(this).transition().duration(200)
                            .attr('d', that.lineFn(d.edges));

                        var thisG = $(this).parent();


                        d3.select(thisG.find('text')[0])
                            .attr('x', function (d) {
                                $(this).text(parseInt(d.name.replace('Station','')))
                                var x = that.getTextPosition(true, d);
                                return x - (this.getBBox().width / 2);
                            })
                            .transition()
                            .duration(200)
                            .attr('x', function (d) { 
                                var x = that.getTextPosition(true, d);
                                return x - (this.getBBox().width / 2);
                            })
                            .attr('y', function (d) { 
                                var y = that.getTextPosition(false, d);
                                return y + (this.getBBox().height / 2) - 4;
                            })

                        d3.selectAll('text.status, text.cpu')
                            .transition()
                            .duration(200)
                            .attr('x', function (d) { 
                                var x = that.getTextPosition(true, d);
                                return x - (this.getBBox().width / 2);
                            })
                            .attr('y', function (d) { 
                                var y = that.getTextPosition(false, d);
                                return y + (this.getBBox().height / 2) - 4;
                            })
                            .style('opacity', 0)
                            .remove();
                    }
                })
                .on('click', function (d) {
                    that.scope.onClick({ item: d });
                });

            g.append("text")
                .attr('x', function (d) { 
                    return that.getTextPosition(true, d);
                })
                .attr('y', function (d) { 
                    return that.getTextPosition(false, d);
                })
                .attr('pointer-events','none')
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
                })
                .text(function(d) { return parseInt(d.name.replace('Station','')); });

                // Update Paths
                d3handle.selectAll('path').transition()
                    .duration(1500)
                    .attr('d', function (d) {
                        if($(this).parent().attr('class')){
                            if($(this).parent().attr('class').indexOf('active') >= 0){
                                return $(this).attr('d');
                            }
                        }
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
                    })

                // Update Text
                d3handle.selectAll('text')
                    .transition()
                    .duration(1500)
                    .attr('x', function (d) {
                        if($(this).parent().attr('class')){
                            if($(this).parent().attr('class').indexOf('active') >= 0){
                                return $(this).attr('x');
                            }
                        }
                        var x = that.getTextPosition(true, d);
                        return x - (this.getBBox().width / 2);
                    })
                    .attr('y', function (d) { 
                        if($(this).parent().attr('class')){
                            if($(this).parent().attr('class').indexOf('active') >= 0){
                                return $(this).attr('y');
                            }
                        }
                        var y = that.getTextPosition(false, d);
                        return y + (this.getBBox().height / 2) - 4;
                    })

                d3handle.selectAll('text.status')
                    .each(function (d) {
                        that.setStatusText(d, this)
                    })
                    .transition()
                    .duration(1500)
                    .attr('x', function (d) {
                        var x = that.getTextPosition(true, d);
                        return x - (this.getBBox().width / 2);
                    })

                d3handle.selectAll('text.cpu')
                    .each(function (d) {
                        that.setMemoryText(d, this)
                    })
                    .transition()
                    .duration(1500)
                    .attr('x', function (d) {
                        var x = that.getTextPosition(true, d);
                        return x - (this.getBBox().width / 2);
                    })
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

        getTextPosition: function (isX, d, isAugmented) {
            var edges = d.edges;
            if(isAugmented){
                edges = this.extendEdges(d);
            }
            if((this.landscape && isX) || (!this.landscape && !isX)){
                // return d.y
                var minY = _.min(edges, function (d) {
                    return d.y;
                }).y;
                var maxY = _.max(edges, function (d) {
                    return d.y;
                }).y;
                if(isX){
                    return this.xScale((minY + maxY) / 2);
                } else {
                    return this.yScale((minY + maxY) / 2);
                }
                
            }
            if((!this.landscape && isX) || (this.landscape && !isX)){
                // return d.x
                var minX = _.min(edges, function (d) {
                    return d.x;
                }).x;
                var maxX = _.max(edges, function (d) {
                    return d.x;
                }).x;
                if(isX){
                    return this.xScale((minX + maxX) / 2);
                } else {
                    return this.yScale((minX + maxX) / 2);
                }
            }
        },

        getTopTextPosition: function (isX, d) {
            var edges = this.extendEdges(d);
            if((this.landscape && isX) || (!this.landscape && !isX)){
                // return d.y
                var minY = _.min(edges, function (d) {
                    return d.y;
                }).y;
                var maxY = _.max(edges, function (d) {
                    return d.y;
                }).y;
                if(isX){
                    return this.xScale((minY + maxY) / 2);
                } else {
                    return this.yScale(maxY);
                }
                
            }
            if((!this.landscape && isX) || (this.landscape && !isX)){
                // return d.x
                var minX = _.min(edges, function (d) {
                    return d.x;
                }).x;
                var maxX = _.max(edges, function (d) {
                    return d.x;
                }).x;
                if(isX){
                    return this.xScale((minX + maxX) / 2);
                } else {
                    return this.yScale(maxX);
                }
            }
        },

        getMiddleTextPosition: function (isX, d) {
            var edges = this.extendEdges(d);
            if((this.landscape && isX) || (!this.landscape && !isX)){
                // return d.y
                var minY = _.min(edges, function (d) {
                    return d.y;
                }).y;
                var maxY = _.max(edges, function (d) {
                    return d.y;
                }).y;
                if(isX){
                    return this.xScale((minY + maxY) / 2);
                } else {
                    return this.yScale((minY + maxY) / 2);
                }
                
            }
            if((!this.landscape && isX) || (this.landscape && !isX)){
                // return d.x
                var minX = _.min(edges, function (d) {
                    return d.x;
                }).x;
                var maxX = _.max(edges, function (d) {
                    return d.x;
                }).x;
                if(isX){
                    return this.xScale((minX + maxX) / 2);
                } else {
                    return this.yScale((minX + maxX) / 2);
                }
            }
        },

        getBottomTextPosition: function (isX, d) {
            var edges = this.extendEdges(d);
            if((this.landscape && isX) || (!this.landscape && !isX)){
                // return d.y
                var minY = _.min(edges, function (d) {
                    return d.y;
                }).y;
                var maxY = _.max(edges, function (d) {
                    return d.y;
                }).y;
                if(isX){
                    return this.xScale((minY + maxY) / 2);
                } else {
                    return this.yScale(minY);
                }
                
            }
            if((!this.landscape && isX) || (this.landscape && !isX)){
                // return d.x
                var minX = _.min(edges, function (d) {
                    return d.x;
                }).x;
                var maxX = _.max(edges, function (d) {
                    return d.x;
                }).x;
                if(isX){
                    return this.xScale((minX + maxX) / 2);
                } else {
                    return this.yScale(minX);
                }
            }
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

        getRandomTranslate: function (d) {
            var x = this.getRandomIntBetween(0, this.width);
            var y = this.getRandomIntBetween(0, this.height);
            return 'translate('+ x + ','+ y +')';
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