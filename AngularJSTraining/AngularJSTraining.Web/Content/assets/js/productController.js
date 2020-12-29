app.controller("ProductController", function ($scope) {
    $scope.pName = "";
    $scope.pPrice = "";
    $scope.pQty = "";
    $scope.pSaleValue = "";
    $scope.isBtnClicked = false;

    $scope.calculateSaleValue = function () {
        $scope.isBtnClicked = true;
        if ($scope.pQty > 0 && $scope.pPrice > 0) {
            $scope.pSaleValue = $scope.pPrice * $scope.pQty
        }
    }
});