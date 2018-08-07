var createButton = function(size, mines) {
  button = document.createElement("button");
  button.classList.add("map-size-btn");
  var caption = '<div class="nof-mines">' + mines + '</div>' + size + 'x' + size;
  button.innerHTML = caption;
  
  return button;
}

var renderMenu = function() {
  var container = document.getElementById("container");
  var btnContainer = document.createElement("section");
  btnContainer.classList.add("menu-btns-container");
  
  btnContainer.appendChild(createButton(8, 8));
  btnContainer.appendChild(createButton(16, 24));
  btnContainer.appendChild(createButton(32, 64));
  btnContainer.appendChild(createButton(64, 192));
  container.appendChild(btnContainer);
}
