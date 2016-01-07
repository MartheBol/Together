describe('[TEST] ActivitiesController', function() {
    beforeEach(module('app'));

    var $controller, $scope = {};

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching 
        $controller = _$controller_;
    }));


    describe('TEST: $scope.getActivities()', function() {

        it('$scope.getActivities should exist', function() {
            var controller = $controller('ActivitiesController', { $scope: $scope });
            expect($scope.getActivities).toBeDefined();
        });
    });

    xdescribe('TEST: getKeywordsFromDescription', function() {

        xit('getKeywordsFromDescription should exist', function() {
            var controller = $controller('ActivitiesController', { $scope: $scope });
            expect(controller.getKeywordsFromDescription()).toBeDefined();
        });

        xit('getKeywordsFromDescription should equal keywords', function (done) {
            var description = "Ik wil naar Amerika";
            var controller = $controller('ActivitiesController', { $scope: $scope });
            controller.getKeywordsFromDescription(description, function (error, data) {
                description = data;
                if(!error) {
                    console.log(data);
                    expect(data).toEqual("Amerika");
                    done();
                }
            });
            controller.getKeywordsFromDescription();
        });
    });

    xdescribe('TEST: recentFirst', function() {
        it('recentFirst should exist', function() {
            var controller = $controller('ActivitiesController', { $scope: $scope });
            expect(controller.recentFirst).toBeDefined();
        });
    });

    xdescribe('TEST: isInArray', function() {
        it('isInArray should exist', function() {
            var controller = $controller('ActivitiesController', { $scope: $scope });
            expect(controller.isInArray).toBeDefined();
        });
    });
});