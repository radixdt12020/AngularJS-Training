app.service('productService', function ($http) {
    this.get = function () {
        return $http.get("http://localhost:8020/api/Product/Get");
    }
    this.getById = function (id) {
        return $http.get("http://localhost:8020/api/Product/Get?productId=" + id);
    }
    this.post = function (productData) {
        return $http.post("http://localhost:8020/api/Product/Post", productData);
    }
    this.put = function (productData) {
        return $http.put("http://localhost:8020/api/Product/Put", productData);    
    }
    this.delete = function (id) {
        return $http.delete("http://localhost:8020/api/Product/Delete?productId=" + id);
    }
});