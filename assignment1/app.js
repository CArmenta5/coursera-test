(function(){
'use strict'
angular.module('LunchCheck',[])
.controller('LunchCheckController',LunchCheckController);
LunchCheckController.$inject =['$scope']
function LunchCheckController($scope){
    $scope.dish="";
    $scope.totalDishes=0;
    $scope.stateOfCheck="";
   
    $scope.howMany=function (){
        var totalDishes=calculatNum($scope.dish);
        if(totalDishes>3){
            $scope.stateOfCheck="Too much!";
     

        }else if(totalDishes>0){
            $scope.stateOfCheck="Enjoy!";
        }else{
            $scope.stateOfCheck="Please enter data first";
        }
    } 
   
    function calculatNum(string){
        var total=0;
        var dishes = string.split(",");
        for (var i = 0; i < dishes.length; i++) {
            if(dishes[i].length!=0 && dishes[i]!=" "){
                total++;
            }
          }
        return total;
    }

}

})();