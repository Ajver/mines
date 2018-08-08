
var setup = function() {
  // Creating levels
  levels[0] = new Level(8, 8, 8);
  levels[1] = new Level(16, 16, 32);
  levels[2] = new Level(32, 32, 96);
  
  renderMenu();
  
  window.setTimeout(function() {
    document.querySelector("main").classList.remove("in-game");
  }, 10);
}

window.addEventListener("load", function() {
  setup();
}, false);