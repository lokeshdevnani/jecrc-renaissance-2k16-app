var app = angular.module('renApp', ['ionic', 'LocalStorageModule']);

app.run(function ($ionicPlatform, $rootScope, $ionicHistory) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {

            var sname = toState.name;

            if(sname=='events'){ $rootScope.currentCategory = 0; }
            else if(sname.indexOf('events.splash') > -1 ) $rootScope.currentCategory = 1;
            else if(sname.indexOf('events.endeavour') > -1 ) $rootScope.currentCategory = 2;
            else if(sname.indexOf('events.quanta') > -1 ) $rootScope.currentCategory = 3;
            else if(sname.indexOf('events.walk-through-paradise') > -1 ) $rootScope.currentCategory = 4;
            else if(sname.indexOf('events.zarurat') > -1 ) $rootScope.currentCategory = 5;
            else if(sname.indexOf('events.alumni') > -1 ) $rootScope.currentCategory = 6;

            if($rootScope.currentCategory>0 && $rootScope.currentCategory<=6) {
              if (sname.split('.').length==3)  $rootScope.currentCategory+=100;
            }

        }
    );
});

app.config(function ($stateProvider, $urlRouterProvider ,localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('ionic-todo');
    $stateProvider
        .state('home', {
            url: '/welcome',
            title: 'National Level Techno-Cultural Fest',
            templateUrl: 'assets/partials/partial-home.html',
            controller: function($state, $scope){
              $scope.goto = function(sref){
                $state.go(sref);
              }

            }
            // controller: function(renService,$scope, Page){
            //     prefetchImages(['about-us.png','events.png','team.png','gallery.png','sponsor.png','support.png'],'assets/img/logo/explore/');
            //     prefetchImages(['splash.png','quanta.png', 'alumni.png','tas.png', 'endeavour.png','zarurat.png'],'assets/img/logo/categories/');
            //     renService.async().then(function(d) {
            //         prefetchImages(d['imgArray'],'assets/img/logo/events/');
            //     });
            //     $scope.$on("$viewContentLoaded",function(){
            //
            //     });
            // }
        })
        .state('explore', {
            url: '/home',
            title: 'Home',
            templateUrl: 'assets/partials/partial-explore.html',
            controller: function(){

            }
        })
        .state('about', {
            url: '/about',
            title: 'About Us',
            templateUrl: 'assets/partials/partial-about.html'
        })
        .state('support', {
            url: '/support',
            title: 'Support',
            templateUrl: 'assets/partials/partial-support.html'
        })
        .state('team', {
            url: '/team',
            title: 'Team',
            templateUrl: 'assets/partials/partial-team.html',
            controller: function($scope, $state){
                var memberCategories = {
                    '0': [{n: 'Anshul Mittal', m:'sdo@jecrc.ac.in',img:'anshul-sir.jpg'}],
                    '1': [{n:'Akshara Parnami',m:'aksharaparnami1995@gmail.com',img:'akshara.jpg',p:'+91-8824301223'},
                          {n:'Anish Jain',m:'anishjain99@gmail.com',img:'anish.jpg',p:'+91-9782606370'}],
                    '2': [{n: 'Lokesh Devnani',m:'contact@lokeshd.com',img:'lokesh.jpg',p:'+91-8946936804',site:'www.lokeshd.com'},
                          {'n': 'Udit Vasu',m:'uditvasu.cse17@jecrc.ac.in',img:'udit.jpg',p:'+91-9928599390',site: 'www.uditvasu.net'}
                        ],
                    '3': [{n: 'Rajdeep Gautam', m: 'i@rajdeepgautam.com',img:'rajdeep.jpg',site:'www.rajdeepgautam.com'},
                          {n: 'Raghav Pareek', m: 'designflames@gmail.com',img:'raghav.jpg'}
                        ],
                    '4': [{n: 'Kavish Goyal', m: 'kavish.goyal@live.com',img:'kavish.jpg',p:'+91-8302355577'},
                        {n: 'Shaheen Khan', m: 'shaheen14@ymail.com',img:'shaheen.jpg',p:'+91-8003403634'}
                    ],
                    '5': [{n: 'Anand Mott', m: 'anandmott@gmail.com',img:'anand.jpg',p:'+91-9782113840'},
                        {n: 'Deeksha Sharma', m: 'dsmissadorable@gmail.com',img:'deeksha.jpg',p:'+91-7742039889'}
                    ]
                };
                var random = function() {
                    return 0.5 - Math.random();
                };
                angular.forEach(memberCategories, function(v,k){
                    memberCategories[k].sort(random);
                });
                $scope.memberCategories = memberCategories;
            }
        })
        .state('gallery', {
            url: '/gallery',
            title: 'Gallery',
            templateUrl: 'assets/partials/partial-gallery.html',
            controller: function($scope, $state){
              var images = [];
              for(i=1;i<=28;i++)
                  images.push(i+".jpg");
              $scope.images = images;
            }
        })
        .state('sponsors', {
            url: '/sponsors',
            title: 'Sponsors',
            templateUrl: 'assets/partials/partial-sponsors.html',
            title: 'Sponsors',
            controller: function(){

            }
        })
        .state('itinerary', {
            url: '/events/itinerary',
            title: 'Itinerary',
            templateUrl: 'assets/partials/partial-itinerary.html'
        })
        .state('events', {
            url: '/events',
            title: 'Events',
            templateUrl: 'assets/partials/partial-category.html',
            data: { present : 0 },
            controller: function($scope, $state, $rootScope){
                $scope.openCategory = function(catNo, catName){
                    if($rootScope.currentCategory == 0){
                        $rootScope.currentCategory = catNo;
                        $state.go('events.'+catName);
                    }
                }
                $scope.getBarClass = function(catNo){
                    if($rootScope.currentCategory == 0) return '';
                    else if($rootScope.currentCategory == catNo) return 'bar-full';
                    else return 'zero-width';
                }
                $scope.menuClicked = function(){
                    //$scope.navOpen();
                    ($rootScope.currentCategory==0) ? $state.go('explore') : ($state.go('events'));
                }
                var loaded= function(){
                    if (sessionStorage.token) {
                        $scope.isLoggedIn = true;
                    }
                };
                $scope.$on('$viewContentLoaded', loaded);
            }
        })
        /* Event Routes */
        .state('events.splash',{
            parent: 'events',
            url: '/splash',
            title: 'Splash Events',
            templateUrl: 'assets/partials/partial-category-page.html',
            controller: function(renService, $scope, $state){
                $scope.name = ['SPLASH','Fun \'n\' Frolic'];
                $scope.category = 'splash';
                $scope.types = ['indoor','outdoor'];
                $scope.events = [];
                renService.async().then(function(d) {
                    $scope.events = d['splash'];
                    console.log($scope.events);
                });
                $scope.openDetails = function(eventTitle){
                    $state.go('events.'+ $scope.category +'.eventId',{id: eventTitle});
                }
            }
        })
        .state('events.endeavour',{
            parent: 'events',
            url: '/endeavour',
            title: 'Endeavour Events',
            templateUrl: 'assets/partials/partial-category-page.html',
            controller: function(renService, $scope, $state){
                $scope.name = ['ENDEAVOUR','Cultural Events'];
                $scope.types = ['default'];
                $scope.category = 'endeavour';
                renService.async().then(function(d) {
                    $scope.events = d['endeavour'];
                });
                $scope.openDetails = function(eventTitle){
                    $state.go('events.'+ $scope.category +'.eventId',{id: eventTitle});
                }
            }
        })
        .state('events.quanta',{
            parent: 'events',
            url: '/quanta',
            title: 'Quanta Events',
            templateUrl: 'assets/partials/partial-category-page.html',
            controller: function(renService, $scope, $state){
                $scope.name = ['QUANTA','Technical Events'];
                $scope.types = ['CONSTRUCTO','CARRIAGE RETURN','ROBO FIESTA', 'VOCATIONAL'];
                $scope.category = 'quanta';
                renService.async().then(function(d) {
                    $scope.events = d['quanta'];
                });
                $scope.openDetails = function(eventTitle){
                    $state.go('events.'+ $scope.category +'.eventId',{id: eventTitle});
                }
            }
        })
        .state('events.walk-through-paradise',{
            parent: 'events',
            url: '/walk-through-paradise',
            title: 'Walk Through Paradise',
            templateUrl: 'assets/partials/partial-walk-through-paradise.html',
            controller: function($scope){
              $scope.name = ['WTP','Walk Through Paradise'];
            }
        })
        .state('events.zarurat',{
            parent: 'events',
            url: '/zarurat',
            title: 'Zarurat: The Help Beyond',
            templateUrl: 'assets/partials/partial-zarurat.html',
            controller: function($scope){
              $scope.name = ['ZARURAT','Celebrating Innocence'];
            }
        })
        .state('events.alumni',{
            parent: 'events',
            url: '/alumni',
            title: 'Alumni Events',
            templateUrl: 'assets/partials/partial-alumni.html',
            controller: function(renService, $scope,$state){
                $scope.name = ['ALUMNI','Alumni Meet'];
                $scope.category = 'alumni';
                renService.async().then(function(d) {
                    $scope.events = d['alumni'];
                });
                $scope.openDetails = function(eventTitle){
                    $state.go('events.'+ $scope.category +'.eventId',{id: eventTitle});
                }
            }
        })
        .state('events.splash.eventId',{
            url: '/:id',
            templateUrl : 'assets/partials/partial-event.html',
            controller: function($scope, $stateParams, $state, renService) {
                renService.async().then(function(d) {
                    $scope.details = d['splash'][$scope.id];
                });
                $scope.closeDetails = function () {
                    $state.go('events.splash');
                };
                $scope.id = $stateParams.id;
                if (sessionStorage.token) {
                    $scope.loggedIn = 1;
                }
            }
        })
        .state('events.endeavour.eventId',{
            url: '/:id',
            templateUrl : 'assets/partials/partial-event.html',
            controller: function($scope, $stateParams, $state, renService) {
                renService.async().then(function(d) {
                    $scope.details = d['endeavour'][$scope.id];
                });
                $scope.closeDetails = function () {
                    $state.go('events.endeavour');
                };
                $scope.id = $stateParams.id;
                if (sessionStorage.token) {
                    $scope.loggedIn = 1;
                }
            }
        })
        .state('events.quanta.eventId',{
            url: '/:id',
            templateUrl : 'assets/partials/partial-event.html',
            controller: function($scope, $stateParams, $state, renService) {
                renService.async().then(function(d) {
                    $scope.details = d['quanta'][$scope.id];
                });
                $scope.closeDetails = function () {
                    $state.go('events.quanta');
                };
                $scope.id = $stateParams.id;
                if (sessionStorage.token) {
                    $scope.loggedIn = 1;
                }
            }
        })
        .state('events.alumni.eventId',{
            url: '/:id',
            templateUrl : 'assets/partials/partial-event.html',
            controller: function($scope, $stateParams, $state, renService ) {
                renService.async().then(function(d) {
                    $scope.details = d['alumni'][$scope.id];
                });
                $scope.closeDetails = function () {
                    $state.go('events.alumni');
                };
                $scope.id = $stateParams.id;
                if (sessionStorage.token) {
                    $scope.loggedIn = 1;
                }
            }
        })


        ;
    $urlRouterProvider.otherwise('/welcome');


});

