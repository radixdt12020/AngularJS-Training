app.controller("productController", function ($scope, $routeParams, $location,ProductService) {
    $scope.message = "";
    $scope.showMsg = false;

    $scope.ProductList = [];
    $scope.ObjProductEmpty = {};
    $scope.ObjProduct = {
        ProdId: 1,
        ProdCode: "P0001",
        ProdName: "Real me XT",
        ProdCategory: "Electronics",
        ProdBrand: "RealMe",
        ProdColor: "White",
        ProdPrice: 15000,
        ProdInStock: true
    };
    $scope.ProductList.push($scope.ObjProduct);
    $scope.ObjProduct = {};

    $scope.GetAllProduct = function () {
        var product = ProductService.getAllProduct();
        product.then(function (response) {
            debugger
           console.log(response);
        }, function (error) {
            console.log("Error: " + error);
        });
    };

    $scope.GetByProductId = function (ProdId) {
        $scope.ObjProduct = angular.copy($scope.ProductList.find(x => x.ProdId == ProdId));       
        $scope.showMsg = false;
    };

    $scope.Add = function (Product) {
        console.log(Product);
        try {
            if ($scope.ProductList.length > 0) {
                Product.ProdId = $scope.GetNextId();
            }
            else {
                Product.EmpId = 1;
            }
            $scope.ProductList.push(Product);
                    
            $scope.showMsg = true;
            $scope.message = "Product Added Successfully!";
            $scope.Reset();
        }
        catch{
            $scope.showMsg = true;
            $scope.message = "Failed to add Product!";
        }
    };

    $scope.Update = function (Product) {
        console.log(Product);
        if (Product.ProdId > 0) {
            for (i in $scope.ProductList) {
                if ($scope.ProductList[i].ProdId == Product.ProdId) {
                    $scope.ProductList[i] = Product;

                }
            }
            $scope.showMsg = true;
            $scope.message = "Product Updated Successfully!";
            $scope.Reset();
        }
    };

    $scope.Delete = function (Product) {
        check = confirm("Are you sure to delete this product?");
        if (check) {
            var idx = $scope.ProductList.indexOf(Product);
            $scope.ProductList.splice(idx, 1);

            $scope.showMsg = true;
            $scope.message = "Product Deleted Successfully!";
            $scope.Reset();

            $location.path('/productList');
        }
    };

    $scope.GetNextId = function () {

        var ProdId = $scope.ProductList.reduce((a, { ProdId }) => Number(ProdId) > a ? Number(ProdId) : a, -1);
        return ProdId + 1;
    };

    $scope.Reset = function () {
       // $scope.showMsg = false;
        //$scope.message = "";
        $scope.ObjProduct = angular.copy($scope.ObjProductEmpty);
        $scope.myForm.$setUntouched();
    };

    if ($routeParams.ProdId) {
        console.log($routeParams.ProdId);
        $scope.GetByProductId($routeParams.ProdId);
    }

    //
    $scope.GetAllProduct();
});