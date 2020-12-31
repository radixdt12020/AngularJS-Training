app.controller("productController", function ($scope, $routeParams, $location, $window, ProductService) {
    $scope.message = "";
    $scope.IsSuccess = false;
    $scope.showMsg = false;
    $scope.ProductList;
    $scope.ObjProduct = {};

    $scope.GetAllProduct = function () {
       // console.log("GetAllProduct in call in product controller..........!");
        var product = ProductService.getAllProduct();
        product.then(function (response) {
            $scope.ProductList = response.data.json;
            //console.log(response.data);
        }, function (error) {
            $scope.message = "Something went wrong!";
            $scope.IsSuccess = false;
            console.log("Error: " + error);
        });

    };

    $scope.GetByProductId = function (ProdId) {
       // console.log("GetByProductId call in product controller..........!");
        $scope.showMsg = false;

        var product = ProductService.getByIdProduct(ProdId);
        product.then(function (response) {
            $scope.ObjProduct = response.data.json;
            //console.log(response.data);
        }, function (error) {
            $scope.message = "Something went wrong!";
            $scope.IsSuccess = false;
            console.log("Error: " + error);
        });

    };

    $scope.Add = function (Product) {
       // console.log("Add call in product controller..........!");
        $scope.showMsg = true;
        try {
            if (!Product.ProdInStock) {
                Product.ProdInStock = false;
            }
            Product.CreatedBy = $window.sessionStorage.getItem("User");
            //call api
            var addProduct = ProductService.postProduct(Product);
            addProduct.then(function (response) {
               // console.log(response.data);
                if (response.data.isSuccess) {
                    //$scope.IsSuccess = true;
                    //$scope.message = "Product Added Successfully!";
                    $scope.IsSuccess = response.data.isSuccess;
                    $scope.message = response.data.message;                    
                    $scope.Reset();
                } else {
                    //$scope.message = "Something went wrong!";
                    //$scope.IsSuccess = false;
                    $scope.IsSuccess = response.data.isSuccess;
                    $scope.message = response.data.message;
                }
            }, function (error) {
                $scope.message = "Something went wrong!";
                $scope.IsSuccess = false;
                console.log("Error: " + error);
            });
        }
        catch{
            $scope.IsSuccess = false;
            $scope.message = "Something went wrong!";
        }
    };

    $scope.Update = function (Product) {
       // console.log("Update call in product controller..........!");

        if (Product.ProdId > 0) {
            Product.ModifiedBy = $window.sessionStorage.getItem("User");
            //call api
            var UpdateProduct = ProductService.putProduct(Product);
            UpdateProduct.then(function (response) {
                if (response.data.isSuccess) {
                    $scope.showMsg = true;

                    //$scope.IsSuccess = true;
                    //$scope.message = "Product Updated Successfully!";
                    $scope.IsSuccess = response.data.isSuccess;
                    $scope.message = response.data.message;
                    //$scope.Reset();

                    //Redirect to product list
                    alert(response.data.message);
                    $scope.GetAllProduct();
                    $location.path('/productList');
                } else {
                    $scope.showMsg = true;
                    //$scope.message = "Something went wrong!";
                    //$scope.IsSuccess = false;
                    $scope.IsSuccess = response.data.isSuccess;
                    $scope.message = response.data.message;
                }
            }, function (error) {
                $scope.showMsg = true;

                $scope.message = "Something went wrong!";
                $scope.IsSuccess = false;
                console.log("Error: " + error);
            });

        }
    };

    $scope.Delete = function (Product) {
        check = confirm("Are you sure to delete this product?");
        if (check) {
            $scope.showMsg = true;

            //call api
            var deleteProduct = ProductService.deleteProduct(Product.ProdId);
            deleteProduct.then(function (response) {
                if (response.data.isSuccess) {
                    $scope.IsSuccess = true;
                    $scope.message = "Product Deleted Successfully!";

                    //Redirect to product list
                    $scope.GetAllProduct();
                    $location.path('/productList');

                } else {
                    $scope.message = "Something went wrong!";
                    $scope.IsSuccess = false;
                }
            }, function (error) {
                $scope.message = "Something went wrong!";
                $scope.IsSuccess = false;
                console.log("Error: " + error);
            });

        }
    };

    $scope.Reset = function () {
        // $scope.showMsg = false;
        //$scope.message = "";
        $scope.ObjProduct = {};
        $scope.myForm.$setUntouched();
    };

    if ($routeParams.ProdId) {
        $scope.GetByProductId($routeParams.ProdId);
    }

    //Fisr call get all
    $scope.GetAllProduct();
});