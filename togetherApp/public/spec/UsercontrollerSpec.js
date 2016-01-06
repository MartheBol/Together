describe('userController', function() {
    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.grade', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('userController', { $scope: $scope });
        });

        it('Is admin admin?   ', function() {
            $scope.user.username= 'admin';
            expect($scope.auth.isAdmin).toEqual('true');
        });


    });
});