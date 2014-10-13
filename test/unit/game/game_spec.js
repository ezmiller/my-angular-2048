describe('Game', function() {

	describe('GameManager', function() {
		var gameManager, _gridService;

		// Inject instance of the game module into test
		beforeEach(module('Game'));

		beforeEach(module(function($provide) {
			_gridService = {
				anyCellsAvailable: angular.noop,
				tileMatchesAvailable: angular.noop
			};
			$provide.value('GridService', _gridService);
		}));

		// Inject instance of GameManager
		beforeEach(inject(function(GameManager) {
			gameManager = GameManager;
		}));

		describe('.movesAvailable', function() {
			it('should report true if there are cells available', function() {
				spyOn(_gridService, 'anyCellsAvailable').andReturn(true);
				expect(gameManager.movesAvailable()).toBeTruthy();
			});
			it('should report true if there are matches available', function() {
				spyOn(_gridService, 'anyCellsAvailable').andReturn(false);
				spyOn(_gridService, 'tileMatchesAvailable').andReturn(true);
				expect(gameManager.movesAvailable()).toBeTruthy();
			});
			it('should report false if there are no cells nor matches available', function() {
				spyOn(_gridService, 'anyCellsAvailable').andReturn(false);
				spyOn(_gridService, 'tileMatchesAvailable').andReturn(false);
				expect(gameManager.movesAvailable()).toBeFalsy();
			});
		});
	});
});