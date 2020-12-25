
app.controller('ProductController', function ($scope) {
    $scope.ProdName = "";
    $scope.ProdPrice = "";
    $scope.ProdQuantity = "";
    $scope.ProdSaleValue = "";

    $scope.CalculateSaleValue = function () {
        if ($scope.ProdPrice > 0 && $scope.ProdQuantity > 0) {
            $scope.ProdSaleValue = $scope.ProdPrice * $scope.ProdQuantity;
            return $scope.ProdSaleValue
        }
        else {
            return 0;
        }
    };
    $scope.Reset = function () {
        $scope.ProdName = "";
        $scope.ProdPrice = "";
        $scope.ProdQuantity = "";
        $scope.ProdSaleValue = "";
    };
});