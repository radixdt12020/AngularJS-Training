app.service("ProductService", function ($http) {
    var baseURL = "http://localhost:55544/api/";
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Access-Control-Allow-Origin", "*");

    var config = {
        headers: {
            //'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };

    this.getAllProduct = function () {
        console.log("Service getAllProduct.............")
        return $http.get(baseURL + "Product/", config);       
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
        return $http.get(baseURL +"Product/GetProductById/"+ Id);
    }

    this.postProduct = function (product) {
        console.log("Service postProduct.............")
        return $http.post(baseURL + "Product/AddProduct/" + product);
        //debugger;
        //var request = $http({
        //    method: "post",
        //    url: baseURL + "AddProduct",
        //    data: product
        //});
        //debugger;
        //return request;      
    }

    this.putProduct = function (product) {
        console.log("Service putProduct.............")
        return $http.pt(baseURL + "Product/UpdateProduct", product);
    }

    this.deleteProduct = function (Id) {
        console.log("Service deleteProduct.............")
        return $http.delete(baseURL + "Product/DeleteProduct/", Id);
    }


    //CheckUserExist
    this.CheckUserExist = function (user) {
        console.log("Service postProduct.............")
        return $http.post(baseURL + "User/CheckUserExist/" + user);
    };
});
