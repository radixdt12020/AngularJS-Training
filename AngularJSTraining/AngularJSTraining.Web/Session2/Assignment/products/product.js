app.controller("productCtrl", function ($scope, $filter, $routeParams, productService, categoryService, brandService) {
    $scope.productId = 0;
    
    if ($routeParams.productId) {
        $scope.productId = parseInt($routeParams.productId);
    }

    /*Bind Dropdowns*/
    var getCategories = categoryService.get();
    getCategories.then(function (response) {
        console.log(response);
        if (response.status == 200) {
            $scope.categories = response.data.result;
        }
        else {
            return response.data;
        }
    }, function (error) {
        console.log(error);
        return error;
    })

    var getBrands = brandService.get();
    getBrands.then(function (response) {
        console.log(response);
        if (response.status == 200) {
            $scope.brands = response.data.result;
        }
        else {
            return response.data;
        }
    }, function (error) {
        console.log(error);
        return error;
    })
    /*Bind Dropdowns*/

    if ($scope.productId == 0) {
        console.log($scope.productId);
        var getProducts = productService.get();
        getProducts.then(function (response) {
            console.log(response);
            if (response.status == 200) {
                $scope.productList = response.data.result;
            }
            else {
                return response.data;
            }
        }, function (error) {
            console.log(error);
            return error;
        })
        console.log($scope.productList);
    }
    else {
        console.log($scope.productId);
        var getProduct = productService.getById($scope.productId);
        getProduct.then(function (response) {
            console.log(response);
            if (response.status == 200) {
                $scope.product = response.data.result;
            }
            else {
                return response.data;
            }
        }, function (error) {
            console.log(error);
            return error;
        });
        console.log($scope.product);
    }

    $scope.product = {
        ProductId: $scope.productId,
        ProductName: "",
        Price: "",
        CategoryId: "",
        BrandId: "",
        Color: "",
        IsInStock: "",
        CreatedBy: 1,
        CreatedDate: ""
    }
    var cloneProduct = {
        ProductId: $scope.productId,
        ProductName: "",
        Price: "",
        CategoryId: "",
        BrandId: "",
        Color: "",
        IsInStock: "",
        CreatedBy: 1,
        CreatedDate: ""
    }
    
    $scope.addEditProduct = function (productId) {
        if (!productId || productId == 0) {
            $scope.product.IsInStock = $scope.product.IsInStock == "true" ? true : false;
            var postProduct = productService.post($scope.product);
            postProduct.then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    return response.data.result;
                }
                else {
                    return response.data;
                }
            }, function (error) {
                console.log(error);
                return error;
            });
        }
        else {
            console.log(productId);
        }
    }
    $scope.resetData = function () {
        $scope.product = angular.copy(cloneProduct);
    }
});