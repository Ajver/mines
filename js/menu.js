
var createButton = function(level) {
  button = document.createElement("button");
  button.classList.add("map-size-btn");
  var caption = '<div class="nof-mines">' + level.mines + '</div>' + level.size + 'x' + level.size;
  button.innerHTML = caption;
  button.addEventListener("click", function() {
    createGame(level);
  }, false);
  
  return button;
}

var renderMenu = function() {
  var container = document.getElementById("container");
  var btnContainer = document.createElement("section");
  btnContainer.classList.add("menu-btns-container");
  
  for(var i=0; i<levels.length; i++) {
    btnContainer.appendChild(createButton(levels[i]));
  }
  
  container.appendChild(btnContainer);
}
