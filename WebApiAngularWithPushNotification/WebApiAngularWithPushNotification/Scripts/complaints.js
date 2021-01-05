(function () {
    var app = angular.module("myApp", []),
        uri = 'api/complaints',
        errorMessage = function (data, status) {
            return 'Error: ' + status +
                (data.Message !== undefined ? (' ' + data.Message) : '');
        },
        hub = $.connection.myHub; // create a proxy to signalr hub on web server...

    app.controller('myCtrl', ['$http', '$scope', function ($http, $scope) {
        $scope.complaints = [];
        $scope.customerIdSubscribed;

        //fn getAllFromCustomer
        $scope.getAllFromCustomer = function () {
            if ($scope.customerId.length == 0) return;
            $http.get(uri + '/' + $scope.customerId)
                .then(function (response) {
                    console.log(response.data);
                    $scope.complaints = response.data;//show current complaints                   

                    //alert("customerId.." + $scope.customerId);
                    //alert("customerIdSubscribed.." + $scope.customerIdSubscribed);

                    if ($scope.customerIdSubscribed && $scope.customerIdSubscribed.length > 0 && $scope.customerIdSubscribed !== $scope.customerId) {
                        // unsubscribe to stop to get notifications for old customer...
                        hub.server.unsubscribe($scope.customerIdSubscribed);
                        //alert("Unsubscribe Customer.........." + $scope.customerIdSubscribed);
                    }
                    // subscribe to start to get notifications for new customer...
                    hub.server.subscribe($scope.customerId);
                    $scope.customerIdSubscribed = $scope.customerId;
                    //alert("Subscribe Customer.........." + $scope.customerIdSubscribed);
                }, function (error) {
                    // .error(function (data, status) {
                    console.log("Get Error..." + error + " Status..." + error.status);
                    $scope.complaints = [];
                    $scope.errorToSearch = errorMessage(error, error.status);
                });
        };

        //Function postOne to add complaints
        $scope.postOne = function () {
            $http.post(uri, {
                ComplaintId: 0,
                CustomerId: $scope.customerId,
                Description: $scope.descToAdd
            })
                .then(function (response) {
                    $scope.errorToAdd = null;
                    $scope.descToAdd = null;
                }, function (error) {
                    console.log("Post Error..." + error + " Status..." + error.status);
                    $scope.errorToAdd = errorMessage(error, error.status);
                });
            //.error(function (data, status) {
            //    $scope.errorToAdd = errorMessage(data, status);
            //})
        };

        //fFunction putOne to update complaint
        $scope.putOne = function () {
            $http.put(uri + '/' + $scope.idToUpdate, {
                ComplaintId: $scope.idToUpdate,
                CustomerId: $scope.customerId,
                Description: $scope.descToUpdate
            })
                .then(function (response) {
                    $scope.errorToUpdate = null;
                    $scope.idToUpdate = null;
                    $scope.descToUpdate = null;
                }, function (error) {
                    console.log("Put Error..." + error + " Status..." + error.status);
                    $scope.errorToUpdate = errorMessage(error, error.status);
                });
            //.error(function (data, status) { //above function 
            //    $scope.errorToUpdate = errorMessage(data, status);
            //})
        };

        //Function deleteOne to delete complaint...
        $scope.deleteOne = function (item) {
            $http.delete(uri + '/' + item.ComplaintId)
                .then(function (response) {
                    $scope.errorToDelete = null;
                }, function (error) {
                    console.log("Delete Error..." + error + " Status..." + error.status);
                    $scope.errorToDelete = errorMessage(error, error.status);
                });
            //.error(function (data, status) {
            //    $scope.errorToDelete = errorMessage(data, status);
            //})
        };

        //Function editIt to edit
        $scope.editIt = function (item) {
            $scope.idToUpdate = item.ComplaintId;
            $scope.descToUpdate = item.Description;
        };

        //Function toShow to show the complaints
        $scope.toShow = function () {
            return $scope.complaints && $scope.complaints.length > 0;
        };

        // at initial page load
        $scope.orderProp = 'ComplaintId';

        // signalr client functions
        hub.client.addItem = function (item) {
            $scope.complaints.push(item);
            $scope.$apply(); // this is outside of angularjs, so need to apply
        }
        hub.client.deleteItem = function (item) {
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
        //
        $.connection.hub.start(); // connect to signalr hub
        //

    }]);
})();