(function(angular){
    "use strict";
    var app = angular.module("Swagwise");

    app.directive('rotatingThumbnail', function($interval){
        return {
           replace: true,
           //E element
//            A attribute
//            C class
           restrict: 'E',
           scope:{
               // @ string
               // & 1 way function
               // =  2 way bound object
               images: '=',
               title: '@'
           },

           templateUrl: 'templates/rotating-thumbnail.html',
           link: function(scope, element, attributes){

               var rotator;
               var counter = 0;
               var destroyRotator = function(){
                   if (rotator){
                       //cancel rotator
                       $interval.cancel(rotator);
                       //set rotator to undefined to destroy rotator
                       rotator = undefined;
                       //reset product image
                       scope.productImage = scope.images[0];
                   }
               };

               scope.productImage = scope.images[0];

               scope.rotateImage = function(){
                   // if rotator exists return out of this function
                   if(rotator){
                       return;
                   }
                   // create rotator
                   rotator = $interval(function(){
                        //increment counter
                       counter += 1;
                       //check if counter has surpassed image array length
                       if(counter == scope.images.length){
                           // re-initialize counter to zero
                           counter = 0;
                       }
                       //set productImage to counter position in image array
                       scope.productImage = scope.images[counter];
                   }, 1500); //1500 is time in milliseconds

               };

               scope.cancelRotator = function (){
                    destroyRotator();
               };

               scope.$on('$destroy', function(){
                   destroyRotator();
               });

           }
        };
    });
}) (window.angular);