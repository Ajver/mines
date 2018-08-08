var levels = [];
var map = {};

function Level(col, row, mines) {
  this.col = col;
  this.row = row;
  this.mines = mines;
}

function Field(x, y) {
  this.x = x;
  this.y = y;
  this.w = 0;
  this.h = 0;
  this.neighbors = 0;
  this.isOpen = false;
  this.isMine = false;
  this.isPointed = false;
  this.htmlEl = null;
  
  this.updateHTMLElement = function() {    
    this.htmlEl.innerHTML = "";
    
    if(this.isOpen) {
      if(this.isMine) {
        this.htmlEl.innerHTML = '<img src="img/game/mine.png" width="' + (this.w < this.h ? this.w : this.h) + '" alt="">';
      }else {
        if(this.neighbors > 0) {
          this.htmlEl.innerHTML = this.neighbors;
          switch(this.neighbors) {
            case 1: this.htmlEl.style.color = '#038428'; break;
            case 2: this.htmlEl.style.color = '#007599'; break;
            case 3: this.htmlEl.style.color = '#e29700'; break;
            case 4: this.htmlEl.style.color = '#d63900'; break;
            default: this.htmlEl.style.color = '#a30606'; break;
          }
        }
      }
    }else if(this.isPointed) {
      this.htmlEl.innerHTML = '<img src="img/game/flag.png" width="' + (this.w < this.h ? this.w : this.h) + '" alt="">';
    }
  }
  
  this.createHTMLElement = function(w, h, margin) {
    this.htmlEl = document.createElement("div");
    this.htmlEl.classList.add("field");
    this.htmlEl.style.width = w + 'px';
    this.htmlEl.style.height = h + 'px';
    this.htmlEl.style.fontSize = (w * 0.9) + 'px';
    
    this.htmlEl.style.left = (this.x * (w + margin*2)) + 'px';
    this.htmlEl.style.top = (this.y * (h + margin*2)) + 'px';
    
    
    this.w = w;
    this.h = h;
    
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
    this.htmlEl.classList.add("open");
    this.htmlEl.addEventListener("click", null, false);
    this.htmlEl.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    }, false);
  }
}

function Map(level) {
  var container = document.getElementById("container");
  this.w = 700;
  this.level = level;
  this.fields = [];
  this.htmlEl = null;
  
  this.open = function(x, y) {
    if(!this.fields[x][y].isOpen && !this.fields[x][y].isPointed) {
      this.fields[x][y].isOpen = true;
      this.fields[x][y].updateHTMLElement();
      this.fields[x][y].open();
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
  
  this.createHTMLElement = function() {
    this.htmlEl = document.createElement("div");
    this.htmlEl.classList.add("map");
    
    this.htmlEl.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    }, false);
    
    var margin = this.level.col < 32 ? 2 : 1;
    var fieldW = (this.w/this.level.col) - (margin*2);
    var fieldH = (this.w/this.level.row) - (margin*2);
    
    for(var xx=0; xx<this.level.col; xx++) {
      this.fields[xx] = [];
      for(var yy=0; yy<this.level.row; yy++) {
        var f = new Field(xx, yy, fieldW);       
        f.createHTMLElement(fieldW, fieldH, margin);
        this.fields[xx][yy] = f;
        this.htmlEl.appendChild(f.htmlEl);
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
}