app.factory('renService', function($http) {
    var urlBase = 'http://jecrcrenaissance.in/api/';
    urlBase = 'http://localhost/jecrcr/api/';
    var url = urlBase+"events";
    url = urlBase+'events-get';
    url = 'events.json';
    var promise;
    var myService = {
        async: function() {
            if ( !promise ) {
                // $http returns a promise, which has a then function, which also returns a promise
                promise = $http.get(url).then(function (response) {
                    var imgArray = [];
                    var result={};
                    var categoryMap = {'1': 'splash', '2': 'quanta' , '3': 'endeavour', '4': 'alumni' };
                    angular.forEach(response.data,function(value,key){
                        var current = {};
                        angular.forEach(value.events,function(v,k){
                            current[v.title] = v;
                            imgArray.push(v.thumbnail);
                        });
                        result[categoryMap[key]] = current;
                    });
                    result['imgArray'] = imgArray;
                    return result;
                });
            }
            // Return the promise to the controller
            return promise;
        }
    };
    return myService;
});

app.controller('main', function ($scope, $ionicModal, localStorageService) {

});
app.filter('type', function () {
    return function (items, type) {
        var filtered = {};
        angular.forEach(items,function(v,k){
            if(v.type==type)
            filtered[k] = v;
        })
        return filtered;
    };
}).filter('renderHTMLCorrectly', function($sce) {
    return function(stringToParse)
    {
        return $sce.trustAsHtml(stringToParse);
    }
});

app.directive('myPostRepeatDirective', function() {
    return function(scope, element, attrs) {
        if (scope.$last){
            $('.gallery a').simpleLightbox();
        }
    };
});
