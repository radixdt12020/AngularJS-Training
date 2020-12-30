app.controller("loginController", function ($scope, $location, $window, ProductService) {
    $scope.msg = "Login";
    $scope.ObjLogin = {
        UserName: "",
        Password:""
    }
    $scope.Islogin = false;

    $scope.Login = function (objLogin) {
        var userExist = ProductService.CheckUserExist(objLogin);
        userExist.then(function (response) {
            if (response.data != "") {
                alert("User exist!");
            } else {
                alert("Something went wrong");
            }
        }, function (error) {
            console.log("Error: " + error);
        });

        sessionStorage.setItem("IsLogin", true);
        $window.location.reload();
       // $location.path('/');
        //$state.go('/', {}, { reload: true }) 
        
    };
    $scope.Reset = function () {

        $scope.loginForm.$setUntouched();
    };

    var IsUserLogin = sessionStorage.getItem("IsLogin");
   
    if (IsUserLogin) {
        $scope.Islogin = true;
    }
    else {
        $scope.Islogin = false;
    }
});