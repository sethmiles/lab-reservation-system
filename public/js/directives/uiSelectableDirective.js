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

                var start =  _.min(selecting, function (time) {
                                return time.beg;
                            }).beg

                var end = _.max(selecting, function (time) {
                                return time.end;
                            }).end
                
                scope.$parent.stationData.reservation = {
                    start:start,
                    end:end,
                    startReadable: formatTime(start),
                    endReadable: formatTime(end)
                }

                scope.$apply();
            }

            function formatTime (time) {
                if(!time){
                    return;
                }
                var merideum, start, end;
                if(time > 1159){
                    merideum = 'PM';
                    if(time > 1259){
                        time -= 1200;
                    }
                } else {
                    merideum = 'AM'
                }

                if(time > 999){
                    start = time.toString().substring(0,2);
                    end = time.toString().substring(2,4);
                } else {
                    start = time.toString().substring(0,1);
                    end = time.toString().substring(1,3);
                }

                return start + ':' + end + ' ' + merideum;
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