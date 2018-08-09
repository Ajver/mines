var isGame = false;
var levels = [];
var map = {};

var returnF = function() {
  // Return to main menu
  removeModal();
  map.htmlEl.classList.remove("redy");
  window.setTimeout(function() {
    renderMenu();

    window.setTimeout(function() {
      document.querySelector("main").classList.remove("in-game");
    }, 20);
  }, 700);
}

var createModal = function(hdrCaption, color, level) {
  var btn1 = createButton("Again", function() {
    // Restart game    
    removeModal();
    map.htmlEl.classList.remove("redy");
    createGame(level);
  });
  
  var btn2 = createButton("Return", function() {
    returnF();
  });
  
  var main = document.querySelector("main");
  var modal = document.createElement("section");
  modal.classList.add("modal");
  
  var header = document.createElement("h2");
  header.innerHTML = hdrCaption;
  header.style.color = color;
  
  modal.appendChild(header);
  
  modal.appendChild(btn1);
  modal.appendChild(btn2);
  
  main.appendChild(modal);
  main.classList.add("is-modal");
  
  window.setTimeout(function() {
    modal.classList.add("redy");
  }, 10);
}

var removeModal = function() {
  var main = document.querySelector("main");
  var modal = document.querySelector("section.modal");
  
  if(modal) {
    modal.classList.remove("redy");
    
    window.setTimeout(function() {
      main.removeChild(modal);
    }, 500);
  }
  
  main.classList.remove("is-modal");
}

var gameOver = function(level) {
  createModal("Game over", "#a30606", level);
}

var wonGame = function(level) {
  createModal("You won", "#07822a", level);
}

function Level(col, row, mines) {
  this.col = col;
  this.row = row;
  this.mines = mines;
}

function Field(x, y) {
  this.x = x;
  this.y = y;
  this.w = 0;
  this.neighbors = 0;
  this.isOpen = false;
  this.isMine = false;
  this.isPointed = false;
  this.htmlEl = null;
  
  this.updateHTMLElement = function() {    
    this.htmlEl.innerHTML = "";
    
    if(this.isOpen) {
      if(this.isMine) {
        this.htmlEl.innerHTML = '<img src="img/game/mine.png" width="' + this.w  + '" alt="">';
      }else {
        if(this.neighbors > 0) {
          this.htmlEl.innerHTML = this.neighbors;
          switch(this.neighbors) {
            case 1: this.htmlEl.style.backgroundColor = '#025419'; break;
            case 2: this.htmlEl.style.backgroundColor = '#004c7a'; break;
            case 3: this.htmlEl.style.backgroundColor = '#c47104'; break;
            case 4: this.htmlEl.style.backgroundColor = '#a30606'; break;
            default: this.htmlEl.style.backgroundColor = '#560707'; break;
          }
        }
      }
    }else if(this.isPointed) {
      this.htmlEl.innerHTML = '<img src="img/game/flag.png" width="' + this.w + '" alt="">';
    }
  }
  
  this.createHTMLElement = function(w, margin) {
    this.htmlEl = document.createElement("div");
    this.htmlEl.classList.add("field");
    this.htmlEl.style.width = w + 'px';
    this.htmlEl.style.height = w + 'px';
    this.htmlEl.style.fontSize = (w * 0.9) + 'px';
    
    if(w < 32) {
      if(w < 16) {
        this.htmlEl.style.borderRadius = '0';
      }else {
        this.htmlEl.style.borderRadius = '2px';
      }
    }
    
    this.htmlEl.style.left = (this.x * (w + margin*2)) + 'px';
    this.htmlEl.style.top = (this.y * (w + margin*2)) + 'px';
    
    this.w = w;
    
    this.htmlEl.addEventListener("click", function() {
      map.open(x, y);
    }, false);
    
    this.htmlEl.addEventListener("contextmenu", function(e) {
      e.preventDefault();
      map.point(x, y);
    }, false);
    
    this.updateHTMLElement();
  }
  
  this.open = function() {
    this.isOpen = true;
    this.updateHTMLElement();
    this.htmlEl.classList.add("open");
    this.htmlEl.addEventListener("click", null, false);
    this.htmlEl.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    }, false);
  }
  
  this.countNeighbors = function(fields, col, row) {
    for(var xx=this.x-1; xx<this.x+2; xx++) {
      for(var yy=this.y-1; yy<this.y+2; yy++) {
        if(xx >= 0 && xx < col &&
           yy >= 0 && yy < row &&
           (xx != this.x || yy != this.y)) {
          if(fields[xx][yy].isMine) {
            this.neighbors++;
          }
        }
      }
    }
  }
}

