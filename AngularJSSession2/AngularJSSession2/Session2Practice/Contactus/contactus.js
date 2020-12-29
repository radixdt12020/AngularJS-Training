
app.controller("contactusController", function ($scope) {
    $scope.Message = "Welcome to the contact us page.";
    $scope.Name = "";
    $scope.Email = "";
    $scope.MobileNo;
    $scope.IsSubmit = false;

    $scope.Submit = function () {
        $scope.IsSubmit = true;
        $scope.Name;
        $scope.Email;
        $scope.MobileNo;

        $scope.myForm.$setUntouched();
    };

    $scope.Reset = function () {
        $scope.IsSubmit = false;
        $scope.Name = "";
        $scope.Email = "";
        $scope.MobileNo = "";
    }
});