
var createSizeButton = function(level) {
  var button = document.createElement("button");
  button.type = "button";
  button.classList.add("map-size-btn");
  var caption = '<div class="nof-mines">' + level.mines + '</div>' + level.col + 'x' + level.row;
  button.innerHTML = caption;
  button.addEventListener("click", function() {
    createGame(level);
  }, false);
  
  return button;
}

var createButton = function(caption, onclick) {
  var btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("menu-btn");
  btn.innerHTML = caption;
  
  if(onclick) {
    btn.addEventListener("click", onclick);
  }
  
  return btn;
}

var renderMenu = function() {
  var container = document.getElementById("container");
  container.innerHTML = "";
  var btnContainer = document.createElement("section");
  btnContainer.classList.add("menu-btns-container");
  
  for(var i=0; i<levels.length; i++) {
    btnContainer.appendChild(createSizeButton(levels[i]));
  }
  
  var btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("map-size-btn");
  btn.innerHTML = "Własny poziom";
  btn.style.textAlign = "center";
  btn.addEventListener("click", function() {
    creator();    
  }, false);
  
  btnContainer.appendChild(btn);
  
  container.appendChild(btnContainer);
}
