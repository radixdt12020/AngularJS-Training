var app = angular.module("myapp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            template: "<div>Welcome to Product Inventory Application...!</div>",
            //templateUrl:"Index.html",
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
});

app.controller("mainController", function ($scope, $window, $location, ProductService) {

    $scope.IsLogin = false;
    var id = $window.sessionStorage.getItem("IsLogin");

    if (id) {
        $scope.IsLogin = true;
    } else {
        $scope.IsLogin = false;
    }
    
    $scope.Logout = function () {
        var check = confirm("Are you sure want to logout?");
        if (check) {
            $window.sessionStorage.removeItem("IsLogin");
            $window.sessionStorage.removeItem("User");
            $scope.IsLogin = false;
            $location.url("/");
        }
    }


    ////login control code   
    $scope.ObjLogin = {
        UserName: "",
        Password: ""
    }
    $scope.showMsg = false;
    $scope.message = "";

    $scope.Login = function (objLogin) {

        var userExist = ProductService.CheckUserExist(objLogin);
        userExist.then(function (response) {
            if (response.data.isSuccess) {
                //alert("User exist!");
                $window.sessionStorage.setItem("IsLogin", true);
                $window.sessionStorage.setItem("User", response.data.json.UserName);
                $scope.IsLogin = true;

                //alert("You are successfully logged in..!")
                $location.url("/");

            } else {
                //alert("Something went wrong!");
                $scope.showMsg = true;
                $scope.message = response.data.message;
            }
        }, function (error) {
            $scope.showMsg = true;
            $scope.message = "Something went wrong!";
            console.log("Error: " + error);
        });

    };

    $scope.Reset = function () {
        $scope.showMsg = false;
        $scope.ObjLogin = {};
        $scope.loginForm.$setUntouched();
    };

});