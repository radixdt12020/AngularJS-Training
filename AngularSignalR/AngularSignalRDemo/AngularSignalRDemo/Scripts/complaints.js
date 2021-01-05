(function () { // Angular encourages module pattern, good!
    var app = angular.module('myApp', []),
        uri = '../api/customerComplaints',
        errorMessage = function (data, status) {
            return 'Error: ' + status +
                (data.Message !== undefined ? (' ' + data.Message) : '');
        },
        hub = $.connection.signalRHub; // create a proxy to signalr hub on web server

    app.controller('myCtrl', ['$http', '$scope', function ($http, $scope) {
        $scope.complaints = [];
        $scope.customerIdSubscribed;

        $scope.getAllFromCustomer = function () {
            if ($scope.customerId.length == 0) return;
            $http.get(uri + '/' + $scope.customerId)
                .then(function (response) {
                    if (response.data.result) {
                        $scope.complaints = response.data.result; // show current complaints
                        if ($scope.customerIdSubscribed &&
                            $scope.customerIdSubscribed.length > 0 &&
                            $scope.customerIdSubscribed !== $scope.customerId) {
                            // unsubscribe to stop to get notifications for old customer
                            hub.server.unsubscribe($scope.customerIdSubscribed);
                        }
                        // subscribe to start to get notifications for new customer
                        hub.server.subscribe($scope.customerId);
                        $scope.customerIdSubscribed = $scope.customerId;
                    }
                    
                }, function (error) {
                        console.log(error);
                    $scope.complaints = [];
                    $scope.errorToSearch = errorMessage(error, error.status);
                })
            //.error(function (data, status) {
            //    $scope.complaints = [];
            //    $scope.errorToSearch = errorMessage(data, status);
            //})
        };
        $scope.postOne = function () {
            $http.post(uri, {
                ComplaintId: 0,
                CustomerId: $scope.customerId,
                Description: $scope.descToAdd
            })
                .then(function (response) {
                    if (response.data.result) {
                        $scope.errorToAdd = null;
                        $scope.descToAdd = null;
                    }
                }, function (error) {
                    $scope.errorToAdd = errorMessage(error, error.status);
                })
            //.error(function (data, status) {
            //    $scope.errorToAdd = errorMessage(data, status);
            //})
        };
        $scope.putOne = function () {
            $http.put(uri + '/' + $scope.idToUpdate, {
                ComplaintId: $scope.idToUpdate,
                CustomerId: $scope.customerId,
                Description: $scope.descToUpdate
            })
                .then(function (response) {
                    if (response.data.result) {
                        $scope.errorToUpdate = null;
                        $scope.idToUpdate = null;
                        $scope.descToUpdate = null;
                    }
                }, function (error) {
                    $scope.errorToUpdate = errorMessage(error, error.status);
                })
            //.error(function (data, status) {
            //    $scope.errorToUpdate = errorMessage(data, status);
            //})
        };
        $scope.deleteOne = function (item) {
            $http.delete(uri + '/' + item.ComplaintId)
                .then(function (response) {
                    if (response.data.result) {
                        $scope.errorToDelete = null;
                    }
                }, function (error) {
                    $scope.errorToDelete = errorMessage(error, error.status);
                })
            //.error(function (data, status) {
            //    $scope.errorToDelete = errorMessage(data, status);
            //})
        };
        $scope.editIt = function (item) {
            $scope.idToUpdate = item.ComplaintId;
            $scope.descToUpdate = item.Description;
        };
        $scope.toShow = function () {
            return $scope.complaints && $scope.complaints.length > 0;
        };

        // at initial page load
        $scope.orderProp = 'ComplaintId';

        // signalr client functions
        hub.client.addItem = function (item) {
            alert(item);
            $scope.complaints.push(item);
            $scope.$apply(); // this is outside of angularjs, so need to apply
        }
        hub.client.deleteItem = function (item) {
            alert(item);
            var array = $scope.complaints;
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i].ComplaintId === item.ComplaintId) {
                    array.splice(i, 1);
                    $scope.$apply();
                }
            }
        }
        hub.client.updateItem = function (item) {
            var array = $scope.complaints;
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i].ComplaintId === item.ComplaintId) {
                    array[i].Description = item.Description;
                    $scope.$apply();
                }
            }
        }

        $.connection.hub.start(); // connect to signalr hub
    }]);
})();