app.service('productService', function ($http) {
    this.get = function () {
        return $http.get("http://localhost:8020/api/Product/Get");
        //.then(function (response) {
        //    console.log(response);
        //    if (response.status == 200) {
        //        return response.data.result;
        //    }
        //    else {
        //        return response.data;
        //    }
        //}, function (error) {
        //    console.log(error);
        //    return error;
        //})
    }
    this.getById = function (id) {
        return $http.get("http://localhost:8020/api/Product/Get?productId=" + id);
        //.then(function (response) {
        //    console.log(response);
        //    if (response.status == 200) {
        //        return response.data.result;
        //    }
        //    else {
        //        return response.data;
        //    }
        //}, function (error) {
        //    console.log(error);
        //    return error;
        //});
    }
    this.post = function (productData) {
        return $http.post("http://localhost:8020/api/Product/Post", productData);
        //.then(function (response) {
        //    console.log(response);
        //    if (response.status == 200) {
        //        return response.data.result;
        //    }
        //    else {
        //        return response.data;
        //    }
        //}, function (error) {
        //    console.log(error);
        //    return error;
        //});
    }
    this.put = function (productData) {
        $http.put("http://localhost:8020/api/Product/Put", productData)
            .then(function (response) {
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
    this.delete = function (id) {
        $http.delete("http://localhost:8020/api/Product/Delete?productId=" + id)
            .then(function (response) {
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
});