var app = angular.module('renApp', ['ionic', 'LocalStorageModule']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
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

});
