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

        // $http.get($scope.weatherurl).success(function(data) {
            // $scope.currentWeather = data;

        // });

        $scope.myVar = true;

        if(!$('.jumbo').length){
            $('body').prepend('<div class="jumbo"></div>');
        }

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

        
        $scope.currentWeather = 
                {
                  "response": {
                  "version":"0.1",
                  "termsofService":"http://www.wunderground.com/weather/api/d/terms.html",
                  "features": {
                  "forecast": 1
                  ,
                  "conditions": 1
                  }
                    }
                  , "current_observation": {
                        "image": {
                        "url":"http://icons-ak.wxug.com/graphics/wu2/logo_130x80.png",
                        "title":"Weather Underground",
                        "link":"http://www.wunderground.com"
                        },
                        "display_location": {
                        "full":"Provo, UT",
                        "city":"Provo",
                        "state":"UT",
                        "state_name":"Utah",
                        "country":"US",
                        "country_iso3166":"US",
                        "zip":"84601",
                        "magic":"1",
                        "wmo":"99999",
                        "latitude":"40.22052002",
                        "longitude":"-111.69313812",
                        "elevation":"1372.00000000"
                        },
                        "observation_location": {
                        "full":"Slate Canyon Tower 1, Provo, Utah",
                        "city":"Slate Canyon Tower 1, Provo",
                        "state":"Utah",
                        "country":"US",
                        "country_iso3166":"US",
                        "latitude":"40.222717",
                        "longitude":"-111.634415",
                        "elevation":"4641 ft"
                        },
                        "estimated": {
                        },
                        "station_id":"KUTPROVO5",
                        "observation_time":"Last Updated on April 7, 8:48 PM MDT",
                        "observation_time_rfc822":"Mon, 07 Apr 2014 20:48:49 -0600",
                        "observation_epoch":"1396925329",
                        "local_time_rfc822":"Mon, 07 Apr 2014 20:48:51 -0600",
                        "local_epoch":"1396925331",
                        "local_tz_short":"MDT",
                        "local_tz_long":"America/Denver",
                        "local_tz_offset":"-0600",
                        "weather":"Clear",
                        "temperature_string":"54.5 F (12.5 C)",
                        "temp_f":54.5,
                        "temp_c":12.5,
                        "relative_humidity":"33%",
                        "wind_string":"Calm",
                        "wind_dir":"ESE",
                        "wind_degrees":113,
                        "wind_mph":0.9,
                        "wind_gust_mph":"6.9",
                        "wind_kph":1.4,
                        "wind_gust_kph":"11.1",
                        "pressure_mb":"1026",
                        "pressure_in":"30.31",
                        "pressure_trend":"0",
                        "dewpoint_string":"26 F (-3 C)",
                        "dewpoint_f":26,
                        "dewpoint_c":-3,
                        "heat_index_string":"NA",
                        "heat_index_f":"NA",
                        "heat_index_c":"NA",
                        "windchill_string":"NA",
                        "windchill_f":"NA",
                        "windchill_c":"NA",
                        "feelslike_string":"54.5 F (12.5 C)",
                        "feelslike_f":"54.5",
                        "feelslike_c":"12.5",
                        "visibility_mi":"15.0",
                        "visibility_km":"24.1",
                        "solarradiation":"--",
                        "UV":"0","precip_1hr_string":"0.00 in ( 0 mm)",
                        "precip_1hr_in":"0.00",
                        "precip_1hr_metric":" 0",
                        "precip_today_string":"0.00 in (0 mm)",
                        "precip_today_in":"0.00",
                        "precip_today_metric":"0",
                        "icon":"clear",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/nt_clear.gif",
                        "forecast_url":"http://www.wunderground.com/US/UT/Provo.html",
                        "history_url":"http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=KUTPROVO5",
                        "ob_url":"http://www.wunderground.com/cgi-bin/findweather/getForecast?query=40.222717,-111.634415"
                    }
                        ,
                    "forecast":{
                        "txt_forecast": {
                        "date":"9:00 PM MDT",
                        "forecastday": [
                        {
                        "period":0,
                        "icon":"clear",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/clear.gif",
                        "title":"Monday",
                        "fcttext":"Clear. High of 63F. Winds from the SW at 5 to 10 mph shifting to the WNW in the afternoon.",
                        "fcttext_metric":"Clear. High of 17C. Winds from the SW at 5 to 15 km/h shifting to the WNW in the afternoon.",
                        "pop":"0"
                        }
                        ,
                        {
                        "period":1,
                        "icon":"clear",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/clear.gif",
                        "title":"Monday Night",
                        "fcttext":"Partly cloudy in the evening, then clear. Low of 37F. Winds less than 5 mph.",
                        "fcttext_metric":"Partly cloudy in the evening, then clear. Low of 3C. Winds less than 5 km/h.",
                        "pop":"0"
                        }
                        ,
                        {
                        "period":2,
                        "icon":"clear",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/clear.gif",
                        "title":"Tuesday",
                        "fcttext":"Clear. High of 66F. Winds less than 5 mph.",
                        "fcttext_metric":"Clear. High of 19C. Winds less than 5 km/h.",
                        "pop":"0"
                        }
                        ,
                        {
                        "period":3,
                        "icon":"clear",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/clear.gif",
                        "title":"Tuesday Night",
                        "fcttext":"Clear. Low of 45F. Winds from the South at 5 to 10 mph.",
                        "fcttext_metric":"Clear. Low of 7C. Winds from the South at 10 to 15 km/h.",
                        "pop":"0"
                        }
                        ,
                        {
                        "period":4,
                        "icon":"partlycloudy",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
                        "title":"Wednesday",
                        "fcttext":"Clear in the morning, then partly cloudy. High of 72F. Winds from the South at 5 to 10 mph.",
                        "fcttext_metric":"Clear in the morning, then partly cloudy. High of 22C. Winds from the South at 10 to 15 km/h.",
                        "pop":"0"
                        }
                        ,
                        {
                        "period":5,
                        "icon":"partlycloudy",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
                        "title":"Wednesday Night",
                        "fcttext":"Partly cloudy. Low of 46F. Winds from the NW at 5 to 20 mph.",
                        "fcttext_metric":"Partly cloudy. Low of 8C. Windy. Winds from the NW at 10 to 25 km/h.",
                        "pop":"0"
                        }
                        ,
                        {
                        "period":6,
                        "icon":"partlycloudy",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
                        "title":"Thursday",
                        "fcttext":"Partly cloudy. High of 70F. Winds less than 5 mph.",
                        "fcttext_metric":"Partly cloudy. High of 21C. Winds less than 5 km/h.",
                        "pop":"0"
                        }
                        ,
                        {
                        "period":7,
                        "icon":"partlycloudy",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
                        "title":"Thursday Night",
                        "fcttext":"Partly cloudy in the evening, then clear. Low of 37F. Winds less than 5 mph.",
                        "fcttext_metric":"Partly cloudy in the evening, then clear. Low of 3C. Winds less than 5 km/h.",
                        "pop":"0"
                        }
                        ]
                        },
                        "simpleforecast": {
                        "forecastday": [
                        {"date":{
                    "epoch":"1396926000",
                    "pretty":"9:00 PM MDT on April 07, 2014",
                    "day":7,
                    "month":4,
                    "year":2014,
                    "yday":96,
                    "hour":21,
                    "min":"00",
                    "sec":0,
                    "isdst":"1",
                    "monthname":"April",
                    "monthname_short":"Apr",
                    "weekday_short":"Mon",
                    "weekday":"Monday",
                    "ampm":"PM",
                    "tz_short":"MDT",
                    "tz_long":"America/Denver"
                },
                        "period":1,
                        "high": {
                        "fahrenheit":"63",
                        "celsius":"17"
                        },
                        "low": {
                        "fahrenheit":"37",
                        "celsius":"3"
                        },
                        "conditions":"Clear",
                        "icon":"clear",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/clear.gif",
                        "skyicon":"mostlysunny",
                        "pop":0,
                        "qpf_allday": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "qpf_day": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "qpf_night": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "snow_allday": {
                        "in": 0,
                        "cm": 0
                        },
                        "snow_day": {
                        "in": 0,
                        "cm": 0
                        },
                        "snow_night": {
                        "in": 0,
                        "cm": 0
                        },
                        "maxwind": {
                        "mph": 8,
                        "kph": 13,
                        "dir": "WNW",
                        "degrees": 303
                        },
                        "avewind": {
                        "mph": 4,
                        "kph": 6,
                        "dir": "SSE",
                        "degrees": 160
                        },
                        "avehumidity": 52,
                        "maxhumidity": 78,
                        "minhumidity": 35
                        }
                        ,
                        {"date":{
                    "epoch":"1397012400",
                    "pretty":"9:00 PM MDT on April 08, 2014",
                    "day":8,
                    "month":4,
                    "year":2014,
                    "yday":97,
                    "hour":21,
                    "min":"00",
                    "sec":0,
                    "isdst":"1",
                    "monthname":"April",
                    "monthname_short":"Apr",
                    "weekday_short":"Tue",
                    "weekday":"Tuesday",
                    "ampm":"PM",
                    "tz_short":"MDT",
                    "tz_long":"America/Denver"
                },
                        "period":2,
                        "high": {
                        "fahrenheit":"66",
                        "celsius":"19"
                        },
                        "low": {
                        "fahrenheit":"45",
                        "celsius":"7"
                        },
                        "conditions":"Clear",
                        "icon":"clear",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/clear.gif",
                        "skyicon":"sunny",
                        "pop":0,
                        "qpf_allday": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "qpf_day": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "qpf_night": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "snow_allday": {
                        "in": 0,
                        "cm": 0
                        },
                        "snow_day": {
                        "in": 0,
                        "cm": 0
                        },
                        "snow_night": {
                        "in": 0,
                        "cm": 0
                        },
                        "maxwind": {
                        "mph": 7,
                        "kph": 11,
                        "dir": "West",
                        "degrees": 262
                        },
                        "avewind": {
                        "mph": 6,
                        "kph": 10,
                        "dir": "WSW",
                        "degrees": 245
                        },
                        "avehumidity": 44,
                        "maxhumidity": 77,
                        "minhumidity": 27
                        }
                        ,
                        {"date":{
                    "epoch":"1397098800",
                    "pretty":"9:00 PM MDT on April 09, 2014",
                    "day":9,
                    "month":4,
                    "year":2014,
                    "yday":98,
                    "hour":21,
                    "min":"00",
                    "sec":0,
                    "isdst":"1",
                    "monthname":"April",
                    "monthname_short":"Apr",
                    "weekday_short":"Wed",
                    "weekday":"Wednesday",
                    "ampm":"PM",
                    "tz_short":"MDT",
                    "tz_long":"America/Denver"
                },
                        "period":3,
                        "high": {
                        "fahrenheit":"72",
                        "celsius":"22"
                        },
                        "low": {
                        "fahrenheit":"46",
                        "celsius":"8"
                        },
                        "conditions":"Partly Cloudy",
                        "icon":"partlycloudy",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
                        "skyicon":"partlycloudy",
                        "pop":0,
                        "qpf_allday": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "qpf_day": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "qpf_night": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "snow_allday": {
                        "in": 0,
                        "cm": 0
                        },
                        "snow_day": {
                        "in": 0,
                        "cm": 0
                        },
                        "snow_night": {
                        "in": 0,
                        "cm": 0
                        },
                        "maxwind": {
                        "mph": 15,
                        "kph": 24,
                        "dir": "WNW",
                        "degrees": 300
                        },
                        "avewind": {
                        "mph": 11,
                        "kph": 18,
                        "dir": "WSW",
                        "degrees": 255
                        },
                        "avehumidity": 30,
                        "maxhumidity": 58,
                        "minhumidity": 17
                        }
                        ,
                        {"date":{
                    "epoch":"1397185200",
                    "pretty":"9:00 PM MDT on April 10, 2014",
                    "day":10,
                    "month":4,
                    "year":2014,
                    "yday":99,
                    "hour":21,
                    "min":"00",
                    "sec":0,
                    "isdst":"1",
                    "monthname":"April",
                    "monthname_short":"Apr",
                    "weekday_short":"Thu",
                    "weekday":"Thursday",
                    "ampm":"PM",
                    "tz_short":"MDT",
                    "tz_long":"America/Denver"
                },
                        "period":4,
                        "high": {
                        "fahrenheit":"70",
                        "celsius":"21"
                        },
                        "low": {
                        "fahrenheit":"37",
                        "celsius":"3"
                        },
                        "conditions":"Partly Cloudy",
                        "icon":"partlycloudy",
                        "icon_url":"http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
                        "skyicon":"mostlysunny",
                        "pop":0,
                        "qpf_allday": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "qpf_day": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "qpf_night": {
                        "in": 0.00,
                        "mm": 0.0
                        },
                        "snow_allday": {
                        "in": 0,
                        "cm": 0
                        },
                        "snow_day": {
                        "in": 0,
                        "cm": 0
                        },
                        "snow_night": {
                        "in": 0,
                        "cm": 0
                        },
                        "maxwind": {
                        "mph": 5,
                        "kph": 8,
                        "dir": "WNW",
                        "degrees": 299
                        },
                        "avewind": {
                        "mph": 3,
                        "kph": 5,
                        "dir": "SW",
                        "degrees": 227
                        },
                        "avehumidity": 30,
                        "maxhumidity": 63,
                        "minhumidity": 22
                        }
                        ]
                        }
                    }
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

                $scope.currentWeather.current_observation.className = $scope.timeframe + '-' + getIconClass($scope.currentWeather.current_observation.icon);
                $scope.currentWeather.forecast.simpleforecast.forecastday.forEach(function (forecast) {
                    forecast.icon = getIconClass(forecast.icon);
                });
    }

]);
