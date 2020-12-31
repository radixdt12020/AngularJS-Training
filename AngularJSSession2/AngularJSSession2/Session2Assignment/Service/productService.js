app.service("ProductService", function ($http) {
    var baseURL = "http://localhost:55544/api/";

    this.getAllProduct = function () {
        console.log("Service getAllProduct.............")
        return $http.get(baseURL + "Product/");
        //var request = $http({
        //    method: "GET",
        //    url: baseURL + "Product/",
        //    headers: config
        //});
        //console.log(request);
        //return request;
    }

    this.getByIdProduct = function (Id) {
        console.log("Service getByIdProduct.............")
        return $http.get(baseURL + "Product/GetProductById/" + Id);
    }

    this.postProduct = function (product) {
        console.log("Service postProduct.............")
        return $http.post(baseURL + "Product/AddProduct/", product);
    }

    this.putProduct = function (product) {
        console.log("Service putProduct.............")
        return $http.put(baseURL + "Product/UpdateProduct", product);
    }

    this.deleteProduct = function (Id) {
        console.log("Service deleteProduct.............")
        return $http.delete(baseURL + "Product/DeleteProduct/" + Id);
    }

    //CheckUserExist
    this.CheckUserExist = function (user) {
        console.log("Service postProduct.............")
        return $http.post(baseURL + "User/CheckUserExist/", user);
    };
});
