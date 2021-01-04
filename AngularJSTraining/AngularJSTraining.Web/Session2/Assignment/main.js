var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        //.when("/", {
        //    templateUrl: "Index.html",
        //    //controller: "indexCtrl"
        //})
        .when("/login", {
            templateUrl: "Login.html",
            controller: "loginCtrl"
        })
        .when("/home", {
            template: "<h2 class='text-center'>Welcome to Product Management System!</h2>",
        })
        .when("/product-list", {
            templateUrl: "products/List.html",
            controller: "productCtrl"
        })
        .when("/product-add", {
            templateUrl: "products/AddEdit.html",
            controller: "productCtrl"
        })
        .when("/product-edit/:productId", {
            templateUrl: "products/AddEdit.html",
            controller: "productCtrl"
        });
});