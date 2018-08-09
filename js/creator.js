
var createAlert = function(msg) {
  alert(msg);
}

var creator = function() {
  // Clearing screen
  var main = document.querySelector("main");
  main.classList.add("in-game");
  
  // Creating custom level creator 
  var creatorEl = document.createElement("section");
  creatorEl.classList.add("creator");
  
  // Inputs
  var sizeInput = document.createElement("input");
  sizeInput.type = "number";
  sizeInput.addEventListener("focusout", function() {
    var size = this.value;
    if(size > 64) { // Too big
      createAlert("Maximum size is 64!");
      this.value = 64;
    }
  });
  
  var minesInput = document.createElement("input");
  minesInput.type = "number";
  minesInput.addEventListener("focusout", function() {
    var size = this.value;
    var maxSize = sizeInput.value * sizeInput.value;
    if(size > maxSize) { // Too big
      createAlert("Maximum size is " + maxSize + "!");
      this.value = maxSize;
    }
  }, false);
  
  var caption1 = document.createElement("p");
  caption1.innerHTML = "Size of map:";
  
  var caption2 = document.createElement("p");
  caption2.innerHTML = "Number of mines:";
  
  var btn1 = createButton("Start", function() {
    if(sizeInput.value > 0) {
      createGame(new Level(sizeInput.value, sizeInput.value, minesInput.value));
      creatorEl.classList.remove("redy");
      window.setTimeout(function() {
        main.removeChild(creatorEl);
      }, 500);
    }else {
      createAlert("Size have to by gretest than 0");
    }
  });
  
  var btn2 = createButton("Return", function() {
    // Return to main menu
    creatorEl.classList.remove("redy");
    window.setTimeout(function() {
      main.classList.remove("in-game");
    }, 500);
  });
  
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