function Conway(size){
  this.size = size;
  this.grid = this.generateGrid(size);
  this.directions = [[-1, -1],[-1, 0],[-1, 1],[0, 1],[1, -1],[1, 0],[1, 1]];
}

Conway.prototype.generateGrid = function(size){
  var grid = [];
  for(var i = 0; i < size; i++){
    var row = [];
    for(var j = 0; j < size; j++){
      row.push(new Cell());
    }
    grid.push(row);
  }
  return grid;
};

Conway.prototype.renderGrid = function(){
  var $grid = $('#grid');
  for(var i = 0; i <this.size; i++){
    var $row = $("<div class='row'>");
    for(var j = 0; j < this.size; j++){
      $row.append(this.grid[i][j].element);
    }
    $grid.append($row);
  }
};

//if cell has less than 2 neighbors, cell dies
Conway.prototype.isUnderpopulated = function(row, column){
  var cell = this.grid[row][column];
  return cell.neighbors < 2;
};

//if cell has more than 3 neighbors, cell dies
Conway.prototype.isOverpopulated = function(row, column){
  var cell = this.grid[row][column];
  return cell.neighbors > 3;
};

//if cell is dead and has exactly 3 neighbors, cell is resurrected
Conway.prototype.isResurrectable = function(row, column){
  var cell = this.grid[row][column];
  return !cell.isAlive() && cell.neighbors === 3;
};

Conway.prototype.isInBounds = function(row, column){
  return row >= 0 && row < this.size && column > 0 && column < this.size;
};

//update neighbors for cells
Conway.prototype.updateNeighborCells = function(row, column){
  var cell = this.grid[row][column];
  cell.neighbors = 0;
  for (var i = 0; i < this.directions.length; i++){
    var direction = this.directions[i];
    var directionRow = direction[0];
    var directionColumn = direction[1];
    //if directionRow and directionColumn are within bounds
    if (this.isInBounds(row + directionRow, column + directionColumn)){
      var neighbor = this.grid[row + directionRow][column + directionColumn];
      if(neighbor.isAlive()){
        cell.neighbors++;
      }
    }
  }
};

Conway.prototype.updateNeighbors = function(){
  for(var i = 0; i < this.size; i++){
    for(var j = 0; j < this.size; j++){
      this.updateNeighborCells(i,j);
    }
  }
};

Conway.prototype.updateStateForCell = function(row, column){
  var cell = this.grid[row][column];
  if (this.isUnderpopulated(row, column) || this.isOverpopulated(row, column)){
    cell.kill();
  }else if(this.isResurrectable(row, column)){
    cell.resurrect();
  }
};

Conway.prototype.updateStates = function(){
  for(var i = 0; i < this.size; i++){
    for(var j = 0; j < this.size; j++){
      this.updateStateForCell(i,j);
    }
  }
};
