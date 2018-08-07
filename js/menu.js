var createButton = function(caption) {
  button = document.createElement("button");
  button.classList.add("menu-btn");
  button.innerHTML = caption;
  
  return button;
}

var renderMenu = function() {
  var container = document.getElementById("container");
  var btnContainer = document.createElement("section");
  btnContainer.classList.add("menu-btns-container");
  
  btnContainer.appendChild(createButton('Start'));
  btnContainer.appendChild(createButton('Options'));
  container.appendChild(btnContainer);
}
