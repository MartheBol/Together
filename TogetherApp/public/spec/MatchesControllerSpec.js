/**
 * Created by iman on 7/01/16.
 */
describe('[TEST] MatchesController', function() {
    beforeEach(module('app'));

    var $controller, $scope = {};

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching 
        $controller = _$controller_;
    }));

    describe('TEST: $scope.showMatches()', function() {

        it('$scope.showMatches exists', function() {
            var controller = $controller('MatchesController', { $scope: $scope });
            expect($scope.showMatches).toBeDefined();
        });
    });

    describe('TEST: intersect', function() {

        it('intersect(array1,array2) should be array=["same"]', function() {
            var controller = $controller('MatchesController', { $scope: $scope });
            var arr1 = ["not the same", "something else", "same"];
            var arr2 = ["same", "nothing"];
            var arrIntersect = $scope.intersect(arr1,arr2);
            expect(arrIntersect[0]).toBe("same");
        });
    });

});