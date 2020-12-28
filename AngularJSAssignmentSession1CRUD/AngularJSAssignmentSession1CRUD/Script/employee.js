app.controller('EmployeeCtrl', function ($scope) {

    $scope.IsUpdate = false;
    $scope.showMsg = false;
    $scope.message = "";
    var today = new Date();
    $scope.today = today.toISOString();

    $scope.EmployeeListData = [];
    $scope.ObjEmployeeEmpty = {};

    $scope.ObjEmployee = {
        EmpId: 1,
        EmpCode: "EMP0001",
        EmpName: 'Dhara Bhuva',
        EmpAge: 25,
        EmpGender: 'Female',
        EmpDesignation: 'Software Developer',
        EmpSalary: 45000,
        EmpLocation: 'Ahmebadad',
        EmpEmail: 'dhara@gmail.com',
        EmpDateOfJoining: new Date(),
        EmpContactNo: 9662320694
    };

    $scope.EmployeeListData.push($scope.ObjEmployee);
    $scope.ObjEmployee = {};
   

    $scope.SubmitData = function (ObjEmployee) {
        //console.log($scope.ObjEmployee)
        if (!$scope.IsUpdate) {
            //add           
            if ($scope.EmployeeListData.length > 0) {
                ObjEmployee.EmpId = $scope.GetNextEmpId();
            }
            else {
                ObjEmployee.EmpId = 1;
            }
            $scope.EmployeeListData.push(ObjEmployee);

            $scope.showMsg = true;
            $scope.message = "Employee Added Successfully!";
        }
        else {
            //edit            
            $scope.IsUpdate = false;

            for (i in $scope.EmployeeListData) {                
                if ($scope.EmployeeListData[i].EmpId == ObjEmployee.EmpId) {
                    $scope.EmployeeListData[i] = ObjEmployee;
                }
            }
            $scope.showMsg = true;
            $scope.message = "Employee Updated Successfully!";

        }

        $scope.ClearData();
    };

    $scope.EditData = function (EmpId) {
        $scope.ObjEmployee = angular.copy($scope.EmployeeListData.find(x => x.EmpId == EmpId));
        //$scope.ObjEmployee = Emp;
        $scope.IsUpdate = true;
        $scope.showMsg = false;
    };

    $scope.DeleteData = function (Emp) {
        check = confirm("Are you sure to delete this employee?");
        if (check) {
            var idx = $scope.EmployeeListData.indexOf(Emp);
            $scope.EmployeeListData.splice(idx, 1);

            $scope.showMsg = true;
            $scope.message = "Employee Deleted Successfully!";
        }
    }

    $scope.GetNextEmpId = function () {

        var EmpId = $scope.EmployeeListData.reduce((a, { EmpId }) => Number(EmpId) > a ? Number(EmpId) : a, -1);
        console.log(EmpId);
        return EmpId + 1;
    };

    $scope.ClearData = function () {
        $scope.IsUpdate = false;

        $scope.ObjEmployee = angular.copy($scope.ObjEmployeeEmpty);        
        $scope.myForm.$setUntouched();
    };

});

//app.directive('CheckEmpCode', function () {
//    return {
//        require: 'ngModel',
//        link: function (scope, element, attrs, ctrl) {
//            ctrl.$asyncValidators.CheckEmpCode = function (modelValue, viewValue) {
//               
//            for (i in ctrl.EmployeeListData) {
//                if (ctrl.EmployeeListData[i].EmpCode == viewValue) {
//                        return false;
//                    }
//                    else {
//                        return true;
//                    }
//            }
//            }

//        }
//    }
//});


