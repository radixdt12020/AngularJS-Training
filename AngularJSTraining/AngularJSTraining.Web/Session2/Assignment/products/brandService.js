app.service('brandService', function ($http) {
    this.get = function () {
        return $http.get("http://localhost:8020/api/Brand/Get");
    }
    this.getById = function (id) {
        return $http.get("http://localhost:8020/api/Brand/Get?brandId=" + id);
    }
});