var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "Login.html",
            controller: "loginCtrl"
        })
        .when("/product-list", {
            templateUrl: "product/List.html",
            controller: "productCtrl"
        })
        .when("/product-addd", {
            templateUrl: "product/Add.html",
            controller: "productCtrl"
        });
});