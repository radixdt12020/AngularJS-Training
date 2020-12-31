app.service('categoryService', function ($http) {
    this.get = function () {
        return $http.get("http://localhost:8020/api/Category/Get");
    }
    this.getById = function (id) {
        return $http.get("http://localhost:8020/api/Category/Get?categoryId=" + id);
    }
});