var interval;

function go(game){
    interval = setInterval(function(){
    game.updateNeighbors();
    game.updateStates();
  }, 1000);
}

$(document).ready(function(){
  var size = 40;
  var conway = new Conway(size);
  conway.renderGrid();
  var rowWidth = $('.cell').width() === size;
  $('.row').width(rowWidth);
  $('.cell').on('click', function(event){
    $(event.target).toggleClass('alive');
  });

$(document).on("keypress", function startGame(){
  if(event.keyCode === 13){
    go(conway);
  }


$(document).on("keypress", function resetGame(){
  if(event.keyCode === 32){
    $('.alive').removeClass('alive');
    clearInterval(interval);
  }
})
});
});
