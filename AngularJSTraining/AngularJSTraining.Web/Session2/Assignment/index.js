app.controller("indexCtrl", function ($scope, $filter, $location) {
    $scope.navLinks = [];

    if (sessionStorage.getItem("userName")) {
        $scope.userName = sessionStorage.getItem("userName");
        var getNavLink = $filter('filter')($scope.navLinks, { "name": "Login" });
        var index = $scope.navLinks.indexOf(getNavLink);
        $scope.navLinks.splice(index, 1);
        var navLink1 = { link: "#!", name: "Logout" };
        var navLink2 = { link: "#!product-list", name: "Product List" };
        var navLink3 = { link: "#!product-add", name: "Add Product" };
        $scope.navLinks.push(navLink1);
        $scope.navLinks.push(navLink2);
        $scope.navLinks.push(navLink3);
    }
    else {
        var navLink1 = { link: "#!login", name: "Login" };
        var navLink2 = { link: "#!home", name: "Home" };
        $scope.navLinks.push(navLink1);
        $scope.navLinks.push(navLink2);
        //$location.url("#!login");
    }
});