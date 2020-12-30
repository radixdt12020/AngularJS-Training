var app = angular.module("myapp", ["ngRoute"]);

app.controller("mainController", function ($scope, $http) {
    $scope.msg = "Rest API calling & display data...........!"
    $scope.myData = [];
    $http.get("https://gorest.co.in/public-api/users").then(function (response) {
        $scope.myData = response.data.data;
        console.log("Response......." + response.data);
        console.log(response.data.data);
    }, function (error) {
            console.log("Eoor..........." + error);
    });
});