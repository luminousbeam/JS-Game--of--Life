function Cell(){
  this.element = $("<div class='cell " + randomGame() + "'></div>");
  this.neighbors = 0; //live neighbors

  function randomGame(){
    return(Math.random() > 0.7 ? "alive" : "");
  }
}

Cell.prototype.kill = function(){
  this.element.removeClass('alive');
};

Cell.prototype.resurrect = function(){
  this.element.addClass('alive');
};

Cell.prototype.isAlive = function(){
  return this.element.hasClass('alive');
};