function Map(level) {
  var container = document.getElementById("container");
  this.w = 700;
  this.level = level;
  this.fields = [];
  this.htmlEl = null;
  
  this.open = function (x, y) {
    if(!this.fields[x][y].isOpen && !this.fields[x][y].isPointed) {
      this.fields[x][y].open();

      if(this.fields[x][y].isMine) { // Game over
        gameOver(this.level);
        isGame = false;
        return;
      }else if(this.fields[x][y].neighbors == 0) {
        function Point(x, y) {
          this.x = x;
          this.y = y;
        }

        var points = [];

        points.push(new Point(x, y));

        while(points.length > 0) {
          var newPoints = [];

          for(var i = 0; i < points.length; i++) {
            for(var yy=points[i].y - 1; yy<points[i].y + 2; yy++) {
            for(var xx=points[i].x - 1; xx<points[i].x + 2; xx++) {
              if(xx >= 0 && xx < this.level.col &&
                 yy >= 0 && yy < this.level.row) {
                if(!this.fields[xx][yy].isOpen && !this.fields[xx][yy].isPointed) {
                  if(this.fields[xx][yy].neighbors == 0) {
                    newPoints.push(new Point(xx, yy));
                  }

                  this.fields[xx][yy].open();
                }
              }
              
            }}
            points = newPoints;
          }
        }
      }
    }
    
    // Checking is won 
    var won = true;
    
    for(var xx=0; xx<this.level.col; xx++) {
    for(var yy=0; yy<this.level.row; yy++) {
      if(!this.fields[xx][yy].isMine) {
        if(!this.fields[xx][yy].isOpen) {
          won = false;
          // Breaking the loop
          xx = this.level.col;
          yy = this.level.row;
          break;
        }
      }
    }}
    
    if(won) {
      wonGame(this.level);
      isGame = false;
      return;
    }
  }
  
  this.point = function(x, y) {
    if(!this.fields[x][y].isPointed) {
      this.fields[x][y].isPointed = true;
    }else {
      this.fields[x][y].isPointed = false;
    }
    
    this.fields[x][y].updateHTMLElement();
  }
  
  this.createMap = function() {
    var size = this.level.col;
    
    var margin = size < 24 ? 2 : size < 32 ? 1 : size < 48 ? 0.5 : 0;
    var fieldW = (this.w/size) - (margin*2);
    
    for(var xx=0; xx<this.level.col; xx++) {
      this.fields[xx] = [];
      for(var yy=0; yy<this.level.row; yy++) {
        this.fields[xx][yy] = new Field(xx, yy);       
        this.fields[xx][yy].createHTMLElement(fieldW, margin);
      }
    }
    
    // Generating mines 
    for(var i=0; i<this.level.mines; i++) {
      var mx, my;
      do {
        mx = Math.floor(Math.random() * this.level.col);
        my = Math.floor(Math.random() * this.level.row);
      }while(this.fields[mx][my].isMine);
      
      this.fields[mx][my].isMine = true;
    }
    
    // Counting neighbors
    for(var xx=0; xx<this.level.col; xx++) {
      for(var yy=0; yy<this.level.row; yy++) {
        this.fields[xx][yy].countNeighbors(this.fields, this.level.col, this.level.row);
      }
    }
  }
  
  this.createHTMLElement = function() {
    this.htmlEl = document.createElement("div");
    this.htmlEl.classList.add("map");
    
    this.htmlEl.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    }, false);
    
    this.createMap();
    
    for(var xx=0; xx<this.level.col; xx++) {
      for(var yy=0; yy<this.level.row; yy++) {
        this.htmlEl.appendChild(this.fields[xx][yy].htmlEl);
      }
    }
    
    document.getElementById("container").appendChild(this.htmlEl);
  }
  
  this.createHTMLElement();
}

var createGame = function(level) {
  var container = document.getElementById("container");
  
  // Clearing screen
  document.querySelector("main").classList.add("in-game");
  window.setTimeout(function() {
    container.innerHTML = "";
    map = new Map(level);
    window.setTimeout(function() {
      map.htmlEl.classList.add("redy");
    }, 10);
  }, 700);
  
  window.addEventListener("keydown", function(e) {
    if(e.keyCode === 27) { // ESC
      returnF();
    }
  }, false);
}