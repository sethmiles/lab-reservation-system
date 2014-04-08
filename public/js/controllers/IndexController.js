angular.module('lrs').controller('IndexController', ['$scope', '$http', 'globalService', 
    function ($scope, $http, globalService) {
        $scope.global = globalService;

        // $scope.closeAlert = alertService.closeAlert; 

        $scope.newsurl = 'http://api.npr.org/query?id=1019&output=JSON&apiKey=';
        $scope.newsapikey = 'MDEzNTI4NzU5MDEzOTY5MDcwMDRmOTY3Yg001';

        $scope.weatherurl = 'http://api.wunderground.com/api/2005341bbda2bed4/forecast/conditions/q/UT/Provo.json';

        $http.get($scope.newsurl + $scope.newsapikey).success(function(data) {
            $scope.articles = data.list.story;
        });

        $.ajax({
            url : $scope.weatherurl,
            dataType : "jsonp",
            success : function(data) {
                $scope.currentWeather = data;
                $scope.currentWeather.current_observation.className = $scope.timeframe + '-' + getIconClass($scope.currentWeather.current_observation.icon);
                $scope.currentWeather.forecast.simpleforecast.forecastday.forEach(function (forecast) {
                    forecast.icon = getIconClass(forecast.icon);
                });  
                $scope.$apply();
            }
        });

        $scope.myVar = true;

        var diff = moment().diff(moment().startOf('day'));

        if(diff < 25200000){
            $scope.timeframe = 'night'
        } else if (diff < 68400000){
            $scope.timeframe = 'day';
        } else {
            $scope.timeframe = 'night';
        }

        function getIconClass (condition) {
            var className;
            switch (condition) {
                case 'chanceflurries':
                    className = 'snow';
                    break;
                case 'chancerain':
                    className = 'drizzle';
                    break;
                case 'chancerain':
                    className = 'drizzle'
                    break;
                case 'chancesleet':
                    className = 'ice'
                    break;
                case 'chancesnow':
                    className = 'snow'
                    break;
                case 'chancetstorms':
                    className = 'storm'
                    break;
                case 'clear':
                    className = 'clear'
                    break;
                case 'cloudy':
                    className = 'partlycloudy'
                    break;
                case 'flurries':
                    className = 'snow'
                    break;
                case 'fog':
                    className = 'mist'
                    break;
                case 'hazy':
                    className = 'mist'
                    break;
                case 'mostlycloudy':
                    className = 'partlycloudy'
                    break;
                case 'mostlysunny':
                    className = 'partlycloudy'
                    break;
                case 'partlycloudy':
                    className = 'partlycloudy'
                    break;
                case 'partlysunny':
                    className = 'partlycloudy'
                    break;
                case 'sleet':
                    className = 'ice'
                    break;
                case 'rain':
                    className = 'rain'
                    break;
                case 'snow':
                    className = 'snow'
                    break;
                case 'sunny':
                    className = 'clear'
                    break;
                case 'tstorms':
                    className = 'storm'
                    break;
                case 'unknown':
                    className = 'clear'
                    break;
                case 'cloudy':
                    className = 'partlycloudy'
                    break;
                case 'partlycloudy':
                    className = 'partlycloudy'
                    break;
            }

            return className;
        }

        $scope.faculty = [
            {
                name: 'Conan Albrecht',
                title: 'Associate Professor',
                office: '780 TNRB',
                email: 'ca@byu.edu',
                website: 'http://warp.byu.edu/',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b0%2F5293.jpg'
            },
            {
                name: 'Gove Allen',
                title: 'Associate Professor',
                office: '778 TNRB',
                email: 'gove@byu.edu',
                website: 'http://gove.net',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b0%2F5487.jpg'
            },
            {
                name: 'Bonnie Anderson',
                title: 'Associate Professor',
                office: '776 TNRB',
                email: 'bonnie_anderson@byu.edu',
            },
            {
                name: 'Greg Anderson',
                title: 'Associate Professor',
                office: '689 TNRB',
                email: 'profganderson@byu.edu',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b2%2F29146.jpg'
            },
            {
                name: 'Nick Ball',
                title: 'Associate Professor',
                office: '689 TNRB',
                email: 'nick.ball@byu.edu',
            },
            {
                name: 'Doug Dean',
                title: 'Associate Professor',
                office: '786 TNRB',
                email: 'doug_dean@byu.edu',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b0%2F5305.jpg'
            },
            {
                name: 'James Gaskin',
                title: 'Assistant Professor',
                office: '785 TNRB',
                email: ' james.gaskin@byu.edu',
                website: 'http://statwiki.kolobkreations.com',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b0%2F5438.jpg'
            },
            {
                name: 'Jeff Jenkins',
                title: 'Associate Professor',
                office: '783 TNRB',
                email: 'jeffrey_jenkins@byu.edu',
                website: 'http://jeffreyjenkins.me/',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b2%2F26429.jpg'
            },
            {
                name: 'Mark Keith',
                title: 'Associate Professor',
                website: 'http://www.mjk.name',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b2%2F29237.jpg'
            },
            {
                name: 'Stephen Liddle',
                title: 'Academic Director, Professor',
                office: '784 TNRB',
                email: 'liddle@byu.edu',
                website: 'http://marriottschool.byu.edu/emp/employee.cfm?emp=swl3',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b0%2F5352.jpg'
            },
            {
                name: 'Rayman Meservy',
                title: 'Associate Professor',
                office: '788 TNRB',
                email: 'meservy@byu.edu',
                website: 'http://marriottschool.byu.edu/emp/rdm/ray.htm',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b0%2F5345.jpg'
            },
            {
                name: 'Tom Meservy',
                title: 'Assistant Professor',
                office: '781 TNRB',
                email: 'tmeservy@byu.edu',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b2%2F22394.jpg'
            },
            {
                name: 'Marshall Romney',
                title: 'Chairman',
                office: '790A TNRB',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b0%2F5325.jpg'
            },
            {
                name: 'Anthony Vance',
                title: 'Assistant Professor',
                office: '779 TNRB',
                email: 'anthony.vance@byu.edu',
                website: 'http://anthonyvance.com',
                img: 'https://marriottschool.byu.edu/msmadmin/person/securefile/empphoto/?file=b0%2F5427.jpg'
            }
        ]
    }

]);
