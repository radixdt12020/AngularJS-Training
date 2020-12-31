app.controller("loginCtrl", function ($scope, $filter, $http, $location) {
    $scope.userName = "";
    $scope.password = "";
    $scope.isAuthenticated = false;
    $scope.isIncorrect = false;
    $scope.login = function () {
        $http.get("http://localhost:8020/api/User/Get?userName=" + $scope.userName + "&password=" + $scope.password)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.isAuthenticated = response.data.result;
                    if ($scope.isAuthenticated == true) {
                        $scope.isIncorrect = false;
                        sessionStorage.setItem("userName", $scope.userName);
                        $location.url("/product-list");
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
});