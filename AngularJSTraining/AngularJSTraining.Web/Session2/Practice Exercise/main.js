var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            template: "<div>This is Template Page</div>"
        })
        .when("/home", {
            templateUrl: "Home.html"
        })
        .when("/contact-us", {
            templateUrl: "contactus/ContactUs.html",
            controller: "contactUsCtrl"
        })
        .when("/about-us", {
            templateUrl: "AboutUs.html"
        });
});