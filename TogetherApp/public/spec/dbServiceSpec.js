/**
 * Created by Nikita on 6/01/2016.
 */
describe('dbService', function() {
    beforeEach(module('app'));

    var dbService;

    beforeEach(inject(function (_dbService_) {
        dbService = _dbService_;
    }));

    describe('Does function exist?', function() {

        it('getCollection should exist', function() {
            expect(dbService.getCollection).toBeDefined();
        });
        it('getByID should exist', function() {
            expect(dbService.getByID).toBeDefined();
        });
        it('getDetailsUser should exist', function() {
            expect(dbService.getDetailsUser).toBeDefined();
        });
        it('getItem should exist', function() {
            expect(dbService.getItem).toBeDefined();
        });
        it('getDetailsActivity should exist', function() {
            expect(dbService.getDetailsActivity).toBeDefined();
        });
        it('getNoiseWords should exist', function() {
            expect(dbService.getNoiseWords).toBeDefined();
        });


    });
});
