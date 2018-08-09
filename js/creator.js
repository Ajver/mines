
var createAlert = function(msg) {
  alert(msg);
}

var exitCreator = function() {
  // Return to main menu
  var creatorEl = document.querySelector(".creator");
  var main = document.querySelector("main");
  
  creatorEl.classList.remove("redy");
  window.setTimeout(function() {
    main.classList.remove("in-game");
    main.removeChild(creatorEl);
  }, 720);
}

var creator = function() {
  state.current = state.creator;
  
  // Clearing screen
  var main = document.querySelector("main");
  main.classList.add("in-game");
  
  // Creating custom level creator 
  var creatorEl = document.createElement("section");
  creatorEl.classList.add("creator");
  
  var checkSizeF = function() {
    var size = sizeInput.value;
    if(size > 64) { // Too big
      createAlert("Maksymalny rozmiar planszy to 64!");
      sizeInput.value = 64;
      
      return false;
    }
    
    return true;
  }
  
  var checkMinesF = function() {
    var size = minesInput.value;
    var maxSize = sizeInput.value * sizeInput.value;
    if(size > maxSize) { // Too big
      createAlert("Maksymalna ilość min to " + maxSize + "!");
      minesInput.value = maxSize;
      
      return false;
    }
    
    return true;
  }
  
  var startGameF = function() {
    if(checkSizeF() && checkMinesF()) {
      if(sizeInput.value > 0) {
        createGame(new Level(sizeInput.value, sizeInput.value, minesInput.value));
        creatorEl.classList.remove("redy");
        window.setTimeout(function() {
          main.removeChild(creatorEl);
        }, 500);
      }else {
        createAlert("Rozmiar planszy musi być większy niż 0");
      }
    }
  } 
  
  // Inputs
  var sizeInput = document.createElement("input");
  sizeInput.type = "number";
  sizeInput.addEventListener("focusout", checkSizeF, false);
  
  var minesInput = document.createElement("input");
  minesInput.type = "number";
  minesInput.addEventListener("focusout", checkMinesF, false);
  
  var caption1 = document.createElement("p");
  caption1.innerHTML = "Rozmiar planszy:";
  
  var caption2 = document.createElement("p");
  caption2.innerHTML = "Ilość min:";
  
  var btn1 = createButton("Start", startGameF);
  
  var btn2 = createButton("Wróć", exitCreator);
  
  creatorEl.appendChild(caption1);
  creatorEl.appendChild(sizeInput);
  
  creatorEl.appendChild(caption2);
  creatorEl.appendChild(minesInput);
  
  creatorEl.appendChild(btn1);
  creatorEl.appendChild(btn2);
  
  main.appendChild(creatorEl);
  
  window.setTimeout(function() {
    creatorEl.classList.add("redy");
  }, 700);
}