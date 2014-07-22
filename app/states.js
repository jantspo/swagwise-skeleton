(function(angular) {
    "use strict";
    var app = angular.module('Swagwise');
    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('home', {
                url:'/',
                controller: 'HomeController',
                templateUrl:'views/home.html'
            })
            .state('about',{
                url:'/about',
                templateUrl:'views/about.html'
            })
            .state('cart',{
                url:'/cart',
                controller:'CartController',
                templateUrl:'views/cart.html'
            })
            .state('contact',{
                url:'/contact',
                templateUrl:'views/contact.html'
            })
            .state('login',{
                url:'/login',
                templateUrl:'views/login.html'
            })
            .state('signup',{
                url:'/signup',
                templateUrl:'views/signup.html'
            })
            .state('swag',{
                url:'/swag',
                controller:'SwagController',
                templateUrl:'views/swag.html'
            })
            .state('product',{
                url:'/product/:id',
                controller: 'ProductDetailController',
                templateUrl:'views/detail.html'
            })

    });
})(window.angular);