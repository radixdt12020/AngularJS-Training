app.controller("indexCtrl", function ($scope, $filter, $location, $http) {
    $scope.userName = sessionStorage.getItem("userName");
    $scope.isAuthenticated = false;
    if ($scope.userName) {
        $scope.isAuthenticated = true;
    }

    $scope.password = "";
    $scope.isIncorrect = false;
    $scope.isLoginClicked = false;
    $scope.loginNav = function () {
        $scope.isLoginClicked = true;
    }
    $scope.login = function () {
        $http.get("http://localhost:8020/api/User/Get?userName=" + $scope.userName + "&password=" + $scope.password)
            .then(function (response) {
                if (response.status == 200) {
                    var authenticatedUser = response.data.result;
                    if (authenticatedUser) {
                        $scope.isIncorrect = false;
                        sessionStorage.setItem("userName", $scope.userName);
                        sessionStorage.setItem("userId", authenticatedUser.Id);
                        $scope.isLoginClicked = false;
                        $scope.isAuthenticated = true;
                        $location.url("/home");
                    }
                    else {
                        $scope.isIncorrect = true;
                    }
                }

            }, function (error) {
                console.log(error);
                alert("Error Occurred");
            });
    }

    $scope.logout = function () {
        debugger
        $scope.isAuthenticated = false;
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userId");
        $scope.userName = "";
        $scope.password = "";
        $location.url("/home");
    }
});