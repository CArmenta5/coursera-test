(function(){
    'use strict'
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems',FoundItems);

    function FoundItems(){
        var ddo={
            restrict: 'A',

            templateUrl: 'loader/foundItems.html',
            scope:{
                found:'<foundItems',
                onRemove: '&'
            }


        };
        return ddo;
    }
    NarrowItDownController.$inject=['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var menu=this;
        menu.description="";

        menu.logMenu=function(){
            var found = MenuSearchService.getMatchedMenuItems(menu.description.toLowerCase());

            found.then(function(response){
                menu.listItems=response;
              
            })
             
        }
        menu.removeItem = function (itemIndex) {
            menu.listItems.splice(itemIndex, 1);
          };
       
    }
    //HACER QUE HAGAN MATCH CON TODAS LAS LETRAS LOWERCASE
    MenuSearchService.$inject=['$http']
    function MenuSearchService($http){
        var service=this;

        service.getMatchedMenuItems = function (searchTerm) {

            var response = $http({
                method: "GET",
                url:"https://davids-restaurant.herokuapp.com/menu_items.json"
               
            }).then(function(result){
                var foundItems=[];
                // process result and only keep items that match
                result.data.menu_items.forEach(element => {
                    if(element.description.toLowerCase().split(searchTerm).length>1 && searchTerm!=''){
                        foundItems.push(element);
                    }
                });
                // return processed items
                return foundItems;
                
            });
            return response;
        };
    }
})();