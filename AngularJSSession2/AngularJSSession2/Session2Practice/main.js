var app = angular.module("myapp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            template: "<span>Welcome to routing...! <br />This page is tempate base.</span>"
        })
        .when("/home", {
            templateUrl: "Home/home.html",
            controller:"homeController"
        })
        .when("/aboutus", {
            templateUrl: "Aboutus/aboutus.html",
            controller: "aboutusController"
        })
        .when("/contactus", {
            templateUrl: "Contactus/contactus.html",
            controller: "contactusController"
        })
});