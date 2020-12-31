app.controller("loginController", function ($scope, $location, $window, ProductService) {
    $scope.msg = "Login";
    $scope.ObjLogin = {
        UserName: "",
        Password: ""
    }
    $scope.showMsg = false;
    $scope.message = "";
    $scope.Islogin = false;

    $scope.Login = function (objLogin) {

        var userExist = ProductService.CheckUserExist(objLogin);
        userExist.then(function (response) {
            if (response.data.isSuccess) {
                //alert("User exist!");
                $window.sessionStorage.setItem("IsLogin", true);
                $window.sessionStorage.setItem("User", response.data.json.UserName);
                $window.location.reload();
                //alert("You are successfully logged in..!")
                //$location.url("/");


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

    var IsUserLogin = $window.sessionStorage.getItem("IsLogin");

    if (IsUserLogin) {
        $scope.Islogin = true;
        $location.url('/');
    }
    else {
        $scope.Islogin = false;
    }
});