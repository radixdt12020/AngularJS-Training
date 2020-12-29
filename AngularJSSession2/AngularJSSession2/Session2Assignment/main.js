var app = angular.module("myapp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            template: "<div>Welcome to Product Inventory Application...!</div>"
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
});