
var setup = function() {
  // Creating levels
  levels[0] = new Level(8, 8);
  levels[1] = new Level(16, 24);
  levels[2] = new Level(32, 64);
  levels[3] = new Level(64, 192);
  
  renderMenu();
}

window.addEventListener("load", function() {
  setup();
}, false);