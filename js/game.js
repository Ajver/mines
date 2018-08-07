var levels = [];

function Level(size, mines) {
  this.size = size;
  this.mines = mines;
}

function Map(level) {
  
}

var createGame = function(level) {
  var container = document.getElementById("container");
  
  // Clearing screen
  document.querySelector("main").classList.add("in-game");
  window.setInterval(function() {
    container.innerHTML = "";
  }, 700);
}