app.controller("EmployeeController", function ($scope, $filter) {
    $scope.employee = {
        empCode: "",
        name: "",
        age: "",
        gender: "",
        designation: "",
        salary: "",
        location: "",
        emailId: "",
        doj: "",
        phNumber: ""
    }
    var cloneEmployee = {
        empCode: "",
        name: "",
        age: "",
        gender: "",
        designation: "",
        salary: "",
        location: "",
        emailId: "",
        doj: "",
        phNumber: ""
    }

    if (sessionStorage.getItem("employeeList")) {
        $scope.employeeList = JSON.parse(sessionStorage.getItem("employeeList"));
    }
    else {
        $scope.employeeList = [];
    }


    $scope.addEditEmployee = function (empCode) {
        if (sessionStorage.getItem("employeeList")) {
            $scope.employeeList = JSON.parse(sessionStorage.getItem("employeeList"));
        }
        var getEmp = $filter('filter')($scope.employeeList, { 'empCode': empCode });
        if (getEmp && getEmp.length == 0) {
            $scope.employee.doj = new Date($scope.employee.doj);
            $scope.employeeList.push($scope.employee);
            sessionStorage.setItem("employeeList", JSON.stringify($scope.employeeList))
        }
        else {
            for (i in $scope.employeeList) {
                if ($scope.employeeList[i].empCode == $scope.employee.empCode) {
                    $scope.employeeList[i] = $scope.employee;
                }
            }
            sessionStorage.setItem("employeeList", JSON.stringify($scope.employeeList))
        }
    }

    $scope.resetData = function () {
        $scope.employee = angular.copy(cloneEmployee);
    }

    $scope.editEmployee = function (empCode) {
        if (sessionStorage.getItem("employeeList")) {
            $scope.employeeList = JSON.parse(sessionStorage.getItem("employeeList"));
        }
        var getEmp = $filter('filter')($scope.employeeList, { 'empCode': empCode });
        if (getEmp && getEmp.length == 1) {
            getEmp[0].doj = new Date(getEmp[0].doj);
            $scope.employee = angular.copy(getEmp[0]);
        }

    }

    $scope.deleteEmployee = function (empCode) {
        if (sessionStorage.getItem("employeeList")) {
            $scope.employeeList = JSON.parse(sessionStorage.getItem("employeeList"));
        }
        var getEmp = $filter('filter')($scope.employeeList, { 'empCode': empCode });
        var index = $scope.employeeList.indexOf(getEmp);
        $scope.employeeList.splice(index, 1);
        sessionStorage.setItem("employeeList", JSON.stringify($scope.employeeList))
    }
});