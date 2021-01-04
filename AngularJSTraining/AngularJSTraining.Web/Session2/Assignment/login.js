app.controller("loginCtrl", function ($scope, $filter, $http, $location) {
    $scope.userName = "";
    $scope.password = "";
    $scope.authenticatedUser = false;
    $scope.isIncorrect = false;
    $scope.login = function () {
        $http.get("http://localhost:8020/api/User/Get?userName=" + $scope.userName + "&password=" + $scope.password)
            .then(function (response) {
                debugger
                if (response.status == 200) {
                    $scope.authenticatedUser = response.data.result;
                    if ($scope.authenticatedUser) {
                        $scope.isIncorrect = false;
                        sessionStorage.setItem("userName", $scope.userName);
                        sessionStorage.setItem("userId", $scope.authenticatedUser.Id);
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