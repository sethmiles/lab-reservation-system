angular.module('lrs').directive('uiselectable', function () {

    return {

        link: function (scope, el, attrs) {

            function setReservationTime (evt) {

                var selectedItems = $(evt.target).find('.ui-selected, .ui-selecting');
                
                var selecting = _.map(selectedItems, function (el) {
                    return { 
                                beg: parseInt($(el).attr('data-start-time')),
                                end: parseInt($(el).attr('data-end-time'))
                            }
                });
                
                scope.$parent.stationData.reservation = {
                    start: _.min(selecting, function (time) {
                        return time.beg;
                    }).beg,
                    end: _.max(selecting, function (time) {
                        return time.end;
                    }).end
                }

                scope.$apply();
            }

            $(el[0]).selectable({
                selected: function (evt) {
                    setReservationTime(evt);
                },

                selecting: function (evt) {
                    setReservationTime(evt);
                },

                unselecting: function (evt) {
                    setReservationTime(evt);  
                }
            });

        }

    };

});