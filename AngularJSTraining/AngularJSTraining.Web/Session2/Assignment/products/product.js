app.controller("productCtrl", function ($scope, $filter, $routeParams, productService, categoryService, brandService, $location) {
    $scope.productId = 0;
    $scope.userId = sessionStorage.getItem("userId");

    if ($scope.userId) {
        if ($routeParams.productId) {
            $scope.productId = parseInt($routeParams.productId);
        }

        /*Bind Dropdowns*/
        var getCategories = categoryService.get();
        getCategories.then(function (response) {
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
            var getProducts = productService.get();
            getProducts.then(function (response) {
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
        }
        else {
            var getProduct = productService.getById($scope.productId);
            getProduct.then(function (response) {
                if (response.status == 200) {
                    $scope.product = response.data.result;
                    if (angular.isUndefined($scope.product.BrandId) == false) {
                        $scope.product.BrandId = $scope.product.BrandId.toString();
                    }
                    if (angular.isUndefined($scope.product.CategoryId) == false) {
                        $scope.product.CategoryId = $scope.product.CategoryId.toString();
                    }
                    if (angular.isUndefined($scope.product.IsInStock) == false) {
                        $scope.product.IsInStock = $scope.product.IsInStock.toString();
                    }
                }
                else {
                    return response.data;
                }
            }, function (error) {
                console.log(error);
                return error;
            });
        }
        $scope.product = {
            ProductId: $scope.productId,
            ProductName: "",
            Price: "",
            CategoryId: "",
            BrandId: "",
            Color: "",
            IsInStock: "",
            CreatedBy: $scope.userId,
            LastModifiedBy: $scope.userId,
            //CreatedDate: ""
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
            LastModifiedBy: $scope.userId,
            //CreatedDate: ""
        }

        $scope.addEditProduct = function (productId) {
            if (!productId || productId == 0) {
                $scope.product.IsInStock = $scope.product.IsInStock == "true" ? true : false;
                var postProduct = productService.post($scope.product);
                postProduct.then(function (response) {
                    if (response.status == 200) {
                        if (response.data.result) {
                            $location.url("/product-list");
                        }
                        else {

                        }
                    }
                    else {
                    }
                }, function (error) {
                    console.log(error);
                    return error;
                });
            }
            else {
                $scope.product.IsInStock = $scope.product.IsInStock == "true" ? true : false;
                var putProduct = productService.put($scope.product);
                putProduct.then(function (response) {
                    if (response.status == 200) {
                        if (response.data.result == true) {
                            $location.url("/product-list");
                        }
                        else {

                        }
                    }
                    else {
                    }
                }, function (error) {
                    console.log(error);
                    return error;
                });
            }
        }
        $scope.resetData = function () {
            $scope.product = angular.copy(cloneProduct);
        }

        $scope.deleteProduct = function (productId) {
            var check = confirm("Are you sure you want to delete this Product?");
            if (check == true) {
                var deleteProduct = productService.delete(productId);
                deleteProduct.then(function (response) {
                    if (response.status == 200) {
                        if (response.data.result == true) {
                            var getProducts = productService.get();
                            getProducts.then(function (response) {
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
                        }
                        else {

                        }
                    }
                    else {
                    }
                }, function (error) {
                    console.log(error);
                    return error;
                });
            }
        }
    }
});