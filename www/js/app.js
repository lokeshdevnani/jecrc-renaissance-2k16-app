// Ionic ionic-todo App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ionic-todo' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ionic-todo', ['ionic', 'LocalStorageModule']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.config(function ($stateProvider, $urlRouterProvider ,localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('ionic-todo');
    $stateProvider
        .state('home', {
            url: '/welcome',
            title: 'National Level Techno-Cultural Fest',
            templateUrl: 'assets/partials/partial-home.html',
            controller: function(){

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
        ;
    $urlRouterProvider.otherwise('/welcome');


});

app.controller('main', function ($scope, $ionicModal, localStorageService) {
    //store the entities name in a variable

    var taskData = 'task';

    $scope.hello = 'world';

});
