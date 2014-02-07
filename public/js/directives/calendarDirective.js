angular.module('lrs').directive('calendar', function () {

    _.templateSettings = {
        interpolate : /\{\{([\s\S]+?)\}\}/g,
        evaluate: /\<\@(.+?)\@\>/gim    
    }


    var Calendar = function (scope, el, attrs) {
        this.$el = $(el);
        this.scope = scope;
        this.attrs = attrs;
        this.initialize();
    }

    Calendar.prototype = {

        className: 'calendar',

        options: {
            container: {
                width: 200,
                height: 500,
                paddingLeft: 10,
                paddingRight: 10
            },

            eventHorizontalBorder: 5,
            eventVerticalBorder: 2,

            startTime: 800,
            endTime: 2400
        },

        calendarIncrementTemplate: _.template(
            '<div class="increment">' +
                '<div class="hour">' +
                    '<span>{{ hour }}</span><span>{{ meridiem }}</span>' +
                '</div>' +
                '<div class="mid-hour">' +
                    '<span>{{ midHour }}</span>' +
                '</div>' +
            '</div>'
        ),

        // Setup Methods --------------------------------------------

        initialize: function() {
            this.setup();
            this.render();
        },

        setup: function () {
            this.layOutDay = _.bind(this.layOutDay, this);
        },

        // Rendering Methods -----------------------------------------

        render: function () {
            this.renderCalendar();
            this.layOutDay(this.scope.data);

        },

        renderCalendar: function () {
            // Return if the calendar is already rendered (since there is no need for dynamic calendar updating)
            if(this.calendar){
                return;
            }

            // Create axis and container, set any needed styles, append to calendar element
            this.axis = $('<div class="axis"></div>');
            this.container = $('<div class="container"></div>')
                .css({
                    width: this.options.container.width,
                    height: this.options.container.height,
                    paddingLeft: this.options.container.paddingLeft,
                    paddingRight: this.options.container.paddingRight
                });

            this.renderPaintableElements();

            this.renderAxis();
            this.$el.append(this.axis);
            this.$el.append(this.container);

        },

        renderPaintableElements: function () {
            var segments = [],
                startTime = this.options.startTime;

            while(startTime < this.options.endTime){
                // Create objects for each hour on the axis
                segments.push('<div class="paintable" data-start-time="' + startTime + '"></div>');
                startTime += 30;
                segments.push('<div class="paintable" data-start-time="' + startTime + '"></div>');
                startTime += 70;
            }
            
            this.container.selectable({
                selected: function () {
                    console.log(arguments);
                },

                selecting: function () {
                    console.log(arguments);
                }
            });
            var paintableSegments = $(segments.join('')).height(this.options.container.height / segments.length);
            this.container.append(paintableSegments);
        },

        renderAxis: function () {
            var segments = [],
                startTime = this.options.startTime,
                time, increment, incrementHeight;

            while(startTime < this.options.endTime){
                // Create objects for each hour on the axis
                time = startTime > 1200 ? startTime - 1200 : startTime;
                segments.push({
                    hour: this.formatHour(time),
                    midHour: this.formatHour(time + 30),
                    meridiem: (startTime >= 1300 ? 'PM' : 'AM')
                });
                startTime += 100;
            }

            incrementHeight = this.options.container.height / segments.length;

            // Push the last hour
            segments.push({
                hour: this.formatHour(this.options.endTime > 1200 ? this.options.endTime - 1200 : this.options.endTime),
                midHour: '',
                meridiem: (this.options.endTime >= 1300 ? 'PM' : 'AM')
            });

            // Add the hour increment to axis and set proper spacing
            for (var i = 0; i < segments.length; i++) {
                increment = $(this.calendarIncrementTemplate(segments[i]));

                increment.height(incrementHeight);
                increment.find('.hour').height(incrementHeight / 2);
                this.axis.append(increment);
            }
        },

        renderEvents: function (events) {
            // The base width is how long a base element should be
            var baseWidth = this.options.container.width,
                that = this;

            // Clear out existing events from the DOM
            this.container.find('.event').remove();

            _.each(events, function(event){
                // Create, add, and position new events
                var eventView = new EventView(event);

                eventView.$el.css({
                    top: event.top,
                    height: event.height
                });
                
                // Apend the event to our calendar container
                that.container.append(eventView.$el);
            });
        },

        layOutDay: function (events) {
            if(!events){
                return;
            }
            this.analyzeEvents(events);

            this.renderEvents(events);
        },

        analyzeEvents: function (events) {
            var that = this;
            var height = this.options.container.height;
            var width = this.options.container.width;
            var timeFrame = this.options.endTime - this.options.startTime;
            var pixelPerMinute = height / timeFrame;
            _.each(events, function (event) {
                // figure out top, height
                event.top = pixelPerMinute * (event.start);
                event.height = pixelPerMinute * (event.end - event.start);
            });

        },

        
        // Utility Methods -------------------------------------------
        
        formatHour: function (hour) {
            var hour = hour.toString().split(''),
                firstHalf = hour.slice(0, hour.length - 2),
                secondHalf = hour.slice(hour.length - 2);

            return firstHalf.join('') + ':' + secondHalf.join('');
        }

    };

    EventView = function (event) {
        this.event = event;
        this.initialize();
    }

    EventView.prototype = {

        className: 'event',

        eventTemplate: _.template(
            '<div class="bar"></div>' +
            '<div class="event-content">' +
                '<div class="title">Reserved</div>' +
                '<div class="description">{{ user }}</div>' +
            '</div>'
        ),

        initialize: function () {
            this.$el = $('<div></div>').addClass(this.className);
            this.render();
        },

        render: function () {
            // Render the event element
            var el = this.eventTemplate({
                    title: this.event.title ? this.event.title : 'Sample Item',
                    user: this.event.user ? this.event.user : ''
                });

            this.$el.append(el);

        }

    };




    return {
        scope: {
            user: '=?',
            data: '=',
            onClick: '&' // bi directional binding
        },

        restrict: 'E',

        link: function (scope, el, attrs) {
            // Browser onresize event
            var calendar = new Calendar(scope, el, attrs);
           
        }
    };



});