app.service("ProductService", function ($http) {
    var baseURL = "";

    this.getAllProduct = function () {
        console.log("Service getAllProduct.............")
        return $http.get(baseURL);
    }  

    this.getByIdProduct = function (Id) {
        console.log("Service getByIdProduct.............")
        return $http.get(baseURL+"/"+Id);
    }

    this.postProduct = function (product) {
        console.log("Service postProduct.............")
        return $http.post(baseURL + "/AddProduct", product);
    }

    this.putProduct = function (product) {
        console.log("Service putProduct.............")
        return $http.pt(baseURL + "/UpdateProduct", product);
    }

    this.deleteProduct = function (Id) {
        console.log("Service deleteProduct.............")
        return $http.delete(baseURL + "/DeleteProduct", Id);
    }

});
