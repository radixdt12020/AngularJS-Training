var app = angular.module("myapp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            template: "<div>Welcome to Product Inventory Application...!</div>",
            controller: "mainController"
        })
        .when("/productList", {
            templateUrl: "Product/productList.html",
            controller: "productController"
        })
        .when("/productAdd", {
            templateUrl: "Product/productAdd.html",
            controller: "productController"
        })
        .when("/productEdit/:ProdId", {
            templateUrl: "Product/productEdit.html",
            controller: "productController"
        })
        .when("/productDelete/:ProdId", {
            templateUrl: "Product/productDelete.html",
            controller: "productController"
        })
        .when("/login", {
            templateUrl: "Login.html",
            controller: "loginController"
        })        
});

app.controller("mainController", function ($scope, $window, $location) {

    $scope.IsLogin = false;
    var id = $window.sessionStorage.getItem("IsLogin");

    if (id) {
        $scope.IsLogin = true;        
    } else {
        $scope.IsLogin = false;        
    }
    $location.path("/");

    $scope.Logout = function () {
        var check = confirm("Are you sure want to logout?");
        if (check) {
            $window.sessionStorage.removeItem("IsLogin");
            $scope.IsLogin = false;
            $location.url("/");
            //$window.location.reload();
        }
    }

});