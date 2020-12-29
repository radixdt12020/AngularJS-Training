app.controller("contactUsCtrl", function ($scope, $filter) {
    $scope.isBtnClicked = false;
    $scope.saveValue = function () {
        $scope.isBtnClicked = true;
    }
});