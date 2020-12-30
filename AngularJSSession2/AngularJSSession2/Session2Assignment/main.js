var app = angular.module("myapp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            template: "<div>Welcome to Product Inventory Application...!</div>",
            controller: "mainController"
        })
        .when("/productList",{
            templateUrl: "Product/productList.html",
            controller:"productController"
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

app.controller("mainController", function ($scope, $window,$location) {
    $scope.IsLogin = false;   
    var id = sessionStorage.getItem("IsLogin");   
    if (id) {
        $scope.IsLogin = true;
        //alert("s");
    } else {
        $scope.IsLogin = false;
        //alert("f");
    }

    $scope.Logout = function () {
        sessionStorage.removeItem("IsLogin");        
        $scope.IsLogin = false;
        //$location.path("/login");
        $window.location.reload();
    }
});