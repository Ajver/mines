
var setup = function() {
  // Creating levels
  levels[0] = new Level(8, 8, 8);
  levels[1] = new Level(16, 16, 32);
  levels[2] = new Level(32, 32, 96);
  
  renderMenu();
  
  window.setTimeout(function() {
    document.querySelector("main").classList.remove("in-game");
  }, 10);
  
  window.addEventListener("keydown", function(e) {
    if(e.keyCode === 27) { // ESC
      switch(state.current) {
        case state.game: 
          returnF();
          break;
        case state.creator:
          exitCreator();
          break;
      }
    }else  if(e.keyCode === 13) { // Enter
      startGameF();
    }
  }, false);
  
  
  window.addEventListener("resize", function() {
    if(map) {
      map.onResize();
    }
  }, false);
}

window.addEventListener("load", function() {
  setup();
}, false);