'use strict';

angular.module('Grid', [])
.factory('TileModel', function() {
	var Tile = function(pos, val) {
		this.x = pos.x;
		this.y = pos.y;
		this.value = val || 2;
	};
	return Tile;
})
.service('GridService', function(TileModel) {
	var service;

	this.grid = [];
	this.tiles = [];

	// number of tiles  at start
	this.startingTileNumber = 2;

	// Size of the board
	this.size = 4;

	service = this;

	this.buildEmptyGameBoard = function() {
		var self = this;

		// Initialize the grid
		for (var x = 0; x < service.size * service.size; x++) {
			this.grid[x] = null;
		}

		// Initialize tile array
		this.forEach(function(x,y) {
			self.setCellAt({x:x,y:y}, null);
		});

	};

	this.buildStartingPosition = function() {
		for (var x = 0; x < this.startingTileNumber; x++) {
			this.randomlyInsertNewTile();
		}
	};

	this.randomlyInsertNewTile = function() {
		var newCell = this.randomAvailableCell(),
			tile = new TileModel(cell, 2);
		this.insertTile(tile);
	};

	/**
	 * Inserts a tile into the grid
	 */
	this.insertTile = function(tile) {
		var pos = this._coordinatesToPosition(tile);
		this.tiles[pos] = tile;
	};

	/**
	 * Removes a tile from the grid
	 */
	this.removeTile = function(pos) {
		var pos = this._coordinatesToPosition(pos);
		delete this.tiles[pos];
	};

	this.randomAvailableCell = function() {
		var cells = this.availableCells();
		if ( cells.length > 0 ) {
			return cells[Math.floor(Math.random() * cells.length)];
		}
	};

	/**
	 * Identifies the currently emptpy cells
	 */
	this.availableCells = function() {
		var cells = [],
			self = this;

		this.forEach(function(x,y) {
			dump(x,y);
			var foundTile = this.getCellAt({x:x, y:y});
			if (!foundTile) {
				cells.push({x:x, y:y});
			}
		});

		return cells;
	};

	/*
     * Run a callback for every cell
     * either on the grid or tiles
     */
	this.forEach = function(cb) {
		var totalSize = service.size * service.size;
		for (var i = 0; i < totalSize; i++) {
			var pos = this._positionToCoordinates(i);
			cb(pos.x, pos.y, this.tiles[i]);
		}
	};

	/**
	 * Sets the tile at the specified position
	 * if that position is within the grid
	 */
	this.setCellAt = function(pos, tile) {
		if (this.withinGrid(pos)) {
			var xPos = this._coordinatesToPosition(pos);
			this.tiles[xPos] = tile;
		} else {
			return null;
		}
	};

	/**
	 * Gets the tile at the specified position
	 * if that position is within grid.
	 */
	this.getCellAt = function(pos) {
		if (this.withinGrid(pos)) {
			var xPos = this._coordinatesToPosition(pos);
			return this.tiles[xPos];
		}
	}

	/*
	 * A small helper function to determine if a position
	 * is within the boudnaries of the grid.
	 */
	this.withinGrid = function(cell) {
		return cell.x  >= 0 && cell.x < this.size &&
				cell.y >= 0 && cell.y < this.size;
	};

	// Helper to convert x to x,y
	this._positionToCoordinates = function(i) {
		var x = i % service.size,
			y = (i - x) / service.size;
		return {
			x: x,
			y: y
		};
	};

	// Helper to convert coordinates to position
	this._coordinatesToPosition = function(pos) {
		return (pos.y * service.size) + pos.x;
	};

});