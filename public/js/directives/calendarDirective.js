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
            
        ),

        // Setup Methods --------------------------------------------

        initialize: function() {
            // this.setup();
            // this.render();
            this.axis = {};
            this.setCalendarHours();
            this.setPaintableElements();
            this.container = this.$el.find('.calendar-container');
            this.renderContainer();
        },

        setup: function () {
            this.layOutDay = _.bind(this.layOutDay, this);
        },

        // Rendering Methods -----------------------------------------

        render: function () {
            this.renderCalendar();
        },

        renderContainer: function () {

            this.container
                .css({
                    width: this.options.container.width,
                    height: this.options.container.height,
                    paddingLeft: this.options.container.paddingLeft,
                    paddingRight: this.options.container.paddingRight
                });

            // this.renderPaintableElements();


        },

        setPaintableElements: function () {
            var segments = [],
                startTime = this.options.startTime;

            while(startTime < this.options.endTime){
                // Create objects for each hour on the axis
                segments.push({
                    startTime: startTime,
                    endTime: startTime += 30
                });
                
                segments.push({
                    startTime: startTime,
                    endTime: startTime += 70
                });
            }

            this.paintableSegments = segments;
            this.paintableHeight = this.options.container.height / segments.length
        },

        setCalendarHours: function () {
            var segments = [],
                startTime = this.options.startTime,
                time, increment, incrementHeight,
                incrementHeight = 0;

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

            // Push the last hour
            segments.push({
                hour: this.formatHour(this.options.endTime > 1200 ? this.options.endTime - 1200 : this.options.endTime),
                midHour: '',
                meridiem: (this.options.endTime >= 1300 ? 'PM' : 'AM')
            });

            this.axis.segments = segments;
            this.incrementHeight = this.options.container.height / (segments.length - 1);
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
            if(!events || !events.length){
                return;
            }
            this.analyzeEvents(events);
            // this.events = events;
            // this.renderEvents(events);
        },

        analyzeEvents: function (events) {
            var that = this;
            var height = this.options.container.height;
            var width = this.options.container.width;
            var timeFrame = this.options.endTime - this.options.startTime;
            var pixelPerMinute = height / timeFrame;
            _.each(events, function (event) {
                // figure out top, height
                var startDate = moment(event.start_time);
                var endDate = moment(event.end_time);
                event.start = (startDate.hours() * 60) + startDate.minutes() - (8 * 60);
                event.end = (endDate.hours() * 60) + endDate.minutes() - (8 * 60) - event.start;
                event.top = pixelPerMinute * ((event.start/60)*100);
                event.height = pixelPerMinute * ((event.end/60)*100);
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
            data: '='
        },

        templateUrl: 'templates/calendarTemplate.html',

        restrict: 'E',

        link: function (scope, el, attrs) {
            // Browser onresize event
            scope.calendar = new Calendar(scope, el, attrs);

            scope.$watch(function() {
                return scope.$parent.reservations;
            }, function(newVals, oldVals) {
                scope.calendar.layOutDay(newVals);
                scope.calendar.events = newVals;
            });

        }
    };

});