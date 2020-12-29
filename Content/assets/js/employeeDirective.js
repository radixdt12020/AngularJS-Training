app.directive('employeeDirective', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (sessionStorage.getItem("employeeList")) {
                    var employeeList = JSON.parse(sessionStorage.getItem("employeeList"));
                    var getEmp = employeeList.filter(function (filterEle) {
                                    if (filterEle.empCode == value) {
                                        return filterEle
                                    }
                                })
                    //var getEmp = $filter('filter')(employeeList, { 'empCode': value });
                    if (getEmp && getEmp.length > 0) {
                        mCtrl.$setValidity('isExistEmpCode', false);
                    }
                    else {
                        mCtrl.$setValidity('isExistEmpCode', true);
                    }
                }
                else {
                    mCtrl.$setValidity('isExistEmpCode', true);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});