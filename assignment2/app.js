(function () { 
    'use strict';
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject=['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var itemList = this;
        
        itemList.toBuy = ShoppingListCheckOffService.getToBuy();
        itemList.itemBought = function (itemIndex){
            ShoppingListCheckOffService.itemBought(itemIndex);
        }
        itemList.isEmpty=function(){
            return itemList.toBuy.length==0;
        }
    }
    
    AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var checkList=this;

        checkList.bought = ShoppingListCheckOffService.getBoughts();
        
        checkList.isEmpty=function(){
            return checkList.bought.length!=0;
        }

    }

    function ShoppingListCheckOffService(){
        var service =this;

        var toBuy = [ 
        {
            name: "Milk",
            quantity: "2"
          },
          {
            name: "Donuts",
            quantity: "14"
          },
          {
            name: "Cookies",
            quantity: "23"
          },
          {
            name: "Chocolate",
            quantity: "5"
          },
          {
            name: "Pizza",
            quantity: "17"
          }
            
        ];
        var bought =[];
        service.itemBought = function(itemIndex){
                service.addBought(toBuy[itemIndex]);
                toBuy.splice(itemIndex,1);
         
            
        }
        service.addBought = function (item) {
            bought.push(item);
          };
        
        service.getToBuy = function () {
            return toBuy;
          };
        service.getBoughts = function () {
            return bought;
          };
    }
    
})();